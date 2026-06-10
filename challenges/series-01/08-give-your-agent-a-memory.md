# Challenge 1.08 — Give your agent a memory

- **Concept:** context and persistent memory — the learner's first CLAUDE.md
- **Competency:** Description
- **Scaffolding:** independent
- **Artifact:** a working CLAUDE.md in the learner's workspace, proven in a fresh session

## Lesson

1. **Your colleague has amnesia — by design.** Every new session starts
   blank: nothing from yesterday's conversation survives unless it was
   written into a file. The learner has probably felt this already
   (Challenge 2's reflection: "what did you have to spell out?"). It isn't
   a defect to work around with longer chats — it's a fact to engineer
   around with *files*.
2. **The memory file.** A file named `CLAUDE.md` in the workspace is
   read automatically at the start of every session. Whatever it says —
   who you are, how you like things done, what to never do — your
   colleague knows from minute one, every time. It's the difference
   between a temp on their first day and a colleague who's worked with
   you for a year.
3. **Short and sharp beats long and complete.** A bloated memory file
   gets skimmed; instructions buried in 200 lines get missed (true for
   humans too). The pruning test for every line: *would removing this
   cause a mistake?* If not, cut it. Aim for one screen.
4. **They've already written most of it.** The brief template (3), the
   verification checklist (4), the delegation map (5) — the series has
   been building their operating manual in pieces. Today it gets a home.

## Task

1. **Draft.** The learner writes their workspace `CLAUDE.md`. A suggested
   skeleton (theirs to adapt):
   - Who I am: name, role, what I work on (two lines)
   - How I like output: tone, language, formats, length defaults
   - My conventions: naming, where things live in this folder
   - Always: (e.g., "flag anything you're not certain of")
   - Never: (e.g., "never delete files without asking me")

   Every line must pass the pruning test — challenge any padding.
2. **The proof.** The real test is behavioral. In a **fresh session**
   (have them actually start one), they give a deliberately minimal brief
   for a small real task — leaving out everything the CLAUDE.md should
   now cover — and observe: did the output follow their preferences
   without being told?
3. **Tune.** Whatever the fresh session got wrong points to a line that's
   missing, vague, or buried. They revise and re-test once.

## Parameters

- The learner writes the file; the companion critiques against the
  pruning test but doesn't draft it.
- The proof must happen in a genuinely fresh session, with a brief that
  deliberately omits what the file should carry.
- One full revise-and-retest loop minimum.

## Rubric

1. `CLAUDE.md` exists in the workspace, fits roughly on one screen, and
   every line plausibly passes the pruning test.
2. It encodes real preferences discovered during the series (recognizable
   traces of their template, checklist, or map — not generic boilerplate).
3. The fresh-session proof happened; the learner can name at least one
   thing the file successfully carried and one thing the tuning loop
   fixed.
4. The learner can explain to a colleague, in one minute, what this file
   is and why it works.

## Companion notes

- This is the learner's first piece of *agent infrastructure* — the
  doorway to everything in later series (skills, the full `.claude`
  directory). Frame it that way: "you just configured an AI system."
- During the proof, honor the file scrupulously. The magic moment is the
  output arriving correctly shaped with a three-word brief.
- If they want to stuff in everything, invoke the pruning test line by
  line. If they're too spare, ask what the temp would still get wrong.
- Challenge 9 will add a safety section to this same file — mention that
  it isn't finished, it's started.
- Reflection question at review: "What took you eight challenges to learn
  that this file now teaches in eight seconds?"
