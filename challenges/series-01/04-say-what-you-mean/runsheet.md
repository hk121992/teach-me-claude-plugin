---
# Authoring rationale (provenance / design-decisions / derivations / change-log) lives beside this runsheet in authoring-notes.md — it never ships (build excludes it by name).
id: "01-L-MR9B"
slug: say-what-you-mean
concept: "the brief — context, audience, format, success criteria — met by briefing your own real task twice and watching the specifics, not clever phrasing, change what comes back"
time: { min: 20, max: 30 }
scaffolding: fix
failure_first: true
vehicle: communication
kit_contribution: { slot: brief_template, label: "Brief template" }
covers_outcomes:
  - { uid: 01-DESC-01, evidence_kind: artifact,       role: floor, floor_confirmable: true }
  - { uid: 01-DESC-02, evidence_kind: conversational, role: floor, floor_confirmable: true }
  - { uid: 01-DESC-03, evidence_kind: artifact,       role: floor, floor_confirmable: true }
reconfirms: []
share_moment: false
compulsory: true
compulsory_reason: "You'll walk away with a reusable brief template in your own voice — a keeper, so we build it for real."
widgets:
  - { id: brief-lesson, kind: templated, when: lesson }
---

## Demo — failure-first (runs before the lesson)

runs in: fresh

