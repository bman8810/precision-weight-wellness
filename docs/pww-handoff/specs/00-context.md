# Context

## The practice

Precision Weight + Wellness (precisionww.com) is a physician-led weight-management
telehealth practice run by Dr. Libby Rhee, based in New Milford, Connecticut,
licensed in CT / NY / NJ / MI. Cash-pay, subscription-based, currently on Healthie.

Three tiers:

| Tier | Price | Includes |
|---|---|---|
| Essential | $199/mo | Monthly check-in, medication management, baseline labs |
| Premium | $349/mo | Twice-monthly visits, B12 injections, nutritional counseling |
| Concierge | $599/mo | Unlimited check-ins, priority scheduling, direct physician access |

**Medication is billed separately by the pharmacy** (~$199–399/mo depending on
drug and dose). This separation must be visible everywhere in the product. It is
the single largest source of refunds and complaints in this category.

## Why leave Healthie

1. The patient experience is generic and cannot be shaped to the program.
2. No cohort outcome analytics — %TBWL by tier, retention curves, churn signals.
3. No place to put protocol logic (titration ladders, plateau handling).
4. No substrate for agents with a unified audit trail.

## The care model

Visits are punctuation. **The weekly check-in is the product.** Between monthly
or twice-monthly visits, the patient submits weight, graded side effects,
adherence, and hunger. That data drives the titration decision, the outcome
metrics, and the agent layer. If the check-in loop is weak, nothing else works.

Program lifecycle: `onboarding → baseline labs → medication start → titration →
maintenance → offboarding`.

## Decisions already made

- **Medplum, self-hosted.** Not Medplum Cloud. The Cloud "Production" tier caps
  access policies at 3; the agent architecture needs far more. Self-hosted is
  uncapped. See `01-architecture.md` for the deployment shape.
- **Hatchet** for durable workflows, not Temporal (lighter ops) and not Celery
  (not durable) and not Medplum Bots (single-shot, TypeScript, short timeout).
- **Stripe is the system of record for money.** Mirror only coverage status into
  FHIR. Do not model billing in FHIR.
- **Postgres sidecar for non-clinical data.** Program tiers, pricing, leads,
  protocol definitions, agent run logs. Not `Basic` + extensions.
- **Consents and full medical intake are handled by the existing Liora intake
  app.** The purchase flow captures only name, DOB, contact, current medications,
  and allergies, then hands off. Remaining history is completed in the visit.

## Open decision

**ModMed EMA.** The team already has API access to a ModMed instance (CRUD on
patients and appointments). If ModMed's API supports writing Observations,
clinical notes, and MedicationRequests, and exposes webhooks, using it as the
clinical system of record would skip e-Rx/EPCS, lab interfaces, and hosting —
the longest-lead-time items in the plan.

`prompts/p0-modmed-probe.md` resolves this. **Run it first.** Everything
downstream branches on the answer.
