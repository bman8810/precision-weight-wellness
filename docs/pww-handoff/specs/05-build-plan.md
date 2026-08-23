# Build plan

Effort is senior engineering weeks, excluding vendor lead time.

## Phase 0 — Decision gate (1 week)

| Task | Effort |
|---|---|
| ModMed API probe | 0.5 |
| Healthie data extraction spike | 1 |
| **EPCS certification paperwork started** | begins now, months to complete |
| AWS BAA accepted, account structure set | 0.5 |

**Gate:** does the platform build on Medplum or ModMed? Do not proceed until
answered. Also: verify the Healthie export is complete enough that leaving is
viable at all. This spike can kill the project cheaply, which is its value.

## Phase 1 — Front door (10–12 weeks)

Lowest clinical risk, highest daily friction, fastest to revenue.

| Workstream | Effort |
|---|---|
| Medplum self-hosted deployment + staging | 2 |
| Data model, access policies, LOINC codes | 2 |
| Scheduling engine (availability, licensure, booking) | 4 |
| Purchase flow end to end | 3 |
| Stripe subscriptions, pauses, dunning | 3 |
| Patient portal shell + home + check-in | 3 |
| Healthie migration: charts, documents, Stripe mapping | 4 |
| Lead capture + funnel | 2 |

**Exit criteria:** a new patient can qualify, pay, book, and complete a weekly
check-in. Existing patients are migrated with historical weights as coded
Observations. Staff prefer it to Healthie for scheduling and billing.

## Phase 2 — Clinical (8–10 weeks)

| Workstream | Effort |
|---|---|
| Clinical console + chart + vitals band | 4 |
| Note templates, discrete capture, chart lock | 3 |
| Lab ordering + result ingest + flowsheet | 4 |
| Result inbox + release rules | 2 |
| Messaging + triage + SLA | 3 |
| Task work queue | 2.5 |
| ELT pipeline + first dbt models | 2 |

**Exit criteria:** Dr. Rhee runs a full clinic day in the console without
opening Healthie. Labs flow in coded and trend correctly.

## Phase 3 — Prescribing and orchestration (8 weeks)

Gated on EPCS certification completing.

| Workstream | Effort |
|---|---|
| DoseSpot integration | 3 |
| Compounding pharmacy routing | 2 |
| Titration ladders as data + protocol engine | 3 |
| Refill orchestration + adherence | 3 |
| Hatchet workflows: onboarding, titration, standing labs | 3 |
| MCP server + agent service accounts + eval harness | 3 |

## Phase 4 — Leverage (6 weeks)

| Workstream | Effort |
|---|---|
| Outcome analytics, cohort curves, retention | 3 |
| Agents: intake summary, pre-visit brief, lab explanation | 3 |
| Prior auth + eligibility | 3 |
| Churn signals + at-risk queue | 2 |
| Configuration surface | 2 |

## Sequencing rules

1. **Migration spike before anything else.** If the data can't come out cleanly,
   nothing downstream matters.
2. **EPCS paperwork starts in Phase 0** even though the code lands in Phase 3.
   It is the longest pole in the plan.
3. **Eval harness before agents**, not after.
4. **Dual-run, never hard cutover.** Both systems live, staff working in the new
   one, for at least two weeks.
5. **Test a database restore before go-live.**

## The real success metric

Not feature parity. The question at the end of Phase 1 is whether Libby's team
*prefers* it. If not, nothing in Phases 2–4 is worth building.
