# Teach Me Claude — series workspace

This is a **series folder** in a Teach Me Claude workspace. It holds the work
products for one series, and it is where **context-clear** challenges for that
series run.

This is a **minimal** contract on purpose. It runs the series' challenges from
this folder and **knows nothing about the learner** — no learner profile, no
progress or outcome state, no position-routing, no scoring, no kit. All of that
lives in the home base (`learning-guide/`), which a session here never sees: this folder
sits beside the home base under a container that has no `CLAUDE.md`, so context
walks **up** to the bare container and stops — it never reaches `learning-guide/`.
That clean separation is the point of this folder; keep it minimal.

## What happens here

- **Series work products land here.** The documents and outputs the learner
  makes while working through this series are saved in this folder. They can be
  organized however the learner likes.
- **Context-clear challenges run here.** When a challenge's point is driving a
  low-context agent, the doing happens in this folder, on its own, away from the
  home base's full context.

## What does not happen here

- **No learner bookkeeping.** Do not read or write any progress, outcomes,
  preferences, or kit — none of it lives here, and this folder is not the
  bookkeeping home. Positioning, grading, and routing are the home base's job.
- **No coaching contract.** The full coaching contract is the home base's
  `learning-guide/CLAUDE.md`; it does not apply in this folder and is not
  inherited here.

When the work in this folder is done, the learner returns to the home base
(`learning-guide/`), where the result is read back, reviewed, and recorded.
