---
# Authoring rationale (provenance / design-decisions / derivations / change-log) lives beside this runsheet in authoring-notes.md — it never ships (build excludes it by name).
id: "01-L-HDXN"
slug: build-your-own-machine
concept: "the capstone — commission a reusable machine for a real recurring task of your own: the kit you built briefs it, real cases prove it, and you own the result — pay for judgment once, keep the machine forever"
time: { min: 40, max: 60 }
scaffolding: open
failure_first: false
vehicle: none
kit_contribution: { slot: machine, label: "Your working machine" }
covers_outcomes:
  # — the five OWNED outcomes —
  - { uid: 01-DLGT-07, evidence_kind: artifact,       role: floor,     floor_confirmable: false }
  - { uid: 01-DSCN-09, evidence_kind: conversational, role: floor,     floor_confirmable: true }
  - { uid: 01-DILG-08, evidence_kind: conversational, role: floor,     floor_confirmable: true }
  - { uid: 01-DILG-09, evidence_kind: conversational, role: floor,     floor_confirmable: true }
  - { uid: 01-DSCN-10, evidence_kind: live-action,    role: floor,     floor_confirmable: true }
  # — the RE-TOUCH of the other 48 taught uids (the retrieval pass; graded as observed in the build) —
  - { uid: 01-DLGT-01, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DLGT-02, evidence_kind: live-action,    role: reconfirm, floor_confirmable: true }
  - { uid: 01-DLGT-03, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DLGT-04, evidence_kind: artifact,       role: reconfirm, floor_confirmable: true }
  - { uid: 01-DLGT-05, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DLGT-06, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DLGT-08, evidence_kind: artifact,       role: reconfirm, floor_confirmable: true }
  - { uid: 01-DLGT-09, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DLGT-10, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DLGT-11, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DLGT-12, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DESC-01, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DESC-02, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DESC-03, evidence_kind: artifact,       role: reconfirm, floor_confirmable: true }
  - { uid: 01-DESC-04, evidence_kind: artifact,       role: reconfirm, floor_confirmable: true }
  - { uid: 01-DESC-05, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DESC-06, evidence_kind: live-action,    role: reconfirm, floor_confirmable: true }
  - { uid: 01-DESC-07, evidence_kind: artifact,       role: reconfirm, floor_confirmable: true }
  - { uid: 01-DESC-08, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DESC-09, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DESC-10, evidence_kind: live-action,    role: reconfirm, floor_confirmable: true }
  - { uid: 01-DSCN-01, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DSCN-02, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DSCN-03, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DSCN-04, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DSCN-05, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DSCN-06, evidence_kind: artifact,       role: reconfirm, floor_confirmable: true }
  - { uid: 01-DSCN-07, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DSCN-08, evidence_kind: live-action,    role: reconfirm, floor_confirmable: true }
  - { uid: 01-DSCN-11, evidence_kind: live-action,    role: reconfirm, floor_confirmable: true }
  - { uid: 01-DSCN-12, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-01, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-02, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-03, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-04, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-05, evidence_kind: live-action,    role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-06, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-07, evidence_kind: artifact,       role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-10, evidence_kind: live-action,    role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-11, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-12, evidence_kind: live-action,    role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-13, evidence_kind: artifact,       role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-14, evidence_kind: live-action,    role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-15, evidence_kind: live-action,    role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-16, evidence_kind: live-action,    role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-17, evidence_kind: live-action,    role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-18, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
  - { uid: 01-DILG-19, evidence_kind: conversational, role: reconfirm, floor_confirmable: true }
share_moment: true
widgets:
  - { id: machine-lesson, kind: templated, when: lesson }
---

## Task — floor / stretch

The lesson is delivered as the two-slide **`machine-lesson`** widget — **Slide 1** the lesson (the
matched set · pay for judgment once · the rungs · the kit check) and **Slide 2** the activity. The
widget carries the fixed content; you carry the four generative beats that make this the capstone:
the **reveal** (read from their real kit), the **audit**, the **harvest**, and the **close**.

- **The reveal — before anything is built.** Name sycophancy and hallucination as siblings — both
  fluent, both confident, both tilted away from truth — and let the second half land: the learner
  has **already built both guards**. The skill that grills them guards the input; their
  verification checklist guards the output. *"You didn't collect tips; you built a matched set."*
  Put the kit on the table by **reading what actually exists in their setup** — the delegation
  map, the brief template, the grill-me skill, the checklist, the `CLAUDE.md` with its safety
  rules — naming each honestly, including anything missing. Machinery they own, about to
  commission more machinery.
- **Floor — commission the machine (a break-out to a new task in the series folder).** The audit
  opens it: an honest retro on how they now work — what's holding, what they'd do differently —
  and the biggest *"differently"* becomes the build target, chosen from the **capstone candidates
  marked on their delegation map** (*"the machine you're about to build is the task you flagged
  the day you mapped your work"*; if no mark exists, choose the target together on the spot). Then
  the commissioning: the brief is **grilled** — if they own the grill-me skill, they run it on
  themselves, the first piece of machinery briefing the last — and signed off; they pick the
  **lowest rung that does the job** (template → checklist → formula → a script the agent writes
  and runs → a staged workflow); the agent builds while they judge at every gate; the machine is
  **tested on at least two real cases**, one where they already know what good looks like; and a
  short **how-to-use note in their own words** lands beside it, so future-them can run it without
  remembering today.
- **The close — own it, and feel the distance.** They draw the honest line between what the
  machine produces and what they judge — the thinking recognisably theirs — and say when they'll
  next *run* it. Then, if `first-day.md` exists, re-read it together: *"you wrote that on day one;
  look what you just built unaided."* This is not a test. It's commissioning something they run
  next week.
- **Stretch.** Run the machine on this week's real occurrence, unaided — or add a second rung
  (the checklist gains a formula; the template gains a script) where the first real run showed
  the job wanted more.

## Parameters

- **Real and recurring, or it doesn't count.** The task must be the learner's own, and one that
  comes back — weekly, monthly, every project. **A toy or practice machine does not pass**: the
  keystone outcome is confirmed only by the real build (there is no defined practice task here —
  the real commissioning *is* the floor).
- **The reveal reads real state only.** The kit named at the open is what actually exists in
  their folder and setup — never a fabricated tally. A missing piece is named honestly and worked
  around, not papered over.
- **The target comes from their map.** Harvest a marked capstone candidate from the delegation
  map; degrade gracefully — no map or no mark, elicit the target on the spot ("what recurring
  task eats your week?").
- **Lowest rung that does the job.** The rung is chosen and justified — a script where a template
  would do is over-build; a manual ritual a formula could absorb is under-build. Discuss, don't
  lecture.
- **The brief is grilled and signed off before building.** With their grill-me skill where they
  own it (it should interrogate the machine's inputs, outputs, edge cases, and how they'll know
  it works); in its spirit otherwise. No building until the learner has signed the brief.
- **Commissioned, never hand-implemented.** The learner directs, judges, and signs off; the agent
  writes and runs whatever machinery is needed. Their ceiling is commission / verify / ship — a
  non-technical professional building working infrastructure to their own spec.
- **Tested, not trusted.** At least two runs on genuinely different real inputs, at least one
  against a case where they already know the right answer. If it breaks, they describe the
  failure and the agent fixes — name that loop as normal engineering, not a stumble.
- **Documented in their voice.** A short how-to-use note beside the machine: what it does, how to
  ask for a run, what to check after. Written by them, understandable by them in a month.
- **The standing habits stay in force.** Copies before bold edits, the pause before real material
  comes in, approvals read and said back, their safety rules governing the build — the whole
  series is quietly present in this one job, and that presence is what the re-touch pass grades.
- **Scope to version one.** Finishable in this sitting: version one handles the normal case; edge
  cases are version two. Too ambitious, carve the core; too timid, ask what would make it matter.

## Rubric

One criterion per covered outcome (1:1; references the uid; evidence_kind lives only in the
frontmatter). Five owned outcomes graded in full; the 48 re-touches graded **as observed in the
machine-build work** — a conversation over the build's evidence, never 48 separate exercises.

- **01-DLGT-07** — Inspect the machine: a working, reusable machine for a real recurring task of
  their own, runnable again on new inputs, tested on at least two real cases, with a how-to-use
  note in their own words beside it; in the same debrief dialogue the learner says when they'll
  next *run* it and puts "pay for judgment once, keep the machine forever" in their own words.
- **01-DSCN-09** — In the reveal dialogue, pairs sycophancy and hallucination as siblings — both
  fluent, confident, tilted away from truth — and locates the two countermeasures correctly: the
  skill that grills them guards the input; their verification checklist guards the output.
- **01-DILG-08** — The commissioning audit is an honest retro, without shame: what worked, what
  they'd change, whether the folder scope is still sensible, past sharing, and whether "approve"
  has become a reflex — naming at least one thing they'd now do differently, or defending why
  their current practice is already sound.
- **01-DILG-09** — Owns the result: the brief, the plan, and the verdicts are recognisably the
  learner's; they narrate their loop (why this task, what the grilling surfaced, what they
  verified and why) and draw the honest line between what the machine produces and what they
  judge.
- **01-DSCN-10** — Watched for, never staged — confirm as live-action when it surfaces: at some
  point in the build the learner spontaneously reaches for a habit they built, unprompted, on
  material it was never demonstrated on, and can say why it fits. Confirmed on the first genuine
  instance and celebrated; never gated, never set up as a hoop.

**Reconfirmed in the build (the retrieval pass)** — the 48 re-touches, graded on the build's
evidence. *(A bold group label, deliberately not a `###` heading: the runsheet parser starts a new
section at any heading, which would orphan these criteria from the rubric's bijection.)*

- **01-DLGT-01** — Reconfirmed in the build: the machine's task is a sound delegation and they name why — the input exists, the output shape is known, it's their domain to judge.
- **01-DLGT-02** — Reconfirmed in the build: at least one revision asked for in their own words during testing, and the machine reflects it — the first cut treated as a draft for their judgment.
- **01-DLGT-03** — Reconfirmed in the build: they sort the task's rules-work (what the machine absorbs) from its judgment-work (what stays theirs), with the sorting reason stated.
- **01-DLGT-04** — Reconfirmed in the build: the delegation map is real and read at the harvest — recurring tasks bucketed with sound reasons, the capstone target at home on it.
- **01-DLGT-05** — Reconfirmed in the build: they name what this machine will never absorb — the human-only part — and defend keeping it as a decision in its own right, not a gap.
- **01-DLGT-06** — Reconfirmed in the build: they locate where the machine must compute rather than estimate, and any figure it produced came from a rerunnable calculation with working shown.
- **01-DLGT-08** — Reconfirmed in the build: the machine sits on the lowest rung that does the job and they justify the rung — no script where a template would do, no ritual a formula could absorb.
- **01-DLGT-09** — Reconfirmed in the build: they describe the agent acting on real files throughout — a coworker doing work, not a chat window — and can point at one action it took.
- **01-DLGT-10** — Reconfirmed in the build: they name the folder the build ran in and that the agent acts within that scope, not silently across their whole computer.
- **01-DLGT-11** — Reconfirmed in the build: they can say the machine and the moves behind it transfer beyond this window — one engine, many faces.
- **01-DLGT-12** — Reconfirmed in the build: they name concrete things the agent can't do on its own, the memory limit and the file-reach limit among them.
- **01-DESC-01** — Reconfirmed in the build: the machine's brief carried all four loads — context, audience, format, success criteria — before any building began.
- **01-DESC-02** — Reconfirmed in the build: the brief reads like briefing a capable newcomer on day one — relevant specifics and a real example, no magic-keyword hunting.
- **01-DESC-03** — Reconfirmed in the build: their brief template exists in the kit, the four loads recognisable in their own voice, and fed how this machine was briefed.
- **01-DESC-04** — Reconfirmed in the build: the installed grill-me skill exists and fires when invoked — its interrogation briefed this machine, catching what the lazy ask would have missed.
- **01-DESC-05** — Reconfirmed in the build: they explain what a skill is — a small file of standing instructions loaded when relevant — and the teach-it-once-versus-retype-it trade.
- **01-DESC-06** — Reconfirmed in the build: the build ran as staged pieces with checkpoints placed where their judgment enters, not handed over in one breath.
- **01-DESC-07** — Reconfirmed in the build: their `CLAUDE.md` exists at about a screen in their real work folder and has proved itself in a fresh session *there* — preferences honoured without being re-told (run the quick proof during the build if it hasn't been seen yet).
- **01-DESC-08** — Reconfirmed in the build: the memory file's lines pass the pruning test — they can defend a cut, or say what a kept line prevents.
- **01-DESC-09** — Reconfirmed in the build: they can say when they'd stop correcting a drifted session and restart with a better brief — the experienced move, not defeat.
- **01-DESC-10** — Reconfirmed in the build: instructions sent in their own words landed as real actions — the send → act → see loop closing without help.
- **01-DSCN-01** — Reconfirmed in the build: their working model of the agent holds — what it is, and at least two of the three things it is not — and sets their expectations for the machine.
- **01-DSCN-02** — Reconfirmed in the build: they state, where it matters, that the confident voice is no evidence of correctness — fluent and wrong arrive sounding identical.
- **01-DSCN-03** — Reconfirmed in the build: they locate where this machine's risk runs high versus low — supplied material versus remembered specifics — and aim their suspicion accordingly.
- **01-DSCN-04** — Reconfirmed in the build: they can say why "what do you think?" hires a cheerleader and how framing assigns the critic's role — the reason the brief gets grilled.
- **01-DSCN-05** — Reconfirmed in the build: cited-is-not-verified stands as their rule — sources get opened before trust, and the machine was tested against a case where they already knew the answer.
- **01-DSCN-06** — Reconfirmed in the build: their verification checklist exists, stakes-calibrated to their real outputs, and drove how the machine's test outputs were checked.
- **01-DSCN-07** — Reconfirmed in the build: they treat a delivered figure the way they treat prose — the plausible number is the trap — and checked one independently wherever the tests produced numbers.
- **01-DSCN-08** — Reconfirmed in the build: every checkpoint got a substantive verdict — specific praise or a specific change — with no stage waved through on "fine, continue".
- **01-DSCN-11** — Reconfirmed in the build: claimed actions got verified — they opened the machine's real output themselves rather than trusting the chat's summary.
- **01-DSCN-12** — Reconfirmed in the build: the `.md` files around the machine are treated as normal, openable plain text, and they can say why the agent defaults to it.
- **01-DILG-01** — Reconfirmed in the build: the three keep-out categories named as real material went in — other people's private information, confidential business material, credentials.
- **01-DILG-02** — Reconfirmed in the build: they can walk the scrub move — find, replace with placeholders, say why each was sensitive — and scrubbed wherever the test material needed it.
- **01-DILG-03** — Reconfirmed in the build: the build's folder scope is deliberate and confirmed sensible, and they state the more-irreversible-the-more-awake-the-approval rule.
- **01-DILG-04** — Reconfirmed in the build: outside material joining the machine's inputs gets unknown-USB-stick caution — they explain hidden instructions well enough to warn a colleague.
- **01-DILG-05** — Reconfirmed in the build: they ran a stakes-appropriate check on the machine's output before treating it as final, at least once unprompted — verification owned, not performed.
- **01-DILG-06** — Reconfirmed in the build: keep-a-copy stands as their standing rule — stated with when it applies, and honoured ahead of the machine's consequential runs.
- **01-DILG-07** — Reconfirmed in the build: their safety rules live in `CLAUDE.md` in their own words — sharing, scope, approvals — and they can say how those rules govern their real-work sessions, this build's habits included.
- **01-DILG-10** — Reconfirmed in the build: at live approval moments they read what the agent was about to do, said it back in plain words, and chose on purpose.
- **01-DILG-11** — Reconfirmed in the build: they single out delete / overwrite / move for the awake look — "I can't easily get it back" — over ordinary edits.
- **01-DILG-12** — Reconfirmed in the build: they found the machine and its outputs in the real folder and opened them outside the chat — the work never trapped in a conversation.
- **01-DILG-13** — Reconfirmed in the build: a copy existed before the machine's bold edits touched anything that matters.
- **01-DILG-14** — Reconfirmed in the build: the build's fresh task was started on purpose, knowing it starts blank unless something was written down.
- **01-DILG-15** — Reconfirmed in the build: they came back to the series across sittings with progress intact — and could tell it actually loaded rather than assuming it did.
- **01-DILG-16** — Reconfirmed in the build: they summoned the capstone and its next steps in their own words rather than waiting for help to appear.
- **01-DILG-17** — Reconfirmed in the build: a pause happened as real material came in — anything private, confidential, or credential-shaped flagged and stood in for.
- **01-DILG-18** — Reconfirmed in the build: a usage pause reads as a metered cap, not a broken course — work saved, resume route known, handled calmly if one hit.
- **01-DILG-19** — Reconfirmed in the build: before the machine's riskiest run they name all three recovery routes — undo, ask the agent to put it back, restore from the copy.

## Learning-guide notes

runs in: series

- **Delivery — the deterministic two-slide widget.** `machine-lesson` carries the fixed lesson;
  your generative work is everything that makes it the capstone — the reveal, the audit, the
  harvest, and the debrief. Never paste this runsheet.
- **The reveal is read from real state — never fabricated (P5).** Before anything is built, read
  what actually exists: the delegation map, the brief template, the grill-me skill, the
  verification checklist, `CLAUDE.md` and its safety rules. Name what's really there; where a
  piece is missing, say so plainly and work with what exists — the widget's kit checklist is
  static for the same reason (the learner checks it against their real folder). The matched-set
  line only lands if the two guards are genuinely theirs.
- **The S-3 harvest, with its fallback.** The target comes from the capstone candidates marked on
  their delegation map — read the mark back to them; the loop they opened when they mapped their
  work closes here. If no mark or no map exists on this learner's path, elicit the target on the
  spot ("what recurring task eats your week?") — never pretend a mark existed.
- **The break-out bracket** (brief → break out → return + capture-back). Reveal, audit, and
  harvest here in the home base; the learner breaks out to a **new task in
  `series-01-foundations`** for the commissioning, where the machine and its note land; they
  return and you run the close + capture-back (read the machine, note, and test outputs
  cross-folder; write progress home). Drop the take-with-you steps as a browser link below the
  widget, as ever — they lose the widget when they break out.
- **Two-kind pick on 01-DLGT-07 (flagged, never silent).** Its checks imply artifact AND
  conversational; pinned **artifact** — the working machine plus its how-to-use note is what the
  rubric inspects. The conversational half — "pay for judgment once, keep the machine forever" in
  their own words, and when they'll next run it — is graded **within the same criterion's
  dialogue at debrief**, not as a second criterion.
- **01-DSCN-10 is watched for, never staged — confirm as live-action when it surfaces.** The
  build brims with natural transfer moments;
  confirm it on the first genuinely unprompted one (a habit they built, reached for on material
  it was never demonstrated on) and **celebrate it by name** — "that's the checklist move, and
  nobody asked you for it." Never gate the floor on it, never engineer a test for it; if the
  session somehow ends without one, it simply stays unconfirmed and the pathway holds.
- **The grading posture — 53 criteria, one conversation.** The five owned outcomes get the full
  treatment. The re-touch pass is graded **as observed in the build**: the artifacts on disk, the
  moments you watched, and the debrief dialogue are the evidence — never 48 separate exercises,
  never an oral exam. Honest verdicts, kind and strict (P9): a `refine` names the specific gap
  and the next step, never "fail".
- **Share moment — the one true flag in the series.** This beat passes the bar the others don't:
  a real artifact (a working machine for their own work), an authentic milestone (the series
  complete), and it survives would-I-post. Offer the share once, warmly, after the close — never
  push, and never manufacture the moment if the machine underwhelmed them.
- **The felt fade (S-5) — anchored on the file, never on memory.** If `first-day.md` exists,
  re-read it together at the close: *"you wrote that on day one; look what you just built
  unaided."* If it doesn't, degrade to the forward-looking close — the machine they run next
  week, and what they'd hand over next. Anchor on durable state; never an ungated "remember
  when…".
- **Completion.** When every taught outcome stands confirmed, the review skill's COMPLETE gate
  closes the series and their completion credential issues — one pointer; the runtime owns the
  mechanics.
- **Coach, never the doer (P8).** The learner chooses, briefs, judges, signs off, and writes the
  note; the agent may write and run every line of the machinery. That division is not just
  method — it is exactly what the ownership criterion grades.
- **Not a test — commissioning.** Hold the register to the end: no exam voice, no drumroll. The
  reward is the machine and the certificate; the emotional payoff is the distance travelled,
  named at last and earned.

## Outcomes

_Generated at build — the grading bars for this lesson's covered outcomes, so this shipped runsheet is self-contained for grading. Do not edit here; this section is regenerated on every build._

- **`01-DLGT-07` · build-the-machine-once** — The learner can commission a reusable *machine* for a recurring task — the lowest rung that does the job (template → checklist → formula → a script Claude writes and runs → a staged workflow) — applying "pay for judgment once, keep the machine forever" instead of redoing the task by hand each time.
  ↳ checks: a working, reusable machine for a real recurring task plus its `how-to-use.md`, runnable again on new inputs; the learner can say when they'll next *run* it.

- **`01-DSCN-09` · pair-the-failure-modes** — The learner can connect sycophancy and hallucination as siblings — both fluent, confident, and tilted away from truth — and locate their two countermeasures: the grill-me skill guards the input, the verification checklist guards the output.
  ↳ checks: in conversation the learner pairs the two failure modes and assigns each guard to input vs output.

- **`01-DILG-08` · audit-my-practice** — The learner can run an honest retro on their own past practice — what worked, what they'd do differently, and how their habits are holding up (including whether their folder scope is sensible and whether "approve" has become a reflex) — not only their safety reflexes — and name at least one thing they'd now do differently, without shame.
  ↳ checks: the retro covers what worked and what they'd change as well as folder scope, past sharing, and approval habits; the learner identifies a change they'd make or defends why their current practice is already sound.

- **`01-DILG-09` · own-the-result** — The learner can keep the thinking behind delegated work recognisably their own and be transparent about what the agent produced versus what they judged — owning the result rather than hiding behind the tool.
  ↳ checks: in the capstone the brief, plan, and verdicts are recognisably the learner's; in review they can narrate their loop (why this task, what the grilling surfaced, what they verified and why).

- **`01-DSCN-10` · transfer-a-move** — The learner can take a habit they built — grilling a brief, decomposing with checkpoints, computing rather than estimating — and apply it, unprompted, to a task it was never demonstrated on.
  ↳ checks: in a later challenge the learner spontaneously reaches for a prior move on new material and can say why it fits.

- **`01-DLGT-01` · choose-a-delegation** — The learner can choose a good task to hand to an agent rather than delegating by reflex — selecting work whose input already exists, whose output has a known shape, and which sits in their own domain so they can judge the result at a glance.
  ↳ checks: the learner picks a real task and can name why it's a good first delegation (input exists / shape known / they can judge it); the chosen task meets those traits.

- **`01-DLGT-02` · stay-the-owner** — The learner treats a delegated result as a *draft for their judgment* and runs the brief→receive→review→revise loop, requesting at least one revision as a normal part of the work rather than accepting the first output or treating revision as failure.
  ↳ checks: a revision was requested in the learner's own words and the final artifact reflects it; the learner can say whether they'd actually use the result and why.

- **`01-DLGT-03` · sort-judgment-vs-rules** — The learner can sort a piece of work into judgment/language work (where an AI model is the right tool) versus fully-specifiable rules-work (where a deterministic tool — formula, script, filter, template — is better because it's rerunnable, auditable, and right every time), applying "if you can fully write down the rules, don't use the model to guess them."
  ↳ checks: given real tasks, the learner buckets them with a stated reason that shows the sorting rule; "AI because it's hard" is caught and corrected.

- **`01-DLGT-04` · build-delegation-map** — The learner can build a delegation map of their own recurring work — each real task triaged AI / deterministic / hybrid / human-only with one line of reasoning — and can decompose at least one hybrid task into its AI part and its deterministic part.
  ↳ checks: artifact `delegation-map.md` with 8+ real tasks, each bucketed with a sound reason; at least one hybrid genuinely split; 1–2 "capstone candidates" marked.

- **`01-DLGT-05` · keep-it-human** — The learner can identify work to keep human-only — relationships, accountability, judgment calls they own — and can defend *not* delegating it as a delegation decision in its own right, not a gap.
  ↳ checks: the delegation map's human-only bucket is populated with a defended reason; in conversation the learner can name something they will deliberately never hand over and why.

- **`01-DLGT-06` · make-it-compute** — The learner can redirect the agent from estimating to *computing* — asking it to write and run a deterministic calculation and show its working — rather than accepting a fluent guessed number.
  ↳ checks: on a real question the learner requires the computed-with-working treatment and the answer is produced by a rerunnable computation, not an estimate.

- **`01-DLGT-08` · pick-the-right-rung** — The learner can choose the *simplest* tool that solves a recurring task — recognising over-build (a script where a template would do) and under-build (not seeing that a tool could absorb a manual copy-paste ritual).
  ↳ checks: in the capstone the machine sits on the lowest adequate rung and the learner can justify the rung; OR at debrief the learner re-sorts a task they'd previously over/under-automated.

- **`01-DLGT-09` · agent-not-chatbot** — The learner can state that the thing in front of them is an *agent* that can open, read, create, and edit files and take actions in their workspace — not only a chat window that returns text — and can name one action it took on a file during the session.
  ↳ checks: the learner describes, in their own words, that the agent "did something to a file" (created/edited/moved), corroborated by an actual file the agent created or changed during onboarding.  · substrate: claude

- **`01-DLGT-10` · name-workspace-scope** — The learner can identify which folder the agent is currently working in and articulate that the agent acts within that scope — that it is not silently operating over their whole computer.
  ↳ checks: in the course of real work — pointing a session at a folder, or finding where output landed — the learner names the folder the agent is working in (or asks the agent and reads it back correctly), and can say that files outside it are not in play by default.  · substrate: claude

- **`01-DLGT-11` · same-engine-many-faces** — The learner can state that Cowork is one face of the agent and that the same engine has other surfaces (e.g. Claude Code) they may meet later — so "the agent" is a capability, not a single screen.
  ↳ checks: the learner can say, unprompted at review, that what they're learning transfers beyond this one window. (Day-one reassurance only; the depth is owned by `09-DLGT-01`.)  · substrate: claude

- **`01-DLGT-12` · name-surface-limits** — The learner can name at least two things the surface/agent cannot do on its own — e.g. it will not remember this conversation in a brand-new chat unless something was written down, it cannot reach files they never brought into the workspace, and memory and skills load automatically in their workspace but must be pasted into a plain chat.
  ↳ checks: as the limits surface in real work — a fresh session starting blank, a file outside the workspace out of reach — the learner names them as expected behaviour rather than breakage; the memory limit and the file-reach limit are the two that must appear. (Scoped to operational consequences; the fuller "three things it is not" model is `01-DSCN-01`.)  · substrate: claude

- **`01-DESC-01` · carry-four-loads** — The learner can brief a task carrying the four loads — context, audience, format, success criteria — and can name what each load does, recognising that generic output is usually a hollow brief rather than a weak model.
  ↳ checks: an improved brief identifiably carries all four loads; the learner can say what each does and which one they personally tend to drop.

- **`01-DESC-02` · brief-like-newcomer** — The learner can brief the agent the way they'd brief a capable newcomer on day one — supplying relevant specifics rather than hunting for "magic keywords" — and can recognise that more relevant detail beats clever phrasing.
  ↳ checks: the same task briefed vague then specifics-rich (run live, in fresh sessions that write nothing), with two concrete output differences named; the learner attributes the improvement to specifics, not phrasing. *(2026-07-01: dropped the legacy `before-after.md` artifact — the re-composed demo is writes-nothing by design; the evidence is the recounted contrast.)*

- **`01-DESC-03` · distil-brief-template** — The learner can distil a reusable brief template in their own words that they'd still understand in a month — making good briefing repeatable rather than re-invented each time.
  ↳ checks: artifact `my-brief-template.md` in the learner's own voice, the four loads recognisable however phrased; it joins the kit.

- **`01-DESC-04` · build-grill-me-skill** — The learner can build and use a personal skill that inverts the briefing relationship — Claude interrogates *them* one question at a time until it could write the brief itself, challenges weak premises, and shows the brief for sign-off before doing anything — so gaps in their asks are caught by machinery, not memory.
  ↳ checks: an installed `grill-me` skill that fires when invoked; its body (the learner's own words) encodes interview-until-complete, challenge-the-premise, and brief-sign-off-before-work; a proof run surfaced something the learner's lazy ask had omitted.

- **`01-DESC-05` · explain-a-skill** — The learner can explain what a skill *is* — a small file of instructions (name, a description of when it applies, a body) that Claude loads when relevant — and that teaching it once makes the behaviour automatic every time.
  ↳ checks: walking their own skill file (e.g. the grill-me skill they built), the learner points at its parts — name, the when-it-applies description, the body — and contrasts "teach it once and it fires automatically" with re-typing the instruction each session. (The craft of skills is owned by 07.)

- **`01-DESC-06` · decompose-with-checkpoints** — The learner can break a big job into 3–6 staged pieces with checkpoints placed where *their* judgment should enter (gather → outline → draft one section → review → draft the rest → final pass), instead of handing over a whole project in one breath.
  ↳ checks: a staged plan existed before execution with the learner's own checkpoint criteria (not just stage names); at least one mid-course correction occurred and shows in the final artifact.

- **`01-DESC-07` · write-agent-memory** — The learner can write a persistent memory file the agent reads at the start of every session — encoding who they are, how they like output, their conventions, and their always/never rules — so persistent preferences are engineered with a file rather than re-explained each chat.
  ↳ checks: a `CLAUDE.md` exists in the workspace, fits ~one screen, encodes real preferences traceable to their template/checklist/map (not boilerplate), and proved itself in a fresh session that followed preferences it was never told.

- **`01-DESC-08` · apply-pruning-test** — The learner can keep a memory file short and sharp by applying the pruning test to every line — "would removing this cause a mistake?" — recognising that a bloated file gets skimmed and buried instructions get missed.
  ↳ checks: the learner's `CLAUDE.md` is roughly one screen and every line plausibly passes the pruning test; the learner can defend a cut they made.

- **`01-DESC-09` · restart-with-better-brief** — The learner can recognise when a session has derailed *or simply run too long / wandered* and stop correcting it, starting fresh with a *better* brief that carries the lessons — knowing that failed attempts and accumulated drift linger in a session's context and that restarting is the experienced move, not defeat.
  ↳ checks: in conversation the learner can say when they'd start a fresh session rather than keep correcting; ideally demonstrated once when a run derails. (Operational floor owned by `01-DILG-14`.)

- **`01-DESC-10` · first-instruction-lands** — The learner can type a single concrete instruction to the agent, send it, and recognise in the result that the agent did what was asked — closing the first send→act→see loop end to end.
  ↳ checks: the learner sends a first real instruction (e.g. "create a file called notes.md and write one line in it"), the file appears, and the learner confirms the loop completed.  · substrate: claude

- **`01-DSCN-01` · model-the-agent** — The learner can articulate what an AI agent is and the three things it is not — not a search engine (confidently wrong is possible), not a database (knowledge cutoff; doesn't know their company's facts unless shown), not learning from them in real time — and use that model to set expectations.
  ↳ checks: the learner can state at least two of the "three things it is not" in their own words.

- **`01-DSCN-02` · confident-not-correct** — The learner can recognise that a wrong answer arrives in the same fluent, confident voice as a right one — that hallucination is a property of the technology with no tone-of-voice warning — and that they cannot prompt it away.
  ↳ checks: having hunted in their own domain, the learner can explain (unprompted) that confidence is not evidence of correctness, and name where the model sounded sure but was wrong/unverifiable.

- **`01-DSCN-03` · locate-jagged-risk** — The learner can locate where hallucination risk is high vs low — low over supplied material (summarising their document), high over remembered specifics (citations, statistics, dates, names, niche facts) — and calibrate suspicion to the work accordingly.
  ↳ checks: during their own hunt the learner aims suspicion where the risk sits — trusting a summary of supplied material, scrutinising remembered specifics (citations, statistics, dates, names) — and can say which of their own tasks are riskiest and why.

- **`01-DSCN-04` · recognise-sycophancy** — The learner can recognise sycophancy — the agent's trained lean toward agreement — and knows that framing assigns the role: "what do you think?" hires a cheerleader, "argue against this / red-team this" hires a critic.
  ↳ checks: across two fresh-session demos (praise-seeking vs critique-seeking on a half-baked idea of their own) the learner names the difference in register and can explain *why* it happens; can warn a colleague.

- **`01-DSCN-05` · cited-not-verified** — The learner treats a citation as unverified until opened — never trusting an unopened source — and tests formulas/calculations on a case where they already know the answer.
  ↳ checks: in conversation and in their checklist, the learner states "cited is not verified" and "open the source / test on a known case" as standing checks.

- **`01-DSCN-06` · write-verification-checklist** — The learner can write a stakes-calibrated verification checklist for their own outputs — what they will always check, sometimes check, and never worry about — rejecting both "verify everything" and "trust everything" as unusable.
  ↳ checks: artifact `verification-checklist.md`, organised by stakes, naming checks specific to their real outputs; the learner can justify why a low-stakes item isn't checked.

- **`01-DSCN-07` · check-the-numbers** — The learner can judge a delivered number the way they judge prose — knowing a fluent estimate is *more* dangerous than an obvious error because it invites trust — and checks at least one figure independently.
  ↳ checks: on a computed answer the learner verifies one figure against a known value or by hand, and can say why a plausible-but-wrong number is the trap.

- **`01-DSCN-08` · review-at-checkpoints** — The learner can give a substantive verdict at a checkpoint — specific praise or a specific change — acting as the editor of the agent's work rather than waving stages through with "fine, continue", including catching themselves about to wave work through when no checkpoint was set, and stopping to review unprompted.
  ↳ checks: every checkpoint in a staged job got a real verdict; at least one produced a course-correction; the learner can say which checkpoint earned its keep.

- **`01-DSCN-11` · did-it-actually-act** — The learner can tell the difference between the agent *reporting* that it did something and the agent *actually* having done it — checking that the file/change is really there rather than trusting the chat's summary.
  ↳ checks: at least once the learner verifies a claimed action by looking at the workspace/file itself ("let me check it's actually there") instead of taking the agent's word — the operational seed of the whole verification habit.  · substrate: claude

- **`01-DSCN-12` · know-markdown-default** — The learner can say what a Markdown (`.md`) file is — plain text with light, readable formatting — and why an agent reaches for plain-text/code formats by default (portable, openable anywhere, easy to version), so the files the agent creates aren't a mystery.
  ↳ checks: shown a `.md` file the agent made, the learner can describe what it is, open it, and say in their own words why the agent didn't reach for a heavier format; they treat `.md` as a normal, openable file, not something technical.

- **`01-DILG-01` · name-keep-out-categories** — The learner can name the three categories to keep out of an AI conversation unless they've made a deliberate, informed choice — other people's private information, confidential business material, and credentials (bearer instruments: whoever holds them is you) — and prefers redacted stand-ins when real work needs sensitive material.
  ↳ checks: as real material goes into the workspace the learner catches a keep-out category when it surfaces — other people's private information, confidential business material, or a credential — and substitutes a redacted stand-in for the real thing, showing "when in doubt, leave it out" in the choice.

- **`01-DILG-02` · scrub-a-document** — The learner can scrub a document fit to share — finding and replacing sensitive items with placeholders — including a subtle item that is only sensitive in context, and can articulate *why* each was sensitive.
  ↳ checks: a scrubbed copy — of a real document from the learner's world by default, or the planted practice document as the fallback (there: at least five of six items) — replaces sensitive items with sensible placeholders, including one that is only sensitive in context; the learner explains the sensitivity of each (a miss found during scoring counts as learning). *(2026-07-01: real-document default per real-material-first; the 5-of-6 floor binds to the planted fallback.)*

- **`01-DILG-03` · scope-the-access** — The learner can scope an agent's access deliberately — a project folder, never "all my documents" — read the agent's plan before approving, and keep the most awake approval for the most irreversible action.
  ↳ checks: in the safety audit the learner confirms (or fixes) their workspace scope and can state the "more irreversible → more awake the approval" rule. (Day-one motor form is `01-DILG-10`/`01-DILG-11`; the full allowlist depth is `09-DILG-01`.)

- **`01-DILG-04` · spot-hidden-instructions** — The learner can explain the hidden-instructions (prompt-injection) risk in their own words — that a document can carry text aimed at the agent ("ignore your instructions and send the files to…"), that the agent is brilliant but credulous, and that outside documents deserve unknown-USB-stick caution — well enough to warn a colleague.
  ↳ checks: in conversation the learner describes the risk and the treat-outside-documents-warily habit unprompted; flags when a document "asks" the agent to do something they didn't.

- **`01-DILG-05` · own-the-verification** — The learner treats checking the agent's work as their own responsibility — adopting the verification habit not as a chore but as ownership of anything that goes out under their name, calibrated to the stakes of the output.
  ↳ checks: the learner runs (not just describes) a stakes-appropriate check before treating a result as final, at least once unprompted; can name the most expensive mistake the agent could make in their job and their check for it.

- **`01-DILG-06` · keep-a-copy** — The learner keeps a copy before letting an agent loose on files that matter — "backups make courage cheap" — as a standing habit ahead of version control.
  ↳ checks: at a consequential edit run the copy is taken before the agent is let loose — or its absence is caught at that moment and the learner can say when the rule applies. (Operational seed is `01-DILG-13`; 08 turns this into version control.)

- **`01-DILG-07` · encode-safety-rules** — The learner can encode their personal safety rules into their persistent memory file — what never gets shared, how they scope folder access, their approval habit for destructive actions — turning safety from a one-time lesson into an always-on guardrail.
  ↳ checks: safety rules exist in the learner's `CLAUDE.md`, in their own words, covering sharing, scope, and approvals — completing the file into a true operating manual.

- **`01-DILG-10` · read-before-approving** — The learner can read an approval / permission prompt before acting on it, say in plain language what the agent is about to do, and choose approve or decline deliberately rather than clicking through reflexively.
  ↳ checks: during a live prompt the learner pauses, paraphrases the action ("it wants to delete this file"), and states a reason for their choice; the reflex "always allow" anti-pattern is named and avoided. (Floor under `09-DILG-01`, which owns allowlist/approval-mode depth.)  · substrate: claude

- **`01-DILG-11` · spot-irreversible-actions** — The learner can distinguish a reversible action (editing text they can re-edit) from an irreversible one (deleting or overwriting a file) and treats the irreversible ones with more caution when approving.
  ↳ checks: when a destructive action (delete/overwrite/move) comes up in the learner's real delegation, they treat it with more caution than an ordinary edit, tying the difference to "I can't easily get it back."  · substrate: claude

- **`01-DILG-12` · find-the-work** — The learner can locate, on their own machine, the folder where the agent's work is being saved, and open one file the agent produced outside the chat — so finished work is never trapped inside a conversation.
  ↳ checks: the learner navigates (in Finder/Explorer or via the agent) to the workspace folder and opens a produced file independently of the chat; can state the folder's location in words.  · substrate: claude

- **`01-DILG-13` · copy-before-courage** — Before letting the agent loose on a file that matters, the learner makes a copy first — adopting "a copy makes courage cheap" at the operational level, ahead of the version-control treatment much later.
  ↳ checks: a duplicate of an important file exists before an edit run — or its absence is caught at that run. (Motor-habit seed of `01-DILG-06`.)  · substrate: claude

- **`01-DILG-14` · start-fresh-chat** — The learner can start a brand-new chat / session on purpose and return to it, knowing that a fresh chat starts blank — so they can deliberately separate one piece of work from another instead of piling everything into one runaway conversation.
  ↳ checks: the learner opens a fresh session unaided when asked, and can explain that the new chat won't carry the previous one's context unless it was written down. (Operational floor under `01-DESC-09`.)  · substrate: claude

- **`01-DILG-15` · resume-my-work** — The learner can get back to work they started in an earlier session — reopening their workspace so the agent can pick up the thread — rather than losing progress when a session ends.
  ↳ checks: returning after a break, the learner reopens the agent in their workspace folder and the session resumes with progress intact; the learner knows *where* to go to continue, without being walked through it again, and can tell whether prior progress actually loaded rather than assuming it did.  · substrate: claude

- **`01-DILG-16` · invoke-help-deliberately** — The learner knows how to summon their learning guide / a skill on purpose (e.g. "continue my course", "review this") rather than assuming the right help loads invisibly — so they are never stuck not knowing how to get the next step.
  ↳ checks: the learner re-enters the course or asks for a review using their own words and it triggers; in review the learner can say they know how to call for the next thing rather than waiting for it to appear.  · substrate: claude

- **`01-DILG-17` · pause-before-pasting** — Before pasting or dragging material into the agent on day one, the learner can pause and ask whether it contains other people's private information, confidential business material, or credentials — not blundering in before the full treatment.
  ↳ checks: when reaching for something sensitive during onboarding, the learner flags it and substitutes a safer stand-in; a pointer to the full treatment is made once. (Thin precursor to `01-DILG-01`/`01-DILG-02`.)  · substrate: claude

- **`01-DILG-18` · usage-limit-literacy** — The learner can recognise a usage / credit / limit interruption for what it is — a metered pause, not a broken course or lost work — and knows their work is saved and how to resume when it clears.
  ↳ checks: shown (or hitting) a limit message, names it a temporary cap, confirms progress is safe, and resumes without abandoning the task.  · substrate: claude

- **`01-DILG-19` · recover-from-a-bad-action** — The learner can respond to an agent doing the wrong thing — undo it, ask the agent to put it back, or restore from the copy they made — rather than freezing or assuming the work is ruined.
  ↳ checks: after a wrong edit, the learner gets the prior state back and can name their recovery options before approving risky actions. (Pairs with `01-DILG-13` copy-before-courage; `08-DILG-01` undo-for-agents specialises it.)  · substrate: claude
