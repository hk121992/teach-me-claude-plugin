// session-context.mjs — composes the SessionStart injection for Teach Me Claude.
//
// CANON: tmc-workspace/handbook/content/05-session-mechanics/README.md
//   "The runtime engine — pathway, handoff, session open/close" → the SessionStart
//   hook paragraph:
//     "SessionStart hook = greeting + position + detect-explain-resume. The hook
//      injects a warm greeting and the learner's position (from a *capped* progress
//      summary, not the whole file), and runs a recovery guard that never proceeds
//      from memory:
//        - missing / unreadable progress → say so plainly and reconnect.
//        - present-but-old-shape (version < 3) → run the v2→v3 migration.
//        - wrong workspace → validate the session is inside the learner's own
//          `.teach-me/` workspace (a marker check) BEFORE any read/write; ask on
//          ambiguity."
//   Data model: progress.json is `version: 3`, carries the sentinel `plugin:
//   "teach-me-claude"`, an `outcomes` map (the single source of position), and a
//   `current` pointer. `history` is append-only and CAPPED so this injection stays
//   bounded.
//
// This module never runs from memory: it computes the next step from the on-disk
// state via pathway(), or it explains plainly why it cannot (missing / corrupt /
// foreign-workspace) and asks to reconnect. The agent reads the injection; it does
// not re-derive position.
//
// DESIGN FOR TESTABILITY. The decision logic is split into small pure functions the
// test drives directly with fixtures:
//   - resolveWorkspacePath(cwd)         → the expected `.teach-me/progress.json` path
//   - readState(progressPath)           → a raw read result { kind, raw?, parsed? }
//     (the ONLY file read; read-only — a foreign/corrupt file is inspected, never
//     mutated)
//   - guardWorkspace(parsed)            → sentinel check → { ok } | { ask }
//   - classify(readResult)              → the detect-explain-resume branch decision
//   - cappedSummary(progress)           → the BOUNDED position summary (not the file)
//   - renderInjection(...)              → the final string the hook emits
// `composeSessionContext({ cwd })` is the thin orchestrator that wires them and is
// the one place that may WRITE (only on the version<3 migration branch, and only
// after the workspace guard has passed). It returns a structured result; the CLI
// entry prints `result.output`.
//
// Dependency-free ESM; node: built-ins only. Imports the already-built runtime
// helpers pathway() and migrateFile().

import fs from "node:fs";
import path from "node:path";

import { pathway, COMPLETE } from "./pathway.mjs";
import { migrateFile } from "./migrate-progress.mjs";

// ---------------------------------------------------------------------------
// Constants — the concrete workspace marker (canon "Data model" + the guard).
// ---------------------------------------------------------------------------

// The learner's own workspace is a `.teach-me/` dir holding progress.json.
const WORKSPACE_DIR = ".teach-me";
const PROGRESS_BASENAME = "progress.json";
const PREFERENCES_BASENAME = "preferences.json";

// The CONCRETE sentinel: a genuine TMC progress file carries this field. Bare
// file-existence is NOT the marker (it trips on a cloned/synced folder that merely
// contains a `.teach-me/progress.json`). The sentinel + the `.teach-me/` location
// together are the marker.
const PLUGIN_SENTINEL = "teach-me-claude";

// The current state-shape version. A file below this is an old shape → migrate.
const CURRENT_VERSION = 3;

// Action signals the orchestrator returns (the caller / hook branches on these):
//   proceed   — workspace ok, state present & usable → inject greeting+position+next
//   reconnect — missing OR unreadable/corrupt → say so plainly, reconnect (never
//               run from memory)
//   ask       — workspace ambiguous (a `.teach-me/progress.json` lacking the
//               sentinel: a foreign/cloned file) → ask; perform NO write
export const ACTION = Object.freeze({
  PROCEED: "proceed",
  RECONNECT: "reconnect",
  ASK: "ask",
});

// Reason tags on a `reconnect` — `missing` and `corrupt` are DISTINCT (canon: the
// corrupt branch must SAY it is corrupt, not silently look like missing).
export const REASON = Object.freeze({
  MISSING: "missing",
  CORRUPT: "corrupt",
});

// ---------------------------------------------------------------------------
// Path resolution
// ---------------------------------------------------------------------------

/**
 * The expected progress.json path for a session rooted at `cwd`: the learner's own
 * `<cwd>/.teach-me/progress.json`. Pure; no I/O.
 * @param {string} cwd session working directory
 * @returns {{ workspaceDir: string, progressPath: string, preferencesPath: string }}
 */
