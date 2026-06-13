# Teach Me Claude — Curriculum Design

Design document for the 100-challenge curriculum. The user-facing map is
[`roadmap/ROADMAP.md`](roadmap/ROADMAP.md); the shipped free series is in
[`challenges/series-01/`](challenges/series-01/). This document records
the *why*: audience, research grounding, pedagogy, architecture, and
business model. Research conducted June 2026; structure revised after
design review (v0.2).

## 1. Thesis

The best way to learn Claude is to use it — on your own work, with a
coach, against real standards. Teach Me Claude is a Cowork plugin that
acts as a learning companion: 100 challenges, each pairing a short lesson
with a practical task, graded against an explicit rubric by the companion
itself. The product *is* the medium: you learn agentic work from an
agent, inside the agent.

Its signature stance: most courses teach the user to prompt well. This
one teaches them to **install guardrails that make good prompting
automatic** — starting with their very first skill, which makes Claude
Socratically interrogate *them* until the brief is complete. Learners
graduate with infrastructure, not just technique.

## 2. Audience

**Primary: non-technical professionals** — knowledge workers,
freelancers, small-business owners starting in Cowork with no coding
background. The curriculum builds technical confidence gradually until
the final series has them shipping real software.

Research support for this choice:

- Cowork (launched Jan 2026, GA April 2026 on all paid plans) is
  explicitly Anthropic's "agentic AI for non-coders" push, and its
  education landscape is thin: one official intro course, scattered
  20-minute YouTube orientations, no sequenced curriculum.
- The market gap analysis is unambiguous: developer content is dense
  (DeepLearning.AI, Vanderbilt, Maven cohorts at $750–$3,000); the
  non-technical lane has no structured progression from "first prompt"
  to "agent-native workflow", no challenge-based product with real
  grading, and no curriculum-grade treatment of safety, secrets, or
  version control for this audience.
- Anthropic's own hackathons were won by a lawyer, a cardiologist, and a
  roads technician — "problem clarity beats syntax fluency." The
  audience can absolutely reach the ambitious end of this curriculum.

## 3. Research grounding

### 3.1 Pedagogy (what the evidence says)

The curriculum applies the convergent formula from challenge-platform
practice (freeCodeCamp, Exercism, Advent of Code) and instructional
research (worked examples/Sweller, fading/Renkl & Atkinson, productive
failure/Kapur, andragogy/Knowles):

> real work task + one named concept + scaffolding that fades +
> explicit checkable success criteria + immediate feedback + spaced
> re-encounter of earlier skills.

Concretely:

