// frontmatter.mjs — the RUNTIME runsheet-frontmatter parser.
//
// CANON: tmc-workspace/handbook/content/05-session-mechanics/README.md
//   "The runsheet — the challenge contract": a runsheet is a typed `.md` —
//   machine-readable YAML frontmatter (`--- … ---`) + the agent's-spec body. The
//   runtime's pathway() reads each runsheet's frontmatter metadata (`id`,
//   `compulsory`, `covers_outcomes`, …); this module turns the fenced frontmatter
//   into that object.
//
// WHY A RUNTIME PARSER (NOT the dev conformance lib):
//   curriculum/authoring/lib/conformance.mjs has a `parseRunsheet` over the SAME
//   narrow frontmatter dialect, but it is DEV-ONLY — it lives under
//   curriculum/authoring/, which the build's G2 negative assertion
//   (`checkExcludedTrees`) forbids from ever shipping. The runtime cannot import the
//   dev tree, so the shipped plugin needs its own copy of the parse. This module is
//   that copy: the runtime twin of the dev parser. The two encode the same dialect
//   and MAY later be reconciled to one source, but the dependency direction is fixed
//   — the runtime never depends on the dev tree, only the reverse (conformance.mjs
//   already imports the runtime's pathway/widget-fill/handback-verify).
//
// THE DIALECT (deliberately narrow — NOT a general YAML engine; the same subset the
// authoring scaffold writes):
//   - a fenced `--- … ---` head;
//   - full-line `# comment` lines and trailing `# comment` (quote/brace-aware);
//   - `key: scalar` lines; scalars coerced (true/false → boolean, null, integers);
//   - nested maps by indentation;
//   - inline-flow maps `{ k: v, … }` and inline-flow lists `[ a, b ]`;
//   - block lists of inline-flow maps (the `covers_outcomes:` / `widgets:` shape).
//
// Dependency-free ESM; node built-ins only (none needed — pure string work). Total:
// it never throws — a missing fence or unparseable head returns `null` so the caller
// (loadRunsheets) degrades gracefully rather than crashing the SessionStart hook.

// ---------------------------------------------------------------------------
// Fence + scalar primitives.
// ---------------------------------------------------------------------------

// Pull the frontmatter out of a leading `--- … ---` fence. Returns the raw inner
// text, or null when the source has no opening fence (a body-only `.md`).
function stripFrontmatterFence(src) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(src);
  if (!m) return null;
  return m[1];
}

// Strip a single layer of matching surrounding quotes.
function unquote(s) {
  const t = s.trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    return t.slice(1, -1);
  }
  return t;
}

// Coerce a bare scalar token to its typed value. `true`/`false` → boolean (the
// `compulsory` / `floor_confirmable` flags pathway() branches on MUST be real
// booleans), `null`, and plain integers; everything else stays a string.
function coerceScalar(v) {
  if (v === "true") return true;
  if (v === "false") return false;
  if (v === "null") return null;
  if (/^-?\d+$/.test(v)) return Number(v);
  return v;
}

// Drop a trailing `# comment` that is NOT inside quotes or `{}`/`[]` flow. A line
// that is entirely a comment collapses to whitespace (→ skipped by the tokeniser).
function stripLineComment(line) {
  let inS = false;
  let inD = false;
  let depth = 0;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === "'" && !inD) inS = !inS;
    else if (c === '"' && !inS) inD = !inD;
    else if (!inS && !inD && (c === "{" || c === "[")) depth++;
    else if (!inS && !inD && (c === "}" || c === "]")) depth--;
    else if (c === "#" && !inS && !inD && depth === 0) return line.slice(0, i);
  }
  return line;
}

// ---------------------------------------------------------------------------
// Inline-flow forms: `{ k: v, … }` and `[ a, b ]`.
// ---------------------------------------------------------------------------

// Parse an inline-flow map BODY (the text between the braces), e.g.
// `uid: 01-DESC-04, evidence_kind: artifact, role: floor, floor_confirmable: true`.
function parseInlineMap(body) {
  const obj = {};
  const parts = [];
  let depth = 0;
  let cur = "";
  for (const c of body) {
    if (c === "{") depth++;
    if (c === "}") depth--;
    if (c === "," && depth === 0) {
      parts.push(cur);
      cur = "";
    } else {
      cur += c;
    }
  }
  if (cur.trim()) parts.push(cur);
  for (const part of parts) {
    const idx = part.indexOf(":");
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = unquote(part.slice(idx + 1));
    obj[k] = coerceScalar(v);
  }
  return obj;
}

