---
# Authoring rationale (provenance / design-decisions / derivations / change-log) lives beside this runsheet in authoring-notes.md — it never ships (build excludes it by name).
id: "01-L-SWCX"
slug: trust-but-verify
concept: "hallucination and the verification habit — the confident voice is no evidence; verify prose against sources, numbers against computation, calibrated to stakes"
time: { min: 25, max: 35 }
scaffolding: fix
failure_first: true
vehicle: research
kit_contribution: { slot: verification_checklist, label: "Verification checklist" }
covers_outcomes:
  - { uid: 01-DSCN-02, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DSCN-03, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DSCN-05, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DSCN-06, evidence_kind: artifact,       role: floor, floor_confirmable: true }
  - { uid: 01-DLGT-06, evidence_kind: live-action,    role: floor, floor_confirmable: true }
  - { uid: 01-DSCN-07, evidence_kind: live-action,    role: floor, floor_confirmable: true }
reconfirms: []
share_moment: false
compulsory: true
compulsory_reason: "You'll build your own verification checklist here, calibrated to your work — a keeper, so we do it for real."
widgets:
  - { id: verify-lesson, kind: templated, when: lesson }
---

## Demo — failure-first (runs before the lesson)

runs in: fresh

Before the lesson, meet the failure it fixes. In a **fresh session** — not here with your
learning guide, no folder attached — run two probes on your own ground, one break-out,
two catches:

1. **Your field.** Ask about the territory you know best, escalating from basics to the
   niche — named studies, regulations, statistics, dates, small organisations — and ask
   it to name its sources. Keep pushing until something arrives that you, the expert, can
   catch: confidently wrong, or impossible to verify.
2. **Your numbers.** Paste a handful of real figures from your own work (stand-ins for
   anything private) and ask for a quick estimate of a multi-step answer — no tools, just
   reading — one you can check against a value you know or reach by hand.

Bring both answers home word-for-word. If everything held, bring that home too — whether
you can *tell* from the voice is exactly the question the lesson answers. The demo is
**read-only**: it writes nothing to your progress or your kit. Only once the failure (or
the doubt) has landed does the lesson open.

## Task — floor / stretch

The lesson is delivered as the two-slide **`verify-lesson`** widget — **Slide 1** the lesson
(confident ≠ correct · the jagged map · the two moves · the stakes-calibrated checklist),
**Slide 2** the activity. Frame it in your own words; the widget carries the fixed content,
you carry the tailoring — the demo's catches are the material the whole lesson runs on.

- **Floor — bring the failure home, then build the guard.** Back in the home base the
  learner recounts both probes: where the model sounded sure but was wrong or
  unverifiable, and what that means — confidence is not evidence (the same fluent voice
  either way, no tone-of-voice warning, no prompt removes it). Then the countermeasures,
  live: **open exactly one citation** from the hunt — the most load-bearing — and see
  whether it holds (cited is not verified, whichever way it lands); **make it compute** —
  the estimate's question again, back here with tools: *"write the calculation, run it,
  show your working"* — setting the fresh estimate against the computed answer and the
  value they know. Map the jagged frontier onto their own work — which real tasks ride
  supplied material (low risk), which lean on recalled specifics (high). Then the kit
  drop: the learner writes **`verification-checklist.md`** in the series folder
  (`series-01-foundations`) — what they will **always check**, **sometimes check**, and
  **never worry about** — organised by stakes, specific to their real outputs, in their
  own words.
- **Stretch.** Take one agent answer from their week that they accepted unchecked, and
  run its stakes row from the new checklist — the checklist's first real outing.

## Parameters

- **The probes run on the learner's own ground** — their field, their figures. That is
  what makes the catch undeniable; a canned gotcha bounces off, their own domain doesn't.
- **No seeded errors.** The fresh session is the model being itself; the honest
  escalation (general → niche, supplied → recalled) is what surfaces the edge.
- **The numbers probe must be checkable** — a multi-step figure over their own values,
  with an answer they know or can reach by hand. Stand-ins for anything private.
- **One citation, opened.** Exactly one — the habit is the lesson, not an audit. A source
  that holds teaches the same rule: they didn't know until they opened it.
- **The computed answer must be rerunnable** — visible working, same inputs, same result.
  A second fluent guess is not the countermeasure.
- **The checklist needs a real "never worry about" row** the learner can defend — "verify
  everything" is as unusable as "trust everything"; permission to skip is part of the
  lesson, not a loophole.

## Rubric

One criterion per covered outcome (1:1; references the uid; evidence_kind lives only in
the frontmatter).