export function resolveWorkspacePath(cwd) {
  const workspaceDir = path.join(cwd, WORKSPACE_DIR);
  return {
    workspaceDir,
    progressPath: path.join(workspaceDir, PROGRESS_BASENAME),
    preferencesPath: path.join(workspaceDir, PREFERENCES_BASENAME),
  };
}

// ---------------------------------------------------------------------------
// The single read — read-only. Returns a discriminated result; never mutates.
// ---------------------------------------------------------------------------

/**
 * Read the progress file once, read-only, and classify what was found WITHOUT
 * deciding the action (that is `classify`'s job). This is the only place the file
 * is touched on the read path; a foreign or corrupt file is inspected, never
 * written.
 *
 *   { kind: "absent" }                         — no file at the path
 *   { kind: "unreadable", error }              — present but JSON.parse failed
 *   { kind: "parsed", raw, parsed }            — present and parsed to a value
 *
 * @param {string} progressPath
 * @returns {{kind:"absent"} | {kind:"unreadable", error:Error} | {kind:"parsed", raw:string, parsed:any}}
 */
export function readState(progressPath) {
  let raw;
  try {
    raw = fs.readFileSync(progressPath, "utf8");
  } catch (err) {
    // ENOENT (and any other read failure where the file is not there) → absent.
    // A present-but-unreadable-bytes case (e.g. a permissions error) is rare;
    // treat a non-ENOENT read failure as unreadable/corrupt rather than missing,
    // so we never silently proceed.
    if (err && err.code === "ENOENT") return { kind: "absent" };
    return { kind: "unreadable", error: err };
  }
  try {
    const parsed = JSON.parse(raw);
    return { kind: "parsed", raw, parsed };
  } catch (err) {
    return { kind: "unreadable", error: err };
  }
}

// ---------------------------------------------------------------------------
// Workspace guard — the CONCRETE sentinel check. Pure.
// ---------------------------------------------------------------------------

/**
 * The workspace guard, run on a PARSED progress object. The marker is concrete:
 * the file must carry `plugin: "teach-me-claude"`. A present `.teach-me/progress.json`
 * that LACKS the sentinel is a foreign/cloned file — ambiguous — and the guard
 * fails CLOSED: it returns `{ ok: false }` so the orchestrator asks and performs
 * NO write (no migrate, no overwrite). Pure; no I/O.
 *
 * @param {any} parsed the parsed progress object
 * @returns {{ ok: boolean }}
 */
export function guardWorkspace(parsed) {
  const ok =
    parsed !== null &&
    typeof parsed === "object" &&
    !Array.isArray(parsed) &&
    parsed.plugin === PLUGIN_SENTINEL;
  return { ok };
}

// ---------------------------------------------------------------------------
// detect-explain-resume — decide the branch from the read result. Pure.
// ---------------------------------------------------------------------------

/**
 * Decide the action from a read result, running the workspace guard FIRST on a
 * parsed file (before classifying its version/shape — so an ambiguous foreign file
 * is asked-about, never migrated or proceeded-on). Pure: no I/O, no write; the
 * orchestrator performs any migration the `migrate` flag asks for.
 *
 * Branches (canon detect-explain-resume):
 *   (guard)   parsed file lacking the sentinel  → { action: ask }            [no write]
 *   (a)       absent                            → { action: reconnect, reason: missing }
 *   (b)       unreadable / corrupt              → { action: reconnect, reason: corrupt }
 *   (c)       parsed, sentinel ok, version < 3  → { action: proceed, migrate: true }
 *   happy     parsed, sentinel ok, version ≥ 3  → { action: proceed, migrate: false }
 *
 * @param {{kind:string, parsed?:any}} readResult the result of readState()
 * @returns {{action:string, reason?:string, migrate?:boolean}}
 */
export function classify(readResult) {
  switch (readResult.kind) {
    case "absent":
      return { action: ACTION.RECONNECT, reason: REASON.MISSING };

    case "unreadable":
      return { action: ACTION.RECONNECT, reason: REASON.CORRUPT };

    case "parsed": {
      // Workspace guard FIRST — before any version/shape decision or write.
      const guard = guardWorkspace(readResult.parsed);
      if (!guard.ok) return { action: ACTION.ASK };

      const version = readResult.parsed.version;
      const isOldShape = !(Number.isInteger(version) && version >= CURRENT_VERSION);
      return { action: ACTION.PROCEED, migrate: isOldShape };
    }

    default:
      // Defensive: an unknown read kind is treated as corrupt (never proceed).
      return { action: ACTION.RECONNECT, reason: REASON.CORRUPT };
  }
}

