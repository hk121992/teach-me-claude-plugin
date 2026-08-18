// session-context.mjs — composes the SessionStart injection for Teach Me Claude.
//
// SPEC (the on-demand reference set is this harness's spec home — the handbook page
// this header once cited is deprecated; same superseding-spec convention as
// curriculum/authoring/lib/conformance.mjs):
//   - .claude/on-demand/session-model/README.md → the SessionStart hook: greeting +
//     position + detect-explain-resume. The hook injects a warm greeting and the
//     learner's position (from a *capped* progress summary, not the whole file), and
//     runs a recovery guard that never proceeds from memory:
//       - missing / unreadable progress → say so plainly and reconnect.
//       - present-but-old-shape (version < 3) → run the v2→v3 migration.
//       - wrong workspace → validate the session is inside the learner's own
//         `.teach-me/` workspace (a marker check) BEFORE any read/write; ask on
//         ambiguity.
//   - .claude/on-demand/assessment-model/README.md → the progress record: version 3,
//     the sentinel `plugin: "teach-me-claude"`, an `outcomes` map (the single source
//     of position), a `current` pointer, and the per-series `attended` list
//     (navigation state only — forwarded to pathway() for compulsory routing).
//     `history` is append-only and CAPPED so this injection stays bounded.
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
// helpers pathway() and migrateFile(), and parseFrontmatter() (the runtime runsheet
// frontmatter parser) for loading the shipped runsheets.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { pathway, COMPLETE, inFlightResume, CONFIRMED, PROVISIONAL } from "./pathway.mjs";
import { migrateFile, CURRENT_VERSION, PLUGIN as PLUGIN_SENTINEL } from "./migrate-progress.mjs";
import { parseFrontmatter } from "./frontmatter.mjs";

// ---------------------------------------------------------------------------
// Constants — the concrete workspace marker (canon "Data model" + the guard).
// ---------------------------------------------------------------------------

// The learner's own workspace is a `.teach-me/` dir holding progress.json.
// EXPORTED (wi-onboarding IU-1 touch-up): tmc.mjs — the runtime CLI whose
// `setup` command materializes the workspace tree — imports these so the
// bookkeeping layout has ONE owner (this module). No third layout truth.
export const WORKSPACE_DIR = ".teach-me";
export const PROGRESS_BASENAME = "progress.json";
export const PREFERENCES_BASENAME = "preferences.json";

// The CONCRETE sentinel (`PLUGIN_SENTINEL`) and the current state-shape version
// (`CURRENT_VERSION`) are IMPORTED from migrate-progress.mjs — the module that
// WRITES them — so the workspace guard checks the exact value migration produces and
// the version threshold can never drift from the migration's own. (A genuine TMC
// progress file carries the sentinel; bare file-existence is NOT the marker — it
// trips on a cloned/synced folder that merely contains a `.teach-me/progress.json`.
// The sentinel + the `.teach-me/` location together are the marker.)

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

