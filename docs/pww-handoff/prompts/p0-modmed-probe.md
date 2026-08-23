# P0 — ModMed API probe  ·  DECISION GATE

**Run before anything else. Nothing downstream starts until this is answered.**

## Context

We have working API access to a ModMed EMA instance with CRUD on patients and
appointments. If ModMed can also serve as the clinical system of record, we skip
e-Rx/EPCS certification, lab interfaces, and hosting — the three longest-lead-time
items in the entire plan.

Read `specs/00-context.md` first.

## Goal

Determine empirically what the ModMed API can **write** and whether it can drive
an event-based workflow layer.

## Build

A Python script `probe/modmed_probe.py` that authenticates against the sandbox
(never production) and produces a capability report. Test each independently and
record the exact HTTP status and error body on failure.

1. **Observation write** — create a body weight observation with LOINC 29463-7.
   Then update it. Then read it back. *This is close to pass/fail: without it
   there are no trend charts, no protocol logic, no outcome metrics.*
2. **Clinical note write** — can a note be created programmatically, or is the
   API read-only for notes?
3. **MedicationRequest write** — can a prescription be created, or is
   prescribing UI-only?
4. **Custom/structured data** — can arbitrary structured data be attached to a
   patient, or are we confined to their schema?
5. **Events** — do webhooks or subscriptions exist? If polling only, at what
   granularity and with what change detection?
6. **Rate limits** — find the documented limit and the actual one. Agents are chatty.
7. **Bulk read** — can the full patient panel be exported for the analytics pipeline?

## Deliverable

`probe/REPORT.md` with a table: capability | supported | notes | evidence.
Plus a one-paragraph recommendation.

## Decision rule

- Observations, notes, and MedicationRequests all writable **and** events
  available → recommend ModMed as clinical SoR; the rest of this pack retargets.
- Writes thin or polling only → Medplum as specified. Proceed to p1.
- Mixed → report it and stop. A human decides.

## Constraints

- Sandbox only. No production credentials.
- No PHI in the report — use synthetic identifiers.
- Do not build anything else. This is a probe.
