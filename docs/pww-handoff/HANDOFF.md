# Handoff notes — read once before starting

## What has and hasn't been decided

**Decided:** Medplum self-hosted over Cloud (access-policy cap), Hatchet over
Temporal/Celery/Bots, Stripe as money SoR, Postgres sidecar for non-clinical
data, Liora intake app for consents and full history.

**Not decided:** whether ModMed EMA replaces Medplum as the clinical system of
record. `prompts/p0-modmed-probe.md` resolves it. Everything else branches on
the answer, so run it first.

## The three things most likely to go wrong

**1. The Healthie export.** If charts, historical weights, and documents can't
come out cleanly, the project isn't viable. Find out in week one, not month
four. `prompts/p2-data-model.md` includes the spike.

**2. EPCS certification.** Phentermine is Schedule IV, so controlled-substance
prescribing requires DEA-grade identity proofing — months of paperwork, not a
code task. Start it in Phase 0 even though the integration lands in Phase 3.

**3. The scheduling engine.** Four weeks, consistently underestimated because
`Slot` exists in FHIR and looks handled. It isn't. Nothing generates slots,
nothing enforces licensure, nothing prevents double-booking.

## What actually differentiates this build

Not feature parity with Healthie. Three things:

- The **vitals band** — the entire clinical picture in one strip, shaped for
  weight management rather than generic primary care.
- The **weekly check-in loop** — 60 seconds, feeding the titration decision,
  the outcome metrics, and the agents.
- **Cohort outcome analytics** — %TBWL by tier and starting BMI, retention
  curves, churn signals. The number Healthie will never give you and the one
  the practice is judged on.

If those three are excellent and everything else is merely adequate, the
project succeeded.

## Cost expectations

| Item | Monthly |
|---|---|
| AWS (lean Medplum: EC2 + RDS + S3) | $50–70 |
| Hatchet Cloud (or self-host) | $0–100 |
| Stripe | % of volume |
| Twilio + SendGrid | $50–150 |
| DoseSpot | per-provider licence |
| Health Gorilla | per-order |
| Sentry, Grafana | $50 |

Against Medplum Cloud Production at $2,000/mo, or Premium at $6,000/mo — the
tier you'd be forced onto by the access-policy cap.

## The success metric

At the end of Phase 1: does Libby's team *prefer* it to Healthie? If not,
Phases 2–4 aren't worth building. Ask them directly, early, and believe the
answer.
