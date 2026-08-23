# Architecture

## Topology

```
                       ┌──────────────────────────────┐
   Browser  ─────────► │  Next.js 15 (App Router)     │
   (patient / staff)   │  Vercel or ECS               │
                       │  ─ marketing + purchase flow │
                       │  ─ patient portal            │
                       │  ─ clinical console          │
                       └───────────┬──────────────────┘
                                   │ REST / server actions
                       ┌───────────▼──────────────────┐
                       │  FastAPI services (Python)   │
                       │  ─ scheduling engine         │
                       │  ─ billing service           │
                       │  ─ protocol engine           │
                       │  ─ lab + Rx router           │
                       │  ─ MCP server (agents)       │
                       └──┬──────────────┬────────────┘
                          │              │
          ┌───────────────▼──┐        ┌──▼─────────────────────┐
          │ Medplum (self-   │        │ Postgres               │
          │ hosted, AWS)     │◄──ELT──┤  schema: app           │
          │ FHIR R4 · PHI    │        │  schema: analytics     │
          │ auth · audit     │        │ (Hatchet uses its own) │
          └──────┬───────────┘        └────────────────────────┘
                 │ Subscriptions (webhooks)
          ┌──────▼───────────┐
          │ Hatchet          │  durable workflows, timers, retries
          └──────┬───────────┘
                 │
   ┌─────────────▼──────────────────────────────────────────┐
   │ Stripe · DoseSpot · Health Gorilla · Twilio · SendGrid │
   │ Zoom/Daily · CoverMyMeds · Stedi · Persona · Documo    │
   └────────────────────────────────────────────────────────┘
```

## Hosting

**Medplum self-hosted on AWS, lean configuration.** Do not use the full CDK
reference architecture — it provisions the HA stack Medplum runs their own
service on and costs 5–10× what this practice needs.

Target (~$50–70/month):

- EC2 `t4g.small` running `medplum/medplum-server` + Redis in Docker
- RDS Postgres `db.t4g.micro`, automated backups + PITR enabled
- S3 for `Binary` storage
- Cloudflare in front for TLS and WAF
- No NAT Gateway, no ALB, no Fargate

**Do not run Postgres on the EC2 box.** The app server is stateless and
disposable; the database holds every chart in the practice. Managed only.

**BAA is non-negotiable.** AWS signs one self-serve and free via Artifact.
Accept it before any PHI lands. Note: most PaaS providers (Railway, Render,
Fly, DigitalOcean, Vercel Hobby/Pro) either don't offer a BAA or gate it behind
$1k+/month enterprise commitments. This is what sets the hosting floor, not compute.

**Dev/staging on Railway is fine and encouraged — synthetic data only.**
Not "de-identified enough." No real names, no live Healthie export.

## Service boundaries

| Service | Owns | Language |
|---|---|---|
| `scheduling` | Slot generation, licensure gating, booking, waitlist | Python |
| `billing` | Stripe orchestration, subscriptions, pauses, superbills | Python |
| `protocol` | Titration state machines, program lifecycle | Python + Hatchet |
| `router` | Lab orders, Rx routing, pharmacy adapters | Python |
| `mcp` | Scoped FHIR tools for agents | Python |
| `web` | All three UIs | TypeScript |

## Data placement rules

**Goes in Medplum (FHIR):** Patient, Practitioner, Appointment, Encounter,
Observation, DiagnosticReport, ServiceRequest, MedicationRequest, Communication,
Consent, DocumentReference, Task, CarePlan, Coverage, AuditEvent.

**Goes in Postgres `app`:** program tiers and pricing, protocol definitions,
leads pre-conversion, agent run logs, feature flags, scheduling rules, waitlist,
Stripe↔FHIR id mapping.

**Goes in Postgres `analytics`:** dbt models fed by ELT from both sources.

**Never:** billing amounts modeled as FHIR resources; leads as `Patient`;
protocol config as `Basic` + extensions.

## Why Hatchet, not Medplum Bots

Bots are single-shot TypeScript handlers with short timeouts. Correct for
"lab result arrives → normalize → create Task." Wrong for "day 34 of titration,
no refill, nudge, wait 5 days, escalate." Use Bots as thin FHIR-side triggers
that publish to Hatchet; put all multi-step logic in Python workflows.

## Analytics

FHIR search has no joins and no aggregation. Plan the pipeline from day one:
Medplum bulk export + Subscription-fed CDC → Postgres `analytics` → dbt →
Metabase. Never compute cohort metrics against the FHIR API.
