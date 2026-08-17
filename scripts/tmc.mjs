#!/usr/bin/env node
// tmc.mjs — the ONE runtime entry point (`node tmc.mjs <cmd>`).
//
// SPEC (the on-demand reference set is this harness's spec home):
//   - .claude/on-demand/session-model/README.md → §The workspace ("materialized at
//     onboarding by the runtime's one-call setup command — copied byte-for-byte
//     from the shipped template, never generated from model memory"; write
//     discipline: seed-if-absent, idempotent re-run, confined to the learner's
//     chosen root; an unreachable root is a LOUD refusal — the model is never the
//     copy channel) + §The runtime engine (skill-hop briefing: the runsheet id
//     only; THIS command's `next` is the one owner of id→path).
//   - .claude/on-demand/widget-handback-contract/README.md → §Instantiation (the
//     fill command's stdout IS the widget body) + §The handback envelope
//     ("Verification is executed, stateful, and owns the consume": envelope on
//     stdin — never interpolated into a command line; on accept the nonce is
//     consumed in the same operation — the rotated state is written atomically
//     BEFORE exit 0; exit 0 IS the consume; fail closed on write failure; nonces
//     are minted by the runtime command, never model-composed) + §Widget-body
//     security contract (an export instantiated with learner state passes a
//     POST-FILL structural assertion owned by the fill command's export mode —
//     refuse on any script / handler / active-URL pattern in the filled bytes).
//
// TRANSPORT CONVENTION (design D7): learner-derived payloads are NEVER argv
// literals — the handback envelope arrives on STDIN; local files are passed as
// paths; `--in-place <progress-path>` is the standard write mode. stdout purity:
// a command's stdout is its payload alone (fill's stdout is BYTE-GOLDEN against
// the module return); diagnostics/sentinels go to stderr — except `setup`, whose
// per-file sentinel report IS its payload (the Be Civic shape).
//
// THE EXIT-CODE MATRIX (pinned; tests/runtime/tmc-cli*.test.mjs hold it):
//   0 — success (verify: accepted AND consumed; fill: bytes emitted; setup: tree
//       complete via CREATED/EXISTS; next: resolved; nonce: minted)
//   1 — REFUSAL / REJECTION — the command ran and the answer is "no" (verify
//       reject, export-assertion refusal, invalid/unknown/traversal id, setup
//       TARGET_UNREACHABLE / REFUSED_SYMLINK)
//   2 — OPERATIONAL error — bad usage, unreadable file, malformed JSON, module
//       throw, consume-write failure (fail closed)
//
// THIN DISPATCHER. All domain logic stays in the sibling modules (widget-fill,
// handback-verify, pathway, session-context, migrate-progress); this file owns
// only argv/stdin/stdout/exit wiring plus the two pieces the spec homes HERE:
// the local setup tree write and the post-fill export assertion. Workspace
// layout truth: the `.teach-me/` bookkeeping trio is IMPORTED from
// session-context.mjs (its owner) — no third layout truth.

import crypto from "node:crypto";
import fs from "node:fs";

import path from "node:path";

import { fillWidget } from "./widget-fill.mjs";
import { verifyHandback } from "./handback-verify.mjs";
import { writeJsonAtomic } from "./migrate-progress.mjs";
import { pathway, COMPLETE } from "./pathway.mjs";
import { parseFrontmatter } from "./frontmatter.mjs";
import {
  installedPluginRoot,
  inFlightSeriesDir,
  CHALLENGES_DIR,
  OVERVIEW_PREFIX,
  RUNSHEET_BASENAME,
  WORKSPACE_DIR,
  PROGRESS_BASENAME,
  PREFERENCES_BASENAME,
} from "./session-context.mjs";

export const EXIT = Object.freeze({ OK: 0, REFUSED: 1, ERROR: 2 });

// ---------------------------------------------------------------------------
// Small shared plumbing (argv + file reads). A UsageError is an OPERATIONAL
// failure (exit 2) with the usage block appended — bad invocation, not a
// domain refusal.
// ---------------------------------------------------------------------------

class UsageError extends Error {}