// The hook's ONE disposition line (wi-onboarding IU-3; session-model §The
// workspace › Onboarding — "SessionStart hook emits one disposition line
// (first-run | resume position)"). Binary by design: FIRST_RUN when no
// `.teach-me/` workspace dir exists at cwd; `resume` otherwise — whichever
// recovery branch detect-explain-resume then lands on (proceed / missing /
// corrupt / foreign are all the RETURNING side of the check). Every rendered
// injection carries the line EXACTLY ONCE: zero is the probe-1 failure (no
// signal → the agent re-derives disposition by hand), two+ is an ambiguous
// signal an agent may mis-trust.
export const DISPOSITION = Object.freeze({
  FIRST_RUN: "FIRST_RUN",
  RESUME: "resume",
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
 * The counts are taken over the union of (the outcomes-map's own uids) and the
 * TAUGHT set (`taughtUids` — the loaded runsheets' `covers_outcomes` union). This
 * closes the "absent ≠ present-and-unmet" leak (F8): without the taught set a
 * never-touched taught outcome is simply ABSENT from the map and vanishes from the
 * counts, so mid-series the summary reads "N confirmed, 0 unmet (of N tracked)"
 * while dozens of taught outcomes are still open — a false everything-done
 * narrative. With it, an absent taught uid is correctly counted `unmet`. When
 * `taughtUids` is omitted/empty (the none-yet path, or a direct call) the behaviour
 * is unchanged: the counts range over the map's own entries.
 *
 * @param {any} progress a v3 progress object
 * @param {Iterable<string>} [taughtUids] the taught outcome uids for the in-flight
 *        series (see taughtUidUnion); absent-taught uids count as `unmet`.
 * @returns {{ name: string|null, outcomes: {confirmed:number, provisional:number, unmet:number, total:number}, current: {runsheet:(string|null), status:(string|null)} }}
 */
export function cappedSummary(progress, taughtUids) {
  const learner = (progress && progress.learner) || {};
  const name = typeof learner.name === "string" && learner.name !== "" ? learner.name : null;

  const outcomesMap = (progress && progress.outcomes) || {};

  // Account for every uid already in the map UNION every taught uid — so a taught
  // outcome the learner has not reached yet is counted `unmet`, not invisible.
  const uids = new Set(Object.keys(outcomesMap));
  if (taughtUids) for (const uid of taughtUids) uids.add(uid);

  let confirmed = 0;
  let provisional = 0;
  let unmet = 0;
  for (const uid of uids) {
    const entry = outcomesMap[uid];
    const status = entry && entry.status;
    if (status === CONFIRMED) confirmed += 1;
    else if (status === PROVISIONAL) provisional += 1;
    else unmet += 1; // unmet OR absent-taught OR any unexpected status → not-yet-met
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
// Runsheet loading — read the in-flight series' runsheets from the SHIPPED plugin
// (graceful none-yet when the series has none authored).
//
// THE ON-DISK LAYOUT DECISION (see curriculum/authoring/runsheet-ondisk-layout.md):
//   This code runs inside the learner's INSTALLED plugin, so it reads the runsheets
//   the build ships, NOT the learner's `.teach-me/` workspace (that holds only their
//   progress.json / preferences.json — never content). The build projection
//   (build/build.ts PROJECTION; spec: the build-projection-contract reference) maps
//       curriculum/series/NN-<slug>/challenges/  →  <pluginRoot>/challenges/series-NN/
//   and the runtime scripts
//       plugin-src/scripts/                      →  <pluginRoot>/scripts/
//   so from THIS module's own location (<pluginRoot>/scripts/session-context.mjs)
//   the plugin root is the parent dir, and the in-flight series' runsheets are at
//   <pluginRoot>/challenges/series-NN/.
//
//   ORDER = the on-disk `NN-<slug>/` FOLDER sequence (folder-per-challenge, SG-1 D12:
//   "order = the folder's NN- prefix, identity = the frontmatter id; a reorder renames
//   ONE folder"). The runsheet `id` is a STABLE OPAQUE UID, NOT the position — so we
//   sort by the FOLDER NAME (zero-padded NN- prefixes sort lexically into series order)
//   and never parse order out of the id. Each challenge folder holds `runsheet.md`; the
//   `00-series-overview.md` file is not a challenge runsheet and the `00-onboarding/`
//   folder is skill-sourced (no runsheet) — both are excluded (any `00-` prefix + any
//   folder lacking a `runsheet.md`).
//
//   In the DEV tree this module sits at plugin-src/scripts/, whose parent has no
//   challenges/ dir, so loadRunsheets finds nothing and returns [] — the seam is
//   exercised in tests via an explicit dir / the `runsheets`/`pluginRoot` overrides.
// ---------------------------------------------------------------------------

// EXPORTED (wi-onboarding IU-1 touch-up): tmc.mjs — the runtime CLI whose
// `next` command owns id→path over the shipped tree — imports these so the
// shipped-tree layout has ONE owner (this module, the loader that already
// encodes it). No third layout truth.
export const CHALLENGES_DIR = "challenges";
export const OVERVIEW_PREFIX = "00-"; // the 00- overview file + 00-onboarding folder, not challenge runsheets
export const RUNSHEET_BASENAME = "runsheet.md"; // the shipped runsheet inside each challenge folder

/**
 * The installed plugin's root, resolved from THIS module's own location: the build
 * projects plugin-src/scripts/ → <pluginRoot>/scripts/, so the root is the parent
 * of this script's directory. (Used as the default base; tests pass an explicit
 * `pluginRoot` instead.) No I/O.
 * @returns {string}
 */
export function installedPluginRoot() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}

/**
 * The shipped runsheet directory for an in-flight series number. The build emits
 * `challenges/series-NN` (zero-padded ≥2), so e.g. series 1 → `challenges/series-01`.
 * A non-positive / non-integer series falls back to 1 (the only series shipped today).
 * Pure; no I/O.
 * @param {string} pluginRoot the installed plugin root
 * @param {number} series     the in-flight series number (progress.current.series)
 * @returns {string} absolute path to the series' runsheet directory
 */
export function inFlightSeriesDir(pluginRoot, series) {
  const n = Number.isInteger(series) && series > 0 ? series : 1;
  return path.join(pluginRoot, CHALLENGES_DIR, `series-${String(n).padStart(2, "0")}`);
}

/**
 * Load the ordered runsheet metadata for one series from its shipped directory.
 *
 * Under folder-per-challenge (SG-1 D12) each challenge is a FOLDER
 * `<seriesDir>/NN-<slug>/` holding `runsheet.md`. Scans those folders in FOLDER-NAME
 * order (= series order; see the layout decision above), skips any `00-` folder
 * (`00-onboarding` is skill-sourced) and the `00-series-overview.md` file, reads each
 * `NN-<slug>/runsheet.md`, parses its YAML frontmatter with the runtime parser, and
 * returns the ordered array pathway() consumes. Each element is the runsheet's full
 * parsed frontmatter — so `id`, `compulsory`, `compulsory_reason`, and
 * `covers_outcomes` (with its per-outcome `floor_confirmable` booleans) are ALL
 * forwarded, never a hand-picked subset. (CONTRACT — wi-compulsory: pathway() reads
 * `runsheet.compulsory`; silently dropping it would make a `compulsory: true`
 * challenge skippable in production. Forwarding the whole frontmatter means no field
 * a consumer needs is lost.)
 *
 * GRACEFUL by construction — NEVER throws (it runs in the SessionStart hook):
 *   - the directory is absent / unreadable → `[]` (the none-yet path: a series with
 *     no authored runsheets yet, or the dev tree where there is no challenges/ dir);
 *   - a challenge folder with no `runsheet.md` (e.g. `00-onboarding/`, or a
 *     not-yet-authored stub folder) → skipped without error;
 *   - a `runsheet.md` that is unreadable, has no frontmatter fence, or carries no
 *     string `id` → that folder is skipped (it is not a usable runsheet).
 *
 * @param {string} seriesDir absolute path to the in-flight series' challenge dir
 *        (resolved by composeSessionContext from the plugin root + current.series).
 * @returns {Array<object>} ordered runsheet metadata; `[]` when none.
 */
export function loadRunsheets(seriesDir) {
  if (typeof seriesDir !== "string" || seriesDir === "") return [];

  let entries;
  try {
    entries = fs.readdirSync(seriesDir, { withFileTypes: true });
  } catch {
    return []; // dir absent / unreadable → graceful none-yet
  }

  // The challenge folders, in folder-name order (= series order; zero-padded NN-
  // prefixes sort lexically). Exclude any `00-` folder (00-onboarding is
  // skill-sourced, no runsheet). A non-directory entry (e.g. 00-series-overview.md)
  // is not a challenge folder and is ignored here.
  const folders = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith(OVERVIEW_PREFIX))
    .map((e) => e.name)
    .sort();

  const sheets = [];
  for (const name of folders) {
    const rsPath = path.join(seriesDir, name, RUNSHEET_BASENAME);
    let raw;
    try {
      raw = fs.readFileSync(rsPath, "utf8");
    } catch {
      continue; // folder without a runsheet.md → skip, never throw
    }
    const fm = parseFrontmatter(raw);
    // A usable runsheet has a string `id` (pathway() returns it as `next`). A
    // runsheet with no fence / no id (a stray or not-yet-authored stub) is not a
    // runsheet — skip it rather than feed pathway() an id-less entry.
    if (!fm || typeof fm.id !== "string" || fm.id === "") continue;
    sheets.push(fm);
  }
  return sheets;
}

/**
 * The union of every TAUGHT outcome uid across a loaded runsheet set — the
 * `covers_outcomes[].uid` of every runsheet. This is the taught set for the
 * in-flight series; cappedSummary uses it so an untouched taught outcome counts
 * `unmet` on the position surface rather than vanishing (F8). Pure; no I/O.
 * @param {Array<object>} runsheets loaded runsheet metadata
 * @returns {Set<string>} the set of taught outcome uids (empty when none loaded)
 */
export function taughtUidUnion(runsheets) {
  const uids = new Set();
  for (const rs of runsheets || []) {
    const covers = (rs && rs.covers_outcomes) || [];
    for (const c of covers) {
      if (c && typeof c.uid === "string" && c.uid !== "") uids.add(c.uid);
    }
  }
  return uids;
}

// ---------------------------------------------------------------------------
// Render — the final injection string. Pure (given the computed parts).
// ---------------------------------------------------------------------------

const OPEN = "<teach-me-claude>";
const CLOSE = "</teach-me-claude>";

/**
 * Classify a session cwd into the three disposition shapes (review CORR-A —
 * the hook must never label a folder of an EXISTING workspace FIRST_RUN):
 *
 *   { kind: "workspace" }                — `<cwd>/.teach-me` exists: the home
 *       base (or any folder carrying its own bookkeeping) → the full
 *       compose/inject path.
 *   { kind: "member", homeBaseRel }      — the cwd belongs to an existing
 *       workspace without carrying the bookkeeping itself: the CONTAINER ROOT
 *       (`<cwd>/learning-guide/.teach-me` exists → rel "learning-guide/") or a
 *       CONTAINER-MEMBER folder such as `series-NN/` (a sibling of the home
 *       base: `<cwd>/../learning-guide/.teach-me` exists → rel
 *       "../learning-guide/"). `homeBaseRel` is one of those two FIXED
 *       relative strings — never derived from input, so nothing external can
 *       steer what the hook injects.
 *   { kind: "first-run" }                — none of the above. A genuinely new
 *       user, any unrelated folder, or a fresh break-out outside the container
 *       (undetectable by construction — the returning-check question remains
 *       the authority; session-model's three context levels).
 *
 * Deliberately bounded to these three probes: no tree-walk, no upward scan
 * beyond one level — the same session shapes the learning-guide contract
 * names.
 * @param {string} cwd
 * @returns {{kind:"workspace"}|{kind:"member", homeBaseRel:string}|{kind:"first-run"}}
 */
export function classifyDisposition(cwd) {
  if (fs.existsSync(path.join(cwd, WORKSPACE_DIR))) return { kind: "workspace" };
  if (fs.existsSync(path.join(cwd, "learning-guide", WORKSPACE_DIR))) {
    return { kind: "member", homeBaseRel: "learning-guide/" };
  }
  if (fs.existsSync(path.join(path.dirname(cwd), "learning-guide", WORKSPACE_DIR))) {
    return { kind: "member", homeBaseRel: "../learning-guide/" };
  }
  return { kind: "first-run" };
}

/**
 * Render the FIRST_RUN disposition — the whole injection for a session whose
 * cwd belongs to no workspace at all. ONE line, wrapper included: it fires in
 * every non-workspace session, so it must stay a single cheap line —
 * informational, actionable only when the user actually asks to learn. Pure.
 * @returns {string}
 */
export function renderFirstRun() {
  return (
    `${OPEN}disposition: ${DISPOSITION.FIRST_RUN} — no Teach Me Claude workspace in ` +
    "this folder. If the user asks to learn Claude or to start or continue the " +
    "course, follow the teach-me skill: it asks the one returning-check question, " +
    `then shows the onboarding widget immediately.${CLOSE}`
  );
}

// The resume-side disposition line, shared by every workspace-present renderer
// (proceed / reconnect / ask / the member pointer) so the exactly-once
// contract has one home.
const RESUME_LINE = `disposition: ${DISPOSITION.RESUME}`;

/**
 * Render the workspace-MEMBER disposition — a session at the container root or
 * in a container-member folder (series-NN/, any sibling of the home base) of
 * an EXISTING workspace. ONE resume-side line pointing at the home base: no
 * greeting, no state read, no guard run — the guard and the bookkeeping stay
 * home-base-only, so a break-out keeps its clean context and still never gets
 * mislabelled FIRST_RUN (review CORR-A). `homeBaseRel` is one of
 * classifyDisposition's two fixed relative strings. Pure.
 * @param {string} homeBaseRel "learning-guide/" | "../learning-guide/"
 * @returns {string}
 */
export function renderResumeElsewhere(homeBaseRel) {
  return (
    `${OPEN}${RESUME_LINE} — this folder belongs to an existing Teach Me Claude ` +
    `workspace; the home base is at ${homeBaseRel} (every session opens there — ` +
    "that is where the course, the learner's progress, and the greeting live). " +
    `If the user wants their course from here, the teach-me skill routes them home.${CLOSE}`
  );
}

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
  lines.push(RESUME_LINE);
  lines.push(
    "This folder is the user's Teach Me Claude workspace. You are their learning guide.",
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
  lines.push("Follow the learning-guide contract at `learning-guide/CLAUDE.md`.");
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
  lines.push(RESUME_LINE);
  lines.push(
    "This folder looks like a Teach Me Claude workspace, but the learning state " +
      "could not be loaded. Do NOT guess their progress from memory — reconnect first.",
  );
  if (reason === REASON.CORRUPT) {
    lines.push(
      `Their saved learning state (${progressPath}) is present but CORRUPT (the file ` +
        "exists but is not readable as valid JSON). Say so plainly — it is a corrupt " +
        "save, not an absent one — and offer to help them recover or restart it. Never " +
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
  lines.push(RESUME_LINE);
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
 * @param {Array}  [args.runsheets]  ordered runsheet metadata override — when an
 *        array is given it is used verbatim (the test injects fixtures directly).
 *        When omitted, production loads the in-flight series' runsheets from the
 *        shipped plugin via loadRunsheets() (→ [] when the series has none authored).
 * @param {string} [args.pluginRoot]  installed-plugin-root override for resolving
 *        the shipped runsheet dir; defaults to installedPluginRoot() (this module's
 *        own location). The test points it at a fixture plugin tree to exercise the
 *        loadRunsheets→pathway seam end-to-end. Ignored when `runsheets` is given.
 * @returns {{ action:string, reason?:string, migrated?:boolean, output:string, progressPath:string }}
 */
export function composeSessionContext({ cwd, runsheets, pluginRoot } = {}) {
  if (typeof cwd !== "string" || cwd === "") {
    throw new TypeError("composeSessionContext: cwd must be a non-empty string");
  }
  const { progressPath, preferencesPath } = resolveWorkspacePath(cwd);

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
    //
    // F3: migrateFile can THROW — a corrupt preferences.json throws EBADPREFSJSON,
    // a re-read/parse of progress.json throws EBADPROGRESSJSON, or an fs error
    // surfaces. Left unguarded the throw propagates to the CLI catch-all, which
    // exits 0 with NO output: the entire SessionStart injection silently vanishes
    // and the learner is dropped with no greeting and no explanation. Catch it and
    // degrade to an explicit RECONNECT/corrupt that NAMES the offending file (the
    // corrupt preferences.json is the live case) — never a silent disappearance,
    // and NO further write is attempted.
    let res;
    try {
      res = migrateFile(progressPath, preferencesPath);
    } catch (err) {
      const badPath =
        err && err.code === "EBADPROGRESSJSON" ? progressPath : preferencesPath;
      return {
        action: ACTION.RECONNECT,
        reason: REASON.CORRUPT,
        output: renderReconnect(REASON.CORRUPT, badPath),
        progressPath,
      };
    }
    progress = res.progress;
    migrated = res.migrated;
  }

  // Runsheets: the explicit override wins (tests inject fixtures); otherwise load
  // the in-flight series' runsheets from the SHIPPED plugin (NOT workspaceDir — the
  // learner's workspace holds only progress, never content). The series dir is
  // resolved from the plugin root + progress.current.series; see loadRunsheets.
  const base =
    typeof pluginRoot === "string" && pluginRoot !== "" ? pluginRoot : installedPluginRoot();
  const sheets = Array.isArray(runsheets)
    ? runsheets
    : loadRunsheets(inFlightSeriesDir(base, progress.current && progress.current.series));

  // Capped position summary — counted over the TAUGHT set (the loaded runsheets'
  // covered-outcome union) so an as-yet-untouched taught outcome counts `unmet`
  // instead of vanishing into a false everything-done narrative (F8). With no
  // runsheets loaded the taught set is empty and the summary falls back to the
  // map's own entries (unchanged none-yet behaviour).
  const summary = cappedSummary(progress, taughtUidUnion(sheets));
  // pathway() over an EMPTY runsheet set is vacuously COMPLETE — but "no content yet"
  // is NOT "every taught outcome confirmed". Only ask pathway when content exists; with
  // no runsheets, do NOT claim completion against unmet outcomes.
  //
  // BUT the no-content path must still honour a genuine RESUME: a learner who paused
  // mid-challenge has `current.status === "in_progress"` with a `current.runsheet`, and
  // that resume does not depend on the runsheet set being loadable. Dropping it (the
  // earlier `: null`) would strand a real in-flight learner on the none-yet message.
  // So with no runsheets we fall back to the shared inFlightResume() — resume if one is
  // genuinely in flight, else null (the none-yet position — reachable only when the
  // in-flight series ships no runsheets, e.g. a not-yet-released series pointer).
  // `attended` — the per-series LAYER 2 navigation list (two-layer compulsory
  // model; see pathway.mjs). Forwarded from progress.json verbatim, defaulting to
  // [] when absent (an old / not-yet-migrated record — see migrate-progress.mjs).
  // (CONTRACT, parity with the `compulsory` forwarding note above: pathway() reads
  // `attended` to decide whether a compulsory runsheet has been genuinely run;
  // silently dropping it here would make EVERY compulsory challenge permanently
  // un-skippable in production, never the intended "skip once attended".)
  const attended = Array.isArray(progress.attended) ? progress.attended : [];
  const next =
    sheets.length > 0
      ? pathway({
          outcomes: progress.outcomes || {},
          runsheets: sheets,
          current: progress.current,
          attended,
        })
      : inFlightResume(progress.current);

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
    // The ONE disposition line per session (wi-onboarding IU-3 + review
    // CORR-A). Three shapes: a WORKSPACE cwd falls through to the full
    // compose/inject below; a MEMBER cwd (the container root or a series
    // folder of an existing workspace) gets the one resume-side pointer at
    // the home base — never a FIRST_RUN mislabel; anywhere else gets the one
    // FIRST_RUN line. (The old print-nothing behaviour left the agent with
    // zero signal and forced the probe-1 discovery dance — the line IS the
    // speed lever, kept to a single cheap line because it fires in every
    // session.)
    const disposition = classifyDisposition(cwd);
    if (disposition.kind === "member") {
      process.stdout.write(renderResumeElsewhere(disposition.homeBaseRel) + "\n");
      process.exit(0);
    }
    if (disposition.kind === "first-run") {
      process.stdout.write(renderFirstRun() + "\n");
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
