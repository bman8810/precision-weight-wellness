# P4 — Purchase flow

**Depends on:** p3, p7 (billing) in parallel.
**Read first:** `specs/04-requirements.md` FR-1.
**Open the mockup:** `mockups/pww-purchase-flow.html` — it is the spec for
layout, copy, and step order.

## Build

Next.js 15 App Router routes under `/start`. Server actions for mutations.

### Steps, in this order
1. State selection → waitlist branch for unlicensed states
2. Height / weight with live BMI
3. Comorbidities (multi-select)
4. Contraindication screen
5. Prior GLP-1 exposure — **required, drives starting dose**
6. Eligibility verdict: qualified / review / ineligible
7. Plan selection with recommendation derived from answers
8. Account creation (name, DOB, email, mobile, current meds, allergies only)
9. **Liora intake app handoff** for consents and full history
10. Stripe checkout
11. **First appointment booking — in session, before the confirmation page**
12. Baseline lab order + draw instructions
13. Dated timeline confirmation

### Rules
- Email captured at step 2 so every later drop-off is recoverable.
- Plan cards show program fee **and** estimated medication cost as separate
  lines naming the pharmacy as biller. Non-negotiable.
- Nothing new appears at checkout that wasn't shown at plan selection.
- Every step writes to `lead`, updating `stage`.
- Save-and-resume via magic link.

### On successful payment
Create `Patient`, `Account`, `Coverage`, `stripe_link` row. Assign care team by
licensure and capacity. Fire the baseline lab `ServiceRequest`. Enrol in the
onboarding Hatchet workflow. Enable portal access.

### Abandonment recovery (Hatchet)
- quiz complete, no plan → email with eligibility result at 24h
- plan selected, unpaid → nudge at 24h and 72h, then staff call task
- **paid, unbooked → SMS within 1 hour, staff call task same day.** Highest
  priority queue in the business.

## Acceptance criteria

- [ ] Selecting Texas routes to waitlist and captures email
- [ ] BMI updates live and eligibility branches correctly on all three paths
- [ ] Medication cost visible on plan cards and at checkout
- [ ] Payment without a booked appointment is impossible to reach the
      confirmation page from
- [ ] `paid_not_booked` creates a staff task within 1 hour
- [ ] Full flow completes on a 375px viewport

## Do not

- Ask for full medical history — that is the Liora intake app's job.
- Email a scheduling link instead of booking in session.
- Reword mockup copy without asking.
