# Precision Weight + Wellness — Platform Build Handoff

Everything needed to build the PW+W platform: replacing Healthie with a
purpose-built stack for a physician-led weight-management telehealth practice.

## Contents

```
README.md                    You are here
HANDOFF.md                   Read once before starting — risks, decisions, success metric

specs/
  00-context.md              The practice, the care model, decisions made and open
  01-architecture.md         Topology, hosting, service boundaries, data placement
  02-data-model.md           FHIR mapping, Postgres schemas, analytics models
  03-design-system.md        Tokens, type, the no-bento rule, the vitals band
  04-requirements.md         Numbered functional + non-functional requirements
  05-build-plan.md           Four phases with effort and exit criteria
  06-api-contracts.md        Consolidated API surface across all services
  codes.md                   LOINC, RxNorm, and the local CodeSystem

prompts/
  AGENTS.md                  Standing instructions — symlink as CLAUDE.md at repo root
  p0-modmed-probe.md         DECISION GATE — run first
  p1-infra.md                AWS + Medplum self-hosted + environments
  p2-data-model.md           Schemas, access policies, Healthie migration spike
  p3-scheduling.md           Availability engine, licensure gating, booking
  p4-purchase-flow.md        precisionww.com qualify → pay → book
  p5-patient-portal.md       Portal + the weekly check-in loop
  p6-clinical-console.md     Day view, chart, vitals band, labs, ops queue
  p7-billing.md              Stripe subscriptions, pauses, dunning, superbills
  p8-workflows.md            Hatchet: onboarding, titration, refills, churn
  p9-labs.md                 Ordering, ingest, delta flagging, flowsheet
  p10-agents.md              MCP server, evals, approval queue, agents

mockups/
  pww-purchase-flow.html     Clickable — 13 steps, state gate to confirmation
  pww-patient-portal-web.html   Desktop portal, 9 views
  pww-patient-portal.html    Mobile portal, phone-framed
  pww-provider-console.html  Clinical console — 7 views, post-bento
  pww-experience-spec.html   Screen-by-screen UX spec for all three surfaces
  pww-platform-spec.html     ~110 capabilities: build / buy / Medplum, with effort
  pww-platform-ledger.html   Build-burden analysis by domain
```

## How to use this pack

1. Read `HANDOFF.md`, then `specs/00-context.md` and `specs/01-architecture.md`.
   Everything else assumes them.
2. **Run `prompts/p0-modmed-probe.md` before anything else.** It is a decision
   gate, not a task — its outcome determines whether this is built on Medplum or
   on ModMed's API. Do not start p1 until it is answered.
3. Work prompts in numeric order. Each names its dependencies. p4 and p7 can run
   in parallel; p3 blocks both.
4. Open the relevant mockup before building any screen. The mockups are the spec
   for layout, copy, and interaction — not decoration.
5. Put `prompts/AGENTS.md` at the repo root as `CLAUDE.md` or `AGENTS.md`.

## Non-negotiables

- **No PHI outside BAA-covered infrastructure.** Verify before writing a line.
- **No bento layouts.** See `specs/03-design-system.md`. Enforced in review.
- **Never show a clinical value without its history.**
- **Program fee and medication cost are always separate lines**, pharmacy named.
- **Every agent action is auditable** and routes through the same API a human uses.
- **Agents never auto-send to patients and never write prescriptions.**
- Mockup copy is production copy. Ask before changing it.

## Stack summary

| Layer | Choice |
|---|---|
| Clinical data | Medplum (self-hosted, AWS) — FHIR R4, auth, audit |
| App data | Postgres — `app` and `analytics` schemas |
| Frontend | Next.js 15 App Router, TypeScript, Tailwind |
| Services | Python 3.12, FastAPI |
| Workflows | Hatchet (Postgres-backed durable execution) |
| Payments | Stripe Billing |
| e-Rx | DoseSpot (EPCS required — start paperwork in Phase 0) |
| Labs | Health Gorilla |
| Comms | Twilio (SMS), SendGrid (email), Zoom or Daily (video) |
| Analytics | dbt → Postgres `analytics` → Metabase |
| Agents | Python + MCP server over FHIR, Claude, Langfuse |

Running infrastructure cost is roughly **$150–350/month** against $24,000/year
for Medplum Cloud Production, or $72,000/year for Premium — the tier the
access-policy cap would force.
