---
# Authoring rationale (provenance / design-decisions / derivations / change-log) lives beside this runsheet in authoring-notes.md — it never ships (build excludes it by name).
id: "01-L-KFXG"
slug: map-your-work
concept: "sorting your own recurring work — judgment-work vs rules-work, the simplest tool that does the job, and what stays human — into a delegation map that steers the rest of the course"
time: { min: 20, max: 30 }
scaffolding: fix
failure_first: false
vehicle: none
kit_contribution: { slot: delegation_map, label: "Delegation map" }
covers_outcomes:
  - { uid: 01-DLGT-03, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DLGT-08, evidence_kind: artifact,       role: floor, floor_confirmable: true }
  - { uid: 01-DLGT-04, evidence_kind: artifact,       role: floor, floor_confirmable: true }
  - { uid: 01-DLGT-05, evidence_kind: conversational, role: floor, floor_confirmable: true }
reconfirms: []
share_moment: false
compulsory: true
compulsory_reason: "This one maps your real work — I use it to tailor everything after it, and the machine you'll build at the end is chosen from this map, so it's worth doing even if delegation's already familiar."
widgets:
  - { id: map-lesson, kind: templated, when: lesson }
---

## Task — floor / stretch

The lesson is delivered as the two-slide **`map-lesson`** widget — **Slide 1** the lesson (why map
your work · the four buckets · the rule and the ladder) and **Slide 2** the activity. This one runs
**right here in the learning-guide session** — the sort is a coached dialogue, not a break-out — and
the discovery order is yours to hold: **the sort comes before the rule is named** (send them to the
activity slide first; Slide 1's rule-and-ladder section is read after they've stated their own
criterion).

