// migrate-progress.mjs — v2→v3 learner-state migration for Teach Me Claude.
//
// The session/challenge runtime stores learner state in `.teach-me/progress.json`.
// v3 (the outcome-driven shape) is the single source of position: an `outcomes`
// map replaces the integer `current.challenge`, and language + AI-maturity move
// into a separate `preferences.json`. This module turns a v2 file into v3 on
// first open (the SessionStart guard), losslessly carrying every preserved field.
//
// SPEC (the on-demand reference set is this harness's spec home — the handbook page
// this header once cited is deprecated; same superseding-spec convention as
// curriculum/authoring/lib/conformance.mjs):
//   - .claude/on-demand/assessment-model/README.md → "The progress record (the state
//     schema)": the versioned record this migration produces. The `outcomes` map is
//     "the single source of pathway position (there is no integer position pointer)";
//     preferences are "a separate record (`language`, `ai_maturity`), split out of the
//     old comfort field"; and its Migration bullet is this module's contract: "opening
//     an old-shape record runs a forward migration (backfill the outcomes map, split
//     preferences out, drop the retired integer position pointer, carry the kit map,
//     seed an empty credential) and never fabricates outcome history".
//   - .claude/on-demand/session-model/README.md → the SessionStart hook's recovery
//     guard is the caller: "old-shape state → run the migration".
// Dependency-free ESM; node: built-ins only.