// ---------------------------------------------------------------------------
// Capped position summary — BOUNDED, never the whole file (the AX token budget).
// ---------------------------------------------------------------------------

/**
 * A bounded summary of the learner's position. NOT the whole progress.json — just:
 *   - the learner name (or null),
 *   - counts of confirmed / provisional / unmet outcomes,
 *   - the in-flight runsheet pointer + status (if any).
 * History, kit contents, reflections, evidence refs, and the full outcomes map are
 * deliberately NOT included — the injection must stay small. Pure; no I/O.
 *
 * @param {any} progress a v3 progress object
 * @returns {{ name: string|null, outcomes: {confirmed:number, provisional:number, unmet:number, total:number}, current: {runsheet:(string|null), status:(string|null)} }}
 */
export function cappedSummary(progress) {
  const learner = (progress && progress.learner) || {};
  const name = typeof learner.name === "string" && learner.name !== "" ? learner.name : null;

  const outcomesMap = (progress && progress.outcomes) || {};
  let confirmed = 0;
  let provisional = 0;
  let unmet = 0;
  for (const entry of Object.values(outcomesMap)) {
    const status = entry && entry.status;
    if (status === "confirmed") confirmed += 1;
    else if (status === "provisional") provisional += 1;
    else unmet += 1; // unmet OR any unexpected/absent status → counted as not-yet-met
  }

  const cur = (progress && progress.current) || {};
  return {
    name,
    outcomes: {
      confirmed,
      provisional,
      unmet,
      total: confirmed + provisional + unmet,
    },
    current: {
      runsheet: cur.runsheet != null ? cur.runsheet : null,
      status: cur.status != null ? cur.status : null,
    },
  };
}

// ---------------------------------------------------------------------------
// Runsheet loading — read the in-flight series' runsheets if present (graceful
// none-yet). NO conformant runsheets exist this sprint; the test supplies fixtures
// via the `runsheets` override so the pathway-next composition is provable.
// ---------------------------------------------------------------------------

/**
 * Best-effort load of ordered runsheet metadata for the in-flight series. This
 * sprint ships NO conformant runsheets, so the default is `[]` — the position
 * summary still shows the outcome standing and pathway() returns COMPLETE or the
 * first unmet by an empty set (handled by the caller). Returns `[]` on any absence
 * or read error; never throws. (The test injects `runsheets` directly rather than
 * relying on a directory, proving the composition independent of an on-disk
 * authoring layout that does not exist yet.)
 *
 * @param {string} _workspaceDir reserved for a future on-disk runsheet layout
 * @returns {Array} ordered runsheet metadata (empty this sprint)
 */
export function loadRunsheets(_workspaceDir) {
  // No conformant runsheets exist this sprint and there is no settled on-disk
  // location to read them from yet (deliverable B authors them). Returning [] is
  // the graceful none-yet path; the test drives the populated case via override.
  return [];
}

// ---------------------------------------------------------------------------
// Render — the final injection string. Pure (given the computed parts).
// ---------------------------------------------------------------------------

const OPEN = "<teach-me-claude>";
const CLOSE = "</teach-me-claude>";

/**
 * Render the PROCEED injection: a warm greeting + the capped position summary +
 * the pathway-computed next step (or COMPLETE). Pure; no I/O. The agent reads this;
 * it never re-derives position from memory.
 *
 * @param {object} args
 * @param {object} args.summary    cappedSummary() output
 * @param {{next:string}|{complete:true}} args.next  the pathway() result
 * @param {boolean} [args.migrated] true → explain the v2→v3 outcome re-confirm
 * @returns {string}
 */
