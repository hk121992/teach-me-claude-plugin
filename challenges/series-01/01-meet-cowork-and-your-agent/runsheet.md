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
  - { uid: 01-DSCN-01, evidence_kind: conversational, role: taught, floor_confirmable: true }
  - { uid: 01-DLGT-09, evidence_kind: conversational, role: taught, floor_confirmable: true }
  - { uid: 01-DLGT-11, evidence_kind: conversational, role: taught, floor_confirmable: true }
  - { uid: 01-DESC-10, evidence_kind: live-action,    role: floor,  floor_confirmable: true }
  - { uid: 01-DSCN-11, evidence_kind: live-action,    role: floor,  floor_confirmable: true }
  - { uid: 01-DILG-12, evidence_kind: live-action,    role: floor,  floor_confirmable: true }
  - { uid: 01-DLGT-10, evidence_kind: conversational, role: taught, floor_confirmable: true }
  - { uid: 01-DSCN-12, evidence_kind: conversational, role: taught, floor_confirmable: true }
  - { uid: 01-DLGT-12, evidence_kind: conversational, role: taught, floor_confirmable: true }
  - { uid: 01-DILG-14, evidence_kind: live-action,    role: floor,  floor_confirmable: true }
  - { uid: 01-DILG-15, evidence_kind: live-action,    role: floor,  floor_confirmable: true }
  - { uid: 01-DILG-18, evidence_kind: conversational, role: taught, floor_confirmable: true }
reconfirms: []
share_moment: false
widgets:
  - { id: orient-lesson,  kind: templated,   when: lesson }
  - { id: orient-debrief, kind: interactive, when: debrief }
---

## Steps

