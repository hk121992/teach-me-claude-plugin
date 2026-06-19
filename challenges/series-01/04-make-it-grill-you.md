---
# 04-make-it-grill-you.md — the AUTHORED grill-me runsheet (the B proving slice).
#
# Authored by the challenge-author stage from the spark-enriched, operator-approved
# lesson plan (the grill-me proving slice — see notes/research/04-make-it-grill-you.md
# for the spark-approval provenance). It SUPERSEDES the disposable prose reference that
# previously lived at this path (series-01 is "disposable reference, NOT migration").
#
# covers_outcomes is the SINGLE source of the (uid, evidence_kind, role,
# floor_confirmable) tuples; the ## Rubric is 1:1 and REFERENCES the uids, never
# re-declaring evidence_kind; the learner-facing body is standalone (no challenge-id
# back-reference — it names the kit artefact + the outcome, not a sibling challenge).
#
# evidence_kind is DERIVED from each outcome's `checks` prose (lesson-design §4):
#   01-DESC-04  checks → "an installed `grill-me` skill that fires when invoked; its
#               body … encodes …; a proof run surfaced …"  → a real built FILE → artifact
#   01-DSCN-04  checks → "across two fresh-session demos … names the difference in
#               register … explain *why* … warn a colleague"  → a DIALOGUE → conversational
id: "1.04"
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
widgets:
  - { id: grill-lesson, kind: interactive, when: lesson }
---

## Demo — failure-first (runs before the lesson)

Before the lesson, meet the failure it fixes. Pick a deliberately half-baked idea from
your own world — a plausible-but-flawed plan whose holes you can see ("move the whole
team to daily two-hour status meetings"). In a **fresh session** — not here with your
companion — pitch it twice, a new session each time:

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
  before doing anything**. The body is in your own words; the companion does only the
  file mechanics and the trigger description.
- **Stretch:** point the installed skill at a real ask you have this week, starting from
  a deliberately thin, lazy prompt, and note what the interrogation surfaced that your
  ask had left out.

## Parameters

- The pitched idea must be genuinely half-baked — you should be able to name its flaws
  yourself afterwards.
- The skill body is your writing; the companion handles file mechanics and the
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

## Companion notes

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
