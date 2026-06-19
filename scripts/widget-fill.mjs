// widget-fill.mjs — the ONE runtime-owned widget filler.
//
// CANON: tmc-workspace/handbook/content/05-session-mechanics/README.md
//   - "Widget delivery + handback" → "Instantiation — one convention": Every widget
//     declares a `data-tmc-inputs` JSON manifest (field name → source path within
//     `{profile, preferences, progress}`). The runtime parses the manifest and fills
//     the widget deterministically; the agent NEVER hand-substitutes ad-hoc named
//     placeholders. One parser, owned by the runtime — not N bespoke fills.
//   - Pedagogical invariant P5 (and the "real state only, never fabricated" rule):
//     widgets render REAL STATE ONLY. An unknown / unresolvable source path is an
//     EXPLICIT ERROR — never a fabricated or blank value.
//
// THE ONE CONVENTION (single manifest → source-path → value → site flow):
//
//   1. MANIFEST. One embedded block per widget:
//        <script type="application/json" data-tmc-inputs>
//          { "<field>": "<source.path>", ... }
//        </script>
//      A field name is an authored alias; a source path is a dotted path rooted at
//      one of `profile`, `preferences`, `progress` (e.g. "profile.name",
//      "preferences.ai_maturity", "progress.current.runsheet").
//
//   2. RESOLVE. Each source path is resolved against the SUPPLIED state object
//      `{profile, preferences, progress}`. A path the state does not have THROWS
//      (real-state-only). The result is a field→value map.
//
//   3. SITES. Every bound site is filled from that field→value map. Two site forms,
//      both keyed by the SAME manifest field name (so it is one convention, not two):
//        - element bind:   <span data-tmc-bind="<field>">…</span>
//                          the element's inner content is REPLACED with the value.
//        - inline token:   {{<field>}}  anywhere in text or an attribute value.
//      A site that names a field absent from the manifest THROWS (no silent blank).
//
// This module is PURE-ish: given (widgetHtml, state) it returns filledHtml. It does
// NO file I/O of its own, reads NO clock, uses NO randomness, and depends on NO DOM
// library — HTML is processed with string/regex ops only. Dependency-free ESM,
// node: built-ins only (in fact it needs none).
//
// The filled output is renderable HTML: the consumed `data-tmc-inputs` manifest
// block is stripped (it is an instantiation directive, not display content), and the
// learner-facing handback machinery (nonce / sendPrompt) is left untouched for the
// widget's own script to use at submit time.

// ---------------------------------------------------------------------------
// Errors — a dedicated class so callers (and tests) can branch on the failure
// mode without string-matching. Every throw below is one of the real-state-only
// guards; none of them is ever swallowed into a blank fill.
// ---------------------------------------------------------------------------

export class WidgetFillError extends Error {
  constructor(message) {
    super(message);
    this.name = "WidgetFillError";
  }
}

// The three allowed roots of a source path. A manifest path MUST start with one of
// these — a path rooted anywhere else is unresolvable by construction.
const STATE_ROOTS = ["profile", "preferences", "progress"];

// ---------------------------------------------------------------------------
// 0. STRIP COMMENTS — HTML comments are neither display content, the manifest,
// nor a bind site. We remove them before locating the manifest and before
// substitution so that (a) an explanatory comment that quotes
// `<script ... data-tmc-inputs>` for documentation is never mistaken for the real
// manifest, and (b) a {{token}} or data-tmc-bind written inside a comment is never
// filled. (Authoring comments must not carry real state either way.)
// ---------------------------------------------------------------------------

function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

// ---------------------------------------------------------------------------
// 1. MANIFEST — find and parse the single `data-tmc-inputs` block.
// ---------------------------------------------------------------------------

// Match: <script ... type="application/json" ... data-tmc-inputs ...> JSON </script>
// `type` and `data-tmc-inputs` may appear in either order; attribute quoting is
// tolerant. Capture group 1 = the JSON body. The `[\s\S]` set crosses newlines
// (the manifest is normally multi-line). Non-greedy body so we stop at the first
// matching close tag.
const MANIFEST_RE =
  /<script\b[^>]*\bdata-tmc-inputs\b[^>]*>([\s\S]*?)<\/script\s*>/i;

/**
 * Validate that a parsed manifest object is the ONE convention's shape: a flat
 * mapping of field name → source-path STRING. Side-effect-free — it inspects the
 * object and throws on a bad shape; it never mutates it. Exported so the dev
 * conformance lib can reuse the REAL shape check instead of re-encoding it.
 *
 * @param {unknown} mapping  the parsed JSON value of a data-tmc-inputs block.
 * @returns {Record<string,string>} the same mapping, once proven well-shaped.
 * @throws {WidgetFillError} if it is not a flat string→string object.
 */
