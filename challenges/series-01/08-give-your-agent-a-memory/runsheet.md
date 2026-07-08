---
# Authoring rationale (provenance / design-decisions / derivations / change-log) lives beside this runsheet in authoring-notes.md — it never ships (build excludes it by name).
id: "01-L-YFHH"
slug: give-your-agent-a-memory
concept: "standing instructions — a CLAUDE.md memory file living where your real work happens, read at the start of every session there, kept one-screen sharp by the pruning test and proven in a fresh session; skills named beside it as the on-demand sibling"
time: { min: 20, max: 30 }
scaffolding: independent
failure_first: false
vehicle: none
kit_contribution: { slot: claude_md, label: "CLAUDE.md memory file" }
covers_outcomes:
  - { uid: 01-DESC-07, evidence_kind: artifact,       role: floor, floor_confirmable: true }
  - { uid: 01-DESC-08, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DESC-05, evidence_kind: conversational, role: floor, floor_confirmable: true }
reconfirms: []
share_moment: false
widgets:
  - { id: memory-lesson, kind: templated, when: lesson }
---

## Task — floor / stretch

The lesson is delivered as the two-slide **`memory-lesson`** widget — **Slide 1** the lesson
(amnesia by design · the memory file and its four sections · the pruning test · memory beside
skills) and **Slide 2** the activity. Frame it in your own words; the widget carries the fixed
content, you carry the tailoring — open from their world: *"every session so far, you've
re-explained how you like things done. Today that stops."*

- **Floor — write the memory file where your real work lives, then catch it remembering.** The
  learner **picks (or creates) a real work folder of their own** — a folder where their actual
  work happens, never a course folder — and writes its `CLAUDE.md`: four short sections in
  **their own words** (who I am · how I like output · always · never), dictated to you or typed
  themselves; you do file mechanics only. Then the **pruning pass**: read it line by line
  against the test — *"would removing this line cause a mistake?"* — cutting what fails, until
  it fits about one screen, and defending at least one cut out loud. Then the **proof** (the
  payoff break-out): a **fresh task pointed at that folder**, a deliberately minimal ask for
  something small and real — leaving out everything the file now carries — and they watch a
  preference honoured **that was never mentioned in that session**: *it remembered, and they
  didn't repeat themselves.* Back home they recount what it got right, name the one-line rule
  of where the file works (it loads when you work **in** that folder; a plain chat elsewhere
  needs it pasted), and say what a **skill** is — a small file of instructions (a name, a
  description of when it applies, a body) the agent loads when relevant: teach it once, and the
  behaviour is automatic every time — against the memory file's always-on role.
- **Stretch.** Let the file start gathering the kit: point it at standing artefacts they
  actually own (a brief template, a verification checklist, a delegation map — whatever exists),
  then run one tune loop — whatever the proof session got wrong points at a line that's missing,
  vague, or buried; revise and re-test once on a second real ask.

## Parameters

- **Placement is the rule, said plainly.** The memory file lives in a **real work folder of the
  learner's own** (created in this lesson if they don't have one) — **never at the course
  container root** (the bare root is the load-bearing context mechanism; nothing may sit there),
  and **never in the learning-guide folder** (that holds the course's own contract, not theirs).
  Real-material-first: the file is deployed where their real work happens.
- **The words are the learner's.** You handle file mechanics only; boilerplate fails the lesson.
  Four short sections; about one screen; every line pruned.
- **The proof must be honest.** A genuinely fresh session in that folder, a brief that
  deliberately omits what the file carries, and an observed preference the session was never
  told. It writes nothing to progress or kit — the evidence comes home in the recounting and in
  the real file you read at capture-back.
- **The surface bridge is taught, not implied:** the file auto-loads when working in that
  folder; a plain chat elsewhere doesn't read it — paste it in there when they want the same
  behaviour.
- **The skill explanation stands alone.** Anatomy (name · when-it-applies · body) + the
  teach-once contrast. If a grill-me skill exists in their kit, connect to it; never to a
  sibling lesson.

## Rubric

One criterion per covered outcome (1:1; references the uid; evidence_kind lives only in the
frontmatter).

- **01-DESC-07** — Inspect the real `CLAUDE.md` in the learner's own work folder: it fits about
  one screen, encodes real preferences in their own words traceable to their actual work and kit
  (never boilerplate), and proved itself — the fresh-session proof surfaced a preference honoured
  that the session was never told.
- **01-DESC-08** — In dialogue, the learner applies the pruning test line by line — *"would
  removing this cause a mistake?"* — keeps the file to roughly one screen, and defends a cut
  they made, explaining why a bloated file gets skimmed and buried lines get missed.
- **01-DESC-05** — In conversation, the learner describes a skill's anatomy (a small file of
  instructions: a name, a description of when it applies, a body, loaded when relevant) and
  contrasts "teach it once, automatic every time" with re-typing the instruction each session.

## Learning-guide notes

runs in: fresh

- **Delivery — the deterministic two-slide widget.** `memory-lesson` carries the fixed lesson;
  your generative work is the tailoring (their world, their preferences) and the debrief. Never
  paste this runsheet.
- **The proof break-out is a payoff, not a failure demo.** Brief it (what to ask, what to watch
  for) → the learner opens a **fresh task pointed at their own work folder** — away from your
  contract, so the only standing instructions present are the file they just wrote — → they
  return and recount. The fresh session writes nothing to progress or kit; grade the recounting,
  and read the real file cross-folder at capture-back. The magic must be real (P5): if nothing
  was honoured unprompted, tune one line and re-run — never narrate a success that didn't happen.
- **The placement rule is load-bearing — enforce it kindly.** Their real work folder, created in
  the lesson if needed (it outlives the course). **Never at the course container root** — the
  bare root is what gives every course session clean context — and never in the learning-guide
  folder. If their folder is outside your reach for file mechanics, route the write through a
  new task in that folder with the learner carrying their dictated sections (drop the
  take-with-you link below the widget, as ever — Cowork is single-window).
- **The surface bridge (one plain line — a real learner stumbled exactly here):** *"it loads
  when you work in that folder; a plain chat elsewhere needs it pasted."* Say it once, clearly.
- **The skill connection is state-anchored (lesson-design §3.4).** If a grill-me skill exists in
  their kit, name it — *"you already own one of these; here's what it is."* If it doesn't, teach
  the anatomy on its own and forward-frame. Never reference a sibling lesson.
- **The kit gathers (delight).** The file may point at kit artefacts that actually exist —
  their template, checklist, map — real state only, never a fabricated tally.
- **Coach, never the doer (P8).** The learner's words throughout. If they stuff the file, invoke
  the pruning test line by line; if they're too spare, ask what a temp on day one would still
  get wrong.
- **The debrief is the generative part (P7).** Confirm the three outcomes (the inspected file +
  proof for the artifact; the dialogue for the two conversational), update the workflow profile,
  and reflect: *"what took the course sittings to teach you that this file now teaches in
  seconds?"*
- **Not compulsory by design:** an experienced learner may advance past; the safety-rules kit
  artefact later in the series creates-or-extends this same file regardless of path, and the
  capstone re-touches these outcomes.
