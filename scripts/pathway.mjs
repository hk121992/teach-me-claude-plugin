// pathway.mjs — the deterministic next-challenge preamble.
//
// CANON: tmc-workspace/handbook/content/05-session-mechanics/README.md
//   - "The runtime engine — pathway, handoff, session open/close" → Pathway preamble
//     (deterministic): the first challenge, in series order, with an outcome that is
//     neither `confirmed` nor `provisional`; a provisionally-credited outcome lets the
//     pathway SKIP its challenge; when none remain → a COMPLETE sentinel (distinct from
//     a parked / in-flight state); position is computed, never agent-chosen.
//   - "Scoring, tracking & sign-off": outcome states unmet | provisional | confirmed;
//     provisional = forward credit; "Completion requires every taught outcome
//     `confirmed`. Provisionals … resolved to `confirmed` at the natural intra-series
//     retrieval point — the capstone retrieves the whole series."
//   - "The runsheet": `covers_outcomes` is the source of (uid, role, floor_confirmable);
//     "`floor_confirmable: false` marks an outcome only a real-task path can evidence
//     (the capstone)."
//
// This is a PURE, DETERMINISTIC function over data the caller supplies — no file I/O,
// no clock, no randomness. The test and (later) the SessionStart hook provide fixtures;
// conformant runsheets do not exist yet (series-01 is prose-first reference input).
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

const CONFIRMED = "confirmed";
const PROVISIONAL = "provisional";

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

// A covered outcome is "done" for skip purposes when it is confirmed OR provisional
// (provisional = forward credit; the learner has effectively shown it).
function coveredOutcomeIsDoneForSkip(status) {
  return status === CONFIRMED || status === PROVISIONAL;
}

/**
 * Compute the next runsheet to run from passed-in evidence — or COMPLETE.
 *
 * @param {Object}   args
 * @param {Object}   args.outcomes   v3 outcomes map: { "<uid>": { status, ... }, ... }.
 * @param {Array}    args.runsheets  ORDERED (series order) runsheet metadata:
 *                                   [{ id, covers_outcomes: [{ uid, role, floor_confirmable }] }].
 * @param {Object}  [args.current]   in-flight pointer { runsheet, status } from progress.json.
 * @returns {{ next: string } | { complete: true }}  COMPLETE === the exported sentinel.
 */
export function pathway({ outcomes = {}, runsheets = [], current } = {}) {
  // (4) In-flight resume — an in-flight pointer resumes; it is NOT re-derived.
  // If `current.runsheet` is set with status "in_progress", return THAT runsheet.
  if (current && current.status === "in_progress" && current.runsheet) {
    return { next: current.runsheet };
  }

  // (1)+(2) Single ordered pass. For each runsheet in series order, decide whether
  // it is the one to run:
  //   - ordinary runsheet: run it if it has an `unmet` covered outcome; skip if all
  //     its covered outcomes are confirmed-or-provisional.
  //   - capstone (covers a `floor_confirmable: false` outcome): run it if ANY covered
  //     outcome is still unconfirmed (unmet OR provisional) — never skipped while a
  //     provisional remains. This is the resolver rule (C4).
  for (const runsheet of runsheets) {
    const covers = runsheet.covers_outcomes || [];
    const capstone = isCapstone(runsheet);

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
      // Ordinary runsheet: run on a genuine unmet; skip the all-done (the
      // skip-the-basics adaptive path).
      if (hasUnmet) return { next: runsheet.id };
      // else: all covered outcomes confirmed-or-provisional → skip → fall through.
    }
  }

  // (3) COMPLETE — only reached when every covered outcome across all runsheets is
  // confirmed (no ordinary runsheet had an unmet outcome AND no capstone had an
  // unconfirmed outcome). Distinct from a parked / in-flight state.
  return COMPLETE;
}

export default pathway;
