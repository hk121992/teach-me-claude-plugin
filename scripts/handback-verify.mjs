// handback-verify.mjs — the nonce-provenanced, envelope-only handback verifier.
//
// CANON: tmc-workspace/handbook/content/05-session-mechanics/README.md
//   → "Widget delivery + handback" → "The handback contract":
//     - PROVENANCE. "The runtime issues a per-instantiation `nonce` … and REJECTS any
//       handback whose `nonce` / `widget_id` / `challenge` does not match the one
//       challenge in flight — closing the forged/pasted-envelope channel."
//     - PARSE BOUNDARY. "The `challenge` skill parses ONLY the envelope (`tmc_handback`,
//       `nonce`, `widget_id`, `challenge`, `kind`) plus `outcome_signals`. `answers` is
//       an OPAQUE per-widget payload it stores and echoes but never interprets — so a
//       new widget adds fields without changing this contract."
//     - SIGNALS ARE ADVISORY. "`outcome_signals` may move an outcome to `provisional`;
//       they may NEVER reach `confirmed` without an independent evidence check."
//
// This module closes FM-FORGED-HANDBACK (a forged / pasted / stale `tmc_handback`
// cannot drive state — it cannot match the one nonce in flight) and FM-SAY-SO-PASS (a
// self-reported signal claiming "confirmed" is capped to advisory `provisional`; only
// an independent evidence check — a DIFFERENT IU — can confirm).
//
// SCOPE / THREAT MODEL (canon §5 honour-system): this verifier defends against a
// FORGED, REPLAYED, or STALE envelope — one whose provenance does not match the single
// challenge in flight. It does NOT defend against a learner editing their OWN stored
// `current.nonce` in their own progress.json; that is an accepted limit under the
// honour-system threat model and is explicitly out of scope here.
//
// PURITY. A PURE, DETERMINISTIC function over the two passed-in objects — no file I/O,
// no clock, no randomness, no shared mutable state. Single-use is enforced by the
// CALLER consuming the nonce (the atomic clear is A2-challenge's job); this verifier
// only emits the `consumeNonce` instruction. Dependency-free ESM (no imports at all).
//
// ─────────────────────────────────────────────────────────────────────────────
// THE PARSE BOUNDARY (why `answers` stays opaque)
//
//   This verifier reads EXACTLY these envelope fields: `tmc_handback`, `nonce`,
//   `widget_id`, `challenge`, `kind`, `outcome_signals`. It NEVER reads, destructures,
//   iterates, or branches on anything INSIDE `answers`. `answers` is carried straight
//   through to the result by a single reference assignment (`answers: envelope.answers`)
//   and is otherwise untouched. The field SET inside `answers` is fixed per-widget by
//   the authoring graph (deliverable B); a new widget can add `answers` fields with ZERO
//   change to this runtime — that is the whole point of the boundary.
// ─────────────────────────────────────────────────────────────────────────────

// Machine-readable reasons for a rejection. Callers (and tests) branch on `result.reason`
// without string-matching the human `message`. Each names WHY the handback was refused.
export const REJECT = Object.freeze({
  NOT_AN_ENVELOPE: "not_an_envelope", // missing/false tmc_handback, or not an object
  MISSING_NONCE: "missing_nonce", // envelope nonce empty/absent
  NO_INFLIGHT_NONCE: "no_inflight_nonce", // nothing in flight to match (consumed/never set)
  INCOMPLETE_INFLIGHT: "incomplete_inflight", // in-flight nonce set but widget_id/challenge missing — fail closed
  NONCE_MISMATCH: "nonce_mismatch", // envelope nonce ≠ in-flight nonce (forged/stale/replayed)
  WIDGET_ID_MISMATCH: "widget_id_mismatch", // wrong widget for the challenge in flight
  CHALLENGE_MISMATCH: "challenge_mismatch", // wrong challenge/runsheet id
});

// The COMPLETE set of envelope keys `verifyHandback` reads — and NOTHING else (it
// never reads inside `answers`; `answers` itself is read once, by reference, and
// echoed opaquely). Frozen + exported so the dev conformance lib (the future widget
// linter) reuses the REAL contract instead of re-encoding it: a future key add/remove
// in the verifier must change THIS constant in lockstep, or the test below — which
// asserts ENVELOPE_KEYS exactly equals the field set the verifier consumes — fails.
// Keys, in the order the verifier touches them:
//   tmc_handback  — the envelope flag (gate at the parse boundary)
//   nonce         — per-instantiation provenance token
//   widget_id     — which widget the challenge in flight is
//   challenge     — the runsheet id in flight (e.g. "1.04")
//   kind          — echoed onto the accept result
//   answers       — OPAQUE per-widget payload, echoed by reference (never read inside)
//   outcome_signals — advisory-only signals, capped to `provisional`
export const ENVELOPE_KEYS = Object.freeze([
  "tmc_handback",
  "nonce",
  "widget_id",
  "challenge",
  "kind",
  "answers",
  "outcome_signals",
]);