export function renderProceed({ summary, next, migrated = false }) {
  const who = summary.name ? summary.name : "there";
  const lines = [];
  lines.push(OPEN);
  lines.push(
    "This folder is the user's Teach Me Claude workspace. You are their learning companion.",
  );
  lines.push(`Greet ${summary.name ? summary.name : "the learner"} warmly by name and continue from where they left off.`);
  lines.push("");

  // Capped position summary — bounded counts, NOT the whole progress.json.
  lines.push("Where they are (capped summary — do NOT ask the runtime to dump progress.json):");
  lines.push(`  learner: ${who}`);
  lines.push(
    `  outcomes: ${summary.outcomes.confirmed} confirmed, ` +
      `${summary.outcomes.provisional} provisional, ` +
      `${summary.outcomes.unmet} unmet (of ${summary.outcomes.total} tracked)`,
  );
  if (summary.current.runsheet) {
    lines.push(
      `  in flight: challenge ${summary.current.runsheet}` +
        (summary.current.status ? ` (${summary.current.status})` : ""),
    );
  } else {
    lines.push("  in flight: none (no challenge paused mid-sitting)");
  }
  lines.push("");

  // The COMPUTED next step — never agent-chosen. This is the FM-RUN-FROM-MEMORY fix.
  if (next && next.complete === true) {
    lines.push(
      "Computed next step: COMPLETE — every taught outcome is confirmed. Route to " +
        "series-completion (the certificate), not to another challenge.",
    );
  } else if (next && typeof next.next === "string") {
    lines.push(
      `Computed next step (deterministic — do NOT pick a different one): challenge ${next.next}.`,
    );
  } else {
    // No runsheets available yet this sprint: be explicit, do not invent a next.
    lines.push(
      "Computed next step: not yet determinable — no conformant runsheets exist for " +
        "this series yet. Show the outcome standing above; do not invent a challenge.",
    );
  }

  // Migrated-learner note — their profile carried, outcomes re-confirm via forward
  // credit (pairs with A2-data). Canon: a migrated v2 learner's outcomes start
  // empty and are re-confirmed, not fabricated.
  if (migrated) {
    lines.push("");
    lines.push(
      "NOTE — this learner was just migrated from the old (v2) save shape. Their " +
        "profile (name, profession, goals, kit) carried over intact, but their " +
        "outcomes were NOT fabricated from the old pass-history: they re-confirm as " +
        "they go, with forward-credit for anything they clearly already show. Tell " +
        "them their progress is safe and that you'll re-confirm outcomes as you continue.",
    );
  }

  lines.push("");
  lines.push("Follow the companion contract in the teach-me-claude plugin CLAUDE.md.");
  lines.push("The /teach-me-claude:teach-me skill resumes the journey.");
  lines.push(CLOSE);
  return lines.join("\n");
}

/**
 * Render the RECONNECT injection (missing OR corrupt). It SAYS plainly which it is
 * — the two are distinct — and never proceeds from memory. Pure; no I/O.
 *
 * @param {string} reason REASON.MISSING | REASON.CORRUPT
 * @param {string} progressPath the path that was checked (named so the learner can
 *        orient)
 * @returns {string}
 */
export function renderReconnect(reason, progressPath) {
  const lines = [];
  lines.push(OPEN);
  lines.push(
    "This folder looks like a Teach Me Claude workspace, but the learning state " +
      "could not be loaded. Do NOT guess their progress from memory — reconnect first.",
  );
  if (reason === REASON.CORRUPT) {
    lines.push(
      `Their progress file (${progressPath}) is present but CORRUPT (the file exists ` +
        "but is not readable as valid JSON). Say so plainly — it is a corrupt save, " +
        "not an absent one — and offer to help them recover or restart it. Never " +
        "overwrite it without telling them.",
    );
  } else {
    lines.push(
      `Their progress file (${progressPath}) is MISSING. Say so plainly and offer to ` +
        "reconnect — start a new journey, or restore a save if they have one.",
    );
  }
  lines.push("The /teach-me-claude:teach-me skill can re-establish the journey.");
  lines.push(CLOSE);
  return lines.join("\n");
}

/**
 * Render the ASK injection (ambiguous / foreign workspace). The guard failed
 * CLOSED: a `.teach-me/progress.json` is present but lacks the `plugin` sentinel,
 * so it is likely a cloned/synced folder that is not THIS learner's workspace. We
 * ask before doing anything; NO write has been or will be performed here. Pure; no
 * I/O.
 *
 * @param {string} progressPath the path that was checked
 * @returns {string}
 */