export function validateManifest(mapping) {
  if (mapping === null || typeof mapping !== "object" || Array.isArray(mapping)) {
    throw new WidgetFillError(
      "data-tmc-inputs manifest must be a JSON object mapping field name → source path",
    );
  }
  for (const [field, sourcePath] of Object.entries(mapping)) {
    if (typeof sourcePath !== "string") {
      throw new WidgetFillError(
        `manifest field "${field}" must map to a source-path string, got ${typeof sourcePath}`,
      );
    }
  }
  return mapping;
}

// Core manifest locate+parse. Operates on already-comment-stripped HTML and
// returns BOTH the validated field→source-path mapping AND the manifest block's
// full text (so fillWidget can strip the consumed block from its output). This is
// the SINGLE SOURCE of the parse logic: the public pure `parseManifest` and
// `fillWidget` both go through here — there is no forked copy.
//
// @throws {WidgetFillError} if there is no manifest, more than one, malformed JSON,
//   or a manifest that is not a flat string→string mapping.
function locateAndParseManifest(strippedHtml) {
  const match = MANIFEST_RE.exec(strippedHtml);
  if (!match) {
    throw new WidgetFillError(
      "no data-tmc-inputs manifest found — every TMC widget must declare exactly " +
        "one <script type=\"application/json\" data-tmc-inputs> block",
    );
  }

  // Exactly one manifest. A second one is an authoring error (ambiguous source of
  // truth) — refuse rather than silently pick the first.
  const second = MANIFEST_RE.exec(strippedHtml.slice(match.index + match[0].length));
  if (second) {
    throw new WidgetFillError(
      "more than one data-tmc-inputs manifest found — a widget must declare exactly one",
    );
  }

  let mapping;
  try {
    mapping = JSON.parse(match[1]);
  } catch (cause) {
    throw new WidgetFillError(
      `data-tmc-inputs manifest is not valid JSON: ${cause.message}`,
    );
  }

  validateManifest(mapping);

  return { mapping, block: match[0] };
}

/**
 * Parse the widget's manifest from RAW widget HTML and return the field→source-path
 * mapping. PURE: it does no I/O, mutates nothing (not the input string, not any
 * shared state), performs NO fill/substitution, and returns ONLY the manifest map
 * (it carries no substituted/filled state). Comments are stripped internally first
 * (an explanatory comment quoting the manifest syntax must not be mistaken for the
 * real one) — so this agrees exactly with what `fillWidget` parses for the same
 * input. Exported so the dev conformance lib reuses the REAL parser (no drift).
 *
 * @param {string} widgetHtml  the authored widget HTML.
 * @returns {Record<string,string>} the field → source-path mapping.
 * @throws {WidgetFillError} if there is no manifest, more than one, malformed JSON,
 *   or a manifest that is not a flat string→string mapping.
 */
export function parseManifest(widgetHtml) {
  if (typeof widgetHtml !== "string") {
    throw new WidgetFillError("widgetHtml must be a string");
  }
  return locateAndParseManifest(stripComments(widgetHtml)).mapping;
}

// ---------------------------------------------------------------------------
// 2. RESOLVE — turn each source path into a value against the supplied state.
// ---------------------------------------------------------------------------

/**
 * Resolve one dotted source path (e.g. "profile.name") against the state object.
 * An unknown root, a missing intermediate, or a missing leaf THROWS — never a
 * blank/undefined (real-state-only, canon P5). A leaf that resolves to `null`
 * also throws: a null is the absence of real state, not a value to render.
 *
 * @throws {WidgetFillError}
 */
function resolvePath(sourcePath, state) {
  const parts = sourcePath.split(".");
  const root = parts[0];

  if (!STATE_ROOTS.includes(root)) {
    throw new WidgetFillError(
      `unresolvable source path "${sourcePath}": must be rooted at one of ` +
        `${STATE_ROOTS.join(", ")}`,
    );
  }

  let cursor = state;
  const walked = [];
  for (const part of parts) {
    walked.push(part);
    if (cursor === null || cursor === undefined || typeof cursor !== "object") {
      throw new WidgetFillError(
        `unresolvable source path "${sourcePath}": no value at "${walked.join(".")}" ` +
          "(real-state-only — refusing to fabricate or blank a missing field)",
      );
    }
    if (!Object.prototype.hasOwnProperty.call(cursor, part)) {
      throw new WidgetFillError(
        `unresolvable source path "${sourcePath}": state has no "${walked.join(".")}" ` +
          "(real-state-only — refusing to fabricate or blank a missing field)",
      );
    }
    cursor = cursor[part];
  }

  if (cursor === null || cursor === undefined) {
    throw new WidgetFillError(
      `source path "${sourcePath}" resolved to ${cursor === null ? "null" : "undefined"} ` +
        "(real-state-only — a missing value is an error, never a blank fill)",
    );
  }

  return cursor;
}

/**
 * Build the field → resolved-value map from the manifest and the state. Every
 * manifest field is resolved eagerly so an unresolvable path fails fast (before any
 * substitution), and so a field declared-but-unused still proves it has real state.
 */