1. **One concept per challenge**, named in its header, with everything
   else previously practiced (Exercism's discipline).
2. **Guidance fades across each series and across the arc**: worked
   example → fix/complete scaffolds → independent briefs → open
   capstone.
3. **Failure-first is the house style** — the learner experiences each
   failure mode in a controlled setting *before* the countermeasure is
   taught: vague brief → mush (1.03), sycophancy on their own half-baked
   idea (1.04), a hallucination hunted in their own domain (1.05), a
   fluent-but-wrong number (1.06). Scar tissue beats lecture, and
   discernment — the hardest, most neglected AI skill — is trained on
   felt evidence.
4. **Short, sharp, variable pacing.** Time budgets are printed per
   challenge: 5–10 minutes for openers, 15–20 for the core, 30–60 for
   capstones (which may span sessions). Later building series run
   longer by nature. The free series completes in a week of lunch
   breaks.
5. **Defined tasks as the floor, real work as the stretch.** Most
   challenges ship a defined task so quality is controllable; where the
   learner has a fitting real task, the companion offers it as the
   stretch path. Capstones are always real work. In parallel, the
   companion builds a **workflow profile** of the learner's actual
   recurring work at every debrief — connecting each lesson back to
   their use cases and seeding the delegation map (1.06) and capstones.
6. **Real artifacts over gamification.** Keep bite-size units, visible
   progression, immediate feedback; reject XP and streaks. Progress = a
   portfolio of things the learner actually uses — formalized as **the
   kit** (see §4.1) and rendered by widgets (journey map, graduation
   certificate) that display real state only.
7. **Capstones every 10**: the learner defines the goal within
   parameters — Knowles' transfer test, and the product's signature
   ritual.
8. **Reflection per challenge**, recorded by the review skill — spaced
   retrieval, and raw material for later coaching.
9. **Companion-as-coach, never doer.** Mollick's 10-hour rule: fluency
   comes from hands-on hours that cannot be delegated. The hard rule in
   every skill: the learner does the task.
10. **The companion practices what it preaches.** It refuses the
    sycophantic register, grills vague answers Socratically, and shows
    its own briefs — meta-consistency as credibility. The single
    exception is scripted: failure-first demos where the learner must
    meet default behavior (those run in fresh sessions, away from the
    companion).

### 3.2 Competency spine: the 4D framework

Challenges are tagged with Anthropic's AI Fluency competencies — the
only existing curriculum-grade taxonomy for this audience:
**Delegation** (what to hand over), **Description** (how to brief),
**Discernment** (how to judge output), **Diligence** (responsibility
and safety). The spine is deliberately *not* prompting-first: delegation
judgment and output evaluation are co-equal skills, and the curriculum's
flagship move (the grill-me skill) converts Description from a skill the
learner performs into a guardrail the system enforces.

### 3.3 Designed against documented failure modes

Every Series 1 challenge maps to documented beginner failures (forum
research, GitHub issues, incident reports):

| Failure mode (documented) | Challenge |
|---|---|
| Search-engine mental model; expects memory; anthropomorphizing | 1.01 |
| Never delegates real work; sandbox-only practice | 1.02 |
| Vague one-liners; missing context ("colleague test") | 1.03 |
| Trusting agreeable feedback; courses that teach prompting but no guardrails | 1.04 |
| Swallowing hallucinations; trusting confident tone; unverified citations | 1.05 |
| Trusting fluent arithmetic; AI-for-everything / wrong tool selection | 1.06 |
| Mega-prompts; correction spirals; kitchen-sink sessions | 1.07 |
| Re-explaining everything; no persistent context | 1.08 |
| Sensitive-data pasting; permission fatigue ("Allow all" → deleted folders); prompt injection via documents; no backups | 1.09 |

Later series extend this: context rot and the .claude layer (S9), agent
runaway and audit habits (S9), sharing leaks (S7), secrets handling
(S9), and the hardening pass (S10) — the documented Cowork incidents
(the 11GB deletion, the 15,000 family photos, the PromptArmor
exfiltration demo) are why Diligence is a strand, not a footnote.

### 3.4 Under-served topics we own

The research found high-value concepts essentially untaught anywhere for
this audience — each is load-bearing here:

1. **Guardrails over prompting** — sycophancy, and making the AI
   interrogate the user (the grill-me skill, 1.04; reinforced
   everywhere).
2. **"Build the machine once"** — AI writes deterministic automation;
   pay for judgment once, run the artifact forever (1.06 concept,
   1.10 capstone, recurring).
3. **Git as the seatbelt for agent work** — version control taught as
   undo-for-agents, not as developer tooling (Series 8).
4. **Security and secrets for non-developers using agents** — taught
   *where it's live*: basics (1.09), sharing hygiene (S7), secrets and
   vaults (S9), full hardening pass (S10) — never a quarantine chapter.

## 4. Architecture of the 100

Full map in [`roadmap/ROADMAP.md`](roadmap/ROADMAP.md). The arc:

| Series | Where | What it adds |
|---|---|---|
| 1 Foundations *(free)* | Cowork | Mental model, delegation, brief, the grill-me skill, verification, compute-don't-guess, decomposition, CLAUDE.md, safety basics — capstone: commission your own machine |
| 2 Research | Cowork | Source discipline, fan-out, adversarial verification, synthesis, monitoring |
| 3 Analytics | Cowork | Clean data, computed-and-rerunnable numbers, honest charts, recurring reports |
| 4 Documents & Reports | Cowork | Structure-as-contract, voice, templates, long-form consistency |
| 5 Presentations & Communication | Cowork | Decks, hard emails, audiences — capstone: the full four-domain pipeline |
| 6 Repeatable Workflows | Cowork | Project architecture, intake, conventions, recurring drumbeat, handover |
| 7 Skills, Plugins & Sharing | Cowork | Skill craft mastered, safe adoption, sharing hygiene, their library as a plugin |
| 8 Git, GitHub & Going Public | Cowork + GitHub | Version control as agent seatbelt; first public website (Pages) |
| 9 Claude Code, Agents & Automation | Claude Code | Terminal, .claude layer, permissions, subagents, hooks, schedules, secrets & Bitwarden |
| 10 Build Real Software | Claude Code + Cloudflare | Spec → app → data → API → tests → hardening pass → real users |

### 4.1 The free tier: a complete kit and an honest sampler

Two deliberate decisions shape Series 1:

- **It's complete, not crippled.** The aim of the free tier is value and
  excitement, not gating: the learner graduates with a working **kit** —
  grill-me skill, brief template, verification checklist, delegation
  map, CLAUDE.md with safety rules, and a machine they commissioned.
  All artifacts they keep and use daily whether or not they ever pay;
  shareable artifacts ("look at the skill my course had me build") are
  the growth loop.
- **It samples the paid quartet.** Foundational competencies need task
  vehicles anyway, so they're assigned deliberately: first delegation on
  a **document** task (1.02), the brief on a **communication** piece
  (1.03), verification on **research** — the highest-hallucination
  domain (1.05), compute-don't-guess on **analytics** (1.06). The free
  series quietly previews all four domain packs while keeping its
  mental-model spine; the paid segue writes itself ("your delegation
  map has four domains on it").

### 4.2 Structural rationale

- **Domains in pipeline order (2→5), capstone chains them.** Research →
  Analytics → Documents → Presentations is the natural flow of knowledge
  work; Challenge 50 runs one real project through all four.
- **Install → tailor → build, every domain series.** Each opens with
  *borrowed expertise* (install an off-the-shelf skill from Anthropic's
  skills repo / knowledge-work plugins — see `RESOURCES.md`), and closes
  by *graduating the learner's own* tailored skill. Skills are therefore
  practiced from Challenge 4 onward and mastered as a craft in Series 7,
  whose capstone bundles the library the learner already owns into a
  shareable plugin.
- **Every series ends with something installed or running** — a skill, a
  workspace, a plugin, a live site, an automation, an app — not just
  something learned.
- **Cowork-only through Series 7.** The genuine difficulty cliff for
  this audience is tool-layer concepts, so the first 70 challenges build
  judgment in one familiar surface. GitHub arrives in Series 8 (Pages
  reuses the repository concept rather than introducing two providers at
  once); Claude Code at Series 9, framed as "same engine, other face";
  Cloudflare in Series 10 where its free tier matches the ambition.
- **Security distributed, not quarantined**: basics where agent work
  starts (1.09), sharing hygiene where artifacts go public (S7),
  secrets where automations need credentials (S9 — Bitwarden as the
  vault: cross-platform, agent-usable CLI, free tier), hardening where
  the learner finally runs real systems (S10).
- **Spaced retrieval is structural**: every capstone retrieves the whole
  series; the pipeline capstone (50) retrieves four series; Series 9
  rebuilds a Cowork workflow in Claude Code; the hardening pass (98)
  re-runs 1.09's audit at professional depth.

## 5. Assessment model

Claude-graded against per-challenge rubrics (chosen for v1):

- Every challenge ships **Parameters** (constraints that keep the task
  honest), a **Rubric** (3–5 observable criteria), and a **Time** budget.
  The review skill inspects the *actual artifact* — never grades on
  say-so.
- Outcomes are **pass / refine** — refine is feedback with a named next
  step, never failure. Borderline passes get a named growth point
  (research: a generous pass teaches nothing; a pedantic fail churns).
  The grading register is explicitly anti-sycophantic — the companion
  models the discernment it teaches.
- Every review ends with a **debrief ritual**: reflection recorded,
  workflow profile updated, lesson connected to the learner's real use
  cases, domain previewed where the challenge had a vehicle, at most one
  resource pointer where the challenge calls for it.
- Progress lives in `.teach-me/progress.json` in the learner's workspace:
  local, plain, owned by the learner, never fabricated. Widgets
  (journey map, certificate) render that file's real contents only.
- Future hardening (post-v1): deterministic artifact checks (file
  exists, sections present) layered under the rubric grading, per the
  three-tier grading stack the assessment literature recommends.

## 6. Business model

- **Free:** plugin + Series 1 (10 challenges) + full roadmap visibility.
  The free tier is deliberately *not* a gate: it is the most valuable
  short course we can build, complete with a kit the learner keeps. If
  it's valuable and engaging they continue; excitement, not scarcity,
  sells the packs.
- **Paid:** €20 per series pack (10 challenges), €100 for all 90.
  Pack naming = domain naming ("the Research pack"), so the delegation
  map every free learner owns doubles as the product catalogue.
  Delivery via API in v2 (challenge packs fetched per-installation);
  v1 ships the teaser only.
- Pricing sits in the validated open lane: challenge-format products
  cluster at $27–$99 one-time; structured non-coder programs between
  the $25 Udemy commodity floor and $750+ cohorts barely exist. €100
  for a 100-challenge guided curriculum is aggressive value against
  Maven's $2,000 cohorts and credible against free-but-unsequenced
  official content. The buyer already pays €20+/month for Claude —
  a strong willingness-to-pay signal.
- Completion risk: self-paced completion rates are brutal (~3–13% in
  MOOCs) vs 65–90% with cohort/community mechanics. The companion's
  per-session greeting, short-sharp pacing, and progress memory are the
  v1 mitigation; a cohort/community layer is the highest-leverage v2
  experiment.

## 7. V1 plugin scope (this repo)

Shipped: plugin manifest, companion CLAUDE.md, four skills
(`learn` onboarding/resume, `challenge` delivery, `review` grading +
debrief, `progress` map + roadmap), SessionStart greeting hook, progress
template (with workflow profile and kit tracking), Series 1 complete
(10 challenges), roadmap teaser, resource guide, two widgets (journey
map, certificate).

Explicitly out of v1: payment/unlock flow, API delivery of packs,
deterministic artifact checks, cohort features, localization.

## 8. Open questions

1. **Plugin CLAUDE.md auto-load:** documented Claude Code behavior says
   plugin-root CLAUDE.md is *not* auto-loaded; Cowork observations
   suggest it is. The skills are written to be self-sufficient (each
   re-reads the companion contract), and the SessionStart hook covers
   the gap. Verify on a real Cowork install during trials.
2. **Skill installation mechanics across surfaces:** Challenge 1.04
   creates a personal skill in the learner's workspace; verify the
   workspace-skills path works on current Cowork builds (fallback: the
   user-level skills location), and that invocation/auto-trigger behaves
   as the challenge assumes.
3. **Trial instrumentation:** what to capture from trial users beyond
   progress.json (time per challenge vs printed budgets, refine rates,
   drop-off points) — currently manual/anecdotal.
4. **Pack delivery contract:** the v2 API (auth, entitlement, challenge
   pack format) — design when trial demand justifies it.
5. **Recency maintenance:** Cowork/Claude Code surface area moves fast;
   external links live only in `RESOURCES.md` (review each release),
   and Series 7–9 will need a mechanics review cadence.
