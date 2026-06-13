# Series 1 — Foundations (free)

Ten challenges that take a non-technical professional from "never worked
with an AI agent" to confidently delegating real work to Claude in Cowork —
with the judgment to know what to delegate, the guardrails that make good
briefing automatic, and the habits to check the result and stay safe.

**Design notes for the companion**

- **Pacing.** Time budgets are printed on each challenge: 5–10 minutes for
  the opener, 15–20 for the core, 30–60 for the capstone (which may span
  sessions). Short and sharp beats long and complete — if a session is
  running long, park it gracefully and resume next time.
- **Scaffolding fades** across the series: Challenge 1 is a worked example
  the learner studies and modifies; 2–4 are guided fix-and-complete
  exercises; 5–9 are increasingly independent; 10 is an open capstone the
  learner designs.
- **Failure-first is the house style.** Challenges 3, 4, 5, and 6 each let
  the learner *experience* the failure mode (vague brief → mush; sycophancy;
  hallucination; guessed numbers) before the countermeasure is taught. Let
  the failure happen — don't rescue them early.
- **Domain vehicles.** The foundational competencies are taught on tasks
  drawn from the four knowledge-work domains the paid series take deep:
  Challenge 2 uses a **document** task, 3 a **communication** piece, 5 a
  **research** hunt, 6 an **analytics** exercise. Name the domain lightly
  when you debrief ("this kind of work has a whole series later") — preview,
  never pressure.
- **The kit.** Every challenge adds a piece to the learner's personal
  toolkit, which they keep forever: their first **skill** (4), **brief
  template** (3), **verification checklist** (5), **delegation map** (6),
  **CLAUDE.md** with safety rules (8–9), and a **working machine** (10).
  Refer to the kit by name as it grows — it's the series' through-line and
  the thing they graduate with.
- **Debriefs build the workflow profile.** At every review, capture what
  you learn about the learner's real recurring work in
  `.teach-me/progress.json` (`workflow_profile`) and connect the lesson back
  to *their* use cases ("this is exactly your Monday status report"). By
  Challenge 6 the profile seeds their delegation map; by 10 it seeds their
  capstone.
- **Most tasks are defined; real work is the stretch.** Each challenge has
  a defined task as the floor; where the learner has a fitting real task,
  offer it as the stretch path. The capstone is always real work.
- Every challenge produces a real artifact and ends with one reflection
  question (recorded by the `review` skill).
- Competency tags follow the 4D fluency model: **Delegation** (what to hand
  over), **Description** (how to brief), **Discernment** (how to judge
  output), **Diligence** (responsibility, safety, verification).
- **Resources.** Point at `${CLAUDE_PLUGIN_ROOT}/RESOURCES.md` sparingly —
  at debriefs where a pointer genuinely helps (noted per challenge), never
  as a link dump.

**The arc**

| # | Challenge | Concept | Vehicle | Competency | Time |
|---|---|---|---|---|---|
| 1 | Meet your AI coworker | What an LLM agent is — and isn't | — | Discernment | 5–10 |
| 2 | Your first real delegation | Handing over a real task end-to-end | Documents | Delegation | 10–15 |
| 3 | Say what you mean | The brief: context, audience, format, success criteria | Communication | Description | 15 |
| 4 | Make it grill you | Sycophancy — and the skill that interrogates *you* | — | Description + Discernment | 15–20 |
| 5 | Trust, but verify | Hallucination and verification habits | Research | Discernment | 15–20 |
| 6 | Compute, don't guess | Numbers from machines; judgment-work vs rules-work | Analytics | Delegation | 15–20 |
| 7 | Big jobs, small pieces | Decomposition and checkpoints | — | Description | 20 |
| 8 | Give your agent a memory | Context, CLAUDE.md, persistent preferences | — | Description | 15–20 |
| 9 | Working safely | Privacy, sensitive data, safe-sharing rules | — | Diligence | 15–20 |
| 10 | Build your own machine | Capstone — commission a tool for their own recurring work | Their choice | All four | 30–60 |
