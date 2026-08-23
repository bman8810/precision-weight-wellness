# P8 — Workflows and orchestration

**Depends on:** p2. **Read first:** `specs/01-architecture.md`,
`specs/04-requirements.md` FR-6.

## Architecture

Medplum Bots are **thin triggers only** — single-shot TypeScript, short timeout.
They normalize an event and publish to Hatchet. All multi-step logic with timers,
retries, and branches lives in Python Hatchet workflows.

## Build

`services/protocol/workflows/`

### Onboarding
```
enrolled → labs ordered → [wait for result, escalate at T-1 before visit]
        → first visit → prescription sent → first shipment → titration
```
Each unmet deadline creates a staff task rather than failing silently.

### Titration state machine
Driven by the `protocol` table, not hardcoded. Per cycle:
- Weeks at current dose >= `min_weeks`?
- Side-effect grade below hold threshold?
- Adherence above threshold?
- Weight response as expected?

Produce an **advisory** recommendation: escalate / hold / de-escalate, with the
reasoning. Surface it in the chart. Never mutate the prescription.

### Refill orchestration
Days-supply tracking → proactive refill window → pharmacy submission →
follow-up on delay → gap alert. Highest-leverage automation in the practice.

### Standing labs
Fire baseline, 6-week, 3-month, and annual panels on program milestones.

### Churn detection
Nightly: refill gap > 30 days, no check-in > 14 days, plateau > 6 weeks with no
booked visit, payment failure. Writes to the at-risk queue.

## Acceptance criteria

- [ ] A workflow survives a worker restart mid-execution and resumes
- [ ] Titration recommendation matches the protocol table for 10 golden cases
- [ ] Changing `protocol.ladder` changes behaviour with no code change
- [ ] Refill workflow handles a pharmacy delay without dropping the patient
- [ ] Churn detection produces the at-risk queue nightly

## Do not

- Put multi-step logic in Medplum Bots.
- Let any workflow write a prescription without human approval.
- Poll the database on a cron where a Subscription would do.