- **01-DSCN-02** — Recounting the fresh-session hunt in their own field, the learner
  explains unprompted that confidence is not evidence of correctness, and names where the
  model sounded sure but was wrong or unverifiable (or, on a clean run, why their probes
  held and what kind of question wouldn't).
- **01-DSCN-03** — States the supplied-material-vs-remembered-specifics distinction and
  applies it to predict which of their own real tasks are riskiest — suspicion calibrated
  to the work, not blanket.
- **01-DSCN-05** — After opening the one citation, states "cited is not verified — open
  the source, test on a known case" as a standing check that also stands in their
  checklist, not as a one-off observation.
- **01-DSCN-06** — Inspect `verification-checklist.md`: organised by stakes (always /
  sometimes / never worry about), naming checks specific to their real outputs in their
  own words, and the learner can justify why a low-stakes item isn't checked.
- **01-DLGT-06** — On the real question, required the computed-with-working treatment —
  the answer produced by a rerunnable calculation with its working shown, not accepted as
  a fluent estimate.
- **01-DSCN-07** — Verified one figure independently (setting the computed answer against
  the fresh estimate and a value they know or reached by hand), and can say why a
  plausible-but-wrong number is the trap.

## Learning-guide notes

- **Delivery — demo first, then the deterministic two-slide widget.** Brief the two
  probes and send the learner out **before** any teaching (P2 — withhold the lesson until
  the failure lands); write the probe steps to a small HTML file and drop a clickable
  link below your brief (Cowork is single-window — this chat is out of sight once they
  break out). On return, instantiate `verify-lesson`; the widget carries the fixed
  lesson, your generative work is the debrief on *their* catches. Never paste this runsheet.
- **The demo must run fresh, away from you.** Your own contract has you hedging honestly
  and reaching for tools; the learner meets the unguarded default elsewhere. It writes
  nothing.
- **Never bet on the failure (the no-failure branch).** A capable model may hold on both
  probes. That's the pivot, not a miss: *"it held this time — can you tell from the
  voice? will it hold next time?"* The variability is itself the argument — the checklist
  is how they stop needing luck.
- **The jagged map is empowerment, not fear.** The landing is *"now I know where to be
  suspicious"* — low over supplied material, high over recalled specifics — a
  professional skill acquired, never a reason to distrust everything.
- **The fluent estimate is the second click.** A near-acceptance is the teaching moment:
  a fluent estimate is *more* dangerous than an obvious error, because it invites trust.
  Let the three-way comparison (estimate · computed · known) land before you name it.
- **The skip row is the delight.** Push back on a checklist that verifies everything — it
  won't survive a real week; a defended "never worry about" row is what makes the rest
  get used.
- **Two-kind flags (lesson-design §4).** 01-DSCN-05's checks are compound ("in
  conversation and in their checklist"); pinned **conversational** — the rubric grades
  the stated standing rule; the checklist row is inspected under the checklist outcome.
  01-DSCN-07 compounds an observed check with a say-why; pinned **live-action** — grades
  the observed verification, the why folds in. Flagged, never silently switched.
- **Coach, never the doer (P8).** The learner runs the probes, opens the citation,
  demands the working, and writes the checklist's words; you may hold the pen for file
  mechanics only.
- **The debrief is the generative part (P7).** Confirm the six outcomes on real evidence
  (the recounting, the opened source, the observed compute-and-compare, the checklist
  file); this was research-flavoured work — record what research their job involves
  (workflow profile). Reflect: which of their tasks moved on the map — where will they
  now be suspicious, and where can they finally relax?
- **Compulsory (the kit floor):** the checklist is a keeper, built for real, calibrated
  to their work — never forward-credit the artifact into existence.

## Outcomes

_Generated at build from the outcomes matrix (`curriculum/outcomes.md`) — the grading bars for the outcomes this lesson covers, so this shipped runsheet is self-contained. Do not edit here; the matrix is the single authority._

- **`01-DSCN-02` · confident-not-correct** — The learner can recognise that a wrong answer arrives in the same fluent, confident voice as a right one — that hallucination is a property of the technology with no tone-of-voice warning — and that they cannot prompt it away.
  ↳ checks: having hunted in their own domain, the learner can explain (unprompted) that confidence is not evidence of correctness, and name where the model sounded sure but was wrong/unverifiable.

- **`01-DSCN-03` · locate-jagged-risk** — The learner can locate where hallucination risk is high vs low — low over supplied material (summarising their document), high over remembered specifics (citations, statistics, dates, names, niche facts) — and calibrate suspicion to the work accordingly.
  ↳ checks: during their own hunt the learner aims suspicion where the risk sits — trusting a summary of supplied material, scrutinising remembered specifics (citations, statistics, dates, names) — and can say which of their own tasks are riskiest and why.

- **`01-DSCN-05` · cited-not-verified** — The learner treats a citation as unverified until opened — never trusting an unopened source — and tests formulas/calculations on a case where they already know the answer.
  ↳ checks: in conversation and in their checklist, the learner states "cited is not verified" and "open the source / test on a known case" as standing checks.

- **`01-DSCN-06` · write-verification-checklist** — The learner can write a stakes-calibrated verification checklist for their own outputs — what they will always check, sometimes check, and never worry about — rejecting both "verify everything" and "trust everything" as unusable.
  ↳ checks: artifact `verification-checklist.md`, organised by stakes, naming checks specific to their real outputs; the learner can justify why a low-stakes item isn't checked.

- **`01-DLGT-06` · make-it-compute** — The learner can redirect the agent from estimating to *computing* — asking it to write and run a deterministic calculation and show its working — rather than accepting a fluent guessed number.
  ↳ checks: on a real question the learner requires the computed-with-working treatment and the answer is produced by a rerunnable computation, not an estimate.

- **`01-DSCN-07` · check-the-numbers** — The learner can judge a delivered number the way they judge prose — knowing a fluent estimate is *more* dangerous than an obvious error because it invites trust — and checks at least one figure independently.
  ↳ checks: on a computed answer the learner verifies one figure against a known value or by hand, and can say why a plausible-but-wrong number is the trap.
