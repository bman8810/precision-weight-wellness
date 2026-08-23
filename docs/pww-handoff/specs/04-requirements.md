# Functional requirements

Numbered for traceability. `MUST` is binding; `SHOULD` is strong default.

## FR-1 Purchase flow  → `mockups/pww-purchase-flow.html`

- FR-1.1 State selection MUST be the first question, before any price is shown.
  Unlicensed states route to a waitlist with email capture, never a dead end.
- FR-1.2 Eligibility quiz captures height, weight (live BMI), comorbidities,
  contraindications, and **prior GLP-1 exposure** (never / current / past).
  Prior exposure determines starting dose and MUST be captured pre-visit.
- FR-1.3 Eligibility resolves to `qualified` | `review` | `ineligible`.
  `review` books a consult with payment deferred. `ineligible` gets an honest
  explanation and referral options.
- FR-1.4 Plan cards MUST show program fee and estimated medication cost as
  separate lines, naming the pharmacy as the biller.
- FR-1.5 Recommended tier is derived from quiz answers and labeled as such.
- FR-1.6 Cancellation and pause policy MUST be visible pre-purchase.
- FR-1.7 Account creation captures name, DOB, email, mobile, current
  medications, drug allergies. Nothing more.
- FR-1.8 Consents and full medical history hand off to the **Liora intake app**.
  Incomplete intake does not block purchase; it creates a pre-visit task.
- FR-1.9 First appointment MUST be booked inside the checkout session. Emailing
  a scheduling link is prohibited.
- FR-1.10 Baseline lab order fires on payment; the confirmation screen shows
  draw location, fasting instructions, and a deadline relative to the visit.
- FR-1.11 Confirmation is a dated timeline, not a receipt.
- FR-1.12 Abandonment recovery branches on stage. `paid_not_booked` creates a
  same-day staff call task and is the highest-priority queue in the system.

## FR-2 Patient portal  → `mockups/pww-patient-portal-web.html`, `pww-patient-portal.html`

Responsive single codebase. Mobile is the primary usage context.

- FR-2.1 Home leads with a single next-action card.
- FR-2.2 **Weekly check-in**: weight, per-symptom graded side effects
  (none/mild/moderate/severe), adherence, hunger 1–5, free note. Target 60
  seconds. Push-notified. Severe symptom routes immediately to clinical triage.
- FR-2.3 Check-in submission writes coded `Observation`s, not just a
  `QuestionnaireResponse`.
- FR-2.4 Weight chart marks dose changes on the axis.
- FR-2.5 Medication view shows current dose, titration ladder position, next
  review date, refill status timeline with pharmacy and ETA, days remaining,
  and **the pharmacy price**.
- FR-2.6 Labs release to the patient immediately by default, with a
  plain-language summary above the values. Trends, not lone numbers.
- FR-2.7 Message threads are typed (clinical / billing / scheduling / results)
  with the expected response window stated.
- FR-2.8 Progress page includes non-scale outcomes — BP, A1c, medications
  discontinued, waist. This is the plateau-week retention surface.
- FR-2.9 Billing shows plan fee and medication cost separately, and offers
  **self-serve pause above cancel**, always.
- FR-2.10 Address change MUST warn that it can change the care team.

## FR-3 Clinical console  → `mockups/pww-provider-console.html`

- FR-3.1 Today view opens on the schedule with AI-drafted pre-visit briefs:
  change since last visit, side effects, adherence, missed doses, and an
  explicit **Decision:** line.
- FR-3.2 Prep flags (labs missing, intake incomplete, consent unsigned) surface
  before the visit starts.
- FR-3.3 Chart header renders the **vitals band** (see design system).
- FR-3.4 Protocol engine renders an advisory suggestion with Accept / Override.
  It MUST NOT act automatically.
- FR-3.5 Note editor is template-driven by visit type, prefilled from check-in
  and lab data, and labels what was prefilled.
- FR-3.6 Result inbox is **cross-patient**: triage only, no patient detail.
  Each row shows patient, analyte, value with reference range, a sparkline of
  recent draws, and age. Sections: critical / abnormal / routine / reviewed.
- FR-3.7 Opening a result navigates to a **patient-scoped lab view**: latest
  panel with deltas, expandable per-analyte trend, and a full flowsheet
  (analytes × dates, most recent first) including weight on the same dates.
- FR-3.8 Lab detail includes clinical context: rate of loss, other hepatotoxic
  meds, alcohol.
- FR-3.9 Unreviewed results past threshold escalate and alert.
- FR-3.10 Ops work queue is unified and filterable, with `paid_not_booked`
  pinned and at-risk-of-churn as a standing section.
- FR-3.11 Configuration screen lets non-engineers change plans, scheduling
  rules, titration protocols, and care team without a deploy.

## FR-4 Scheduling

- FR-4.1 Slots are generated from provider working hours, blackouts, and
  appointment-type duration. Medplum does not do this.
- FR-4.2 **Licensure gate**: only providers licensed in the patient's current
  state of residence are bookable. Enforced in the availability query.
- FR-4.3 Double-booking prevented at the database via advisory locks.
- FR-4.4 Timezone and DST correct across provider, patient, and server.
- FR-4.5 Prep gating blocks or warns when labs/weight/fasting prerequisites
  are unmet.
- FR-4.6 Reminder cascade with confirm and reschedule deep links.
- FR-4.7 Waitlist auto-fill on cancellation.
- FR-4.8 No-show and late-cancel enforcement fires the charge automatically.

## FR-5 Billing

- FR-5.1 Stripe Billing holds subscriptions. FHIR mirrors status only.
- FR-5.2 Pause with duration picker, proration, upgrade/downgrade.
- FR-5.3 Dunning with defined care-access consequences at each stage.
- FR-5.4 Superbills with CPT and ICD for HSA/FSA self-submission.
- FR-5.5 Refunds and write-offs require two-person approval.

## FR-6 Workflows (Hatchet)

- FR-6.1 Onboarding: enrolment → labs → visit → prescription → first shipment,
  with escalation at each unmet deadline.
- FR-6.2 Titration state machine per protocol definition.
- FR-6.3 Refill orchestration: proactive window, pharmacy follow-up, gap alert.
- FR-6.4 Standing lab panels fire on program milestones.
- FR-6.5 Churn-risk detection: refill gap, missed check-ins, plateau duration.

## FR-7 Agents

- FR-7.1 All agent access via MCP server over the FHIR API, one scoped service
  account per agent. Actions land in the same `AuditEvent` stream as humans.
- FR-7.2 Anything touching money, medication, or the chart routes to an
  approval queue. Auto-execute only reversible, low-stakes actions.
- FR-7.3 Every run logged to `agent_run` with prompt, tool calls, output, and
  reviewer disposition.
- FR-7.4 Eval harness with golden cases exists **before** any agent ships.
- FR-7.5 Build order: intake summarization → pre-visit brief → lab explanation
  draft → prior auth → no-show recovery.

## Non-functional

- NFR-1 No PHI outside BAA-covered infrastructure.
- NFR-2 p95 page load under 2s on 4G for the patient portal.
- NFR-3 Check-in submission completes in under 3 taps per question.
- NFR-4 Tested database restore before go-live, not after.
- NFR-5 Every write path has an audit trail attributable to a principal.
- NFR-6 Structured logging with PHI redaction on anything leaving the VPC.
