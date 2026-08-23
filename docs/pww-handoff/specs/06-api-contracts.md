# API contracts

Consolidated surface across services. Individual prompts own the detail; this
file is the map, and the place to check before inventing a new endpoint.

## Conventions

- Base: `https://api.precisionww.com/v1`
- JSON only. `snake_case` request and response bodies.
- Auth: OAuth2 bearer from Medplum. The frontend never holds a service
  credential — it calls Next.js server actions, which call services with the
  user's token forwarded.
- Patient-scoped endpoints resolve the patient from the token for patient
  principals; an explicit `patient_id` is accepted only for staff and agent
  principals and is checked against their AccessPolicy.
- Idempotency: any endpoint that moves money or creates a clinical record
  accepts `Idempotency-Key`.
- Pagination: `?cursor=&limit=` returning `{ data, next_cursor }`.

### Error shape

```json
{
  "error": {
    "code": "licensure_unavailable",
    "message": "No provider is licensed in Texas.",
    "field": "state",
    "remediation": "join_waitlist"
  }
}
```

`message` is patient-safe and displayable. Never leak internals or PHI into it.
`remediation` names a client action where one exists.

## Scheduling — `services/scheduling`

```
GET    /availability
       ?patient_id&appointment_type&from&to&timezone
       → { slots: [{ start, end, practitioner_id, practitioner_name }],
           filtered_by: { state, licensure, capacity } }
       Licensure filtering happens IN the query. Empty result includes a reason.

POST   /appointments
       { patient_id, slot_start, appointment_type, practitioner_id }
       → { appointment_id, status, prep_requirements: [...] }
       409 slot_taken · 422 prep_unmet · 403 licensure_unavailable

POST   /appointments/{id}/reschedule   { slot_start }
POST   /appointments/{id}/cancel       { reason }
       → { charge_created: bool, charge_cents }

GET    /appointments?patient_id&status
POST   /waitlist                       { email, state }
POST   /waitlist/{id}/offer            staff/system only
```

## Billing — `services/billing`

```
POST   /checkout/session
       { lead_id, plan_key, one_time_items: [] }
       → { stripe_session_id, line_items, medication_estimate }
       medication_estimate is INFORMATIONAL and never charged.

GET    /subscription?patient_id
       → { plan, status, current_period_end, visits_used, visits_included }

POST   /subscription/pause      { patient_id, resume_on }
POST   /subscription/resume     { patient_id }
POST   /subscription/change     { patient_id, plan_key }
       → { proration_preview_cents, effective_date }   // preview before confirm
POST   /subscription/change/confirm

POST   /charges                 { patient_id, item_key, amount_cents }
GET    /invoices?patient_id
GET    /superbill?patient_id&from&to    → PDF

POST   /refunds                 { charge_id, amount_cents, reason }
       → { status: "pending_approval", approver_task_id }
POST   /refunds/{id}/approve    second principal required; 403 if same as requester

POST   /webhooks/stripe         signature-verified, idempotent
```

## Protocol — `services/protocol`

```
GET    /patients/{id}/protocol-state
       → { drug, current_dose, weeks_at_dose, ladder_position,
           next_review_date, program_stage }

POST   /patients/{id}/protocol/evaluate
       → { recommendation: "escalate" | "hold" | "de-escalate",
           next_dose, reasoning: [ ... ], confidence,
           blocking_factors: [ "side_effect_grade", "adherence" ] }
       ADVISORY ONLY. Never mutates the MedicationRequest.

POST   /patients/{id}/protocol/accept    { recommendation_id, note }
POST   /patients/{id}/protocol/override  { chosen_action, rationale }
       Rationale is required on override and lands in the note.

GET    /protocols                staff-editable definitions
PUT    /protocols/{id}           creates a new version, never mutates in place
```

## Check-ins — `services/protocol`

```
POST   /patients/{id}/check-ins
       { weight_lb, symptoms: [{ symptom, grade }], adherence,
         missed_reason?, hunger_score, note? }
       → { check_in_id, observations_created: [...],
           triage_task_id?  }   // present when any grade == severe
       Writes coded Observations AND the QuestionnaireResponse.
       Triage task is created BEFORE the response returns.

GET    /patients/{id}/check-ins?from&to
```

## Labs — `services/router/labs`

```
POST   /lab-orders
       { patient_id, panel_key, fasting_required, due_by }
       → { service_request_id, requisition_url, draw_sites: [...] }

GET    /patients/{id}/labs/flowsheet?analytes=&from=&to=
       → { dates: [...],                      // most recent first
           rows: [{ analyte, loinc, unit, reference_low, reference_high,
                    values: [{ date, value, flag, trend_direction }] }],
           weight_by_date: { ... } }          // same-day weight, always included

GET    /patients/{id}/labs/panel/{report_id}
       → latest panel with deltas vs prior draw

GET    /results/inbox?status=unreviewed&severity=
       → cross-patient triage rows only. No patient-scoped detail here.

POST   /results/{id}/acknowledge   { note? }
POST   /results/{id}/release       { hold_reason? }   // immediate by default
POST   /results/{id}/notify        { message_body }   // human-approved text
```

## Messaging

```
GET    /threads?patient_id&category
POST   /threads                    { patient_id, category, subject }
POST   /threads/{id}/messages      { body, attachments: [] }
       → { message_id, sla_due_at }
POST   /threads/{id}/assign        { practitioner_id }
```

## Tasks

```
GET    /tasks?owner&type&status&overdue=true
POST   /tasks                      { type, patient_id, owner, due, priority }
POST   /tasks/{id}/complete        { outcome, note }
POST   /tasks/{id}/reassign        { owner }
```

## Leads — `app` schema, no PHI until conversion

```
POST   /leads                      { state, utm }
PATCH  /leads/{id}                 partial, called at every quiz step
POST   /leads/{id}/evaluate        → { eligibility, recommended_plan, reasons }
POST   /leads/{id}/convert         → { patient_id }   // on successful payment
```

## MCP tools — `services/mcp`

Exposed to agents, not to the browser. Each agent's `ClientApplication` has an
AccessPolicy that is the real enforcement boundary; tool scoping is defence in
depth, not the control.

| Tool | Access | Notes |
|---|---|---|
| `get_patient_summary` | read | Demographics, stage, current dose |
| `get_check_in_history` | read | Windowed |
| `get_lab_flowsheet` | read | Same shape as the REST endpoint |
| `get_medication_history` | read | Includes dispense and gaps |
| `draft_pre_visit_brief` | write draft | Never publishes |
| `draft_lab_explanation` | write draft | Never sends |
| `create_task` | write | Low-stakes, reversible, auto-executes |
| `submit_prior_auth` | **approval required** | Queues, does not submit |

No tool writes a `MedicationRequest`. No tool sends a `Communication` to a
patient. If you find yourself wanting one, the answer is an approval queue entry.

## Webhook receivers

```
POST /webhooks/stripe          payments
POST /webhooks/dosespot        prescription status
POST /webhooks/healthgorilla   results
POST /webhooks/twilio          delivery + inbound SMS + STOP handling
POST /webhooks/medplum         FHIR Subscription fan-out → Hatchet
```

All verify signatures, are idempotent under replay, and return 2xx fast —
work is enqueued, never done inline.
