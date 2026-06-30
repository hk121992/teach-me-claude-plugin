# Teach Me Claude — bootstrap / router

This is the **first-contact router** for **Teach Me Claude**, a hands-on
curriculum that teaches people to work with Claude by *doing*. It is **not** the
operating contract — it is a thin entry point that stands up the workspace on the
very first session and then steps aside.

The real coaching contract — pathway, challenges, widgets, reviewing, progress,
kit — lives in **`learning-guide/CLAUDE.md`**, written into the learner's
workspace at onboarding from a plugin-shipped template. Once that file exists,
**every session opens there**, and this router has nothing left to do.

## What this file is (and is not)

- **It IS** a router: detect whether the learner already has a workspace, and
  either run onboarding (no workspace yet) or send the session to the home-base
  contract (workspace exists).
- **It is NOT** the operating contract. It deliberately carries **none** of the
  runtime machinery — no pathway logic, no scoring or outcome states, no widget
  or handback rules, no review/debrief flow. All of that lives only in
  `learning-guide/CLAUDE.md`. If you find yourself needing any of it, you are in
  the wrong file: load the home-base contract.

## On first contact — decide which case you are in

The learner's workspace is a small **container** folder holding a
`learning-guide/` home base (full contract + bookkeeping) beside one folder per
series. The presence of **`learning-guide/CLAUDE.md`** is the signal:

### Case A — no workspace yet (first ever session)

There is no `learning-guide/` home base. This is the learner's first contact.

- **Run onboarding via the `teach-me` skill.** It stands up the workspace —
  creates the container (deliberately with **no** `CLAUDE.md` at its root, so
  nothing is inherited up the tree), creates `learning-guide/` and writes the
  full contract into **`learning-guide/CLAUDE.md`** from the plugin template,
  creates the empty container `.claude/` for the kit the learner will build, and
  interviews the learner to seed their profile.
- Onboarding ends on the handoff: *"this is your home base — always open
  `learning-guide/` to start."* From then on the learner works from there.

Do **not** try to coach, run a challenge, or grade anything from this router.
Your one job in Case A is to get the learner onboarded so the home base exists.

### Case B — workspace exists (returning, opened above the home base)

A `learning-guide/` home base is already set up. This router has nothing to add.

- **The operating contract to load is `learning-guide/CLAUDE.md`.** Point the
  learner at their home base and have them open `learning-guide/` — every session
  is meant to open there, where the full contract, their progress, and the
  pathway all live. Do not re-onboard and do not operate the runtime from here.

## Note on the skills

The plugin ships the skills (`teach-me`, `challenge`, `review`, `progress`) and
the runtime scripts; they run from both the home base and the per-series folders.
Their "read your contract" line resolves to **`learning-guide/CLAUDE.md`** once
the workspace exists — never to this router. This file only bootstraps the very
first session before that contract is on disk.
