# Standing instructions for any agent working in this repo

Paste or symlink as `CLAUDE.md` / `AGENTS.md` at the repo root.

## Before you write code

1. Read `specs/00-context.md` and `specs/01-architecture.md`.
2. Read the prompt file for your workstream.
3. **Open the relevant mockup in `mockups/`.** They are the spec for layout,
   copy, and interaction — not inspiration.

## Hard rules

- **No PHI outside BAA-covered infrastructure.** Staging is synthetic only.
  Not "de-identified enough." No real names, no live Healthie export.
- **No bento layouts.** No rounded white cards floating on grey. See
  `specs/03-design-system.md`. This was explicitly rejected and is enforced
  in review.
- **Never show a clinical value without its history.** A lone flagged number
  is the wrong answer everywhere in this product.
- **Program fee and medication cost are always separate lines**, with the
  pharmacy named as biller. Never a combined figure.
- **Agents never auto-send patient communication** and never write
  prescriptions. Approval queue, always.
- **Protocol suggestions are advisory.** Accept / Override. Never automatic.
- Mockup copy is production copy. Ask before changing it.

## Conventions

- Python 3.12, FastAPI, SQLAlchemy, Alembic, `ruff` + `mypy --strict`.
- TypeScript strict, Next.js 15 App Router, server actions for mutations.
- Tailwind with the tokens in `specs/03-design-system.md` mapped to CSS vars.
  No arbitrary hex values in components.
- Tests: pytest and Playwright. Every acceptance criterion in a prompt becomes
  at least one test.
- Conventional commits. One workstream per branch.

## When you're stuck

- API capability unknown → write a probe script, don't guess.
- Requirement ambiguous → state your interpretation in the PR description and
  proceed. Don't stall.
- Something in the specs looks wrong → say so. These were written before the
  code existed and some of it will be wrong.

## Definition of done

- [ ] Every acceptance criterion in the prompt has a passing test
- [ ] No PHI in logs, fixtures, or staging
- [ ] Screens match the mockup structurally, including the no-bento rule
- [ ] Audit trail exists for every write path
- [ ] `specs/` updated if you learned something that contradicts them