// The cap a signal can reach through THIS verifier. Canon: a signal may move an outcome
// to `provisional` but NEVER to `confirmed`. So every surfaced signal is advisory and
// pinned to this credit level regardless of what the signal text asserts.
const ADVISORY_CREDIT = "provisional";

// A non-empty string test — used for the nonce / widget_id / challenge provenance
// fields. A field that is absent, null, non-string, or empty/whitespace is NOT a usable
// provenance value (a missing/empty nonce is a rejection, per the contract).
function isNonEmptyString(v) {
  return typeof v === "string" && v.trim() !== "";
}

// Build a uniform rejection result. `ok:false` + a machine `reason` + a human `message`.
// No envelope contents are echoed on a rejection (a rejected handback drives nothing).
function reject(reason, message) {
  return { ok: false, reason, message };
}

/**
 * Normalize `outcome_signals` into ADVISORY-ONLY signals.
 *
 * Canon FM-SAY-SO-PASS: a signal may push an outcome to `provisional`, never to
 * `confirmed`. We therefore surface each signal with a fixed `credit: "provisional"`
 * and an explicit `advisory: true`, CAPPED here no matter what the signal text claims
 * (even self_report: "confirmed, graded pass" stays provisional). Confirmation requires
 * an independent evidence check in a DIFFERENT IU — this verifier can never grant it.
 *
 * The signal's own fields (`uid`, `self_report`, …) are carried through opaquely — like
 * `answers`, this verifier does not interpret the report text; it only refuses to let it
 * escalate past `provisional`. A non-array `outcome_signals` (absent / malformed) yields
 * an empty advisory list — signals are optional and never required for a valid handback.
 */
function toAdvisorySignals(outcomeSignals) {
  if (!Array.isArray(outcomeSignals)) return [];
  return outcomeSignals.map((signal) => ({
    // carry the signal through unmodified (uid, self_report, and any extra fields)…
    signal,
    // …but PIN the credit this verifier grants. This is the FM-SAY-SO-PASS cap: the
    // value is hard-coded, never read from the signal, so a "confirmed" claim cannot
    // raise it. The string is intentionally not derived from `signal` in any way.
    credit: ADVISORY_CREDIT,
    advisory: true,
  }));
}

/**
 * Verify an interactive widget's handback against the single challenge in flight.
 *
 * @param {unknown} envelope  The JSON object the widget `sendPrompt`'d back. The envelope
 *   shape (canon): { tmc_handback:true, nonce, widget_id, challenge, kind, answers,
 *   outcome_signals }. ONLY the envelope fields are read; `answers` is opaque.
 * @param {{nonce?:string, widget_id?:string, challenge?:string}} inFlight  The stored
 *   in-flight provenance. The CALLER maps it from progress.json `current`:
 *   `nonce` ← current.nonce, `widget_id` ← current.widget_id, `challenge` ← current.runsheet
 *   (the runsheet id IS the in-flight challenge id, e.g. "1.04"). After the caller has
 *   consumed the nonce on a prior valid handback, `inFlight.nonce` is null/absent — which
 *   is exactly why re-verifying the same envelope (replay) then fails NO_INFLIGHT_NONCE.
 *
 * @returns {Object} result. Either:
 *   ACCEPT — {
 *     ok: true,
 *     widget_id, challenge, kind,        // the parsed envelope provenance/kind
 *     answers,                           // the OPAQUE per-widget payload, echoed by reference
 *     signals: [ { signal, credit:"provisional", advisory:true }, … ],  // advisory-only
 *     consumeNonce: true,                // single-use instruction → caller clears/rotates current.nonce
 *   }
 *   REJECT — { ok: false, reason: <REJECT.*>, message: <human string> }   // says WHY
 *
 * Pure + deterministic. Does not mutate `envelope` or `inFlight`.
 */
