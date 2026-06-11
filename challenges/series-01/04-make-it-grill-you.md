# Challenge 1.04 — Make it grill you

- **Concept:** sycophancy — and the guardrail that beats prompting: a skill that interrogates *you*
- **Competency:** Description + Discernment
- **Time:** 15–20 minutes
- **Scaffolding:** guided, failure-first (experience the yes-machine before building the fix)
- **Artifact:** the learner's first installed skill — `grill-me` — proven on a real task

## Lesson

Deliver after step 1 of the task — the yes-machine demo comes first.

1. **Your colleague wants to please you.** Language models are trained on
   human approval, and humans approve of agreement. The result is a
   systematic lean called *sycophancy*: presented with your idea, the
   default register finds its merits; presented with your draft, it
   compliments before it critiques. It isn't lying — it's tilted. And the
   tilt is invisible because agreement feels like insight.
2. **Framing changes the job.** Ask "what do you think?" and you've hired
   a cheerleader. Ask "argue against this", "red-team this", "what would
   a skeptic say?" and the same colleague becomes a sharp critic. The
   register follows the role you assign.
3. **The deeper fix is a guardrail, not a habit.** You could remember to
   write perfect briefs and demand criticism every time — or you could
   make it automatic. A **skill** is a small file of instructions Claude
   loads when it's relevant: teach it once, it behaves that way every
   time. And the highest-value skill a beginner can install is one that
   *inverts the relationship*: instead of you writing the perfect brief,
   Claude interrogates **you** — Socratic questioning, one question at a
   time — until it can write the brief itself, challenges your weak
   premises along the way, and shows you the brief for sign-off before
   doing anything. From now on, gaps in your asks get caught by
   machinery, not memory.

## Task

1. **The yes-machine demo (before the lesson).** The learner picks a
   deliberately half-baked idea from their own world — a plausible-but-
   flawed plan they can see the holes in ("I'm thinking of moving our
   whole team to daily two-hour status meetings"). In a **fresh session**
   (not with you — they should meet the default register, and starting
   fresh sessions is a skill worth practicing), they pitch it twice:
   - "Here's my idea: […]. What do you think?"
   - Then, new session again: "Here's my idea: […]. Be my fiercest
     critic — argue against it, find the holes."

   They bring both answers back and name the difference. *Then* the
   lesson.
2. **Draft the skill — in their words.** The learner writes, in plain
   language, the standing orders for their interrogator. It must cover,
   however they phrase it:
   - When I hand you a meaty task, don't start working — **interview me
     first**, one question at a time, until you could write the complete
     brief yourself (their four loads from Challenge 3 are the backbone).
   - **Challenge me.** If my premise is shaky or my ask is the wrong ask,
     say so — no cheerleading.
   - **Show me the brief** you've assembled and get my sign-off before
     executing.
3. **Install.** You handle the file mechanics — create the skill (e.g.
   `.claude/skills/grill-me/SKILL.md` in their workspace, or the
   equivalent skills location on their setup) with a trigger description
   and their text as the body, explaining the anatomy in one breath:
   a name, a description of when it applies, and the instructions. The
   words stay theirs.
4. **Prove it.** In a fresh session, the learner brings a real task with
   a deliberately thin, lazy ask and invokes the skill ("grill me on
   this"). They experience the interrogation, sign off the brief, and
   note what the questions surfaced that they'd never have included.

## Parameters

- The pitched idea must be genuinely half-baked — the learner should be
  able to name its flaws themselves afterwards.
- The skill body is the learner's writing; the companion does file
  mechanics and trigger-description only.
- The proof run happens in a fresh session on a real task, starting from
  a deliberately minimal ask.

## Rubric

1. Both demo runs happened; the learner can describe the difference in
   register and say *why* it happens (trained-to-please, framing assigns
   the role).
2. The skill exists, fires when invoked, and its body — in the learner's
   own voice — encodes all three behaviors: interview-until-complete,
   challenge-the-premise, brief-sign-off-before-work.
3. The proof run happened, and the learner can name at least one thing
   the interrogation surfaced that their lazy ask had left out.
4. In conversation, the learner can explain sycophancy well enough to
   warn a colleague.

## Companion notes

- This is the curriculum's signature move and the learner's first piece
  of *infrastructure* — let it land like one: "most people learn to write
  better prompts; you just taught the AI to fix your prompts for you."
- The demo must be in fresh sessions, away from you — your own contract
  forbids the sycophantic register, so the learner needs to meet default
  behavior elsewhere. If their fresh-session results are unexpectedly
  balanced, discuss honestly: the lean varies, and that unpredictability
  is itself the argument for the guardrail.
- Practice what this challenge preaches, permanently: from here on, when
  the learner gives *you* a vague ask, let the skill (or its spirit)
  interrogate them. They built it; honor it.
- At debrief, point once at `RESOURCES.md`: skills are an ecosystem —
  Anthropic publishes ready-made ones, and a later series teaches
  tailoring and sharing them. One sentence, no detour.
- Reflection question at review: "Where else in your life do you get
  agreeable answers because of how you ask?"
