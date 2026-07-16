---
# Authoring rationale (provenance / design-decisions / derivations / change-log) lives beside this runsheet in authoring-notes.md — it never ships (build excludes it by name).
id: "01-L-WRFD"
slug: delegate-something-real
concept: "handing a first real piece of your own work to the agent and staying the owner — pick well, keep a copy so bold asks are cheap, read what you approve, and send the draft back"
time: { min: 20, max: 35 }
scaffolding: guided
failure_first: false
vehicle: documents
kit_contribution: none
covers_outcomes:
  - { uid: 01-DLGT-01, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DLGT-02, evidence_kind: artifact,       role: floor, floor_confirmable: true }
  - { uid: 01-DILG-13, evidence_kind: artifact,       role: floor, floor_confirmable: true }
  - { uid: 01-DILG-10, evidence_kind: live-action,    role: floor, floor_confirmable: true }
  - { uid: 01-DILG-19, evidence_kind: live-action,    role: floor, floor_confirmable: true }
  - { uid: 01-DILG-11, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DILG-17, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DILG-16, evidence_kind: live-action,    role: floor, floor_confirmable: true }
reconfirms: []
share_moment: false
widgets:
  - { id: delegate-lesson, kind: templated, when: lesson }
---

## Task — floor / stretch

The lesson is delivered as the two-slide **`delegate-lesson`** widget — **Slide 1** the lesson (what
makes a good first delegation · the owner loop · the three habits that make it safe) and **Slide 2**
the activity. Frame it in your own words; the widget carries the fixed content, you carry the
tailoring — **open by naming the hand-over task from their workflow profile** ("you said report
cards eat your week — let's hand one over today") so the lesson starts inside their world.

- **Floor — delegate one real document task, owner's-eyes open (a break-out to a new task in the
  series folder).** The learner picks a **real task from their own work** (input exists, output
  shape known, their own domain — they say *why* it's a good first pick), brings the real material
  into `series-01-foundations` — **pausing first** to check it for other people's private
  information / confidential material / credentials and substituting stand-ins where needed — and
  **copies anything they can't afford to lose** before the agent touches it. They brief the task in
  their own words, **read what the agent proposes at the live approval moments and say it back**
  before agreeing, and receive the draft. Then the owner loop: **save a copy of the draft, ask for a
  bold revision in their own words**, compare the two, keep the best of both — and run **one
  deliberate restore round-trip from the copy** so recovery is a practised move, not a theory.
  Back in the home base they recount it: why the task was a good pick, which agent actions deserve
  the careful look (delete / overwrite / move — "I can't easily get it back"), and what the
  paste-pause is for.
- **Stretch.** Point the same loop at the task they'd been *hesitant* to let the agent near — with
  a copy in hand and read-before-approve as reflex, courage is now cheap.

## Parameters

- **The task must be real** — something they actually need this week, drawn from the workflow
  profile captured at onboarding. A practice task defeats the lesson (real-material-first): the
  deliverable IS the value.
- **Good-first-delegation traits** (the learner names them, the guide doesn't lecture): the input
  already exists · the output has a known shape · it's their own domain, so they can judge the
  result at a glance.
- **Copy-before-courage, framed as courage.** The copy is never taught as disaster insurance after
  a staged crash — it's what makes the **bold ask** affordable: *"copy it first, then you can say
  yes to anything."* Both patterns get the habit: copy a **source file** the agent will edit, and
  copy the **draft** before requesting the aggressive rewrite.
- **Read-before-approve is durable, not UI-pinned.** *"Before the agent changes or deletes a file
  it says what it's about to do and waits — read that, say it back, decide."* True whether Cowork
  shows a modal prompt or an in-chat go-ahead; name the *"always allow"* reflex as the one to
  resist for destructive actions while learning.
- **The revision is the point, not a failure.** At least one revision request in the learner's own
  words; the final artifact must reflect it. If the bold rewrite loses something they liked, the
  restore from the copy is the recovery moment — if it doesn't, they still run one restore
  round-trip to prove the route ("prove your seatbelt works once").
- **Recovery has three routes** — undo, ask the agent to put it back, restore from the copy — and
  the copy is the one that **always** works.

## Rubric

One criterion per covered outcome (1:1; references the uid; evidence_kind lives only in the
frontmatter).

- **01-DILG-16** · invoke-help-deliberately — shows at this lesson's opening beat: the learner
  summoned it in their own words (e.g. *"continue my course"*) and it triggered — they return to
  the course on purpose. (Evidence arises before the lesson content starts; observed, never staged.)
- **01-DLGT-01** — Picked a real task and can name why it's a good first delegation (input exists /
  shape known / their own domain so they can judge it); the chosen task actually meets those
  traits.
- **01-DLGT-02** — Requested at least one revision in their own words and the final artifact
  reflects it; treats the draft as a draft for their judgment and can say whether they'd actually
  use the result and why.
- **01-DILG-13** — A duplicate of material that matters exists **before** the agent's edit run (the
  source copy and/or the saved v1 draft before the bold rewrite) — the copy-before-courage habit
  done, not merely described.
- **01-DILG-10** — At a live moment where the agent states what it's about to do, the learner
  paused, **paraphrased** the action in their own words, and chose deliberately; names and resists
  the *"always allow"* reflex.
- **01-DILG-19** — Got a prior state back on real material (the observed restore round-trip from
  their copy — or undo / asking the agent) rather than freezing, and can name the three recovery
  routes.
- **01-DILG-11** — Asked which agent actions deserve a careful look, singles out **delete /
  overwrite / move** over an ordinary edit, tying it to *"I can't easily get it back."*
- **01-DILG-17** — Before bringing real material in, flagged anything sensitive (other people's
  private information, confidential material, credentials) and substituted a safer stand-in, with a
  pointer to the fuller treatment later.

