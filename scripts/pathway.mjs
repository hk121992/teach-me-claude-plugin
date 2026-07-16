// pathway.mjs — the deterministic next-challenge preamble.
//
// SPEC (the on-demand reference set is this harness's spec home — the handbook page
// this header once cited is deprecated; same superseding-spec convention as
// curriculum/authoring/lib/conformance.mjs):
//   - .claude/on-demand/session-model/README.md → "Pathway preamble (deterministic)":
//     the first challenge, in series order, with an outcome that is neither
//     `confirmed` nor `provisional`; a provisionally-credited outcome lets the
//     pathway SKIP its challenge; when none remain → a COMPLETE sentinel (distinct
//     from a parked / in-flight state); position is computed, never agent-chosen.
//     Plus the two-layer compulsory model: the outcome-skip predicate is unmet-only;
//     compulsory's teeth are the separate `attended` navigation layer.
//   - .claude/on-demand/assessment-model/README.md → outcome states unmet |
//     provisional | confirmed (provisional = credited, not observed); `attended` is
//     navigation state only — never evidence, never gates completion; "Completion
//     requires every outcome of the series' taught set `confirmed`" — provisionals
//     resolve no later than the capstone (the intra-series retrieval point).
//   - .claude/on-demand/runsheet-contract/README.md → `covers_outcomes` is the source
//     of (uid, role, floor_confirmable); "`floor_confirmable: false` marks an outcome
//     only a real-task path can evidence" (the capstone).
//
// This is a PURE, DETERMINISTIC function over data the caller supplies — no file I/O,
// no clock, no randomness. The tests and the SessionStart hook supply the runsheet
// set (the shipped series' conformant runsheets, read by load-runsheets.mjs).
//
// ─────────────────────────────────────────────────────────────────────────────
// RESOLVER-SELECTION RULE (pinned here; the §3.1↔§4.3 canon seam the plan flagged
// for curator ratification):
//
//   A runsheet is a CAPSTONE/RESOLVER iff it covers at least one outcome marked
//   `floor_confirmable: false` (canon: such an outcome "is only evidenced by a
//   real-task path — the capstone"; "the capstone retrieves the whole series").
//
//   A capstone is NEVER skipped while ANY outcome it covers is still unconfirmed —
//   i.e. while any covered outcome is `unmet` OR `provisional`. The ordinary
//   skip-the-basics rule (skip a runsheet whose covered outcomes are all
//   confirmed-or-provisional) does NOT apply to a capstone: a capstone with a
//   covered outcome still `provisional` is the retrieval point and is returned, not
//   skipped and not treated as COMPLETE. This is exactly the C4 bug this IU fixes:
//   when only provisionals remain, return the resolving capstone — never COMPLETE.
//
//   A capstone IS done (and may be skipped like any other runsheet) only once every
//   outcome it covers is `confirmed`.
// ─────────────────────────────────────────────────────────────────────────────

// The v3 outcome-status vocabulary. Exported as the single source so the other
// modules that read the outcomes map (e.g. the SessionStart summary) share the
// exact same status strings rather than re-spelling the literals.
export const CONFIRMED = "confirmed";
export const PROVISIONAL = "provisional";

// The COMPLETE sentinel — a distinct object so callers can branch on it
// unambiguously (it is NOT a parked/in-flight state). Exported so consumers and
// tests compare against the same shape.
export const COMPLETE = Object.freeze({ complete: true });

// Status of one covered-outcome uid, read from the outcomes map. An outcome absent
// from the map (never touched) is treated as `unmet`.
function statusOf(outcomes, uid) {
  const entry = outcomes && outcomes[uid];
  return (entry && entry.status) || "unmet";
}

// Does a runsheet cover at least one outcome marked `floor_confirmable: false`?
// Such a runsheet is the capstone/resolver (see the pinned rule above).
function isCapstone(runsheet) {
  const covers = (runsheet && runsheet.covers_outcomes) || [];
  return covers.some((c) => c.floor_confirmable === false);
}

// LAYER 1 — the outcome-skip predicate (two-layer compulsory model, 2026-07-15).
// A covered outcome is "done" for skip purposes when it is CONFIRMED OR
// PROVISIONAL — uniform for EVERY challenge, compulsory included. Deliberately
// UNMET-ONLY and NOT compulsory-aware: a `role: taught` outcome closes
// `provisional` at its OWN stage's close (teaching yields provisional, never
// blocking the pathway), so an outcome-based hold on `provisional` would re-run
// a compulsory stage forever. Compulsory's teeth live in the separate
// navigation layer below (LAYER 2 — attendance), not in this predicate.
function coveredOutcomeIsDoneForSkip(status) {
  return status === CONFIRMED || status === PROVISIONAL;
}

/**
 * The in-flight RESUME rule, extracted so a caller that computes position WITHOUT a
 * runsheet set (the SessionStart composer before any content is authored) can still
 * honour a genuine resume instead of dropping the learner who paused mid-sitting.
 * An in-flight pointer (status `in_progress` with a runsheet) resumes that runsheet
 * and is NOT re-derived; anything else returns null. Pure; no I/O.
 *
 * @param {{runsheet?:string, status?:string}} [current] the progress.json `current`.
 * @returns {{next:string}|null} the resume result, or null when nothing is in flight.
 */