import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Constants — the v3 shape, mirrored from the assessment-model reference (the
// progress record). Kept as factories so
// every produced object is a fresh, unshared instance (no aliasing of defaults).
// ---------------------------------------------------------------------------

const CURRENT_VERSION = 3;
const PLUGIN = "teach-me-claude";

const VALID_AI_MATURITY = ["beginner", "intermediate", "advanced"];
const DEFAULT_AI_MATURITY = "beginner";
const DEFAULT_LANGUAGE = "en";

function freshLearner() {
  return { name: "", profession: "", goals: [], started: "", workflow_profile: [] };
}

function freshCurrent() {
  // runsheet pointer + status + the in-flight handback-provenance slots (the
  // per-instantiation nonce and the in-flight widget_id). NO integer challenge.
  // nonce + widget_id + runsheet(=challenge) are the triple handback-verify
  // validates a handback envelope against (see handback-verify.mjs).
  return { series: 1, runsheet: null, status: null, nonce: null, widget_id: null };
}

// The kit is a GENERIC map keyed by slot-id, each entry `{label, ref}` — the
// label authored in the runsheet's `kit_contribution`, the ref the produced
// artefact's path. There is NO fixed Foundations enumeration: a paid series adds
// kit artefacts with no schema change. A fresh kit is the empty map (the template
// seeds `kit: {}`), and migration carries forward the input's OWN slots only.
//
// Normalise one kit entry to the `{label, ref}` shape, carrying nothing fabricated.
//
//   - `{label, ref}` (the current shape) → kept, each field stringified/defaulted.
//   - a NON-EMPTY string (the OLD empty-string form `kit[slot]: "kit/x/SKILL.md"`,
//     which stored only the artefact path) → upgraded to `{label: "", ref: <path>}`:
//     the old form had no label, so we invent none — label stays empty.
//   - an EMPTY string `""` (an old seeded-but-unproduced fixed slot) → DROPPED
//     (returns null): an unproduced slot has no place in the generic map, where a
//     slot exists only once its artefact is produced. (Caller skips a null.)
//   - anything else (null/array/number) → dropped.
//
// Pure; never reads a hardcoded slot list, never fabricates a label or ref.
function normaliseKitEntry(value) {
  if (isPlainObject(value)) {
    return { label: carryString(value.label, ""), ref: carryString(value.ref, "") };
  }
  if (typeof value === "string") {
    return value === "" ? null : { label: "", ref: value };
  }
  return null;
}

function freshPreferences() {
  return { language: DEFAULT_LANGUAGE, ai_maturity: DEFAULT_AI_MATURITY };
}

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

// Carry a field forward only when the source actually has a usable value of the
// expected kind; otherwise fall back to the v3 default. Never invents data.
function carryString(src, fallback = "") {
  return typeof src === "string" ? src : fallback;
}
function carryArray(src, fallback = []) {
  return Array.isArray(src) ? src : fallback;
}

// Normalise an ai_maturity value to the allowed set, defaulting when unknown.
function normaliseAiMaturity(value) {
  return VALID_AI_MATURITY.includes(value) ? value : DEFAULT_AI_MATURITY;
}

// Normalise a version literal to a number when it is a plain base-10 integer string
// ("3" → 3, "03" → 3), so a version field corrupted to a string does not read as an
// old shape. A genuinely malformed literal (non-integer string, null, absent) is
// returned unchanged and simply fails the `=== CURRENT_VERSION` gate (the structural
// check in isAlreadyV3 then decides). Pure.
function normaliseVersion(v) {
  if (typeof v === "string" && /^\s*\d+\s*$/.test(v)) return Number(v.trim());
  return v;
}

// Is this parsed progress object ALREADY the v3 (outcome-driven) shape? Robust to a
// wrong / missing `version` literal — a real v3 file whose version got corrupted to
// "3" or dropped must NOT be re-read as v2, because the v2 branch resets
// outcomes/challenges/credential to empty (data loss) while the SessionStart note
// reassures the learner "your progress is safe". A file is v3 iff:
//   - its normalised version is exactly CURRENT_VERSION, OR
//   - it carries an unmistakable v3-only structural signal (an outcomes map, a
//     credential record, or a v3 `current` pointer with a runsheet/status) AND is
//     NOT unmistakably v2 — a v2 file stores an integer `current.challenge`, the one
//     field v3 retired, so its presence is a hard v2 tell that overrides the signals.
// Pure; never mutates its input.
export function isAlreadyV3(input) {
  if (!isPlainObject(input)) return false;
  if (normaliseVersion(input.version) === CURRENT_VERSION) return true;
  const current = isPlainObject(input.current) ? input.current : {};
  if (Number.isInteger(current.challenge)) return false; // unmistakably v2 → not v3
  return (
    isPlainObject(input.outcomes) ||
    isPlainObject(input.credential) ||
    typeof current.runsheet === "string" ||
    typeof current.status === "string"
  );
}

// ---------------------------------------------------------------------------
// Pure migration — the public core. Takes a parsed progress object (v2 or v3 or
// half-migrated) and returns a fresh { progress, preferences } pair in the v3
// shape. Pure: does no I/O, never mutates its input.
//
//   - v2 input  → carries forward every preserved field; comfort_level →
//                 preferences.ai_maturity (default if absent); drops
//                 current.challenge; keeps current.series; outcomes := {};
//                 challenges := {} (v2 integer-keyed pass-history has no
//                 reliable v3-outcome mapping); version := 3.
//   - v3 input  → re-normalised, not re-migrated: a populated outcomes map is
//                 preserved as-is. Idempotent.
//   - half-migrated → missing keys backfilled to defaults; present data kept.
//
// `priorPreferences` (optional) lets a caller pass an existing preferences
// object so an already-split language/ai_maturity is preserved across a
// re-normalise. When omitted, language defaults and ai_maturity comes from the
// v2 comfort_level (or default).
// ---------------------------------------------------------------------------

export function migrate(input, { priorPreferences } = {}) {
  if (!isPlainObject(input)) {
    throw new TypeError(
      `migrate: expected a parsed progress object, got ${input === null ? "null" : typeof input}`,
    );
  }

  const learnerIn = isPlainObject(input.learner) ? input.learner : {};
  const currentIn = isPlainObject(input.current) ? input.current : {};
  const kitIn = isPlainObject(input.kit) ? input.kit : {};

  // Robust v3 detection (F4): a "3"-string or missing version literal on an
  // otherwise-v3 file must NOT trigger the v2 reset of outcomes/challenges/credential.
  const alreadyV3 = isAlreadyV3(input);

  // --- preferences ---------------------------------------------------------
  // Precedence: an explicitly-supplied prior preferences object (already split
  // out) wins; otherwise derive from the v2 learner.comfort_level; otherwise
  // defaults. ai_maturity is always normalised to the allowed set.
  const prefs = freshPreferences();
  if (isPlainObject(priorPreferences)) {
    prefs.language = carryString(priorPreferences.language, prefs.language);
    prefs.ai_maturity = normaliseAiMaturity(priorPreferences.ai_maturity);
  } else if (typeof learnerIn.comfort_level === "string" && learnerIn.comfort_level !== "") {
    prefs.ai_maturity = normaliseAiMaturity(learnerIn.comfort_level);
  }

  // --- learner (carry every preserved field) -------------------------------
  const base = freshLearner();
  const learner = {
    name: carryString(learnerIn.name, base.name),
    profession: carryString(learnerIn.profession, base.profession),
    goals: carryArray(learnerIn.goals, base.goals),
    started: carryString(learnerIn.started, base.started),
    workflow_profile: carryArray(learnerIn.workflow_profile, base.workflow_profile),
  };
  // comfort_level is intentionally NOT carried onto learner — it lives in
  // preferences.ai_maturity in v3.

  // --- current (keep series; drop integer challenge; keep v3 slots) --------
  const currentBase = freshCurrent();
  const current = {
    series: Number.isInteger(currentIn.series) ? currentIn.series : currentBase.series,
    runsheet: currentIn.runsheet !== undefined ? currentIn.runsheet : currentBase.runsheet,
    status: currentIn.status !== undefined ? currentIn.status : currentBase.status,
    nonce: currentIn.nonce !== undefined ? currentIn.nonce : currentBase.nonce,
    widget_id: currentIn.widget_id !== undefined ? currentIn.widget_id : currentBase.widget_id,
  };
  // current.challenge (the retired v2 integer) is deliberately dropped and is
  // NEVER read to backfill outcomes — outcomes start empty/unmet, never
  // fabricated-confirmed.

  // --- outcomes ------------------------------------------------------------
  // Preserve a v3 map as-is (idempotency); never fabricate from v2. A v2 file
  // has no outcomes, so this backfills the empty map.
  const outcomes = alreadyV3 && isPlainObject(input.outcomes) ? input.outcomes : {};

  // --- challenges ----------------------------------------------------------
  // Preserve a v3 map as-is; reset on v2 migration (integer-keyed v2 pass
  // history has no reliable mapping to v3 outcomes).
  const challenges = alreadyV3 && isPlainObject(input.challenges) ? input.challenges : {};

  // --- kit (carry every ACTUAL slot forward; normalise to {label, ref}) -----
  // The kit is a generic map: carry the input's OWN slots (never a fixed base),
  // normalising each entry to the {label, ref} shape. This also UPGRADES an
  // already-v3 kit whose entries are the old empty-string form (`""` dropped,
  // `"some/path"` → {label:"", ref:"some/path"}) so an already-migrated learner
  // does not break on the new render. Never fabricates — an empty/unproduced slot
  // is simply absent.
  const kit = {};
  for (const slot of Object.keys(kitIn)) {
    const entry = normaliseKitEntry(kitIn[slot]);
    if (entry !== null) kit[slot] = entry;
  }

  // --- carried collections -------------------------------------------------
  const capstone_briefs = carryArray(input.capstone_briefs, []);
  const reflections = carryArray(input.reflections, []);

  // --- attended (two-layer compulsory model, 2026-07-15) -------------------
  // The per-series list of challenge ids the learner has run to close —
  // NAVIGATION state only (it drives compulsory routing in pathway.mjs; it is
  // never evidence, never confirms an outcome, never gates completion). A v2
  // file predates the field entirely, so `input.attended` is absent and this
  // carries forward the same [] every other new-in-v3 collection defaults to
  // (the same pattern as capstone_briefs/reflections above) — an old record
  // migrates to "nothing attended yet", which is exactly correct: every
  // compulsory challenge still navigates until genuinely (re-)run. An
  // already-v3 record's populated list is carried forward as-is (idempotent).
  const attended = carryArray(input.attended, []);

  // --- credential (the series-completion record; null until COMPLETE) -------
  // The credential flow stamps `{ id, completed }` onto this on the COMPLETE
  // state — the opaque claim-link id + the completion date the certificate
  // renders. A v2 file has none; an already-v3 file preserves its record
  // (idempotent). NEVER fabricated — it stays null until a real COMPLETE mints it.
  const credential =
    alreadyV3 && isPlainObject(input.credential) ? input.credential : null;

  const progress = {
    version: CURRENT_VERSION,
    plugin: typeof input.plugin === "string" && input.plugin !== "" ? input.plugin : PLUGIN,
    learner,
    current,
    attended,
    outcomes,
    challenges,
    kit,
    capstone_briefs,
    reflections,
    credential,
  };

  // structuredClone so the returned object shares NO references with `input`
  // (a v3 re-normalise carries outcomes/challenges and the arrays forward by
  // value, not alias) — honouring the "never mutates its input" contract in
  // both directions: a caller mutating the result can never reach back into the
  // input it was given.
  return { progress: structuredClone(progress), preferences: prefs };
}

// ---------------------------------------------------------------------------
// Atomic, in-place file migration.
//
// Reads progressPath (and preferencesPath if present), runs the pure migrate,
// and writes both files atomically (temp file + fs.renameSync — never
// truncate-in-place). If anything throws AFTER the original is read (the
// `hooks.afterRead` seam is provided for tests to force exactly that), the
// original files are left byte-for-byte intact: nothing is written until the
// transform has fully succeeded, and each write goes to its own temp file
// renamed into place only on success.
//
// Returns { progress, preferences, migrated } where `migrated` is false when
// the input was already current-version (a no-op re-normalise still rewrites to
// canonicalise shape, but reports migrated:false so a caller can log honestly).
//
// `hooks.afterRead(ctx)` — optional injected seam, called once with
// { progressRaw, preferencesRaw } immediately after the originals are read and
// before any transform/write. A test throws from here to exercise atomicity.
// ---------------------------------------------------------------------------

export function migrateFile(progressPath, preferencesPath, { hooks } = {}) {
  if (typeof progressPath !== "string" || progressPath === "") {
    throw new TypeError("migrateFile: progressPath must be a non-empty string");
  }
  // Default the preferences path to a sibling of progress.json.
  const prefsPath =
    typeof preferencesPath === "string" && preferencesPath !== ""
      ? preferencesPath
      : path.join(path.dirname(progressPath), "preferences.json");

  // --- read originals (capture raw bytes for the atomicity contract) -------
  const progressRaw = fs.readFileSync(progressPath, "utf8");
  let preferencesRaw = null;
  if (fs.existsSync(prefsPath)) {
    preferencesRaw = fs.readFileSync(prefsPath, "utf8");
  }

  // Test seam: force a throw AFTER read, BEFORE any write. Originals must
  // survive untouched.
  if (hooks && typeof hooks.afterRead === "function") {
    hooks.afterRead({ progressRaw, preferencesRaw });
  }

  // --- parse (a parse failure throws before any write; originals intact) ---
  let parsedProgress;
  try {
    parsedProgress = JSON.parse(progressRaw);
  } catch (err) {
    const e = new Error(`migrate-progress: ${progressPath} is not valid JSON: ${err.message}`);
    e.cause = err;
    e.code = "EBADPROGRESSJSON";
    throw e;
  }

  let priorPreferences;
  if (preferencesRaw !== null) {
    try {
      priorPreferences = JSON.parse(preferencesRaw);
    } catch (err) {
      const e = new Error(
        `migrate-progress: ${prefsPath} is not valid JSON: ${err.message}`,
      );
      e.cause = err;
      e.code = "EBADPREFSJSON";
      throw e;
    }
  }

  // `migrated` reports whether the SHAPE changed. Use the same robust v3 detection
  // (F4): a v3 file with a "3"-string / missing version literal is re-normalised,
  // not migrated — so the SessionStart greeting does not falsely tell the learner
  // their outcomes will "re-confirm as they go" when they were preserved intact.
  const wasCurrent = isAlreadyV3(parsedProgress);

  // --- transform (pure; throws here also leave originals intact) -----------
  const { progress, preferences } = migrate(parsedProgress, { priorPreferences });

  // --- write atomically ----------------------------------------------------
  writeJsonAtomic(progressPath, progress);
  writeJsonAtomic(prefsPath, preferences);

  return { progress, preferences, migrated: !wasCurrent };
}

// Write `obj` as pretty JSON to `targetPath` atomically: serialise → write to a
// uniquely-named temp file in the SAME directory (so rename is a same-filesystem
// atomic op) → fsync → fs.renameSync over the target. On any failure the temp
// file is cleaned up and the original target is left untouched.
export function writeJsonAtomic(targetPath, obj) {
  const dir = path.dirname(targetPath);
  const json = JSON.stringify(obj, null, 2) + "\n";
  const tmpPath = path.join(
    dir,
    `.${path.basename(targetPath)}.${process.pid}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`,
  );
  let fd;
  try {
    fd = fs.openSync(tmpPath, "wx"); // wx: fail if the temp name somehow exists
    fs.writeFileSync(fd, json, "utf8");
    fs.fsyncSync(fd);
    fs.closeSync(fd);
    fd = undefined;
    fs.renameSync(tmpPath, targetPath); // atomic same-fs replace
  } catch (err) {
    if (fd !== undefined) {
      try {
        fs.closeSync(fd);
      } catch {
        /* ignore */
      }
    }
    try {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    } catch {
      /* best-effort cleanup */
    }
    throw err;
  }
}

// ---------------------------------------------------------------------------
// CLI: `node migrate-progress.mjs <progress.json> [preferences.json]`
// Migrates in place and prints a one-line summary. Used by the SessionStart
// guard. Kept thin — all logic lives in the exported functions above.
// ---------------------------------------------------------------------------

const isMain = (() => {
  try {
    return import.meta.url === `file://${process.argv[1]}`;
  } catch {
    return false;
  }
})();

if (isMain) {
  const [, , progressArg, prefsArg] = process.argv;
  if (!progressArg) {
    console.error("usage: node migrate-progress.mjs <progress.json> [preferences.json]");
    process.exit(2);
  }
  try {
    const { migrated } = migrateFile(progressArg, prefsArg);
    console.log(
      migrated
        ? `migrate-progress: ${progressArg} migrated to v${CURRENT_VERSION}`
        : `migrate-progress: ${progressArg} already v${CURRENT_VERSION} (re-normalised)`,
    );
  } catch (err) {
    console.error(`migrate-progress: failed — ${err.message}`);
    process.exit(1);
  }
}

// Re-export constants useful to tests / callers. `PLUGIN` (the sentinel migration
// writes) is single-sourced here so the SessionStart workspace guard imports the
// SAME value it must match — it can never drift from what migration produces.
export { CURRENT_VERSION, PLUGIN, VALID_AI_MATURITY, DEFAULT_AI_MATURITY, DEFAULT_LANGUAGE };
