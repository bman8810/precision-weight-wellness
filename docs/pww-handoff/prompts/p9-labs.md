# P9 — Labs and diagnostics

**Depends on:** p2. **Read first:** `specs/04-requirements.md` FR-3.6–3.9.

## Build

`services/router/labs/`

### Ordering
Health Gorilla integration (Rupa is the faster cash-pay path if procurement
stalls). Compendium mapping, AOE questions, requisition PDF to the patient
portal, draw-site lookup by ZIP.

### Result ingest
Inbound results → **LOINC-coded `Observation`s** + `DiagnosticReport`. Mapping
each lab's local codes to LOINC is ongoing maintenance, not a one-time task —
build a mapping table with an admin surface, not a hardcoded dict.

### Interpretation
- Flag against reference range **and** against the patient's own prior values.
  The delta is where the clinical value is: ALT 78 as an isolated value is a
  different decision from ALT 34 → 41 → 58 → 78.
- Compute per-analyte trend direction and rate.
- Attach same-day weight to every panel — in this specialty labs are meaningless
  without the loss rate beside them.

### Release rules
Results release to the patient **immediately by default**, with narrow
documented exceptions. Build the rule now; retrofitting is painful.

### Provider inbox
Acknowledge / act / notify with an escalation timer on unreviewed results. A
missed abnormal is the highest-severity failure mode in the system.

### Flowsheet API
```
GET /patients/{id}/labs/flowsheet?analytes=&from=&to=
→ analytes × dates, most recent first, with reference ranges,
  flag status, and same-day weight
```

## Acceptance criteria

- [ ] Order placed and requisition reaches the patient portal
- [ ] Result ingests as coded Observations with correct LOINC
- [ ] Delta flagging catches a rising-but-in-range trend
- [ ] Flowsheet returns 4+ panels correctly ordered
- [ ] Unreviewed critical result escalates on the timer
- [ ] Release rules are configurable, not hardcoded

## Do not

- Hardcode lab code mappings.
- Show a value without its history anywhere in the product.
- Delay patient release without a documented exception.
