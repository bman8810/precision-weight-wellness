# P3 — Scheduling engine

**Depends on:** p2. **Read first:** `specs/04-requirements.md` FR-4.

The largest single component in the plan and the most underestimated. Medplum
stores `Slot`; nothing generates them.

## Build

Python FastAPI service `services/scheduling/`.

### Availability engine
- Generate slots from provider working hours, blackout dates, existing
  appointments, and appointment-type duration + buffer.
- **Licensure gate**: filter to providers whose `PractitionerRole` covers the
  patient's current `Patient.address.state`. This belongs in the query, not a
  post-filter, and not a policy document.
- Timezone correct across provider, patient, and server. Handle DST boundaries.
  Write tests that cross a DST transition — this is where it breaks.
- Respect `min_lead_hours` and panel capacity caps.

### Booking
- Advisory-lock the slot row in Postgres before writing the `Appointment`.
  Write a concurrency test that fires 50 simultaneous bookings at one slot and
  asserts exactly one succeeds.
- Prep gating: block or warn per `scheduling_rule.prep_requirements`.
- Reschedule and cancel with policy enforcement.

### Lifecycle
- Reminder cascade via Hatchet: 24h and 1h, with confirm/reschedule deep links.
- Waitlist auto-fill: on cancellation, offer to the waitlist in order with a
  time-boxed claim window.
- No-show and late-cancel → charge via the billing service.

### API
```
GET  /availability?patient_id&appointment_type&from&to
POST /appointments
POST /appointments/{id}/reschedule
POST /appointments/{id}/cancel
POST /waitlist
```

## Acceptance criteria

- [ ] Patient in CT sees only CT-licensed providers; changing their state to TX
      returns zero slots with a clear reason
- [ ] 50 concurrent bookings on one slot → exactly one `Appointment`
- [ ] DST transition tests pass in both directions
- [ ] Booking with labs older than the prep window is blocked with a specific message
- [ ] Cancellation inside the window creates a `ChargeItem`
- [ ] Waitlist fills a cancelled slot end to end

## Do not

- Post-filter licensure after generating slots.
- Handle double-booking in application code.
- Store scheduling policy in code — it lives in `scheduling_rule`.