## Learning-guide notes

runs in: series

- **Delivery — the deterministic two-slide widget.** `delegate-lesson` carries the fixed lesson;
  your generative work is the personalisation (name their profile task at the open) and the
  debrief. Never paste this runsheet.
- **The break-out bracket** (brief → break out → return + capture-back). Brief in the home base
  (instantiate the widget, name their task); the learner breaks out to a **new task in
  `series-01-foundations`** where the real material and all artifacts land; they return and you run
  the debrief + capture-back (read the artifacts cross-folder; write progress home).
- **The take-with-you link (guide behaviour).** Write the activity steps to a small HTML file and
  drop a clickable link below the widget — *"Click here to get this in your browser so you can
  refer to it while you work."* (Cowork is single-window; the widget is gone once they break out.)
- **The AHA is double:** *"it actually did my work"* (the draft of a real task landing) and *"the
  copy is what made me brave"* (the bold ask was free). Let both land at debrief — ask what they
  noticed about their own hesitation before vs after the copy.
- **The paste-pause fires at material-picking time** (01-DILG-17): when they reach for real
  material, ask once — *"anything in there that isn't yours to share? swap it for a stand-in"* —
  and point forward to the full safety treatment later in the series. Once is enough; don't nag.
- **Two-kind flag (01-DILG-13).** Its `checks` are artifact-**OR**-conversational; derived
  **artifact** here because the drill grades the copy the learner actually makes. If review ever
  prefers the stated rule instead, that's a conversational re-pin — flagged, never silently
  switched.
- **Coach, never the doer (P8).** The learner picks the task, makes the copies, gives the bold
  instruction, and does the restore themselves. If you do it for them, the live-action outcomes
  aren't theirs.
- **The debrief is the generative part (P7).** Confirm the seven outcomes on real evidence (the
  copies that existed, the observed pause-and-paraphrase, the restore, the final artifact, and the
  dialogue for the conversational three), update the workflow profile with what you learned about
  their work, and reflect — would they ship the result? What would they hand over next?
- **Not compulsory by design:** an experienced delegator may advance past; the habits are encoded
  durably later in their CLAUDE.md safety rules (which creates-or-extends regardless of path).

## Outcomes

_Generated at build — the grading bars for this lesson's covered outcomes, so this shipped runsheet is self-contained for grading. Do not edit here; this section is regenerated on every build._

- **`01-DLGT-01` · choose-a-delegation** — The learner can choose a good task to hand to an agent rather than delegating by reflex — selecting work whose input already exists, whose output has a known shape, and which sits in their own domain so they can judge the result at a glance.
  ↳ checks: the learner picks a real task and can name why it's a good first delegation (input exists / shape known / they can judge it); the chosen task meets those traits.

- **`01-DLGT-02` · stay-the-owner** — The learner treats a delegated result as a *draft for their judgment* and runs the brief→receive→review→revise loop, requesting at least one revision as a normal part of the work rather than accepting the first output or treating revision as failure.
  ↳ checks: a revision was requested in the learner's own words and the final artifact reflects it; the learner can say whether they'd actually use the result and why.

- **`01-DILG-13` · copy-before-courage** — Before letting the agent loose on a file that matters, the learner makes a copy first — adopting "a copy makes courage cheap" at the operational level, ahead of the version-control treatment much later.
  ↳ checks: a duplicate of an important file exists before an edit run — or its absence is caught at that run. (Motor-habit seed of `01-DILG-06`.)  · substrate: claude

- **`01-DILG-10` · read-before-approving** — The learner can read an approval / permission prompt before acting on it, say in plain language what the agent is about to do, and choose approve or decline deliberately rather than clicking through reflexively.
  ↳ checks: during a live prompt the learner pauses, paraphrases the action ("it wants to delete this file"), and states a reason for their choice; the reflex "always allow" anti-pattern is named and avoided. (Floor under `09-DILG-01`, which owns allowlist/approval-mode depth.)  · substrate: claude

- **`01-DILG-19` · recover-from-a-bad-action** — The learner can respond to an agent doing the wrong thing — undo it, ask the agent to put it back, or restore from the copy they made — rather than freezing or assuming the work is ruined.
  ↳ checks: after a wrong edit, the learner gets the prior state back and can name their recovery options before approving risky actions. (Pairs with `01-DILG-13` copy-before-courage; `08-DILG-01` undo-for-agents specialises it.)  · substrate: claude

- **`01-DILG-11` · spot-irreversible-actions** — The learner can distinguish a reversible action (editing text they can re-edit) from an irreversible one (deleting or overwriting a file) and treats the irreversible ones with more caution when approving.
  ↳ checks: when a destructive action (delete/overwrite/move) comes up in the learner's real delegation, they treat it with more caution than an ordinary edit, tying the difference to "I can't easily get it back."  · substrate: claude

- **`01-DILG-17` · pause-before-pasting** — Before pasting or dragging material into the agent on day one, the learner can pause and ask whether it contains other people's private information, confidential business material, or credentials — not blundering in before the full treatment.
  ↳ checks: when reaching for something sensitive during onboarding, the learner flags it and substitutes a safer stand-in; a pointer to the full treatment is made once. (Thin precursor to `01-DILG-01`/`01-DILG-02`.)  · substrate: claude

- **`01-DILG-16` · invoke-help-deliberately** — The learner knows how to summon their learning guide / a skill on purpose (e.g. "continue my course", "review this") rather than assuming the right help loads invisibly — so they are never stuck not knowing how to get the next step.
  ↳ checks: the learner re-enters the course or asks for a review using their own words and it triggers; in review the learner can say they know how to call for the next thing rather than waiting for it to appear.  · substrate: claude