/**
 * Split argv into positionals + named flag values. `valueFlags` name flags that
 * take one value (`--progress <p>`); `booleanFlags` are bare (`--export`). An
 * unknown `--flag` or a value flag with no value throws UsageError.
 */
function parseArgs(argv, { valueFlags = [], booleanFlags = [] } = {}) {
  const positionals = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) {
      positionals.push(a);
      continue;
    }
    if (booleanFlags.includes(a)) {
      flags[a] = true;
      continue;
    }
    if (valueFlags.includes(a)) {
      const v = argv[i + 1];
      if (v === undefined || v.startsWith("--")) {
        throw new UsageError(`${a} needs a value`);
      }
      flags[a] = v;
      i += 1;
      continue;
    }
    throw new UsageError(`unknown flag ${a}`);
  }
  return { positionals, flags };
}

/** Read + parse a JSON file, naming the file in any failure (operational). */
function readJsonFile(p, label) {
  let raw;
  try {
    raw = fs.readFileSync(p, "utf8");
  } catch (err) {
    throw new Error(`cannot read ${label} file ${p}: ${err.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`${label} file ${p} is not valid JSON: ${err.message}`);
  }
}

/** The progress record's `current` pointer, {} when absent/malformed. */
function currentOf(progress) {
  return progress && typeof progress.current === "object" && progress.current !== null
    ? progress.current
    : {};
}

const USAGE = `usage: node tmc.mjs <command> [args]

commands:
  setup <target-root>                    build the learner workspace tree (sentinels on stdout)
  fill <widget-path> [--progress <p>] [--preferences <p>] [--export]
                                         fill a widget; stdout = the widget body
  verify --in-place <progress-path>      verify a handback envelope from STDIN; exit 0 consumes the nonce
  next (--id <NN-L-XXXX> | --progress <p>)
                                         resolve a challenge id to its shipped path / compute the pathway next
  nonce                                  mint a fresh nonce (crypto-random)
`;

// ---------------------------------------------------------------------------
// setup — the one-call LOCAL workspace setup (D5; session-model §The
// workspace). Creates the sibling-layout tree by DIRECT LOCAL WRITES, copying
// each shipped template byte-for-byte — never generated from model memory, and
// the model is never the copy channel: an unreachable root is a LOUD
// TARGET_UNREACHABLE refusal with no fallback transport.
//
// THE TREE (the load-bearing sibling shape — the container root stays
// CLAUDE.md-free so the host's up-walk stops there):
//   <root>/                              (container — created if absent)
//   ├── .claude/                         (created EMPTY — built kit lands later)
//   ├── learning-guide/                  (home base — full context)
//   │   ├── CLAUDE.md                    ← templates/learning-guide.md
//   │   └── .teach-me/                   (bookkeeping — layout owned by
//   │       ├── progress.json            ←   session-context.mjs, imported here)
//   │       └── preferences.json         ← data/*-template.json
//   └── series-01-foundations/           (series folder — minimal context)
//       └── CLAUDE.md                    ← templates/series.md
//
// WRITE DISCIPLINE (each per-file sentinel goes to STDOUT — the sentinel
// report IS setup's payload, the Be Civic shape; paths relative to the root,
// `.` = the root itself):
//   CREATED <rel>            written/created now
//   EXISTS <rel>             seed-if-absent: present already, LEFT UNTOUCHED
//                            (no-clobber — the guide asks before replacing)
//   REFUSED_SYMLINK <rel>    a symlink at the target path — never written
//                            through (no-dereference)
//   OBSTRUCTED <rel>         a plain file stands where a directory must go —
//                            refused honestly, never clobbered
//   BLOCKED <rel>            skipped because an ancestor dir was refused
//   TARGET_UNREACHABLE <root> the root (or its parent) is not reachable/writable
// Exit 0 = tree complete (CREATED/EXISTS only). Exit 1 = any refusal. A re-run
// after a partial failure completes only the missing pieces (idempotent).
// ---------------------------------------------------------------------------

const HOME_BASE_DIR = "learning-guide";
const SERIES_01_DIR = "series-01-foundations";
const KIT_DIR = ".claude";
const CONTRACT_BASENAME = "CLAUDE.md";

// The setup plan, in parent-before-child order (a refused dir blocks its
// descendants). `src` paths are relative to the plugin root.
function setupPlan() {
  const teachMe = path.join(HOME_BASE_DIR, WORKSPACE_DIR);
  return [
    { kind: "dir", rel: KIT_DIR },
    { kind: "dir", rel: HOME_BASE_DIR },
    { kind: "copy", rel: path.join(HOME_BASE_DIR, CONTRACT_BASENAME), src: path.join("templates", "learning-guide.md") },
    { kind: "dir", rel: teachMe },
    { kind: "copy", rel: path.join(teachMe, PROGRESS_BASENAME), src: path.join("data", "progress-template.json") },
    { kind: "copy", rel: path.join(teachMe, PREFERENCES_BASENAME), src: path.join("data", "preferences-template.json") },
    { kind: "dir", rel: SERIES_01_DIR },
    { kind: "copy", rel: path.join(SERIES_01_DIR, CONTRACT_BASENAME), src: path.join("templates", "series.md") },
  ];
}

function lstatOrNull(p) {
  try {
    return fs.lstatSync(p);
  } catch {
    return null;
  }
}

function isWritableDir(p) {
  try {
    fs.accessSync(p, fs.constants.W_OK | fs.constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

function cmdSetup(rest) {
  const { positionals, flags } = parseArgs(rest, { valueFlags: ["--plugin-root"] });
  const rootArg = positionals[0];
  if (!rootArg || positionals.length > 1) {
    throw new UsageError("setup needs exactly one <target-root>");
  }
  const pluginRoot = flags["--plugin-root"] || installedPluginRoot();
  const root = path.resolve(rootArg);
  const out = (line) => process.stdout.write(line + "\n");

  // --- REACHABILITY — the loud refusal, before any write -------------------
  const rootStat = lstatOrNull(root);
  if (rootStat) {
    if (rootStat.isSymbolicLink()) {
      // A symlinked root would make EVERY write a write-through-a-symlink.
      out(`REFUSED_SYMLINK .`);
      out(`TARGET_UNREACHABLE ${root}`);
      return EXIT.REFUSED;
    }
    if (!rootStat.isDirectory() || !isWritableDir(root)) {
      out(`TARGET_UNREACHABLE ${root}`);
      return EXIT.REFUSED;
    }
    out(`EXISTS .`);
  } else {
    const parent = path.dirname(root);
    const parentStat = lstatOrNull(parent);
    if (!parentStat || !parentStat.isDirectory() || !isWritableDir(parent)) {
      out(`TARGET_UNREACHABLE ${root}`);
      return EXIT.REFUSED;
    }
    try {
      fs.mkdirSync(root);
    } catch {
      out(`TARGET_UNREACHABLE ${root}`);
      return EXIT.REFUSED;
    }
    out(`CREATED .`);
  }
  const rootReal = fs.realpathSync(root);

  // --- the walk — seed-if-absent, no-dereference, per-file sentinels -------
  let refused = 0;
  const refusedDirs = []; // rel prefixes whose descendants are BLOCKED

  const isBlocked = (rel) => refusedDirs.some((d) => rel === d || rel.startsWith(d + path.sep));

  for (const step of setupPlan()) {
    const { kind, rel } = step;
    if (isBlocked(rel)) {
      out(`BLOCKED ${rel}`);
      continue;
    }
    const target = path.join(root, rel);
    const stat = lstatOrNull(target);

    if (stat && stat.isSymbolicLink()) {
      // NO-DEREFERENCE — never write through a symlink, file or directory,
      // wherever it points.
      out(`REFUSED_SYMLINK ${rel}`);
      refused += 1;
      if (kind === "dir") refusedDirs.push(rel);
      continue;
    }

    if (kind === "dir") {
      if (stat && stat.isDirectory()) {
        out(`EXISTS ${rel}`);
      } else if (stat) {
        // A non-dir (plain file) standing where a directory must go: refuse
        // honestly, never clobber; its descendants are blocked.
        out(`OBSTRUCTED ${rel}`);
        refused += 1;
        refusedDirs.push(rel);
      } else {
        fs.mkdirSync(target);
        out(`CREATED ${rel}`);
      }
      continue;
    }

    // kind === "copy"
    if (stat) {
      out(`EXISTS ${rel}`); // seed-if-absent / no-clobber — the guide asks before replacing
      continue;
    }
    // Realpath confinement (belt-and-braces beside the lstat walk): the
    // parent dir we are about to write into must sit inside the root.
    const parentReal = fs.realpathSync(path.dirname(target));
    if (parentReal !== rootReal && !parentReal.startsWith(rootReal + path.sep)) {
      out(`REFUSED_SYMLINK ${rel}`);
      refused += 1;
      continue;
    }
    const srcPath = path.join(pluginRoot, step.src);
    let bytes;
    try {
      bytes = fs.readFileSync(srcPath); // Buffer — byte-for-byte, no re-encoding
    } catch (err) {
      // A missing shipped template is a broken INSTALL — operational, loud.
      throw new Error(`shipped template missing: ${srcPath}: ${err.message}`);
    }
    // `wx` — exclusive create: no-clobber holds even against a race between
    // the lstat above and this write.
    try {
      fs.writeFileSync(target, bytes, { flag: "wx" });
      out(`CREATED ${rel}`);
    } catch (err) {
      if (err && err.code === "EEXIST") {
        out(`EXISTS ${rel}`);
      } else {
        throw new Error(`cannot write ${target}: ${err.message}`);
      }
    }
  }

  return refused > 0 ? EXIT.REFUSED : EXIT.OK;
}

// ---------------------------------------------------------------------------
// The POST-FILL EXPORT ASSERTION (widget-handback-contract §Widget-body
// security contract): an export instantiated with learner state passes a
// structural assertion ON THE FILLED BYTES — refuse on any script / handler /
// active-URL pattern. This is deliberately NOT the dev-side scanner (that full
// lint never ships; build-time scanning covers the unfilled variant): it is the
// small, strict runtime tripwire whose one unique job is badness that arrives
// THROUGH the fill — fillWidget HTML-escapes values, which neutralises markup
// injection but not an active URL flowing into an href="{{token}}" site. Bias:
// over-refuse. Exports are our own takeaway pages; a false refusal is a build
// bug surfaced loudly, never a learner harmed.
// ---------------------------------------------------------------------------

// URL-bearing attributes an active scheme can execute/load from.
const URL_ATTR_RE = /^(?:href|src|action|formaction|poster|background|data|srcset|xlink:href)$/i;
// The dangerous-scheme vocabulary — same set the dev scanner pins.
const ACTIVE_SCHEME_RE = /(?:javascript|vbscript|data|blob)\s*:/i;
// CSS url() carrying an active scheme (style attr / <style> block).
const CSS_ACTIVE_URL_RE = /url\s*\(\s*['"]?\s*(?:javascript|vbscript|data|blob)\s*:/i;

// Decode numeric + the common named HTML entities, repeatedly (bounded — a
// double-encoded &amp;#106; must not survive one pass), so an entity-obfuscated
// scheme cannot slip past. Compact mirror of the dev scanner's approach.
function decodeEntitiesForScan(s) {
  const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", colon: ":", sol: "/", NewLine: "\n", Tab: "\t" };
  let out = String(s);
  for (let i = 0; i < 5; i++) {
    const next = out
      .replace(/&#x([0-9a-f]+);?/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
      .replace(/&#(\d+);?/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
      .replace(/&([a-z]+);/gi, (m, name) =>
        Object.prototype.hasOwnProperty.call(NAMED, name) ? NAMED[name] : m,
      );
    if (next === out) break;
    out = next;
  }
  return out;
}

// Normalise an attribute value for scheme matching: entity-decode,
// percent-decode, drop the splitter tricks (C0 controls, space, backslash),
// lowercase — so `java\tscript:` / `&#106;avascript:` / `jav%61script:`
// normalise toward `javascript:`.
function normaliseAttrValue(v) {
  let out = decodeEntitiesForScan(v);
  out = out.replace(/%([0-9a-f]{2})/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
  out = out.replace(/[\x00-\x20\\]+/g, ""); // C0 range as ESCAPES — never literal control bytes
  return out.toLowerCase();
}

/**
 * The export-mode structural assertion. Returns a violation list (empty =
 * safe): [{ kind: "script"|"handler"|"active-url", detail }]. Comments are
 * stripped first (commented markup is inert; a payload must not hide in one
 * either way). Exported for direct unit exercise; the CLI refusal path is the
 * contract surface.
 */
export function assertExportSafe(filledHtml) {
  const violations = [];
  const html = String(filledHtml).replace(/<!--[\s\S]*?-->/g, "");

  // 1. ANY <script> — exports are script-free by construction (the build strips
  // the sanctioned submit block; the consumed manifest is stripped by fill), so
  // any surviving script element — executable or not — is a violation.
  if (/<script\b/i.test(html) || /<script\b/i.test(decodeEntitiesForScan(html))) {
    violations.push({ kind: "script", detail: "a <script> element survives in the filled export" });
  }

  // 2. Per-tag attribute scan: on* handlers + active schemes in URL-bearing
  // attributes + active url() in style attributes.
  const tagRe = /<[a-zA-Z][^>]*>/g;
  const attrRe = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|[^\s>]+)/g;
  let tag;
  while ((tag = tagRe.exec(html)) !== null) {
    let attr;
    attrRe.lastIndex = 0;
    while ((attr = attrRe.exec(tag[0])) !== null) {
      const name = attr[1].toLowerCase();
      const rawValue = attr[3] ?? attr[4] ?? attr[2];
      if (/^on/.test(name)) {
        violations.push({ kind: "handler", detail: `event-handler attribute ${name}= in ${tag[0].slice(0, 60)}` });
        continue;
      }
      const value = normaliseAttrValue(rawValue);
      if (URL_ATTR_RE.test(name) && ACTIVE_SCHEME_RE.test(value)) {
        violations.push({ kind: "active-url", detail: `active scheme in ${name}= (${rawValue.slice(0, 60)})` });
      }
      if (name === "style" && CSS_ACTIVE_URL_RE.test(value)) {
        violations.push({ kind: "active-url", detail: `active url() in style= (${rawValue.slice(0, 60)})` });
      }
    }
  }

  // 3. <style> blocks: active url() schemes.
  const styleRe = /<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi;
  let style;
  while ((style = styleRe.exec(html)) !== null) {
    if (CSS_ACTIVE_URL_RE.test(normaliseAttrValue(style[1]))) {
      violations.push({ kind: "active-url", detail: "active url() scheme in a <style> block" });
    }
  }

  return violations;
}

// ---------------------------------------------------------------------------
// fill — the CLI face of the ONE runtime parser (widget-fill.mjs). stdout IS
// the widget body, BYTE-GOLDEN against the module's return (no added newline);
// diagnostics are stderr-only; a failed fill emits NO payload bytes. State
// arrives as local file paths — never argv JSON (D7): profile =
// progress.learner (the module's own convention), preferences + progress from
// their files. With no state flags the fill runs against EMPTY state — the
// nonce-less onboarding widget (manifest `{}`) fills exactly this way; a state
// flag that IS given but unreadable is an operational error, never a silent
// fall-back to empty state.
// ---------------------------------------------------------------------------

function cmdFill(rest) {
  const { positionals, flags } = parseArgs(rest, {
    valueFlags: ["--progress", "--preferences"],
    booleanFlags: ["--export"],
  });
  const widgetPath = positionals[0];
  if (!widgetPath || positionals.length > 1) {
    throw new UsageError("fill needs exactly one <widget-path>");
  }

  let widgetHtml;
  try {
    widgetHtml = fs.readFileSync(widgetPath, "utf8");
  } catch (err) {
    throw new Error(`cannot read widget file ${widgetPath}: ${err.message}`);
  }

  const progress = flags["--progress"] ? readJsonFile(flags["--progress"], "progress") : {};
  const preferences = flags["--preferences"]
    ? readJsonFile(flags["--preferences"], "preferences")
    : {};
  const profile =
    progress && typeof progress.learner === "object" && progress.learner !== null
      ? progress.learner
      : {};

  // A WidgetFillError (unresolvable path, bad manifest) propagates to the
  // dispatcher's operational catch — exit 2, nothing on stdout.
  const filled = fillWidget(widgetHtml, { profile, preferences, progress });

  // EXPORT MODE: the post-fill structural assertion runs on the FILLED bytes;
  // on any violation the unsafe bytes are NEVER emitted — loud sentinel, exit 1.
  if (flags["--export"]) {
    const violations = assertExportSafe(filled);
    if (violations.length > 0) {
      for (const v of violations) {
        process.stderr.write(`EXPORT_BLOCKED ${v.kind}: ${v.detail}\n`);
      }
      return EXIT.REFUSED;
    }
  }

  process.stdout.write(filled); // byte-golden: exactly the module return
  return EXIT.OK;
}

// ---------------------------------------------------------------------------
// verify — the STATEFUL verifier that OWNS the consume (D12). The envelope
// arrives on STDIN (learner-derived payloads are never argv literals); the
// triple is checked by the pure verifyHandback() against the live progress
// state; ON ACCEPT the nonce is consumed in the same operation — the rotated
// state is written atomically BEFORE any accepted payload is emitted and
// BEFORE exit 0 (exit 0 IS the consume; fail closed on write failure). A
// rejected envelope performs NO write. There is deliberately NO write-less
// verify mode: a "check only" mode would reopen the verify-then-hand-consume
// drift D12 closes.
// ---------------------------------------------------------------------------

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

async function cmdVerify(rest) {
  const { positionals, flags } = parseArgs(rest, { valueFlags: ["--in-place"] });
  if (positionals.length > 0) throw new UsageError("verify takes no positional arguments");
  const progressPath = flags["--in-place"];
  if (!progressPath) {
    throw new UsageError("verify needs --in-place <progress-path> (exit 0 IS the consume)");
  }

  const raw = await readStdin();
  let envelope;
  try {
    envelope = JSON.parse(raw);
  } catch (err) {
    throw new Error(`stdin is not a JSON handback envelope: ${err.message}`);
  }

  const progress = readJsonFile(progressPath, "progress");
  const current = currentOf(progress);
  // The caller-side mapping the verifier documents: nonce ← current.nonce,
  // widget_id ← current.widget_id, challenge ← current.runsheet.
  const inFlight = {
    nonce: current.nonce,
    widget_id: current.widget_id,
    challenge: current.runsheet,
  };

  const result = verifyHandback(envelope, inFlight);

  if (!result.ok) {
    // Reject: NO write, distinct machine reason on stderr, the reject result as
    // the payload, refusal exit.
    process.stderr.write(`VERIFY_REJECTED ${result.reason}\n`);
    process.stdout.write(JSON.stringify(result) + "\n");
    return EXIT.REFUSED;
  }

  // THE CONSUME — the verifier's consumeNonce instruction, executed here as the
  // one write this command owns (nonce-issue and consume are distinct steps;
  // the close write that records outcomes is the agent's separate transition).
  if (!progress.current || typeof progress.current !== "object") progress.current = {};
  progress.current.nonce = null;
  try {
    writeJsonAtomic(progressPath, progress);
  } catch (err) {
    // FAIL CLOSED: the consume did not land, so the accept is void — no
    // accepted payload, no exit 0.
    process.stderr.write(`CONSUME_WRITE_FAILED ${err.message}\n`);
    return EXIT.ERROR;
  }

  process.stdout.write(JSON.stringify(result) + "\n");
  return EXIT.OK;
}

// ---------------------------------------------------------------------------
// next — the ONE owner of id→path (D9) + the pathway-next action.
//
// `--id <NN-L-XXXX>`: the id is PATTERN-VALIDATED before any path work — a
// traversal, absolute, or malformed id is refused without touching the
// filesystem — then resolved by scanning the SHIPPED challenge tree (folder
// order; identity = the runsheet frontmatter id), with the resolved realpath
// CONFINED to the shipped tree (a symlinked folder escaping the plugin root is
// refused). `--progress <p>`: the deterministic pathway over the in-flight
// series' shipped runsheets, the returned id resolved the same way.
//
// This scan deliberately does NOT reuse loadRunsheets(): that loader is
// graceful-never-throws (it runs in the SessionStart hook and returns [] on any
// problem), while `next` must be LOUD — an unreadable shipped tree here is an
// operational error, never a silent empty answer. The layout constants
// (challenges/, the 00- exclusion, runsheet.md) are imported from
// session-context.mjs — one owner, two error contracts.
// ---------------------------------------------------------------------------

// The runsheet-id shape (the briefing carries the id ONLY; conformance pins the
// same core pattern dev-side). Anchored: nothing but `NN-L-XXXX` passes, so a
// path separator, dot-segment, or absolute prefix is unrepresentable.
const RUNSHEET_ID_RE = /^\d{2}-L-[0-9A-Z]{4}$/;

/**
 * Scan one shipped series dir for its challenge folders, in folder-name order
 * (= series order), returning [{ id, dir, runsheetPath, fm }]. Loud: an
 * unreadable dir throws. A `00-` folder (skill-sourced onboarding), a folder
 * with no runsheet.md, or a runsheet with no usable string id is skipped —
 * those are not shipped challenges.
 */
function scanSeriesDir(seriesDir) {
  let entries;
  try {
    entries = fs.readdirSync(seriesDir, { withFileTypes: true });
  } catch (err) {
    throw new Error(`cannot read shipped series dir ${seriesDir}: ${err.message}`);
  }
  const folders = entries
    .filter((e) => (e.isDirectory() || e.isSymbolicLink()) && !e.name.startsWith(OVERVIEW_PREFIX))
    .map((e) => e.name)
    .sort();
  const out = [];
  for (const name of folders) {
    const dir = path.join(seriesDir, name);
    const runsheetPath = path.join(dir, RUNSHEET_BASENAME);
    let raw;
    try {
      raw = fs.readFileSync(runsheetPath, "utf8");
    } catch {
      continue; // no runsheet.md → not a shipped challenge
    }
    const fm = parseFrontmatter(raw);
    if (!fm || typeof fm.id !== "string" || fm.id === "") continue;
    out.push({ id: fm.id, dir, runsheetPath, fm });
  }
  return out;
}

/** Every shipped challenge across every series dir under <root>/challenges/. */
function scanShippedChallenges(pluginRoot) {
  const challengesRoot = path.join(pluginRoot, CHALLENGES_DIR);
  let entries;
  try {
    entries = fs.readdirSync(challengesRoot, { withFileTypes: true });
  } catch (err) {
    throw new Error(`cannot read shipped challenge tree ${challengesRoot}: ${err.message}`);
  }
  const seriesDirs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  const out = [];
  for (const name of seriesDirs) out.push(...scanSeriesDir(path.join(challengesRoot, name)));
  return out;
}

/**
 * Confine a resolved challenge dir to the shipped tree: its realpath must sit
 * under the realpath of <root>/challenges/. A symlinked folder pointing outside
 * fails this — the id resolves, the PATH is refused.
 */
function isInsideShippedTree(pluginRoot, dir) {
  const treeReal = fs.realpathSync(path.join(pluginRoot, CHALLENGES_DIR));
  let dirReal;
  try {
    dirReal = fs.realpathSync(dir);
  } catch {
    return false;
  }
  return dirReal === treeReal || dirReal.startsWith(treeReal + path.sep);
}

// Resolve one validated id against the shipped tree. Returns the entry or a
// refusal: { refuse: "UNKNOWN_ID" | "OUTSIDE_TREE" }.
function resolveShippedId(pluginRoot, id) {
  const hit = scanShippedChallenges(pluginRoot).find((c) => c.id === id);
  if (!hit) return { refuse: "UNKNOWN_ID" };
  if (!isInsideShippedTree(pluginRoot, hit.dir)) return { refuse: "OUTSIDE_TREE" };
  return { hit };
}

function cmdNext(rest) {
  const { positionals, flags } = parseArgs(rest, {
    valueFlags: ["--id", "--progress", "--plugin-root"],
  });
  if (positionals.length > 0) throw new UsageError("next takes no positional arguments");
  const id = flags["--id"];
  const progressPath = flags["--progress"];
  if ((id && progressPath) || (!id && !progressPath)) {
    throw new UsageError("next needs exactly one of --id <NN-L-XXXX> or --progress <path>");
  }
  const pluginRoot = flags["--plugin-root"] || installedPluginRoot();

  if (id) {
    // PATTERN FIRST — before any filesystem work (a traversal/absolute id is
    // refused here, unrepresentable as a shipped id).
    if (!RUNSHEET_ID_RE.test(id)) {
      process.stderr.write(`INVALID_ID ${JSON.stringify(id)} — a challenge id is NN-L-XXXX\n`);
      return EXIT.REFUSED;
    }
    const { hit, refuse } = resolveShippedId(pluginRoot, id);
    if (refuse) {
      process.stderr.write(`${refuse} ${id}\n`);
      return EXIT.REFUSED;
    }
    process.stdout.write(
      JSON.stringify({ id: hit.id, dir: hit.dir, runsheet: hit.runsheetPath }) + "\n",
    );
    return EXIT.OK;
  }

  // --progress: the deterministic pathway over the in-flight series.
  const progress = readJsonFile(progressPath, "progress");
  const current = currentOf(progress);
  const seriesDir = inFlightSeriesDir(pluginRoot, current.series);
  const challenges = scanSeriesDir(seriesDir);
  const next = pathway({
    outcomes: progress.outcomes || {},
    runsheets: challenges.map((c) => c.fm),
    current,
    attended: Array.isArray(progress.attended) ? progress.attended : [],
  });

  if (next && next.complete === true) {
    process.stdout.write(JSON.stringify(COMPLETE) + "\n");
    return EXIT.OK;
  }
  const { hit, refuse } = resolveShippedId(pluginRoot, next.next);
  if (refuse) {
    // The pathway returned an id the tree cannot serve — loud, operational (the
    // shipped tree and the progress record disagree; never route blind).
    throw new Error(`pathway returned ${next.next} but the shipped tree refused it (${refuse})`);
  }
  process.stdout.write(
    JSON.stringify({ next: hit.id, dir: hit.dir, runsheet: hit.runsheetPath }) + "\n",
  );
  return EXIT.OK;
}

// ---------------------------------------------------------------------------
// nonce — the mint (D12: minted by the runtime command, never model-composed).
// ---------------------------------------------------------------------------

function cmdNonce() {
  process.stdout.write(crypto.randomUUID() + "\n");
  return EXIT.OK;
}

// ---------------------------------------------------------------------------
// Dispatch.
// ---------------------------------------------------------------------------

const COMMANDS = Object.freeze({
  setup: cmdSetup,
  fill: cmdFill,
  verify: cmdVerify,
  next: cmdNext,
  nonce: cmdNonce,
});

async function main(argv) {
  const [cmd, ...rest] = argv;
  const handler = COMMANDS[cmd];
  if (!handler) {
    process.stderr.write(
      (cmd ? `tmc: unknown command "${cmd}"\n` : "tmc: missing command\n") + USAGE,
    );
    return EXIT.ERROR;
  }
  try {
    return await handler(rest);
  } catch (err) {
    if (err instanceof UsageError) {
      process.stderr.write(`tmc ${cmd}: ${err.message}\n` + USAGE);
      return EXIT.ERROR;
    }
    throw err; // operational — the isMain catch reports it (exit 2)
  }
}

const isMain = (() => {
  try {
    return import.meta.url === `file://${process.argv[1]}`;
  } catch {
    return false;
  }
})();

if (isMain) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (err) => {
      // Any uncaught module throw is an OPERATIONAL failure — loud, non-zero.
      process.stderr.write(`tmc: error: ${err && err.message ? err.message : err}\n`);
      process.exit(EXIT.ERROR);
    },
  );
}
