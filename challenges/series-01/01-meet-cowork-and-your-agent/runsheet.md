---
# Authoring rationale (provenance / design-decisions / derivations / change-log) lives beside this runsheet in authoring-notes.md — it never ships (build excludes it by name).
id: "01-L-7MWQ"
slug: meet-cowork-and-your-agent
concept: "getting oriented in Cowork — what your AI coworker is, what it can do, and how to find your way around — met by watching it change a real file"
time: { min: 15, max: 25 }
scaffolding: guided
failure_first: false
vehicle: none
kit_contribution: none
covers_outcomes:
  - { uid: 01-DSCN-01, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DLGT-09, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DLGT-11, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DESC-10, evidence_kind: live-action,    role: floor, floor_confirmable: true }
  - { uid: 01-DSCN-11, evidence_kind: live-action,    role: floor, floor_confirmable: true }
  - { uid: 01-DILG-12, evidence_kind: live-action,    role: floor, floor_confirmable: true }
  - { uid: 01-DLGT-10, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DSCN-12, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DLGT-12, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DILG-14, evidence_kind: live-action,    role: floor, floor_confirmable: true }
  - { uid: 01-DILG-15, evidence_kind: live-action,    role: floor, floor_confirmable: true }
  - { uid: 01-DILG-18, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DILG-16, evidence_kind: live-action,    role: floor, floor_confirmable: true }
reconfirms: []
share_moment: false
widgets:
  - { id: orient-lesson, kind: templated, when: lesson }
---

## Task — floor / stretch

The lesson is delivered as the two-slide **`orient-lesson`** widget — **Slide 1** the lesson (what an agent
is · what happens when you ask) and **Slide 2** the activity (the four steps + take-with-you). Frame it in
your own words; the widget carries the fixed content, you carry the tailoring in the debrief.

- **Floor — the activity (a break-out to a new task).** The learner starts a **new task** pointed at their
  series folder (`series-01-foundations`), sends a first instruction to create `first-day.md`, and **opens
  the file themselves** to confirm it's really there — closing the send → act → verify loop and learning
  start-a-new-task + find-your-folder by doing them. Then, still in the break-out, **one real micro-ask
  from their own world** — small and true (three subject lines for a real email; a tidy-up of a real
  paragraph) — so day one already touches their actual work, however lightly. Back in the home base they
  recount what happened and, in dialogue, articulate what the agent *is* / *isn't*, its scope, what `.md`
  is, and its limits — the conversational outcomes you confirm at debrief. In `first-day.md` they also add
  first impressions and name one kind of work they'd like help with (the S-3 seed — pre-seed it from the
  onboarding workflow profile rather than asking cold).
- **Stretch.** Point one bigger, real instruction at the agent — something from the kind of work they'd
  like help with — and verify the result themselves before trusting the summary.

## Parameters

- **The fixed lesson content is the widget** (deterministic, same for everyone); **your generative work is
  the debrief** — tailor to their world, confirm the outcomes, capture the `first-day.md` seed + workflow
  profile. Don't re-teach the widget's content turn-by-turn.
- The first instruction must create a **real file the learner then opens themselves** — the send → act →
  find loop has to *close*, not be described. If they only read the agent's *"done!"*, the beat hasn't landed.
- The activity runs in a **new task in the series folder** (a break-out); `first-day.md` lands there.
- Keep the `first-day.md` "kind of work you'd like help with" line **light and guided** (offer examples) —
  a seed we return to, not a heavy exercise.
- The two named limits (`01-DLGT-12`) must include the **memory limit** and the **file-reach limit**.

## Rubric

One criterion per covered outcome (1:1; references the uid; evidence_kind lives only in the frontmatter).

- **01-DSCN-01** — Articulates what an AI agent is and at least two of the three things it's not (not a
  search engine; not a database of their facts; not learning in real time), and uses that to set
  expectations; `first-day.md` captures a surprise, an intention, and a skepticism.
- **01-DLGT-09** — Describes that the agent *acted on a real file* (created `first-day.md`), not merely
  returned chat text, and can point to the actual file.
