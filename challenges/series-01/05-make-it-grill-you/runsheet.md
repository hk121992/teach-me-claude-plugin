---
# Authoring rationale (provenance / design-decisions / derivations / change-log) lives beside this runsheet in authoring-notes.md — it never ships (build excludes it by name).
id: "01-L-YNFB"
slug: make-it-grill-you
concept: "sycophancy, and the guardrail that beats prompting — a skill that interrogates you"
time: { min: 15, max: 20 }
scaffolding: guided
failure_first: true
vehicle: none
kit_contribution: { slot: grill_me_skill, label: "Grill-me skill" }
covers_outcomes:
  - { uid: 01-DESC-04, evidence_kind: artifact,       role: floor, floor_confirmable: true }
  - { uid: 01-DSCN-04, evidence_kind: conversational, role: floor, floor_confirmable: true }
reconfirms: []
share_moment: false
compulsory: true
compulsory_reason: "This builds your first real tool — the grill-me skill you'll keep and reuse — so everyone does it hands-on."
widgets:
  - { id: grill-lesson, kind: interactive, when: lesson }
---

## Demo — failure-first (runs before the lesson)

runs in: fresh

Before the lesson, meet the failure it fixes. Pick a deliberately half-baked idea from
your own world — a plausible-but-flawed plan whose holes you can see ("move the whole
team to daily two-hour status meetings"). In a **fresh session** — not here with your
learning guide — pitch it twice, a new session each time:

1. "Here's my idea: […]. What do you think?"
2. New session: "Here's my idea: […]. Be my fiercest critic — argue against it, find
   the holes."

Bring both answers back and name the difference in register. The demo is **read-only**:
it writes nothing to your progress or your kit. Only once the failure has landed does
the lesson open.

## Task — floor / stretch

- **Floor:** build and install a small personal **grill-me** skill — a file of standing
  orders for an interrogator that, when you hand over a meaty ask, **interviews you one
  question at a time** until it could write the brief itself, **challenges a weak
  premise** instead of cheerleading, and **shows you the assembled brief for sign-off
  before doing anything**. The body is in your own words; the learning guide does only the
  file mechanics and the trigger description.
- **Stretch:** point the installed skill at a real ask you have this week, starting from
  a deliberately thin, lazy prompt, and note what the interrogation surfaced that your
  ask had left out.

## Parameters

- The pitched idea must be genuinely half-baked — you should be able to name its flaws
  yourself afterwards.
- The skill body is your writing; the learning guide handles file mechanics and the
  trigger-description only.
- The proof run happens in a fresh session, on a real task, from a minimal ask.

## Rubric

One criterion per covered outcome (1:1; references the uid; evidence_kind lives only in
the frontmatter).

- **01-DESC-04** — Inspect the installed grill-me skill: it fires when invoked, and its
  body (the learner's own words) encodes interview-until-complete, challenge-the-premise,
  and brief-sign-off-before-work; a proof run surfaced something the learner's lazy ask
  had omitted.
- **01-DSCN-04** — In dialogue across the two fresh-session demos, the learner names the
  difference in register (praise-seeking vs critique-seeking), can explain *why* it
  happens (the trained lean toward agreement; framing assigns the role), and could warn
  a colleague.

## Learning-guide notes

- This is the learner's first piece of *infrastructure* — let it land like one: most
  people learn to write better prompts; the learner just taught the agent to fix their
  prompts for them.
- The demo must run in fresh sessions, away from you — your own contract forbids the
  sycophantic register, so the learner meets the default behaviour elsewhere. If their
  fresh-session result is unexpectedly balanced, discuss it honestly: the lean varies,
  and that unpredictability is itself the argument for the guardrail.
- Coach, never the doer (P8). Honour the anti-"ok" pushback (P9): from here on, when the
  learner hands *you* a vague ask, let the grill-me skill (or its spirit) interview them.
- Reflect at close (P7): what changed, and where else does the learner get agreeable
  answers because of how they ask?

## Outcomes

_Generated at build from the outcomes matrix (`curriculum/outcomes.md`) — the grading bars for the outcomes this lesson covers, so this shipped runsheet is self-contained. Do not edit here; the matrix is the single authority._

- **`01-DESC-04` · build-grill-me-skill** — The learner can build and use a personal skill that inverts the briefing relationship — Claude interrogates *them* one question at a time until it could write the brief itself, challenges weak premises, and shows the brief for sign-off before doing anything — so gaps in their asks are caught by machinery, not memory.
  ↳ checks: an installed `grill-me` skill that fires when invoked; its body (the learner's own words) encodes interview-until-complete, challenge-the-premise, and brief-sign-off-before-work; a proof run surfaced something the learner's lazy ask had omitted.

- **`01-DSCN-04` · recognise-sycophancy** — The learner can recognise sycophancy — the agent's trained lean toward agreement — and knows that framing assigns the role: "what do you think?" hires a cheerleader, "argue against this / red-team this" hires a critic.
  ↳ checks: across two fresh-session demos (praise-seeking vs critique-seeking on a half-baked idea of their own) the learner names the difference in register and can explain *why* it happens; can warn a colleague.
