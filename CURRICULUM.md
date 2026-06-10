# Learn to Claude — Curriculum Design

Design document for the 100-challenge curriculum. The user-facing map is
[`roadmap/ROADMAP.md`](roadmap/ROADMAP.md); the shipped free series is in
[`challenges/series-01/`](challenges/series-01/). This document records
the *why*: audience, research grounding, pedagogy, architecture, and
business model. Research conducted June 2026.

## 1. Thesis

The best way to learn Claude is to use it — on your own work, with a
coach, against real standards. Learn to Claude is a Cowork plugin that
acts as a learning companion: 100 challenges, each pairing a short lesson
with a practical task on the learner's real material, graded against an
explicit rubric by the companion itself. The product *is* the medium: you
learn agentic work from an agent, inside the agent.

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
   capstone. Early challenges hand the learner a working brief to study
   and modify; capstones hand them only parameters.
3. **Failure-first challenges** train discernment — the hardest and most
   neglected AI skill: the learner watches a vague brief produce mush
   (1.03) and hunts a real hallucination in their own domain (1.04)
   *before* the technique is taught.
4. **Real artifacts over gamification.** The Duolingo lesson, both ways:
   keep bite-size units, visible progression, and immediate feedback;
   reject XP and streaks as the progress metric. Progress = a portfolio
   of things the learner actually uses (their template, their machine,
   their CLAUDE.md, their website).
5. **Capstones every 10** ("choose your own adventure"): the learner
   defines the goal within parameters — Knowles' transfer test, and the
   product's signature ritual.
6. **Reflection per challenge**, recorded by the review skill — spaced
   retrieval, and raw material for later coaching.
7. **Companion-as-coach, never doer.** Mollick's 10-hour rule: fluency
   comes from hands-on hours that cannot be delegated. The hard rule in
   every skill: the learner does the task.

### 3.2 Competency spine: the 4D framework

Challenges are tagged with Anthropic's AI Fluency competencies — the
only existing curriculum-grade taxonomy for this audience:
**Delegation** (what to hand over), **Description** (how to brief),
**Discernment** (how to judge output), **Diligence** (responsibility
and safety). Note the spine is deliberately *not* prompting-first:
delegation judgment and output evaluation are co-equal skills.

### 3.3 Designed against documented failure modes

Every Series 1 challenge maps to documented beginner failures (forum
research, GitHub issues, incident reports):

| Failure mode (documented) | Challenge |
|---|---|
| Search-engine mental model; expects memory; anthropomorphizing | 1.01 |
| Never delegates real work; sandbox-only practice | 1.02 |
| Vague one-liners; missing context ("colleague test") | 1.03 |
| Swallowing hallucinations; trusting confident tone; unverified citations | 1.04 |
| AI-for-everything / wrong tool selection | 1.05 |
| Re-paying judgment prices for rules-work (the untaught "AI writes the automation" principle) | 1.06 |
| Mega-prompts; correction spirals; kitchen-sink sessions | 1.07 |
| Re-explaining everything; no persistent context | 1.08 |
| Sensitive-data pasting; permission fatigue ("Allow all" → deleted folders); prompt injection via documents; no backups | 1.09 |

Later series extend this: context rot and the .claude layer (S7), agent
runaway and audit habits (S8), the full security strand (S9) — the
documented Cowork incidents (the 11GB deletion, the 15,000 family
photos, the PromptArmor exfiltration demo) are why Diligence is a
strand, not a footnote.

### 3.4 Three genuinely under-served topics we own

The research found three high-value concepts essentially untaught
anywhere for this audience — each is load-bearing here:

1. **"Build the machine once"** — AI writes deterministic automation;
   pay for judgment once, run the artifact forever (1.06, recurring).
2. **Git as the seatbelt for agent work** — version control taught as
   undo-for-agents, not as developer tooling (Series 5).
3. **Security and secrets for non-developers using agents** — prompt
   injection, scope, .env, vaults, rotation, in plain language
   (1.09 + Series 9).

## 4. Architecture of the 100

Full map in [`roadmap/ROADMAP.md`](roadmap/ROADMAP.md). The arc:

