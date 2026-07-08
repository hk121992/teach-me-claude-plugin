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
  - { uid: 01-DSCN-10, evidence_kind: emergent,       role: floor,     floor_confirmable: true }
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
- **01-DSCN-10** — Emergent — watched for, never staged: at some point in the build the learner
  spontaneously reaches for a habit they built, unprompted, on material it was never demonstrated
  on, and can say why it fits. Confirmed on the first genuine instance and celebrated; never
  gated, never set up as a hoop.

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
- **01-DSCN-10 is emergent — watch, don't stage.** The build brims with natural transfer moments;
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
