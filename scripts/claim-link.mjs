// claim-link.mjs — the LOCAL side of the credential & share loop: mint a
// deterministic, PII-free, secret-free claim URL from the learner's REAL
// confirmed outcomes, and verify a minted payload's integrity.
//
// CANON: tmc-workspace/handbook/content/05-session-mechanics/README.md
//   → "The credential & share loop":
//     - NOW (zero website infra): on the `COMPLETE` state the runtime renders the
//       certificate viewer inline AND generates a claim-link carrying
//       `{ name, confirmed outcomes, integrity hash }` as a URL. THIS module is that
//       claim-link generator (the local side); the certificate is certificate.html.
//     - The client-side hash "carries and integrity-checks the claim but is NOT
//       unforgeable (a shipped plugin cannot keep a secret from its own user); a
//       local hash-chain is not the tool for tamper-proofing." So the hash here is a
//       PLAIN SHA-256 checksum of the canonical payload — NO embedded/baked-in
//       secret, NO HMAC key (an embedded-secret HMAC is a trap [threat-model S4]).
//     - Trust posture (server-side verifiability) is OWNED BY wi-web-wire-architecture
//       and DEFERRED — this module makes no unforgeability claim.
//   → "Data model": the `outcomes` map ({ uid: { status, ... } }); `confirmed` is the
//      sign-off state; "the claim payload" is honour-system local sign-off, "not the
//      credential's source of truth" (the website is).
//
// ⚠ NO PII IN THE URL [threat-model S3]. The learner NAME is deliberately NOT in the
//   URL (query or fragment). The name renders in the certificate BODY from real local
//   state; at the fast-follow stage the WEBSITE supplies the name at mint time (design
//   routed PII + the authoritative credential-id to the website). What travels in the
//   URL is: an OPAQUE local id (not derived from PII), the confirmed outcomes, and the
//   integrity hash — nothing that identifies a person.
//
// This module is PURE + DETERMINISTIC: given the same inputs it returns the same URL
// and the same hash. It does NO file I/O, reads NO clock, and uses NO randomness — the
// opaque id is SUPPLIED by the caller (the runtime mints/persists it elsewhere), never
// generated here, so the output is reproducible and testable. Dependency-free ESM;
// the only import is `node:crypto` (built-in) for SHA-256.

import { createHash } from "node:crypto";

// The default base the claim-link points at. The real website is owned by
// wi-web-wire-architecture; this is the documented placeholder the URL is built on.
// Overridable per-call so the future website work can point it at the live origin
// without touching this module's logic.
export const DEFAULT_CLAIM_BASE = "https://teachmeclaude.com/claim";

// The payload schema version — lets the future website-side verifier branch on shape
// without guessing. Bumped only if the canonical payload shape changes.
export const PAYLOAD_VERSION = 1;

// A dedicated error class so callers/tests branch on the failure mode rather than
// string-matching. Every throw below is a real-state-only / contract guard.
export class ClaimLinkError extends Error {
  constructor(message) {
    super(message);
    this.name = "ClaimLinkError";
  }
}

// ---------------------------------------------------------------------------
// 1. CONFIRMED OUTCOMES — extract, from the v3 outcomes map, ONLY the outcomes
//    whose status is `confirmed`. REAL STATE ONLY: a missing/empty map yields an
//    empty list (an honest "nothing confirmed"); nothing is fabricated. We keep the
//    uid + the substrate (claude vs agnostic-by-default), the two facts the
//    competency claim is about — never the evidence_ref (which can be a real file
//    path = a weak PII/info leak, and is not needed to assert the competency).
// ---------------------------------------------------------------------------

const CONFIRMED = "confirmed";

/**
 * Reduce a v3 `outcomes` map to the sorted list of confirmed competencies.
 * Each item is `{ uid, substrate }` where `substrate` is `"claude"` iff the outcome
 * entry explicitly carries `substrate: "claude"`, else `"agnostic"` (the canon
 * default — "agnostic by default, left unstated"; absence is NOT fabricated, it IS
 * the documented agnostic default). Sorted by uid for a STABLE, deterministic order.
 *
 * @param {Object} outcomes  the v3 `progress.outcomes` map { uid: { status, substrate? } }.
 * @returns {Array<{uid:string, substrate:("claude"|"agnostic")}>}
 */
