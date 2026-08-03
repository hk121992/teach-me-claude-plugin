---
# Authoring rationale (provenance / design-decisions / derivations / change-log) lives beside this runsheet in authoring-notes.md — it never ships (build excludes it by name).
id: "01-L-WRFD"
slug: delegate-something-real
concept: "drafting a real email from your own work with the agent and staying the owner — brief it in your words, version before the bold rewrite so v1 is always there, read what you approve, and send what you'd sign"
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
  - { uid: 01-DILG-19, evidence_kind: artifact,       role: floor, floor_confirmable: true }
  - { uid: 01-DILG-11, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DILG-17, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DILG-16, evidence_kind: live-action,    role: floor, floor_confirmable: true }
reconfirms: []
share_moment: false
widgets:
  - { id: delegate-lesson, kind: templated, when: lesson }
---

## Steps

### S1 · Open — the deliberate return  *(home base · guide)*
The learner summoned the course in their own words (e.g. *"continue my course"*) and it triggered —
that observed summon IS the evidence, arriving before the lesson content starts; observed, never
staged. If this sitting rolled straight on from an earlier lesson without a fresh summon, let the
outcome wait for a later genuine opening — never manufacture an exit-and-return to collect it.
- confirms: 01-DILG-16

### S2 · Present the lesson  *(home base · guide)*
Present **`delegate-lesson`** — Slide 1 the lesson (today's task: a real email · the owner loop ·
the three habits that make it safe), Slide 2 the activity. Open from their workflow profile toward
the email they need to send (*"you said client updates eat your afternoons — today we draft one
for real"*) so the lesson starts inside their world; the widget carries the fixed content, you
carry the tailoring — never paste this runsheet. Then, **immediately after the widget, as its own
chat message**, post a markdown link to the shipped `delegate-takeaway.html` at its
**plugin-install path**: resolve
`${CLAUDE_PLUGIN_ROOT}/challenges/series-01/02-delegate-something-real/delegate-takeaway.html`
to the absolute path of your install and post *"Open your activity steps in your browser:
[delegate-takeaway.html](<the resolved absolute path>)"* — the visible filename keeps the step
usable even where a chat link doesn't render clickable.
- confirms: —

### S3 · Frame the email + clear the material  *(home base · learner)*
Today's task is **defined: draft a real email from their own work** — one they actually need to
send, seeded from the workflow profile (a client update, a status note, a request). The learner
picks **which** email and says *why* it's a good first delegation. The traits come from them, not
a lecture (the widget just taught them): the input already exists (they know what it must say) ·
the output has a known shape (an email) · it's their own domain, so they can judge the result at a
glance. Check the chosen email genuinely meets the traits — a made-up practice email defeats the
lesson; the deliverable IS the value. No email access is needed: material arrives by paste, and
they send the final themselves. Before any material moves, the one paste-pause ask: *"anything in
there that isn't yours to share — other people's private information, confidential material,
credentials? swap it for a stand-in"* — and name the posture plainly, once: *for now we take a
conservative risk posture; later in the series you'll learn how to decide what's safe to share in
your personal context.* Once is enough; don't nag.
- confirms: 01-DLGT-01 · 01-DILG-17

### S4 · Break-out — the delegation  *(new task in `series-01-foundations` · learner)*
The learner runs the whole loop themselves — coach, never do; if you do it for them, the
live-action outcomes aren't theirs. They: start a new task (**Home** tab → **+ New**, **Cowork**
selected) pointed at `series-01-foundations` (**Project or folder**); paste the cleared material
in (the thread they're answering, their notes, what it must say); brief the job in their own
words — who it's for, what it must accomplish, tone; **read what the agent proposes before
agreeing** — they *may* get a permission request when it acts on files; whenever one comes (or an
action is proposed in chat), read it, say it back in plain words, then decide — durable, never
predicting when or how often, resisting the *"always allow"* reflex while learning; receive the
draft as a file — that's **v1**. Then the owner loop, versioning as the habit: **before the big
rewrite, have the agent start a v2 and keep v1 untouched** — v1 in hand is what makes the bold
ask affordable, never disaster insurance; ask for one **bold** revision in their own words; then
compare the two **line by line** and keep the best of both — pulling back anything v2 lost that
they still want (if v2 is simply better everywhere, say so plainly — never manufacture a loss).
Recovery has three routes — undo, ask the agent to put it back, go back to v1 — and v1 is the
one that always works. The evidence of the whole loop rides the files home.
- confirms: —

### S5 · Return — check the real files  *(home base · guide)*
On the learner's return, **ask before you read** — *"may I open the series folder and read v1
and the final?"* — and have them say back what they're agreeing to before they grant it: that
read-back of a live ask, at home base, is `01-DILG-10`'s observed moment (if the session
surfaces a permission prompt for the read, the same move applies to it; if no ask-moment
genuinely arises, leave the outcome provisional — the capstone reconfirms it live). Then read
the artifacts **before any talk**: **v1 and the final**. v1 sitting on disk beside the final IS
the habit done, not described — the duplicate existed before the bold rewrite by construction —
and the final must reflect the revision the learner asked for in their own words. v1 beside the
final also lets the learner **point at what they pulled back** — the files display, the
recounting attributes; where nothing came back (v2 was simply better), say so and let
`01-DILG-19` wait for a later genuine surfacing rather than manufacturing a loss (the capstone
re-touches it).
- confirms: 01-DILG-13 · 01-DLGT-02 · 01-DILG-19 · 01-DILG-10

### S6 · Debrief — defend the calls  *(home base · guide)*
Talk over the actual outputs on the table (v1 vs the final, what the bold ask changed, what came
back) — the learner defends the calls they made on their own real email, never a staged question
round. Let the double AHA land: ask what they noticed about their own hesitation before vs after
v1 existed (*"it actually wrote my email"* · *"v1 is what made me brave"*). As they recount the
run, the careful-look distinction surfaces — they flag the delete / overwrite / move moments over
the ordinary edits, tied to *"I can't easily get it back"*: that recounting, arising in the story
of their own delegation, is the evidence — never ask it as a quiz question. Fish the break-out's
approval story the same way — *"what did it ask before touching your files, and what did you
make of the ask?"* — corroborating read-before-approve from their own telling; and if no
destructive moment surfaced in their run at all, let `01-DILG-11` wait for a later genuine
surfacing — never stage the distinction. Close as the owner:
would they actually send it, and why — the send is theirs, from their own mail, after the lesson;
and what would they hand over next? Update the workflow profile with what you learned about their
work; a `refine` names specific feedback and the next step, never "fail".
- confirms: 01-DILG-11

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
