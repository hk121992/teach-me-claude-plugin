# Challenge 1.06 — Compute, don't guess

- **Concept:** numbers come from machines, not vibes — judgment-work vs rules-work
- **Competency:** Delegation
- **Vehicle:** Analytics (Series 3 takes it deep)
- **Time:** 15–20 minutes
- **Scaffolding:** guided, failure-first (watch a fluent estimate miss before the lesson)
- **Artifact:** a computed, rerunnable answer to a real question — plus the learner's delegation map

## Lesson

Deliver after the demo in task step 1.

1. **A language model is not a calculator.** Asked to "look at" a table
   and give the average, it produces a fluent, plausible number — the
   same way it produces fluent, plausible prose. Sometimes right, often
   close, occasionally absurd, always confident. Challenge 5's lesson,
   now with digits.
2. **Two kinds of machine.** A *deterministic* tool follows rules exactly
   and gives the same answer every time: a formula, a script, a filter, a
   template. An AI model *judges*: it reads, weighs, interprets —
   brilliantly, but never twice identically. The sorting rule: if you can
   fully write down the rules, a deterministic tool is better — faster,
   free to rerun, auditable, right every single time. Use AI where
   language, judgment, or messy input is involved.
3. **The move that changes everything: make it compute.** Your AI
   colleague can *write and run* the deterministic tool. "Don't estimate
   the average — write the calculation and run it, and show me the
   working." Same colleague, two modes; the habit is asking for the right
   one. This is the small version of a big idea — pay for judgment once,
   keep the machine forever — and the capstone is the full version.

## Task

1. **The demo (before the lesson).** Use a small realistic dataset:
   ideally a real, non-sensitive table from the learner's work; otherwise
   generate one from their world (~40 rows, e.g. a month of orders or
   hours), with a couple of figures the learner can verify or compute by
   hand. Then two asks, by the learner:
   - "Just reading this table, no tools — roughly what's the total of X
     and the average of Y?"
   - "Now compute it: write the calculation, run it, show your working."

   They check both against the known answer and note the gap (if the
   estimate happens to land, note that too — "sometimes right" is the
   trap, not the reassurance). *Then* the lesson.
2. **One real question.** The learner asks one genuine question of the
   data ("which client slipped the most?", "is the trend up or down?")
   and requires the computed-with-working treatment. They check one
   figure independently — their Challenge 5 checklist applies to numbers
   too.
3. **The delegation map.** Bring out the workflow profile you've been
   building in debriefs — their recurring tasks, in their words. The
   learner triages each: **AI** (judgment/language), **deterministic**
   (rules — a tool should do this), **hybrid** (split it: which part is
   which), or **human-only** (their call — relationships, accountability).
   One line of reasoning each, extended to 8+ tasks if the profile is
   thin (interview them). Saved as `delegation-map.md`, with 1–2
   deterministic or hybrid candidates marked **"capstone candidate"**.

## Parameters

- The demo's estimate run must genuinely happen — no skipping to the
  computed version — and be checked against a known answer.
- The map's tasks are the learner's real recurring work; the triage
  reasoning is theirs. Challenge weak reasoning ("is that *really*
  judgment work, or rules you haven't written down?") but don't assign
  buckets.
- At least one task in each of AI / deterministic / hybrid (if their
  honest inventory can't fill a bucket, they explain why — acceptable
  pass).

## Rubric

1. Both demo runs happened against a known answer, and the learner can
   say why a fluent estimate is more dangerous than an obvious error.
2. The real question was answered with visible, rerunnable working, and
   the learner verified one figure independently.
3. `delegation-map.md` exists with 8+ real tasks, each bucketed with a
   stated reason showing the sorting rule (judgment/language vs
   fully-specifiable rules — "AI because it's hard" fails the sniff
   test; probe it).
4. At least one hybrid task is genuinely decomposed into its AI part and
   its deterministic part, and 1–2 capstone candidates are marked.

## Companion notes

- This is the keystone judgment challenge — the map gets used in the
  capstone and for the rest of the journey. Invest in its quality.
- Watch for both failure directions: AI-for-everything (now that the
  hammer is fun) and AI-for-nothing-mechanical (not seeing that a tool
  could absorb their copy-paste ritual). Name whichever you see, kindly.
- The "human-only" bucket deserves respect, not pushback — deciding what
  *not* to delegate is the Delegation competency too.
- Revisit their Challenge 1 guesses about what this colleague would be
  great/worrying at — re-sorting them with their new vocabulary is a
  satisfying, visible measure of distance travelled.
- End with the hook: point at their marked capstone candidates — "in the
  capstone, you don't do that task. You commission the machine that
  does."
- At debrief: this was analytics work — name the domain, record what
  number-work recurs for them (workflow profile).
- Reflection question at review: "Which bucket surprised you most when
  you sorted honestly?"