export function confirmedOutcomes(outcomes) {
  if (outcomes === null || outcomes === undefined) return [];
  if (typeof outcomes !== "object" || Array.isArray(outcomes)) {
    throw new ClaimLinkError(
      "outcomes must be the v3 outcomes map (an object keyed by uid)",
    );
  }
  const list = [];
  for (const [uid, entry] of Object.entries(outcomes)) {
    const status = entry && entry.status;
    if (status !== CONFIRMED) continue; // only REAL confirmed outcomes travel
    // substrate: explicit "claude" stays; anything else (incl. absent) is the
    // documented agnostic default — never invented as claude.
    const substrate = entry && entry.substrate === "claude" ? "claude" : "agnostic";
    list.push({ uid, substrate });
  }
  // Stable order so the canonical payload (and thus the hash + URL) is deterministic
  // regardless of object insertion order.
  list.sort((a, b) => (a.uid < b.uid ? -1 : a.uid > b.uid ? 1 : 0));
  return list;
}

// ---------------------------------------------------------------------------
// 2. CANONICALISE — a stable, deterministic JSON serialization (sorted keys at every
//    level) so the SHA-256 hash is reproducible: the SAME logical payload always
//    serializes to the SAME bytes regardless of key insertion order. This is the
//    whole basis of the integrity check — and it is plain canonical JSON, so an
//    independent SHA-256 of the same canonical form reproduces the hash (proving
//    there is NO secret salt in the path [S4]).
// ---------------------------------------------------------------------------

/**
 * Deterministically serialize a JSON-compatible value with object keys sorted
 * lexicographically at every depth. Arrays keep their order (it is meaningful);
 * objects are re-ordered. Rejects non-finite numbers and undefined (which JSON
 * cannot represent stably).
 */
export function canonicalize(value) {
  return JSON.stringify(sortValue(value));
}

function sortValue(value) {
  if (Array.isArray(value)) return value.map(sortValue);
  if (value && typeof value === "object") {
    const out = {};
    for (const key of Object.keys(value).sort()) {
      out[key] = sortValue(value[key]);
    }
    return out;
  }
  if (typeof value === "number" && !Number.isFinite(value)) {
    throw new ClaimLinkError("payload contains a non-finite number; cannot canonicalize");
  }
  return value;
}

// ---------------------------------------------------------------------------
// 3. HASH — a PLAIN SHA-256 of the canonical payload. No key, no salt, no HMAC. The
//    hash integrity-checks the payload (any tamper → a different canonical form → a
//    different digest) but is explicitly NOT unforgeable: anyone can recompute it, by
//    design — a shipped plugin cannot keep a secret from its own user [S4].
// ---------------------------------------------------------------------------

/**
 * SHA-256 hex digest of the canonical serialization of `payload`. Reproducible by any
 * independent SHA-256 over `canonicalize(payload)` — there is deliberately no secret.
 */
export function hashPayload(payload) {
  return createHash("sha256").update(canonicalize(payload), "utf8").digest("hex");
}

// ---------------------------------------------------------------------------
// 4. PAYLOAD — the object that travels in the URL. Built in a FIXED shape from the
//    opaque id + the confirmed outcomes. NOTHING here is PII: no name, no email, no
//    file paths. The id is OPAQUE and caller-supplied (the runtime persists it).
// ---------------------------------------------------------------------------

/**
 * Build the (unhashed) claim payload object. Validates the opaque id is a non-empty,
 * non-PII-shaped string token. Does NOT include any learner name [S3].
 *
 * @param {Object} args
 * @param {string} args.id        an OPAQUE local id (NOT derived from PII).
 * @param {Object} args.outcomes  the v3 outcomes map (confirmed ones are extracted).
 * @returns {{v:number, id:string, confirmed:Array<{uid,substrate}>}}
 */
export function buildPayload({ id, outcomes } = {}) {
  if (typeof id !== "string" || id.trim() === "") {
    throw new ClaimLinkError("an opaque local id (non-empty string) is required");
  }
  // Guard against a caller accidentally routing PII through the id: an "@" or whitespace
  // is the tell-tale of an email / a human name being passed as the id.
  if (/[@\s]/.test(id)) {
    throw new ClaimLinkError(
      "the opaque id must not look like PII (no '@' or whitespace) — names/emails " +
        "belong in the cert body and (later) the website, never the claim id [S3]",
    );
  }
  return {
    v: PAYLOAD_VERSION,
    id,
    confirmed: confirmedOutcomes(outcomes),
  };
}