// Parse an inline-flow list, e.g. `[ research, drafting ]` → ["research","drafting"].
function parseInlineList(rest) {
  const inner = rest.replace(/^\[/, "").replace(/\]$/, "").trim();
  if (!inner) return [];
  return inner.split(",").map((s) => coerceScalar(unquote(s)));
}

// ---------------------------------------------------------------------------
// Block tokeniser + recursive map/list parse (indentation-driven).
// ---------------------------------------------------------------------------

// Comment-strip + blank-skip the fence into { indent, text } tokens.
function tokenise(fm) {
  const out = [];
  for (const raw of fm.split(/\r?\n/)) {
    const noComment = stripLineComment(raw);
    if (!noComment.trim()) continue;
    const indent = noComment.length - noComment.trimStart().length;
    out.push({ indent, text: noComment.trim() });
  }
  return out;
}

function parseBlock(tokens, i, minIndent) {
  if (i >= tokens.length) return [null, i];
  const first = tokens[i];
  if (first.indent < minIndent) return [null, i];
  if (first.text.startsWith("- ") || first.text === "-") {
    return parseList(tokens, i, first.indent);
  }
  return parseMap(tokens, i, first.indent);
}

function parseMap(tokens, i, indent) {
  const obj = {};
  while (i < tokens.length) {
    const tok = tokens[i];
    if (tok.indent < indent) break;
    if (tok.indent > indent) {
      i++;
      continue;
    }
    if (tok.text.startsWith("- ")) break;
    const idx = tok.text.indexOf(":");
    if (idx === -1) {
      i++;
      continue;
    }
    const key = tok.text.slice(0, idx).trim();
    const rest = tok.text.slice(idx + 1).trim();
    if (rest === "") {
      const childIndent = i + 1 < tokens.length ? tokens[i + 1].indent : indent;
      if (childIndent > indent) {
        const [val, next] = parseBlock(tokens, i + 1, childIndent);
        obj[key] = val;
        i = next;
      } else {
        obj[key] = null;
        i++;
      }
    } else if (rest.startsWith("{")) {
      obj[key] = parseInlineMap(rest.replace(/^\{/, "").replace(/\}$/, ""));
      i++;
    } else if (rest.startsWith("[")) {
      obj[key] = parseInlineList(rest);
      i++;
    } else {
      obj[key] = coerceScalar(unquote(rest));
      i++;
    }
  }
  return [obj, i];
}

function parseList(tokens, i, indent) {
  const arr = [];
  while (i < tokens.length) {
    const tok = tokens[i];
    if (tok.indent !== indent) break;
    if (!tok.text.startsWith("-")) break;
    const item = tok.text.replace(/^-\s*/, "");
    if (item.startsWith("{")) {
      arr.push(parseInlineMap(item.replace(/^\{/, "").replace(/\}$/, "")));
      i++;
    } else if (item.includes(":")) {
      const idx = item.indexOf(":");
      const key = item.slice(0, idx).trim();
      const val = item.slice(idx + 1).trim();
      const obj = {};
      if (val === "") {
        const childIndent =
          i + 1 < tokens.length ? tokens[i + 1].indent : indent + 2;
        const [v, next] = parseBlock(tokens, i + 1, childIndent);
        obj[key] = v;
        i = next;
      } else if (val.startsWith("{")) {
        obj[key] = parseInlineMap(val.replace(/^\{/, "").replace(/\}$/, ""));
        i++;
      } else {
        obj[key] = coerceScalar(unquote(val));
        i++;
      }
      const contIndent = i < tokens.length ? tokens[i].indent : -1;
      if (contIndent >= indent + 2) {
        const [more, next] = parseMap(tokens, i, contIndent);
        Object.assign(obj, more);
        i = next;
      }
      arr.push(obj);
    } else {
      arr.push(coerceScalar(unquote(item)));
      i++;
    }
  }
  return [arr, i];
}

// ---------------------------------------------------------------------------
// Public entry.
// ---------------------------------------------------------------------------

/**
 * Parse the YAML-ish frontmatter of a typed `.md` into a plain object.
 *
 * @param {string} md  the runsheet (or any typed-.md) source.
 * @returns {object|null}  the parsed frontmatter map, or `null` when there is no
 *   `--- … ---` fence or the head cannot be parsed. NEVER throws — a SessionStart
 *   hook must not crash on a malformed authored file; the caller treats `null` as
 *   "not a usable runsheet" and skips it.
 */
export function parseFrontmatter(md) {
  if (typeof md !== "string") return null;
  const fm = stripFrontmatterFence(md);
  if (fm === null) return null;
  try {
    const [obj] = parseMap(tokenise(fm), 0, 0);
    return obj && typeof obj === "object" ? obj : null;
  } catch {
    return null;
  }
}

export default parseFrontmatter;