export function inFlightResume(current) {
  if (current && current.status === "in_progress" && current.runsheet) {
    return { next: current.runsheet };
  }
  return null;
}

/**
 * Compute the next runsheet to run from passed-in evidence — or COMPLETE.
 *
 * @param {Object}   args
 * @param {Object}   args.outcomes   v3 outcomes map: { "<uid>": { status, ... }, ... }.
 * @param {Array}    args.runsheets  ORDERED (series order) runsheet metadata:
 *                                   [{ id, compulsory?, covers_outcomes: [{ uid, role, floor_confirmable }] }].
 *                                   `compulsory: true` ⇒ never skipped on forward-credit (runs in
 *                                   place) — enforced by LAYER 2 (attendance); see `args.attended`.
 * @param {Object}  [args.current]   in-flight pointer { runsheet, status } from progress.json.
 * @param {Array<string>} [args.attended]  the per-series `progress.attended` list — ids of
 *                                   challenges the learner has run to close (LAYER 2, the
 *                                   navigation layer). Defaults to `[]`, so an old / absent
 *                                   `attended` field behaves as "nothing attended yet" — every
 *                                   compulsory challenge still navigates until genuinely run.
 * @returns {{ next: string } | { complete: true }}  COMPLETE === the exported sentinel.
 */
export function pathway({ outcomes = {}, runsheets = [], current, attended = [] } = {}) {
  // (4) In-flight resume — an in-flight pointer resumes; it is NOT re-derived.
  // (Shared with the SessionStart composer via the exported helper, so a genuine
  // resume is honoured even on the no-content path.)
  const resume = inFlightResume(current);
  if (resume) return resume;

  // (1)+(2) Single ordered pass. For each runsheet in series order, decide whether
  // it is the one to run:
  //   - ordinary runsheet: LAYER 1 only — run it if it has an `unmet` covered
  //     outcome; skip if all its covered outcomes are confirmed-or-provisional.
  //   - capstone (covers a `floor_confirmable: false` outcome): run it if ANY covered
  //     outcome is still unconfirmed (unmet OR provisional) — never skipped while a
  //     provisional remains. This is the resolver rule (C4). `compulsory` is a
  //     deliberate no-op here (see below).
  //   - compulsory (non-capstone): LAYER 1 applies exactly as ordinary, PLUS an
  //     independent second hold (LAYER 2 — attendance): it is ALSO returned while it
  //     has not yet been attended, regardless of its covered outcomes' status. A
  //     forward-credited / self-reported outcome can never navigate past a compulsory
  //     challenge on its own; only actually running it (recorded in `attended`)
  //     releases the hold, and once released it follows the ordinary LAYER 1
  //     unmet-only skip — no re-run loop (this is the fix for the `role: taught`
  //     trap: teaching closes `provisional` at the compulsory challenge's own close,
  //     which LAYER 1 alone would treat as skip-eligible forever after).
  for (const runsheet of runsheets) {
    const covers = runsheet.covers_outcomes || [];
    const capstone = isCapstone(runsheet);
    // `compulsory: true` ⇒ never skipped on forward-credit. Threaded ONLY into the
    // LAYER 2 attendance check below — NOT into hasUnconfirmed / the capstone branch,
    // and NOT into coveredOutcomeIsDoneForSkip (LAYER 1 is uniform) — so it is a
    // deliberate no-op on a capstone (already un-skippable while unconfirmed).
    const compulsory = runsheet.compulsory === true;

    let hasUnmet = false;
    let hasUnconfirmed = false; // unmet OR provisional
    for (const c of covers) {
      const status = statusOf(outcomes, c.uid);
      if (status !== CONFIRMED) hasUnconfirmed = true;
      if (!coveredOutcomeIsDoneForSkip(status)) hasUnmet = true;
    }

    if (capstone) {
      // Capstone: the retrieval point. Run while anything it covers is unconfirmed.
      if (hasUnconfirmed) return { next: runsheet.id };
      // else: every covered outcome confirmed → capstone done → fall through (skip).
    } else {
      // Ordinary / compulsory runsheet. LAYER 1: run on a genuine unmet (the
      // skip-the-basics adaptive path skips once all covered outcomes are
      // confirmed-or-provisional — uniform, compulsory included). LAYER 2: a
      // COMPULSORY runsheet gets a SECOND, independent hold — also returned while
      // not yet attended. `attended` is consulted ONLY when `compulsory` is true
      // (the `compulsory &&` guard short-circuits it away for an ordinary runsheet).
      const notYetAttended = compulsory && !(attended || []).includes(runsheet.id);
      if (hasUnmet || notYetAttended) return { next: runsheet.id };
      // else: LAYER 1 done, and (non-compulsory OR already attended) → skip.
    }
  }

  // (3) COMPLETE — only reached when every covered outcome across all runsheets is
  // confirmed (no ordinary runsheet had an unmet outcome AND no capstone had an
  // unconfirmed outcome). Distinct from a parked / in-flight state.
  return COMPLETE;
}

export default pathway;