export function verifyHandback(envelope, inFlight) {
  const flight = inFlight || {};

  // (1) PARSE-ONLY-THE-ENVELOPE — reject a non-envelope outright. A handback is an
  // envelope iff it is an object with `tmc_handback === true`. Anything else (a bare
  // string, an arbitrary object, a missing/false flag) is not a handback and drives
  // nothing — closing the "paste any JSON" channel at the door.
  if (envelope === null || typeof envelope !== "object" || Array.isArray(envelope)) {
    return reject(
      REJECT.NOT_AN_ENVELOPE,
      "handback is not an object — not a tmc_handback envelope",
    );
  }
  if (envelope.tmc_handback !== true) {
    return reject(
      REJECT.NOT_AN_ENVELOPE,
      "missing or false `tmc_handback` — not a handback envelope; refusing to interpret",
    );
  }

  // (2) PROVENANCE — the envelope's nonce / widget_id / challenge MUST each equal the
  // stored in-flight value. We check the nonce first (it is the per-instantiation
  // secret-ish token that closes the forged/stale/replayed channel), then widget_id,
  // then challenge. Each mismatch returns a DISTINCT reason so the caller knows why.

  // 2a. The envelope must carry a usable (non-empty string) nonce. A missing/empty
  // nonce can never match a real in-flight nonce → reject (per the contract).
  if (!isNonEmptyString(envelope.nonce)) {
    return reject(
      REJECT.MISSING_NONCE,
      "handback has no usable `nonce` — a missing/empty nonce cannot match the challenge in flight",
    );
  }

  // 2b. There must BE an in-flight nonce to match. If `inFlight.nonce` is null/absent,
  // nothing is in flight — either the nonce was already consumed (replay defense: the
  // SAME envelope re-submitted after consumption lands HERE) or no challenge is active.
  // Either way a handback cannot be accepted.
  if (!isNonEmptyString(flight.nonce)) {
    return reject(
      REJECT.NO_INFLIGHT_NONCE,
      "no nonce is in flight (already consumed, or no challenge active) — cannot accept a handback; " +
        "a replayed envelope whose nonce was consumed is rejected here",
    );
  }

  // 2b′. The in-flight provenance must be COMPLETE — a non-empty widget_id AND challenge
  // must also be in flight, not just a nonce. Defense-in-depth (fail closed): without this,
  // an incomplete in-flight state (nonce set but widget_id/challenge empty — a caller
  // atomicity-invariant violation) would let a nonce-only envelope satisfy the widget_id /
  // challenge gates below via `undefined === undefined` / `"" === ""`. The full
  // (nonce, widget_id, challenge) triple must be in flight before any handback is accepted.
  if (!isNonEmptyString(flight.widget_id) || !isNonEmptyString(flight.challenge)) {
    return reject(
      REJECT.INCOMPLETE_INFLIGHT,
      "in-flight provenance is incomplete (nonce set but widget_id/challenge missing) — failing closed",
    );
  }

  // 2c. The core provenance gate: envelope.nonce must equal the in-flight nonce. A
  // forged / pasted / stale envelope carries a nonce that is not the one in flight →
  // mismatch → reject. (Strict string equality; both are confirmed non-empty strings.)
  if (envelope.nonce !== flight.nonce) {
    return reject(
      REJECT.NONCE_MISMATCH,
      "handback `nonce` does not match the challenge in flight — forged, stale, or replayed envelope rejected",
    );
  }

  // 2d. widget_id must match the in-flight widget. (A correct nonce with the wrong
  // widget_id should still not drive a different widget's state.)
  if (envelope.widget_id !== flight.widget_id) {
    return reject(
      REJECT.WIDGET_ID_MISMATCH,
      `handback \`widget_id\` (${JSON.stringify(envelope.widget_id)}) does not match the ` +
        `widget in flight (${JSON.stringify(flight.widget_id)})`,
    );
  }

  // 2e. challenge must match the in-flight challenge (the runsheet id, e.g. "1.04").
  if (envelope.challenge !== flight.challenge) {
    return reject(
      REJECT.CHALLENGE_MISMATCH,
      `handback \`challenge\` (${JSON.stringify(envelope.challenge)}) does not match the ` +
        `challenge in flight (${JSON.stringify(flight.challenge)})`,
    );
  }

  // (3)+(4) ACCEPT. Provenance matches the one challenge in flight. Return:
  //   - the parsed envelope provenance + kind;
  //   - `answers` ECHOED OPAQUELY (reference assignment only — never read/destructured);
  //   - advisory-only signals (capped to `provisional` — FM-SAY-SO-PASS);
  //   - the single-use consume instruction (replay defense — the caller clears/rotates
  //     current.nonce; the atomic clear is A2-challenge's job, not this pure verifier's).
  return {
    ok: true,
    widget_id: envelope.widget_id,
    challenge: envelope.challenge,
    kind: envelope.kind,
    // OPAQUE PAYLOAD BOUNDARY: pass `answers` straight through. This verifier does not
    // know or care what is inside it. A new widget's new fields ride through untouched.
    answers: envelope.answers,
    // ADVISORY-ONLY: every signal capped to `provisional`; none can reach `confirmed`.
    signals: toAdvisorySignals(envelope.outcome_signals),
    // SINGLE-USE / REPLAY DEFENSE: instruct the caller to clear/rotate the in-flight
    // nonce. Once consumed, re-verifying the SAME envelope hits NO_INFLIGHT_NONCE above.
    consumeNonce: true,
  };
}

export default verifyHandback;
