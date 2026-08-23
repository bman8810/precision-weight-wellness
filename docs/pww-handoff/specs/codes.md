# Code systems

Every coded value in the clinical record is registered here. **Undocumented
local codes are how a clinical data model rots** — if you add one, add its row
in the same commit.

## Standard codes

Prefer LOINC for observations, RxNorm for medications, SNOMED CT for conditions,
CPT for billable services, ICD-10-CM for diagnoses. Only invent a local code
when no standard one exists.

### LOINC — vitals and anthropometrics

| Code | Display | Unit | Captured |
|---|---|---|---|
| `29463-7` | Body weight | lb (UCUM `[lb_av]`) | Check-in, visit |
| `39156-5` | Body mass index | kg/m² | Derived |
| `8480-6` | Systolic blood pressure | mm[Hg] | Visit |
| `8462-4` | Diastolic blood pressure | mm[Hg] | Visit |
| `8867-4` | Heart rate | /min | Visit, device |
| `56086-2` | Waist circumference | in | Visit |
| `41982-0` | Percentage body fat | % | Device (optional) |

### LOINC — the standing panel

| Code | Display | Unit | Ref (adult) |
|---|---|---|---|
| `4548-4` | Hemoglobin A1c | % | 4.0–5.6 |
| `1558-6` | Fasting glucose | mg/dL | 70–99 |
| `1742-6` | ALT | U/L | 7–56 |
| `1920-8` | AST | U/L | 10–40 |
| `1751-7` | Albumin | g/dL | 3.5–5.0 |
| `2093-3` | Cholesterol, total | mg/dL | <200 |
| `13457-7` | LDL cholesterol (calc) | mg/dL | <100 |
| `2085-9` | HDL cholesterol | mg/dL | >50 |
| `2571-8` | Triglycerides | mg/dL | <150 |
| `3016-3` | TSH | mIU/L | 0.4–4.0 |
| `3094-0` | BUN | mg/dL | 7–20 |
| `2160-0` | Creatinine | mg/dL | 0.6–1.1 |
| `33914-3` | eGFR | mL/min/1.73m² | >60 |
| `3040-3` | Lipase | U/L | 13–60 |
| `1989-3` | Vitamin D, 25-OH | ng/mL | 30–100 |
| `2132-9` | Vitamin B12 | pg/mL | 200–900 |

> Reference ranges shown are defaults for display. **The performing lab's
> reported range always wins** and must be stored on the `Observation`. Never
> hardcode a range into a component.

### RxNorm — in-scope medications

| RxCUI | Ingredient | Notes |
|---|---|---|
| `1991302` | Tirzepatide | Titration ladder 2.5 → 15 mg |
| `1991316` | Semaglutide | Titration ladder 0.25 → 2.4 mg |
| `1156171` | Liraglutide | Secondary |
| `8152` | Phentermine | **Schedule IV — requires EPCS** |
| `6809` | Metformin | Adjunct |
| `1546054` | Naltrexone/bupropion | Secondary |

Compounded preparations often lack a clean RxCUI. Use the ingredient RxCUI plus
a `MedicationRequest.dispenseRequest.performer` pointing at the compounding
pharmacy, and record the preparation detail in a local extension. Do not invent
RxCUIs.

## Local CodeSystem

Namespace: `http://precisionww.com/fhir/CodeSystem/pww`

### `side-effect-grade`
Applied to symptom observations from the weekly check-in.

| Code | Display | Ordinal | Behaviour |
|---|---|---|---|
| `none` | None | 0 | — |
| `mild` | Mild | 1 | Recorded only |
| `moderate` | Moderate | 2 | Blocks dose escalation per protocol |
| `severe` | Severe | 3 | **Fires clinical triage Task immediately** |

### `symptom`
Value set for graded symptoms.

`nausea` · `vomiting` · `constipation` · `diarrhea` · `fatigue` ·
`injection-site-reaction` · `heartburn` · `headache` · `hair-loss` ·
`abdominal-pain`

> `vomiting` and `abdominal-pain` at moderate or above escalate regardless of
> protocol state — both are on the pancreatitis differential.

### `adherence`
| Code | Display | Numeric |
|---|---|---|
| `all-doses` | All doses taken | 100 |
| `missed-one` | Missed one dose | 75 |
| `missed-multiple` | Missed more than one | 50 |

### `missed-reason`
`side-effects` · `supply-delay` · `cost` · `travel` · `forgot` ·
`felt-unnecessary` · `other`

### `hunger-score`
Integer 1–5. `1` = never hungry, `5` = constantly hungry. Stored as an integer
`Observation`, not a code.

### `program-stage`
| Code | Display |
|---|---|
| `onboarding` | Onboarding |
| `baseline-labs` | Awaiting baseline labs |
| `titration` | Titration |
| `maintenance` | Maintenance |
| `paused` | Paused |
| `offboarding` | Offboarding |
| `inactive` | Inactive |

### `visit-type`
`initial-consult` · `titration-followup` · `plateau-visit` ·
`maintenance-visit` · `side-effect-visit` · `nutrition-session`

### `message-category`
`clinical` · `medication` · `results` · `billing` · `scheduling`

Drives triage routing and the SLA clock. A message with no category is a bug.

### `task-type`
`refill` · `prior-auth` · `lab-followup` · `no-show-recovery` ·
`payment-failed` · `paid-not-booked` · `consent-missing` · `result-review` ·
`co-sign` · `churn-outreach`

### `agent-disposition`
`drafted` · `approved` · `approved-with-edit` · `overridden` · `rejected`

Approve-without-edit rate is the health metric for the agent layer. It is
computed from this field.

## Adding a code

1. Search LOINC / RxNorm / SNOMED first. Local codes are a last resort.
2. Add the row here with display, meaning, and any behaviour it triggers.
3. Add it to the FHIR `CodeSystem` and relevant `ValueSet` in the Medplum project.
4. If it changes clinical behaviour, add a golden case to `evals/`.
