# Teach Me Claude

A Cowork / Claude Code plugin that teaches you to work with Claude by
*doing* — a learning companion that delivers practical challenges, coaches
you through them, grades the results against explicit rubrics, learns your
workflows as you go, and tracks your journey.

- **Free tier (shipped here):** Series 1 — *Foundations*, 10 challenges
  taking a non-technical professional from "never worked with an AI
  agent" to confident, safe, effective delegation in Cowork. Complete on
  its own: the learner graduates with a working **kit** — their first
  skill (one that Socratically grills *them* until the brief is
  complete), brief template, verification checklist, delegation map,
  agent memory file, and a machine they commissioned themselves.
- **Full curriculum:** 100 challenges across 10 series — four
  knowledge-work domain packs (Research, Analytics, Documents,
  Presentations), then workflows, sharing, going public, automation, and
  shipping real software ([roadmap/ROADMAP.md](roadmap/ROADMAP.md)).
  Series 2–10 will be paid challenge packs (€20/series, €100 for all).

## How it works

The plugin is the learner's companion:

- **`CLAUDE.md`** — the companion's operating contract: coach, never
  doer; no yes-machine — Socratic, honest, kind in that order; adapt to
  the learner's profession; grade honestly; track progress truthfully.
- **Skills** (invoked as `/teach-me-claude:<name>`, or triggered
  naturally in conversation):
  - `teach-me` — onboard a new learner (workspace setup, profile interview)
    or resume the journey
  - `challenge` — deliver a challenge: lesson taught conversationally
    (failure-first where designed), task set with parameters, time
    budget, and visible rubric
  - `review` — inspect the learner's actual artifacts against the
    rubric; pass/refine with specific feedback; debrief ritual
    (reflection, workflow profile, domain preview); record progress
  - `progress` — the journey map (text or HTML widget), the kit so far,
    and the full-curriculum roadmap
- **Widgets** (`widgets/`) — HTML templates the companion instantiates
  from real progress data: a journey map and a series graduation
  certificate.
- **Resource guide** (`RESOURCES.md`) — curated external pointers
  (Anthropic's skills repo, knowledge-work plugins, official docs),
  surfaced one at a time where a debrief calls for it.
- **SessionStart hook** — when a session opens inside a learning
  workspace, the companion greets the learner by name with where they
  left off.
- **State** — `.teach-me/progress.json` in the learner's own workspace
  folder (plain JSON, learner-owned, survives plugin updates; nothing
  stored elsewhere). Includes the learner profile, the accumulating
  **workflow profile**, per-challenge status, kit tracking, and
  reflections.

Each challenge file (`challenges/series-01/`) carries: **Lesson**,
**Task**, **Parameters**, **Rubric**, and **Companion notes** — plus a
**Time** budget (5–10 min openers, 15–20 core, longer capstones) and,
where relevant, a domain **Vehicle** previewing the paid packs. The
companion teaches from these — it never pastes them.

## Install

From a clone of this repo:

```
claude --plugin-dir /path/to/teach-me-claude
```

or add the plugin through your Cowork plugin settings pointing at this
directory / its marketplace entry. Then say **"I want to learn
Claude"** or run `/teach-me-claude:teach-me`.

Requirements: a Claude paid plan (Cowork or Claude Code). No technical
background needed — that's the point.

## Repository layout

```
teach-me-claude/
├── .claude-plugin/plugin.json   plugin manifest
├── CLAUDE.md                    companion operating contract
├── skills/                      learn / challenge / review / progress
├── challenges/series-01/        the free Foundations series (10 + overview)
├── roadmap/ROADMAP.md           user-facing 100-challenge map + pricing
├── widgets/                     journey-map + certificate HTML templates
├── hooks/ + scripts/            SessionStart workspace greeting
├── data/progress-template.json  progress file schema
├── RESOURCES.md                 curated external resource guide
└── README.md                    this file
```

This plugin tree is a **generated artifact** — projected from a private
source repository by its build tooling and never hand-edited. Design,
methodology, and curriculum sources are maintained privately.

## License

[MIT](LICENSE) © 2026 Henry Kernot.