### S1 · Present the lesson  *(home base · guide)*
Present **`orient-lesson`** — Slide 1 the lesson, Slide 2 the activity. Then, **immediately after
the widget**, send the learner the shipped take-with-you page **as a file** via the host's
file-send: `orient-takeaway.export.html`, the self-contained copy beside this widget in the
shipped challenge folder. Send those exact bytes — never a filesystem-path link (the learner's
browser can't reach your filesystem), never a re-authored substitute. Close with **one** send-off
beat — action, why it benefits them, come-back cue (*"Off you go — doing it in a fresh task is
the real lesson. Come back here when you've seen the file with your own eyes."*) — and no step
restatement: the widget and the take-with-you file own the steps.
- confirms: —

### S2 · Break-out — the activity  *(new task in `series-01-foundations` · learner)*
The learner, unaided: starts a new task (**Home** tab → **+ New**, **Cowork** selected) → points it
at `series-01-foundations` (**Project or folder**) → sends the exact first instruction (create
`first-day.md` in the `series-01-foundations` folder, today's date + their name at the top) →
**opens the file themselves**. The loop closes on
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

### Watched — role: taught; never staged, confirmed the moment one surfaces (this sitting included)
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

## Outcomes

_Generated at build — the grading bars for this lesson's covered outcomes, so this shipped runsheet is self-contained for grading. Do not edit here; this section is regenerated on every build._

- **`01-DSCN-01` · model-the-agent** — The learner can articulate what an AI agent is and the three things it is not — not a search engine (confidently wrong is possible), not a database (knowledge cutoff; doesn't know their company's facts unless shown), not learning from them in real time — and use that model to set expectations.
  ↳ checks: the learner can state at least two of the "three things it is not" in their own words.

- **`01-DLGT-09` · agent-not-chatbot** — The learner can state that the thing in front of them is an *agent* that can open, read, create, and edit files and take actions in their workspace — not only a chat window that returns text — and can name one action it took on a file during the session.
  ↳ checks: the learner describes, in their own words, that the agent "did something to a file" (created/edited/moved), corroborated by an actual file the agent created or changed during onboarding.  · substrate: claude

- **`01-DLGT-11` · same-engine-many-faces** — The learner can state that Cowork is one face of the agent and that the same engine has other surfaces (e.g. Claude Code) they may meet later — so "the agent" is a capability, not a single screen.
  ↳ checks: the learner can say, unprompted at review, that what they're learning transfers beyond this one window. (Day-one reassurance only; the depth is owned by `09-DLGT-01`.)  · substrate: claude

- **`01-DESC-10` · first-instruction-lands** — The learner can type a single concrete instruction to the agent, send it, and recognise in the result that the agent did what was asked — closing the first send→act→see loop end to end.
  ↳ checks: the learner sends a first real instruction (e.g. "create a file called notes.md and write one line in it"), the file appears, and the learner confirms the loop completed.  · substrate: claude

- **`01-DSCN-11` · did-it-actually-act** — The learner can tell the difference between the agent *reporting* that it did something and the agent *actually* having done it — checking that the file/change is really there rather than trusting the chat's summary.
  ↳ checks: at least once the learner verifies a claimed action by looking at the workspace/file itself ("let me check it's actually there") instead of taking the agent's word — the operational seed of the whole verification habit.  · substrate: claude

- **`01-DILG-12` · find-the-work** — The learner can locate, on their own machine, the folder where the agent's work is being saved, and open one file the agent produced outside the chat — so finished work is never trapped inside a conversation.
  ↳ checks: the learner navigates (in Finder/Explorer or via the agent) to the workspace folder and opens a produced file independently of the chat; can state the folder's location in words.  · substrate: claude

- **`01-DLGT-10` · name-workspace-scope** — The learner can identify which folder the agent is currently working in and articulate that the agent acts within that scope — that it is not silently operating over their whole computer.
  ↳ checks: in the course of real work — pointing a session at a folder, or finding where output landed — the learner names the folder the agent is working in (or asks the agent and reads it back correctly), and can say that files outside it are not in play by default.  · substrate: claude

- **`01-DSCN-12` · know-markdown-default** — The learner can say what a Markdown (`.md`) file is — plain text with light, readable formatting — and why an agent reaches for plain-text/code formats by default (portable, openable anywhere, easy to version), so the files the agent creates aren't a mystery.
  ↳ checks: shown a `.md` file the agent made, the learner can describe what it is, open it, and say in their own words why the agent didn't reach for a heavier format; they treat `.md` as a normal, openable file, not something technical.

- **`01-DLGT-12` · name-surface-limits** — The learner can name at least two things the surface/agent cannot do on its own — e.g. it will not remember this conversation in a brand-new chat unless something was written down, it cannot reach files they never brought into the workspace, and memory and skills load automatically in their workspace but must be pasted into a plain chat.
  ↳ checks: as the limits surface in real work — a fresh session starting blank, a file outside the workspace out of reach — the learner names them as expected behaviour rather than breakage; the memory limit and the file-reach limit are the two that must appear. (Scoped to operational consequences; the fuller "three things it is not" model is `01-DSCN-01`.)  · substrate: claude

- **`01-DILG-14` · start-fresh-chat** — The learner can start a brand-new chat / session on purpose and return to it, knowing that a fresh chat starts blank — so they can deliberately separate one piece of work from another instead of piling everything into one runaway conversation.
  ↳ checks: the learner opens a fresh session unaided when asked, and can explain that the new chat won't carry the previous one's context unless it was written down. (Operational floor under `01-DESC-09`.)  · substrate: claude

- **`01-DILG-15` · resume-my-work** — The learner can get back to work they started in an earlier session — reopening their workspace so the agent can pick up the thread — rather than losing progress when a session ends.
  ↳ checks: returning after a break, the learner reopens the agent in their workspace folder and the session resumes with progress intact; the learner knows *where* to go to continue, without being walked through it again, and can tell whether prior progress actually loaded rather than assuming it did.  · substrate: claude

- **`01-DILG-18` · usage-limit-literacy** — The learner can recognise a usage / credit / limit interruption for what it is — a metered pause, not a broken course or lost work — and knows their work is saved and how to resume when it clears.
  ↳ checks: shown (or hitting) a limit message, names it a temporary cap, confirms progress is safe, and resumes without abandoning the task.  · substrate: claude
