---
# Authoring rationale (provenance / design-decisions / derivations / change-log) lives beside this runsheet in authoring-notes.md — it never ships (build excludes it by name).
id: "01-L-EBD3"
slug: run-a-big-job
concept: "running consequential work — stage a big job, put your judgment at the checkpoints, restart when it drifts, own what goes out under your name"
time: { min: 25, max: 40 }
scaffolding: independent
failure_first: false
vehicle: analytics
kit_contribution: none
covers_outcomes:
  - { uid: 01-DESC-06, evidence_kind: artifact,       role: floor, floor_confirmable: true }
  - { uid: 01-DSCN-08, evidence_kind: live-action,    role: floor, floor_confirmable: true }
  - { uid: 01-DESC-09, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DILG-05, evidence_kind: live-action,    role: floor, floor_confirmable: true }
reconfirms: []
share_moment: false
widgets:
  - { id: bigjob-lesson, kind: templated, when: lesson }
---

## Task — floor / stretch

The lesson is delivered as the two-slide **`bigjob-lesson`** widget — **Slide 1** the lesson
(why one breath wanders · checkpoints where your judgment enters · restart as the
experienced move · own what ships) and **Slide 2** the activity. Frame it in your own
words; the widget carries the fixed content, you carry the tailoring — **open at their
delegation map** (*"the candidates you marked — which one is ready to be run for real?"*),
or have them name a meaty task now if no map exists.

- **Floor — stage a real big job and run it to done (a break-out to a new task in the
  series folder).** The learner picks a **real multi-part deliverable from their own
  work** — a meaty task from their delegation map, or one they name now — preferably one
  with numbers running through it (this lesson's flavour), and big enough that a
  one-breath ask would visibly disappoint. With you they cut it into **3–6 staged pieces
  and set a checkpoint wherever *their* judgment should enter** — what they will judge at
  each, in their own criteria, not just stage names (probe the cut — *"where would a
  wrong structural guess hurt most?"* — but the cut is theirs). They break out to a new
  task in `series-01-foundations`, **write the staged plan to a file as their first
  move**, then run the job stage by stage: at every checkpoint a **substantive verdict**
  — specific praise or a specific change, in their own words, one line added under the
  stage in the plan file as they go — and if the session drifts, the **experienced
  move**: stop correcting, start a fresh task with a better brief that carries the
  lessons. The floor ends with the job actually **done** — a real deliverable, given
  their own final check before they'd put their name on it — brought home for debrief.
- **Stretch.** Stage the next candidate from their map entirely unaided — no coaching at
  the plan step — and compare where they placed their judgment this time.

## Parameters

- **The job must be real and meaty** — a multi-part deliverable they actually need: a
  report from scattered notes, a quarter's review over a messy folder, a proposal, a
  structured document over their records. A practice task defeats the lesson; the
  deliverable is the value.
- **Reference the map as an artefact, never as homework done elsewhere** — *"a meaty task
  from your delegation map, or one you name now"*; if no map exists, elicit the task on
  the spot and move on.
- **The staging is theirs.** 3–6 pieces, checkpoints placed where their judgment enters,
  written down before execution. Classic chain if they want a seed: gather → outline →
  draft one section → review it → draft the rest → final pass.
- **"Fine, continue" is not a verdict.** Every checkpoint gets specific praise or a
  specific change; the self-catch — noticing yourself about to wave a stage through, and
  stopping to look again — is part of the skill being taught.
- **Restart is a named move, never engineered.** Corrected the same problem twice without
  progress? The move is a fresh task with a better brief — drift lingers in a session's
  context. Never derail a run to force the demonstration.
- **Done means done.** The floor ends with the deliverable finished and the learner's own
  final, stakes-appropriate check run before it's treated as final.

## Rubric

One criterion per covered outcome (1:1; references the uid; evidence_kind lives only in
the frontmatter).

- **01-DESC-06** — Inspect the staged plan file: it existed before execution, cut into
  3–6 pieces with the learner's own checkpoint criteria (what they'd judge, not just
  stage names), and at least one mid-course correction shows in the final deliverable.
- **01-DSCN-08** — Every checkpoint in the run got a substantive verdict — specific
  praise or a specific change, never "fine, continue" — at least one produced a
  course-correction, the learner either caught themselves about to wave a stage through
  or can name where they'd have been tempted to, and can say which checkpoint earned
  its keep.
- **01-DESC-09** — Can say, in conversation, when they'd start a fresh session rather
  than keep correcting — drift lingers in context; the restart carries the lessons —
  ideally shown once if the run actually derailed.
- **01-DILG-05** — Ran (not just described) a stakes-appropriate check before treating a
  result as final, at least once unprompted, and names the most expensive mistake the
  agent could make in their job plus their check for it.

## Learning-guide notes

runs in: series

- **Delivery — the deterministic two-slide widget.** `bigjob-lesson` carries the fixed
  lesson; your generative work is the task pick (from the map's marked candidates —
  degrade gracefully to naming one now), the plan critique, and the debrief. Never paste
  this runsheet.
- **The break-out bracket** (brief → break out → return + capture-back). Cut the stages
  together here in the home base (instantiate the widget, probe the checkpoint
  placement); the learner **breaks out to a new task in `series-01-foundations`**, writes
  the plan file first, and runs the job there; they return and you run the debrief +
  capture-back (read the plan file, its verdict lines, and the deliverable cross-folder;
  write progress home).
- **The take-with-you link (guide behaviour).** Write their staged plan + the checkpoint
  discipline to a small HTML file and drop a clickable link below the widget — *"Click
  here to get this in your browser so you can refer to it while you work."* (Cowork is
  single-window; the widget is gone once they break out.)
- **The almost-"ok" is the lesson's heart.** Prime it at briefing: at each checkpoint,
  find the one specific thing to praise or change — *"about to type 'ok'? look again."*
  At debrief ask where they almost waved a stage through and what made them stop; grade
  the verdicts from the plan's verdict lines + the break-out work, never from a bare
  claim.
- **Restart-as-expertise, not defeat.** If their run drifts and they restart with a
  better brief, celebrate the move — *"that's the experienced move; drift lingers, the
  lessons come with you."* If the run never drifts, confirm the when-to-restart judgment
  in conversation — never engineer a derail.
- **Own-the-verification is pride, not chore.** Watch for the unprompted check before
  they call it done — *"anything that goes out under my name"* is the register. A learner
  asking you to just call it finished is the coaching moment, not a pass.
- **Two-kind flags (lesson-design §4).** 01-DESC-06's checks are artifact-or-live; pinned
  **artifact** — the rubric inspects the staged plan and the correction visible in the
  finished deliverable. 01-DILG-05's checks demand "runs (not just describes) …
  unprompted"; pinned **live-action** — the rubric grades the observed check, with the
  most-expensive-mistake naming folded in. Flagged, never silently switched.
- **Coach, never the doer (P8).** The cut, the verdicts, the restart call, and the final
  check are the learner's. If you stage it for them, the checkpoint outcomes aren't
  theirs.
- **The debrief is the generative part (P7).** Confirm the four outcomes on real evidence
  (the plan file with its verdict lines, the finished deliverable, the dialogue); this
  was analytics-flavoured work where numbers ran through it — record what number-work
  recurs for them (workflow profile). Reflect: which checkpoint earned its keep, and
  where would they cut differently next time?
- **Not compulsory by design:** an experienced operator may advance past; the checkpoint
  discipline is re-confirmed wherever staged work recurs (the capstone's build re-touches
  it).
