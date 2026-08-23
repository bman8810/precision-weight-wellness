# P7 — Billing service

**Depends on:** p2. **Read first:** `specs/04-requirements.md` FR-5.

Stripe is the system of record for money. FHIR mirrors coverage status only.
Do not model billing amounts as FHIR resources.

## Build

Python FastAPI service `services/billing/`.

### Subscriptions
- Three Stripe products mapped to the `plan` table via `stripe_price_id`.
- Create subscription on checkout; write `stripe_link`.
- Upgrade / downgrade with proration previewed to the patient before confirming.
- **Pause** with a duration picker. Travel and plateaus cause most cancellations
  and a pause converts a large share of them. This is a retention feature, not
  an edge case.

### Dunning
Webhook-driven retry ladder. Define the care-access consequence at each stage —
what a patient can still do on day 1 of failure vs day 7 — and encode it once.
Failed payment creates a work-queue task.

### One-time charges
Labs, no-show fees, late cancels, extra visits. Mirror to `ChargeItem` for
clinical context only.

### Superbills
Generate itemised PDF with CPT and ICD codes for HSA/FSA self-submission.
This is real perceived value at this price point.

### Controls
Refunds and write-offs require two-person approval before execution.

### Webhooks
Handle `invoice.payment_failed`, `invoice.paid`,
`customer.subscription.updated/deleted`, `charge.refunded`. Idempotent, with
signature verification and replay protection.

## Acceptance criteria

- [ ] Subscription created, paused, resumed, upgraded, downgraded — all with
      correct proration
- [ ] Failed payment triggers dunning and creates a task
- [ ] Superbill PDF renders with valid CPT and ICD codes
- [ ] Refund requires a second approver
- [ ] Webhooks are idempotent under replay
- [ ] Program fee and medication cost never appear as a single combined figure

## Do not

- Put dollar amounts in FHIR as source of truth.
- Auto-refund without approval.