// ---------------------------------------------------------------------------
// 5. MINT — the public mint entry point. Returns the deterministic claim URL plus the
//    parts that composed it (payload, hash) so callers/tests don't re-derive them.
//
//    URL SHAPE — everything rides in the FRAGMENT (after `#`), not the query string:
//      <base>#p=<base64url(JSON(payload))>&h=<sha256-hex>
//    The fragment is not sent to a server on navigation, which is the right place for
//    a client-minted, honour-system token. `p` is the base64url-encoded canonical
//    payload JSON; `h` is its plain SHA-256. NO `name=` / no PII anywhere [S3]; NO
//    secret in `h` [S4].
// ---------------------------------------------------------------------------

// base64url (RFC 4648 §5): standard base64 with +/ → -_ and padding stripped. URL-safe
// without percent-encoding. Implemented on Buffer (node built-in) — dependency-free.
function toBase64Url(str) {
  return Buffer.from(str, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
function fromBase64Url(b64url) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(b64, "base64").toString("utf8");
}

/**
 * Mint a deterministic claim URL for a completed series.
 *
 * @param {Object} args
 * @param {string} args.id            opaque local id (caller-supplied; non-PII).
 * @param {Object} args.outcomes      v3 outcomes map (confirmed ones travel).
 * @param {string} [args.base]        claim base URL (defaults to DEFAULT_CLAIM_BASE).
 * @returns {{ url:string, payload:object, hash:string }}
 * @throws {ClaimLinkError} on a missing/PII-shaped id or a malformed outcomes map.
 */
export function mintClaimLink({ id, outcomes, base = DEFAULT_CLAIM_BASE } = {}) {
  const payload = buildPayload({ id, outcomes });
  const hash = hashPayload(payload);
  // The payload travels as canonical JSON so the encoded bytes are themselves
  // deterministic (and match exactly what the hash was taken over).
  const encoded = toBase64Url(canonicalize(payload));
  const url = `${base}#p=${encoded}&h=${hash}`;
  return { url, payload, hash };
}

// ---------------------------------------------------------------------------
// 6. PARSE + VERIFY — the mirror of mint. `parseClaimLink` recovers the payload + hash
//    from a URL; `verifyClaim` recomputes the hash over the recovered payload and
//    reports whether it matches (tamper detection). This is the integrity check —
//    NOT an authenticity guarantee: a forger can recompute a valid hash for a forged
//    payload (no secret), exactly as the threat model states. The website is the
//    future authority.
// ---------------------------------------------------------------------------

/**
 * Recover `{ payload, hash }` from a claim URL's fragment. Throws on a malformed URL.
 */
export function parseClaimLink(url) {
  if (typeof url !== "string") throw new ClaimLinkError("url must be a string");
  const hashIdx = url.indexOf("#");
  if (hashIdx === -1) throw new ClaimLinkError("claim url has no fragment");
  const frag = url.slice(hashIdx + 1);
  const params = new URLSearchParams(frag);
  const p = params.get("p");
  const h = params.get("h");
  if (!p || !h) {
    throw new ClaimLinkError("claim url fragment missing `p` (payload) or `h` (hash)");
  }
  let payload;
  try {
    payload = JSON.parse(fromBase64Url(p));
  } catch (cause) {
    throw new ClaimLinkError(`claim url payload is not decodable JSON: ${cause.message}`);
  }
  return { payload, hash: h };
}

/**
 * Verify a claim URL's integrity: recompute the SHA-256 over the recovered payload and
 * compare to the carried hash. Returns `{ valid, payload, expectedHash, actualHash }`.
 * `valid === true` ⇒ the payload has not been altered since mint. It is NOT a proof of
 * authenticity (no secret; a forger can mint a self-consistent payload) — that is the
 * deferred website's job.
 *
 * @param {string} url  a claim URL produced by mintClaimLink.
 */
export function verifyClaim(url) {
  const { payload, hash } = parseClaimLink(url);
  const expectedHash = hashPayload(payload);
  return {
    valid: expectedHash === hash,
    payload,
    expectedHash,
    actualHash: hash,
  };
}

export default mintClaimLink;