Before the lesson, meet the failure it fixes. Pick a real piece of writing you need this
week — a client update, a tricky reply, an announcement (anything in the material that
isn't yours to share gets a stand-in first). In a **fresh session** — not here with your
learning guide — brief the same task twice, a new session each time:

1. The laziest version of the ask you'd really send on a busy day: *"write an email
   about the project delay."* Don't polish it.
2. New session, same task: brief it the way you'd brief a **capable newcomer on day
   one** — what's going on, who'll read it, the shape you need, and what has to be true
   for you to call it right.

Same task both times — how much you tell it is the only thing that changes. Bring both
answers back and **name the difference yourself** — two concrete differences in the
text — before anyone names it for you. The demo is **read-only**: it writes nothing to
your progress or your kit. Only once the contrast has landed does the lesson open.

## Task — floor / stretch

The lesson is delivered as the two-slide **`brief-lesson`** widget — **Slide 1** the lesson (hollow
briefs · the four loads · brief like a newcomer's day one) and **Slide 2** the activity, whose
opening steps stage the demo (the learner carries them into the fresh sessions). Withhold Slide 1's
naming of the loads until the contrast has landed and they've named the difference themselves.

- **Floor — name it, load it, keep it (back here).** Over the two outputs, the learner names at
  least two concrete differences in the text, says which version they'd actually send, and
  attributes the gap to the specifics, not the phrasing. Then the loads get their names —
  **context, audience, format, success criteria** — mapped onto the learner's own good brief in
  their own words: what each load does, which was missing from the lazy ask, and which one they
  personally tend to drop. One more pass so the good brief identifiably carries all four. Then the
  kit drop: **distil a reusable brief template in their own words** (4–8 lines they'd still
  understand in a month), saved as **`my-brief-template.md`** in the series folder
  (`series-01-foundations`) with the improved brief kept beside it as the worked example.
- **Stretch.** Run the template on the next real ask this week — ideally the message they've been
  putting off, for their trickiest audience.

## Parameters

- **The task must be real, and the same for both runs** — the specifics are the only variable
  (contrast discipline: vary exactly one dimension).
- **The lazy brief must actually run.** No skipping to the good version, and no polishing it — the
  baseline is the ask they'd really send.
- **Fresh sessions, nothing written.** One new session per send, away from the learning guide; the
  outputs come back as material for the dialogue, not as files.
- **No-failure branch.** If the vague brief comes back decent, don't manufacture disappointment —
  pivot: can they tell whether it guessed *their* intent, or a plausible generic one? Run the vague
  brief again and watch it land differently. A specific brief is right *every* time; a vague one is
  right when you're lucky — and you can't tell which kind of lucky you got.
- **Newcomer, not keywords.** More relevant detail beats clever phrasing; there are no magic words
  to hunt for. The learner already knows how to brief — they've done it for people.
- **The template is the learner's writing** — their vocabulary ("who's it for" beats "audience" if
  that's how they talk), the four loads recognisable however phrased. You do file mechanics only.

## Rubric

One criterion per covered outcome (1:1; references the uid; evidence_kind lives only in the
frontmatter).

- **01-DESC-01** — The improved brief (kept as the worked example beside their template)
  identifiably carries all four loads — context, audience, format, success criteria — and the
  learner can say what each load does and which one they personally tend to drop.
- **01-DESC-02** — In dialogue over the two fresh-session outputs, names at least two concrete
  differences in the text and attributes the improvement to relevant specifics rather than clever
  phrasing — briefing the way they'd brief a capable newcomer on day one.
- **01-DESC-03** — `my-brief-template.md` exists in the kit, is in the learner's own voice with the
  four loads recognisable however they phrased them, and would still make sense to them in a month.

## Learning-guide notes

- **Delivery — demo before lesson.** Instantiate `brief-lesson` and point the learner at **Slide
  2's opening steps** (the two fresh sends); hold the four loads back until they've named the
  difference themselves — the naming lands only if it's theirs first (§3.1/§3.2). Never paste this
  runsheet.
- **The demo must run away from you.** Your own contract would never execute the lazy brief blandly
  — the learner has to meet the default model in fresh sessions, or the contrast is staged.
- **The take-with-you link (guide behaviour).** The learner loses the widget when they start the
  fresh sessions (Cowork is single-window) — write the activity steps to a small HTML file and drop
  a clickable link below the widget: *"Click here to get this in your browser so you can refer to
  it while you work."*
- **The no-failure branch is a real branch, not a failed lesson.** The lean varies; if the vague
  output is decent, the variance and the unverifiable "did it guess *my* intent?" gap carry the
  same lesson — say so honestly (never pretend it flopped).
- **Two-kind flag (01-DESC-02).** Its `checks` names a side-by-side `before-after.md` AND the
  learner's naming/attribution. Picked **conversational**: the fresh-session demo writes nothing by
  design (the side-by-side file was the retired staged mechanic), so what this rubric grades is the
  two named differences plus the attribution, in dialogue. Flagged, never silently switched.
- **Compound note (01-DESC-01).** Its `checks` carries both the improved brief and the learner
  saying what each load does; pinned **artifact** — the improved brief (the worked example kept
  with the template) is the primary evidence, and the say-what-each-does is graded on the same
  criterion.
- **The template pairs with machinery (conditional, state-anchored §3.4).** If their kit already
  holds a skill that grills them — or when it later does — name the pairing: the template carries
  the loads they remember; the grill interrogates them so nothing depends on memory. Reference the
  kit artifact only, never a lesson number.
- **Coach, never the doer (P8); anti-"ok" pushback (P9).** From here on, when the learner hands you
  a hollow ask, make them load it — kindly, and every time.
- **The debrief is the generative part (P7).** Confirm the three outcomes on real evidence (the
  dialogue, the improved brief, the template file), record what writing work recurs for them in the
  workflow profile, and reflect: which load do they carry naturally, and which will they forget
  without the template?

## Outcomes

_Generated at build from the outcomes matrix (`curriculum/outcomes.md`) — the grading bars for the outcomes this lesson covers, so this shipped runsheet is self-contained. Do not edit here; the matrix is the single authority._

- **`01-DESC-01` · carry-four-loads** — The learner can brief a task carrying the four loads — context, audience, format, success criteria — and can name what each load does, recognising that generic output is usually a hollow brief rather than a weak model.
  ↳ checks: an improved brief identifiably carries all four loads; the learner can say what each does and which one they personally tend to drop.

- **`01-DESC-02` · brief-like-newcomer** — The learner can brief the agent the way they'd brief a capable newcomer on day one — supplying relevant specifics rather than hunting for "magic keywords" — and can recognise that more relevant detail beats clever phrasing.
  ↳ checks: the same task briefed vague then specifics-rich (run live, in fresh sessions that write nothing), with two concrete output differences named; the learner attributes the improvement to specifics, not phrasing. *(2026-07-01: dropped the legacy `before-after.md` artifact — the re-composed demo is writes-nothing by design; the evidence is the recounted contrast.)*

- **`01-DESC-03` · distil-brief-template** — The learner can distil a reusable brief template in their own words that they'd still understand in a month — making good briefing repeatable rather than re-invented each time.
  ↳ checks: artifact `my-brief-template.md` in the learner's own voice, the four loads recognisable however phrased; it joins the kit.
