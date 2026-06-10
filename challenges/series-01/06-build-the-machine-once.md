# Challenge 1.06 — Build the machine once

- **Concept:** AI writes the deterministic tool — pay for judgment once, run the machine forever
- **Competency:** Delegation
- **Scaffolding:** independent with guided framework
- **Artifact:** a working, reusable tool for one of the learner's real recurring tasks

## Lesson

1. **The best-kept secret.** Last challenge sorted their work into
   judgment-work (AI) and rules-work (deterministic tools). Here's the
   move almost nobody teaches: *AI is outstanding at building
   deterministic tools.* Don't ask your AI colleague to add up the
   expenses every month — ask it **once** to build the thing that adds
   them up, check that thing carefully, then reuse it forever: free,
   instant, and right every single time.
2. **What "a machine" means here.** It doesn't have to be code. In rising
   order of power: a fill-in template, a checklist, a spreadsheet formula,
   a small script Claude writes *and runs for them* in their workspace.
   The right rung is the lowest one that does the job.
3. **The new skill: describing your inputs precisely.** A machine-building
   brief succeeds on specifics: what the input looks like ("a folder of
   PDFs named like `invoice-2026-05.pdf`", "column B holds dates as
   14/05/2026"), what exact output is wanted, and what the edge cases are
   ("sometimes a file is missing", "amounts are sometimes in USD").
   Vagueness that a judgment-task tolerates will break a machine.
4. **Machines get tested, not trusted.** From Challenge 4: a formula or
   script is load-bearing. The check is beautifully simple — run it on a
   case where you already know the right answer. Twice, on different
   inputs, because "works once" is not "works".

## Task

1. **Pick.** From their `delegation-map.md`, the learner picks one
   deterministic (or the rules-half of a hybrid) task — the
   "try this first" candidate from Challenge 5 if it still appeals.
2. **Specify.** The learner writes the machine brief: input description
   (precise, with a real example), desired output, edge cases they know
   about, and how they'll use it. Their Challenge 3 template helps here.
3. **Build.** You build what they specified — template, checklist,
   formula, or script — explaining your choices in plain language as you
   go. If a script, you run it for them; they never need to touch code.
4. **Test.** The learner runs the acceptance test: two different real
   inputs, at least one where they already know the correct result. If it
   breaks or surprises, they describe the failure and you fix — that loop
   is normal engineering, name it as such.
5. **Document.** Together, add a short `how-to-use.md` next to the tool:
   what it does, how to ask Claude to run/apply it, what to check after.

## Parameters

- The task comes from their real delegation map; the tool must be
  something they will plausibly use again within a month.
- The learner writes the specification and runs the acceptance test with
  their own known-answer case. The companion builds — that division of
  labor is the lesson.
- Two test runs minimum on genuinely different inputs.

## Rubric

1. A working tool exists in the workspace, matched to the lowest rung
   that does the job (a script where a template would do is over-build —
   discuss, don't fail).
2. The learner's specification described inputs precisely enough that a
   stranger could picture the real data, and named at least one edge case.
3. Both test runs happened; at least one against a known answer; any
   failure was articulated by the learner and fixed.
4. `how-to-use.md` exists and the learner can say when they'll next use
   the tool.

## Companion notes

- This is the series' empowerment peak — a non-technical person
  commissioning working software (or a working system) to their own spec.
  Let it feel like that. The phrase that lands: "you just told a machine
  to build a machine."
- Resist gold-plating. Build exactly what was specified; if their spec
  has a gap, let the test find it — the failure-fix loop teaches more
  than a perfect first build.
- If they pick something too big, help them carve out the smallest
  useful core ("version one handles the normal case; edge cases are
  version two").
- Reflection question at review: "What else on your delegation map
  deserves a machine now that you know the price of one?"