function resolveFields(mapping, state) {
  const values = {};
  for (const [field, sourcePath] of Object.entries(mapping)) {
    values[field] = resolvePath(sourcePath, state);
  }
  return values;
}

// ---------------------------------------------------------------------------
// 3. SITES — substitute resolved values into both bind-site forms.
// ---------------------------------------------------------------------------

// Render a resolved value to a string for insertion. Arrays join with ", " (e.g.
// goals / workflow_profile); objects are rejected (a bind site wants a scalar/text,
// not a blob) so authoring mistakes surface loudly instead of printing "[object …]".
function valueToText(field, value) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") {
    throw new WidgetFillError(
      `field "${field}" resolved to an object; a bind site needs a scalar or array value`,
    );
  }
  return String(value);
}

// HTML-escape a value bound into element content / attribute, so a learner name like
// `A & B <co>` cannot inject markup. (Determinism + safety; no DOM lib needed.)
function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Look a field up in the resolved map, throwing if a SITE names a field the manifest
// never declared (no silent blank — the site is dangling).
function requireField(field, values, where) {
  if (!Object.prototype.hasOwnProperty.call(values, field)) {
    throw new WidgetFillError(
      `${where} references field "${field}" which is not declared in the ` +
        "data-tmc-inputs manifest (real-state-only — refusing a blank fill)",
    );
  }
  return values[field];
}

// (3a) element bind sites: <tag ... data-tmc-bind="field" ...>OLD</tag> → value.
// We replace the element's inner content (between its own > and its matching close
// tag) with the escaped value, keeping the open tag (and its attributes) intact.
// Limitation by design: the bound element must NOT nest another element of the same
// tag name (its content is treated as flat) — bind sites are leaf text holders.
function fillElementBinds(html, values) {
  // Match an open tag carrying data-tmc-bind, capture: (1) tag name, (2) the field,
  // (3) the inner content up to the matching close tag of the same name.
  const re =
    /<([a-zA-Z][\w-]*)\b([^>]*?)\bdata-tmc-bind=(["'])([^"']+)\3([^>]*)>([\s\S]*?)<\/\1\s*>/g;
  return html.replace(re, (whole, tag, pre, _q, field, post, _inner) => {
    const value = requireField(field, values, `data-tmc-bind on <${tag}>`);
    const text = escapeHtml(valueToText(field, value));
    return `<${tag}${pre}data-tmc-bind="${field}"${post}>${text}</${tag}>`;
  });
}

// (3b) inline tokens: {{field}} anywhere (text node or attribute value). Optional
// surrounding whitespace inside the braces is tolerated: {{ field }}.
function fillInlineTokens(html, values) {
  return html.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (whole, field) => {
    const value = requireField(field, values, `token {{${field}}}`);
    return escapeHtml(valueToText(field, value));
  });
}

// ---------------------------------------------------------------------------
// PUBLIC INTERFACE.
// ---------------------------------------------------------------------------

/**
 * Fill a widget deterministically from supplied state.
 *
 * @param {string} widgetHtml  the authored widget HTML (with its data-tmc-inputs
 *                             manifest + bind sites).
 * @param {{profile:object, preferences:object, progress:object}} state  the SUPPLIED
 *   learner state. `profile` = progress.json `learner`; `preferences` =
 *   preferences.json; `progress` = the progress.json object. The caller supplies it;
 *   this function does no I/O.
 * @returns {string} filledHtml — renderable HTML with every bound site substituted
 *   and the consumed manifest block stripped.
 * @throws {WidgetFillError} on a missing/duplicate/malformed manifest, an
 *   unresolvable source path, or a bind site naming an undeclared field. NEVER
 *   returns a fabricated or blank value for missing state (canon P5).
 */
export function fillWidget(widgetHtml, state) {
  if (typeof widgetHtml !== "string") {
    throw new WidgetFillError("widgetHtml must be a string");
  }
  if (state === null || typeof state !== "object") {
    throw new WidgetFillError(
      "state must be an object { profile, preferences, progress }",
    );
  }

  // Work on a comment-free copy: comments are neither the manifest nor bind sites,
  // and an explanatory comment may legitimately quote the manifest syntax for docs.
  const source = stripComments(widgetHtml);

  // SINGLE SOURCE: the same locate+parse the exported pure `parseManifest` uses
  // (via `locateAndParseManifest`). fillWidget additionally needs the matched
  // `block` to strip the consumed manifest from its output, so it calls the core
  // directly — there is no second/forked parse path.
  const { mapping, block } = locateAndParseManifest(source);
  const values = resolveFields(mapping, state); // throws on any unresolvable path

  // Strip the consumed manifest directive from the output (it is not display
  // content). Do this first so a {{token}} that happened to live inside the manifest
  // JSON is never substituted.
  let out = source.replace(block, "");

  // Fill element binds, then inline tokens. Order is independent (disjoint syntaxes)
  // but fixed for determinism.
  out = fillElementBinds(out, values);
  out = fillInlineTokens(out, values);

  return out;
}

export default fillWidget;
