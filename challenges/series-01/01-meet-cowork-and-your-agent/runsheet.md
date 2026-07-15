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
  - { uid: 01-DSCN-01, evidence_kind: emergent,       role: floor, floor_confirmable: true }
  - { uid: 01-DLGT-09, evidence_kind: emergent,       role: floor, floor_confirmable: true }
  - { uid: 01-DLGT-11, evidence_kind: emergent,       role: floor, floor_confirmable: true }
  - { uid: 01-DESC-10, evidence_kind: live-action,    role: floor, floor_confirmable: true }
  - { uid: 01-DSCN-11, evidence_kind: live-action,    role: floor, floor_confirmable: true }
  - { uid: 01-DILG-12, evidence_kind: live-action,    role: floor, floor_confirmable: true }
  - { uid: 01-DLGT-10, evidence_kind: emergent,       role: floor, floor_confirmable: true }
  - { uid: 01-DSCN-12, evidence_kind: emergent,       role: floor, floor_confirmable: true }
  - { uid: 01-DLGT-12, evidence_kind: emergent,       role: floor, floor_confirmable: true }
  - { uid: 01-DILG-14, evidence_kind: live-action,    role: floor, floor_confirmable: true }
  - { uid: 01-DILG-15, evidence_kind: live-action,    role: floor, floor_confirmable: true }
  - { uid: 01-DILG-18, evidence_kind: emergent,       role: floor, floor_confirmable: true }
reconfirms: []
share_moment: false
widgets:
  - { id: orient-lesson,  kind: templated,   when: lesson }
  - { id: orient-debrief, kind: interactive, when: debrief }
---

## Steps

### S1 · Present the lesson  *(home base · guide)*
Present **`orient-lesson`** — Slide 1 the lesson, Slide 2 the activity. Then, **immediately after
the widget, as its own chat message**, post a markdown link to the shipped `orient-takeaway.html`
(beside this runsheet in your install), exactly: *"Click [**here**](<path to orient-takeaway.html>)
to open the instructions in your browser."*
- confirms: —

### S2 · Break-out — the activity  *(new task in `series-01-foundations` · learner)*
The learner, unaided: starts a new task (**Home** tab → **+ New**, **Cowork** selected) → points it
at `series-01-foundations` (**Project or folder**) → sends the exact first instruction (create
`first-day.md` with today's date + their name) → **opens the file themselves**. The loop closes on
their own click — the agent's *"done!"* read in chat is not the beat.
- confirms: 01-DILG-14 · 01-DESC-10 · 01-DSCN-11 · 01-DILG-12

### S3 · Return — check the work  *(home base · guide)*
On the learner's return, read `series-01-foundations/first-day.md` before any talk. The file
existing with their content is the confirmation the loop closed. Reinforce the check-it-yourself
habit, briefly.
- confirms: 01-DILG-15 (they came back to the home base and picked the work up — resume, observed)

### S4 · Debrief — the impressions widget  *(home base · guide)*
Present **`orient-debrief`** — three questions: *"What are you excited about?"* · *"What are you
sceptical about?"* · *"What makes you nervous?"*. On handback, **append the three answers to
`first-day.md`**. Expect the write permission prompt; frame it as the agent asking before touching
their file. Respond to what they share — never turn it into a check.
- confirms: —

### Watched — emergent; never staged, confirmed the moment one surfaces (this sitting included)
- 01-DSCN-01 — the agent mental model; the mid-series checkpoint quiz confirms it, or unprompted
  earlier.
- 01-DLGT-09 — surfaces whenever the agent acts on their real files in later lessons; capstone
  reconfirms.
- 01-DLGT-10 — surfaces whenever folder scope matters in later lessons; capstone reconfirms.
- 01-DSCN-12 — taught by the Slide-1 `.md` callout; confirm when `.md` next comes up in real work.
- 01-DLGT-12 — the memory limit bites at the CLAUDE.md beat, the file-reach limit at the safety
  beat; or unprompted here.
- 01-DLGT-11 — unprompted here, else a later beat.
- 01-DILG-18 — if a metered pause is actually hit, else a later beat.