- **Floor — sort your real week, then keep the map.** From the workflow profile (interview to 8+
  entries if it's thin), the learner lists their **real recurring tasks** and sorts each into
  **AI / deterministic / hybrid / human-only** with one line of reasoning — then **states their own
  criterion** ("what rule were you using?") *before* the rule gets its name: judgment-and-language
  work suits the model; fully-writable rules-work suits a deterministic tool — *if you can fully
  write down the rules, don't use the model to guess them*. Then **re-examine one bucket**: walk one
  confidently-filed task end to end and re-sort it if it moves. **Decompose at least one hybrid**
  into its AI part and its deterministic part, and pick the **simplest rung** that does the
  deterministic part (template → checklist → formula → a script the agent writes and runs → staged
  workflow), saying why not a rung higher. The **human-only bucket** is populated and defended with
  pride. Finally **1–2 capstone candidates** are marked — recurring, deterministic-or-hybrid, worth
  a machine — and the whole thing is saved as **`delegation-map.md`** in `series-01-foundations`:
  the map the rest of the course is tailored by, and the map the course's closing build is chosen
  from.
- **Stretch.** Extend the map past the weekly horizon — the monthly and yearly recurring work is
  where the volume hides — or take the deterministic chore that most annoys them and have the agent
  build its simplest rung right now (a template or checklist is a ten-minute build).

## Parameters

- **The tasks must be real** — their recurring work, in their words, drawn from the workflow profile
  and their own working week. 8+ entries; interview to fill the list, never invent it.
- **Discovery before instruction.** The learner sorts and states their criterion first; the rule is
  named only after, mapped onto their words (keep their vocabulary). Never pre-teach the sort.
- **Challenge weak reasons, never assign buckets.** "AI because it's hard" gets caught and probed —
  hard-for-you can still be rules-work; the question is whether the rules can be fully written down.
- **The re-examine beat.** Have them pick the bucket they're most confident about and walk one task
  through, start to finish. A task that moves is the lesson landing; if nothing moves, say so
  honestly and move on — the probing habit is the win. Never stage a move.
- **The ladder is about restraint.** The simplest rung that does the job: over-build (a script where
  a template would do) and under-build (a copy-paste ritual no tool ever absorbed) both get named
  when seen.
- **Human-only is a decision, not a gap.** Relationships, accountability, judgment calls they own —
  the bucket earns respect, never pushback.
- **The map is the learner's** — their buckets, their reasons, their words. You may hold the pen
  (file mechanics only); the sorting is theirs.

## Rubric

One criterion per covered outcome (1:1; references the uid; evidence_kind lives only in the
frontmatter).

- **01-DLGT-03** — In the sort dialogue, buckets real tasks with stated reasons that show the
  sorting rule — judgment-and-language work to the model, fully-writable rules-work to a
  deterministic tool — having stated their own criterion before it was named; an "AI because it's
  hard" reason was caught and corrected.
- **01-DLGT-08** — The decomposed hybrid's deterministic part carries the simplest adequate rung on
  the map (template → checklist → formula → script → staged workflow), and the learner justifies the
  rung — naming what over-build or under-build would look like for that task.
- **01-DLGT-04** — `delegation-map.md` exists with 8+ real tasks, each bucketed with a sound
  one-line reason; at least one hybrid genuinely split into its AI part and its deterministic part;
  1–2 capstone candidates marked.
- **01-DLGT-05** — The map's human-only bucket is populated with a defended reason, and in
  conversation the learner names something they will deliberately never hand over and why — owned as
  a delegation decision in its own right, not an apology.

## Learning-guide notes

runs in: learning-guide

- **Delivery — the deterministic two-slide widget, activity first.** `map-lesson` carries the fixed
  lesson; the discovery order is yours: instantiate the widget, send them to **Slide 2** for the
  sort, and keep Slide 1's rule-and-ladder section for *after* they've stated their own criterion.
  Never paste this runsheet.
- **This lesson runs in place** — no break-out: the sort happens in this session, and the map is
  assembled from the dialogue. Save `delegation-map.md` to the series folder
  (`series-01-foundations`), where the kit lives.
- **The AHA is the re-sort.** The archetype: a recurring comments-writing chore filed as "a template
  does it" turns out to need per-item judgment — deterministic → hybrid on examination. Let them
  find it; your job is only the probe ("walk me through actually doing it, start to finish").
- **The map points forward (S-3, state-anchored §3.4).** The capstone candidates are the plant: say
  the promise via the artifact — *"the machine you'll build at the end of this course is chosen from
  this map"* — never via a lesson number. Any later callback anchors on `delegation-map.md` itself.
- **Two-kind flag (01-DLGT-08).** Its `checks` are artifact-OR-live (compose §6): the capstone
  machine on the lowest adequate rung, OR a live re-sort of an over/under-automated task at debrief.
  Picked **artifact** — what this rubric grades is the rung recorded on the map with its
  justification; the capstone's re-touch grades the built machine's rung for real. Flagged, never
  silently switched.
- **Compound note (01-DLGT-05).** Its `checks` names both the populated bucket (visible on the map)
  and the in-conversation defence; pinned **conversational** — the defence is what you grade, and
  the bucket corroborates it on the artifact.
- **Don't-AI-everything is liberation, not a caveat.** The deterministic and human-only buckets are
  where this lesson earns a capable learner's trust — rules-work leaving their plate, judgment
  staying theirs on purpose.
- **Coach, never the doer (P8).** The reasons, the criterion, the rung call, and the defence are the
  learner's own words; you do file mechanics only.
- **The debrief is the generative part (P7).** Confirm the four outcomes on real evidence (the map +
  the dialogue), fold what the sort taught you into the workflow profile — this map *is* the profile
  made visible — and reflect: which bucket surprised them when they sorted honestly?
- **Compulsory (confirmed-only skip):** the map is the tailoring input for everything after it and
  the home of the capstone candidates — the pathway may pass it only on confirmed evidence, never on
  forward credit alone.

## Outcomes

_Generated at build — the grading bars for this lesson's covered outcomes, so this shipped runsheet is self-contained for grading. Do not edit here; this section is regenerated on every build._

- **`01-DLGT-03` · sort-judgment-vs-rules** — The learner can sort a piece of work into judgment/language work (where an AI model is the right tool) versus fully-specifiable rules-work (where a deterministic tool — formula, script, filter, template — is better because it's rerunnable, auditable, and right every time), applying "if you can fully write down the rules, don't use the model to guess them."
  ↳ checks: given real tasks, the learner buckets them with a stated reason that shows the sorting rule; "AI because it's hard" is caught and corrected.

- **`01-DLGT-08` · pick-the-right-rung** — The learner can choose the *simplest* tool that solves a recurring task — recognising over-build (a script where a template would do) and under-build (not seeing that a tool could absorb a manual copy-paste ritual).
  ↳ checks: in the capstone the machine sits on the lowest adequate rung and the learner can justify the rung; OR at debrief the learner re-sorts a task they'd previously over/under-automated.

- **`01-DLGT-04` · build-delegation-map** — The learner can build a delegation map of their own recurring work — each real task triaged AI / deterministic / hybrid / human-only with one line of reasoning — and can decompose at least one hybrid task into its AI part and its deterministic part.
  ↳ checks: artifact `delegation-map.md` with 8+ real tasks, each bucketed with a sound reason; at least one hybrid genuinely split; 1–2 "capstone candidates" marked.

- **`01-DLGT-05` · keep-it-human** — The learner can identify work to keep human-only — relationships, accountability, judgment calls they own — and can defend *not* delegating it as a delegation decision in its own right, not a gap.
  ↳ checks: the delegation map's human-only bucket is populated with a defended reason; in conversation the learner can name something they will deliberately never hand over and why.
