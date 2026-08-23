# PW+W clinic runbook

Staff/doctor portal at `/staff` (Today), roster at `/staff/patients`, patient portal at `/app`. Purchase at `/start` (`/book` redirects).

## Local

```bash
cd ~/dev/precision-weight-wellness
npm ci
npm test
npx playwright install chromium
npm run test:e2e
npm run dev
```

No `DATABASE_URL` → PGlite file at `CLINIC_PG_PATH` (default `./data/pww-clinic`).
Set `DATABASE_URL` to a Neon Postgres URL in production.

## Seeds (dev)

| Role | Email | Password |
|------|-------|----------|
| doctor | libby@precisionww.com | clinic-dev-libby |
| staff | jenny@precisionww.com | clinic-dev-jenny |

Override with `CLINIC_DOCTOR_EMAIL` / `CLINIC_DOCTOR_PASSWORD` / `CLINIC_STAFF_*`.

## Env

See `.env.example`. `CLINIC_SESSION_SECRET` must be set in prod.

## Healthie

Removed. Do not add `gethealthie.com` embeds back.

## ModMed

Same Liora tenant. Optional `EMA_SESSION_COOKIE` for search. Manual paste of `ema_patient_id` always works. Never POST Observation or MedicationRequest. Appointment ids stored only after GET `PENDING` or `CONFIRMED`.

## Payments

Not wired. Staff set membership `lead|active|paused|canceled` by hand.