export function renderAsk(progressPath) {
  const lines = [];
  lines.push(OPEN);
  lines.push(
    "There is a `.teach-me/progress.json` here, but it does NOT carry the Teach Me " +
      "Claude marker — so this may be a cloned or synced copy of someone else's " +
      "workspace, not this learner's own.",
  );
  lines.push(
    `Do NOT read it as their progress, do NOT migrate it, and do NOT overwrite it ` +
      `(${progressPath} is left untouched). ASK the learner whether this is really ` +
      "their Teach Me Claude workspace before doing anything with it.",
  );
  lines.push(CLOSE);
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Orchestrator — wire the pure pieces; the ONE place that may write (migration,
// and only after the guard has passed). Returns a structured result + the string
// the CLI emits.
// ---------------------------------------------------------------------------

/**
 * Compose the SessionStart injection for a session rooted at `cwd`.
 *
 * Flow:
 *   1. resolve the expected `.teach-me/progress.json` path.
 *   2. read it ONCE (read-only).
 *   3. classify → action. The workspace guard runs inside classify, on the parsed
 *      file, BEFORE any version decision — an ambiguous foreign file yields `ask`
 *      and NO write happens.
 *   4. on PROCEED:
 *        - if migrate: run the v2→v3 migration (migrateFile) — the ONLY write, and
 *          only here, after the guard passed. Re-read the migrated state.
 *        - compute the capped summary + pathway next, render the injection.
 *      on RECONNECT / ASK: render the explanation; NO write.
 *
 * @param {object} args
 * @param {string} args.cwd  the session working directory
 * @param {Array}  [args.runsheets]  ordered runsheet metadata override (the test
 *        supplies fixtures; production loads via loadRunsheets()). When omitted,
 *        loadRunsheets() is used (→ [] this sprint).
 * @returns {{ action:string, reason?:string, migrated?:boolean, output:string, progressPath:string }}
 */
export function composeSessionContext({ cwd, runsheets } = {}) {
  if (typeof cwd !== "string" || cwd === "") {
    throw new TypeError("composeSessionContext: cwd must be a non-empty string");
  }
  const { workspaceDir, progressPath, preferencesPath } = resolveWorkspacePath(cwd);

  // 2 + 3 — single read, then classify (guard runs first inside classify).
  const readResult = readState(progressPath);
  const decision = classify(readResult);

  if (decision.action === ACTION.ASK) {
    // Fail closed: NO write. Just ask.
    return {
      action: ACTION.ASK,
      output: renderAsk(progressPath),
      progressPath,
    };
  }

  if (decision.action === ACTION.RECONNECT) {
    // Missing or corrupt — say so plainly, NO write, never run from memory.
    return {
      action: ACTION.RECONNECT,
      reason: decision.reason,
      output: renderReconnect(decision.reason, progressPath),
      progressPath,
    };
  }

  // PROCEED — guard has passed.
  let progress = readResult.parsed;
  let migrated = false;

  if (decision.migrate) {
    // The ONLY write path, and only AFTER the guard passed. migrateFile writes
    // progress.json + preferences.json atomically and returns the v3 result.
    const res = migrateFile(progressPath, preferencesPath);
    progress = res.progress;
    migrated = res.migrated;
  }

  // Capped position summary + the deterministic next step.
  const summary = cappedSummary(progress);
  const sheets = Array.isArray(runsheets) ? runsheets : loadRunsheets(workspaceDir);
  // pathway() over an EMPTY runsheet set is vacuously COMPLETE — but "no content yet"
  // is NOT "every taught outcome confirmed". Only ask pathway when content exists; with
  // no runsheets, leave `next` null so renderProceed presents the none-yet position
  // (its else branch) instead of a misleading completion claim against unmet outcomes.
  // (Real conformant runsheets land with deliverable B; this is the skill↔spine seam.)
  const next =
    sheets.length > 0
      ? pathway({
          outcomes: progress.outcomes || {},
          runsheets: sheets,
          current: progress.current,
        })
      : null;

  return {
    action: ACTION.PROCEED,
    migrated,
    output: renderProceed({ summary, next, migrated }),
    progressPath,
  };
}

// Re-export the COMPLETE sentinel so callers/tests share the same shape.
export { COMPLETE };

export default composeSessionContext;

// ---------------------------------------------------------------------------
// CLI — `node session-context.mjs [cwd]`. The SessionStart hook invokes this via
// the thin session-greeting.sh; it prints the composed injection to stdout (the
// hook surfaces stdout to the session). Defaults cwd to process.cwd(). Kept thin —
// all logic is in the exported functions above. NEVER crashes the session: on an
// unexpected internal error it prints nothing and exits 0 (an empty injection is
// safe; a crash is not).
// ---------------------------------------------------------------------------

const isMain = (() => {
  try {
    return import.meta.url === `file://${process.argv[1]}`;
  } catch {
    return false;
  }
})();

if (isMain) {
  try {
    const cwd = process.argv[2] || process.cwd();
    // If there is no `.teach-me/` here at all, this is simply not a learner
    // workspace — emit nothing and cost nothing (parity with the old shell guard's
    // "outside a workspace this prints nothing").
    const { workspaceDir } = resolveWorkspacePath(cwd);
    if (!fs.existsSync(workspaceDir)) {
      process.exit(0);
    }
    const { output } = composeSessionContext({ cwd });
    if (output) process.stdout.write(output + "\n");
    process.exit(0);
  } catch {
    // Fail safe: a SessionStart hook must NEVER crash the session. Emit nothing.
    process.exit(0);
  }
}