| Series | Where | What it adds |
|---|---|---|
| 1 Foundations *(free)* | Cowork | Mental model, delegation, brief, verification, AI-vs-deterministic, decomposition, CLAUDE.md, safety |
| 2 Delegation Playbook | Cowork | Examples, roles, folders, data, research, iteration, session hygiene |
| 3 Workspace That Works | Cowork | Project architecture, layered memory, templates, backups |
| 4 Skills | Cowork | SKILL.md authoring — first infrastructure they build |
| 5 Git & GitHub | Cowork + GitHub | Version control as agent seatbelt; first external provider |
| 6 Publish | GitHub Pages | First public artifact; design direction with Claude |
| 7 Claude Code & .claude | Claude Code | Terminal, settings, permissions, memory hierarchy, context budget |
| 8 Agents & Automation | Claude Code + Cowork | Subagents, hooks, schedules, MCP connectors |
| 9 Security, Secrets & Trust | Everything | Threat model, injection drill, .env, Bitwarden, recovery |
| 10 Build Real Software | Claude Code + Cloudflare | Spec → app → data → API → tests → real users |

Design decisions and rationale:

- **Cowork-only through Series 4.** Anthropic's own Claude 101 spends
  its whole length on conversation skills before features; the genuine
  difficulty cliff for this audience is tool-layer concepts, so the
  first 40 challenges build judgment in one familiar surface.
- **GitHub before the web (5 before 6).** Pages deployment then *reuses*
  the repository concept rather than introducing two providers at once.
  GitHub Pages is the safer first host (zero extra accounts, pairs with
  the git lessons); Cloudflare arrives in Series 10 where its free tier
  (unlimited bandwidth, Workers, data) matches the ambition — and
  matches the author's own stack.
- **Claude Code at Series 7, framed as "same engine, other face."**
  Cowork *is* Claude Code in a friendlier shell — the reveal reframes
  the terminal from cliff to curtain. The full `.claude` directory
  (settings → permissions → memory hierarchy → skills) is the series
  spine, completing the CLAUDE.md → skills → agents → workflows
  progression the product promises.
- **Secrets late (Series 9), Bitwarden as the vault.** Secrets hygiene
  needs git, the web, and automation to be meaningful. Sequence: what a
  secret is → .env pattern → vault (Bitwarden: cross-platform, has a
  CLI usable by agents, free tier) → agents-use-credentials-without-
  seeing-them → rotation → recovery drills.
- **Design woven in, not a separate series**: directing design in plain
  language (52, 55), web writing (57), fit-and-finish (98).
- **Spaced retrieval is structural**: every capstone retrieves the whole
  series; Series 7 deliberately rebuilds a Series 2 workflow; Series 9
  re-runs Series 1's scrub drill at professional depth.

## 5. Assessment model

Claude-graded against per-challenge rubrics (chosen for v1):

- Every challenge ships **Parameters** (constraints that keep the task
  honest) and a **Rubric** (3–5 observable criteria). The review skill
  inspects the *actual artifact* — never grades on say-so.
- Outcomes are **pass / refine** — refine is feedback with a named next
  step, never failure. Borderline passes get a named growth point
  (research: a generous pass teaches nothing; a pedantic fail churns).
- Progress lives in `.learn/progress.json` in the learner's workspace:
  local, plain, owned by the learner, never fabricated.
- Future hardening (post-v1): deterministic artifact checks (file
  exists, sections present) layered under the rubric grading, per the
  three-tier grading stack the assessment literature recommends.

## 6. Business model

- **Free:** plugin + Series 1 (10 challenges) + full roadmap visibility.
- **Paid:** €20 per series pack (10 challenges), €100 for all 90.
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
  per-session greeting and progress memory is the v1 mitigation; a
  cohort/community layer is the highest-leverage v2 experiment.

## 7. V1 plugin scope (this repo)

Shipped: plugin manifest, companion CLAUDE.md, four skills
(`learn` onboarding/resume, `challenge` delivery, `review` grading,
`progress` map + roadmap), SessionStart greeting hook, progress
template, Series 1 complete (10 challenges), roadmap teaser.

Explicitly out of v1: payment/unlock flow, API delivery of packs,
deterministic artifact checks, cohort features, localization.

## 8. Open questions

1. **Plugin CLAUDE.md auto-load:** documented Claude Code behavior says
   plugin-root CLAUDE.md is *not* auto-loaded; Cowork observations
   suggest it is. The skills are written to be self-sufficient (each
   re-reads the companion contract), and the SessionStart hook covers
   the gap. Verify on a real Cowork install during trials.
2. **Trial instrumentation:** what to capture from trial users beyond
   progress.json (time per challenge, refine rates, drop-off points) —
   currently manual/anecdotal.
3. **Pack delivery contract:** the v2 API (auth, entitlement, challenge
   pack format) — design when trial demand justifies it.
4. **Recency maintenance:** Cowork/Claude Code surface area moves fast
   (the research found 2025 content already stale); challenges reference
   product mechanics generically where possible, but Series 7–8 will
   need a review cadence.
