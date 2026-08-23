# P2 — Data model, access policies, migration spike

**Depends on:** p1. **Read first:** `specs/02-data-model.md`.

## Build

### 1. Postgres `app` schema
Alembic migrations for every table in the spec. SQLAlchemy models. Seed the
`plan`, `protocol`, and `scheduling_rule` tables with real PW+W values.

### 2. Medplum project setup
- Local CodeSystem + ValueSets for side-effect grade, adherence, hunger score,
  program stage. Document each in `specs/codes.md`.
- Questionnaire definitions for the weekly check-in and the light purchase intake.
- **AccessPolicy per role**: `patient`, `coordinator`, `nurse`, `physician`,
  `admin`, plus one per agent. Patients see only their own compartment. Write a
  test per policy asserting both what it permits and what it denies.

### 3. Healthie migration spike — HIGHEST PRIORITY
`migration/extract.py` against Healthie's GraphQL API:
- Patients, demographics, contact
- Historical weights → coded `Observation` (LOINC 29463-7) with original timestamps
- Lab results → `DiagnosticReport` + coded `Observation`
- Documents → `DocumentReference`
- Appointments, past and future
- Stripe customer IDs

Produce `migration/COMPLETENESS.md`: for each entity, count in Healthie vs count
extracted vs fields lost. **Name explicitly anything that cannot be extracted.**

### 4. ELT skeleton
Bulk export + Subscription CDC → Postgres `analytics`. dbt project initialised
with `dim_patient` and `fct_weight`.

## Acceptance criteria

- [ ] `alembic upgrade head` from clean
- [ ] Access policy tests pass, including negative cases
- [ ] Historical weights land as coded Observations with original dates, and a
      trend chart renders from them
- [ ] `COMPLETENESS.md` written and honest about gaps
- [ ] dbt `dim_patient` builds

## Do not

- Model billing amounts in FHIR.
- Create `Patient` records for unconverted leads.
- Put protocol config in `Basic` + extensions.