- **01-DLGT-11** — Can say, unprompted at review, that what they're learning transfers beyond this window —
  the same engine has other faces (e.g. Claude Code).
- **01-DESC-10** — Sent a first concrete instruction, the file appeared, and they confirmed the send → act
  → see loop closed end to end.
- **01-DSCN-11** — Verified the claimed action by opening the real file themselves rather than trusting the
  agent's summary — the seed of the verification habit.
- **01-DILG-12** — Located the workspace folder and opened an agent-produced file independently of the
  chat, and can state where that folder lives — finished work is never trapped in a conversation.
- **01-DLGT-10** — Names the folder the agent is working in and that it acts within that scope, not across
  their whole computer.
- **01-DSCN-12** — Describes what a `.md` file is and why the agent defaults to portable plain-text
  formats, and opens it comfortably rather than treating it as something technical.
- **01-DLGT-12** — Names at least two things the agent can't do on its own, including the memory limit and
  the file-reach limit.
- **01-DILG-14** — Started a fresh session unaided and can explain that a new chat won't carry prior
  context unless it was written down.
- **01-DILG-15** — Resumed earlier work by reopening their workspace, and can tell whether prior progress
  actually loaded rather than assuming it did.
- **01-DILG-18** — Recognises a usage/limit pause as a temporary metered cap with work saved, and knows how
  to resume when it clears.
- **01-DILG-16** — Deliberately summoned the next step in their own words (e.g. *"continue my course"*) and
  it triggered — they can return to the course on purpose.

## Learning-guide notes

runs in: series

- **Delivery — the deterministic two-slide widget.** `orient-lesson` carries the whole lesson: Slide 1 (the
  lesson) → *"Now try it yourself →"* → Slide 2 (the activity + take-with-you). Frame it in your own words;
  never paste this runsheet. The fixed content is the widget's job; the tailoring is yours, at debrief.
- **The break-out bracket** (brief → break out → return + capture-back). Brief here in the home base
  (instantiate the widget); the learner **breaks out to a new task in `series-01-foundations`** for the
  activity; they return and you run the debrief + capture-back (read `first-day.md` cross-folder, write
  progress / outcomes home). This lesson *teaches* the day-one navigation the break-out needs
  (start-a-new-task, find-your-folder) — the widget + your link scaffold it, so the break-out is a taught
  moment, not a surprise.
- **The take-with-you link (guide behaviour).** The learner loses the widget when they start the new task
  (Cowork is single-window), so **write the four activity steps to a small HTML file and drop a clickable
  link below the widget** — *"Click here to get this in your browser so you can refer to it while you
  work."* A widget can't open a window itself (a `data:` link is scanner-blocked).
- **The AHA is catch-it-in-the-act:** the felt moment is send → *go find the real file*.
  `did-it-actually-act` + `find-the-work` are the seed of the whole verification spine — praise the instinct
  to check; never wave it off.
- **`first-day.md` is the learner's own + the S-3 series seed:** the "kind of work you'd like help with"
  line is harvested much later — keep it light, and anchor any future callback on **this file** (durable
  state), never on "remember your first lesson" (lesson-design §3.4). Onboarding already captured their
  hand-over task — echo it back here, don't re-ask (a re-asked question is the fastest way to lose them).
- **The micro-ask keeps day one real (real-material-first, §3.3):** something tiny and true from their
  world, right after the first-day.md loop closes. It costs two minutes, and it converts "it made a file"
  into "it helped me" — the value ramp the next lesson (a full real delegation) climbs. Don't let it
  balloon; the full delegation discipline is the next lesson's job.
- **Coach, never the doer (P8):** the learner starts the task, sends the instruction, and opens the file
  themselves. If you do it for them, the live-action outcomes aren't theirs.
- **The debrief is the generative part (P7):** confirm the 13 outcomes on real evidence (the file + the
  recounting / dialogue), tie the lesson to their real work, capture the workflow profile + the seed, and
  reflect — what surprised them about watching it change a real file.
- **Not compulsory by design:** a returning or expert learner may advance past day one; the S-5 felt-fade
  re-reads `first-day.md`, which exists for anyone who did this beat.
