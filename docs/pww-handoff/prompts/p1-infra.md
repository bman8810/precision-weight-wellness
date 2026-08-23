# P1 — Infrastructure and Medplum deployment

**Depends on:** p0 resolved in favour of Medplum.
**Read first:** `specs/01-architecture.md`.

## Goal

A running, backed-up, BAA-covered Medplum instance plus a staging environment,
with infrastructure as code.

## Build

### 1. AWS baseline
- Accept the AWS BAA via Artifact. Record the date. **Blocking.**
- Terraform or CDK for: VPC, EC2 `t4g.small`, RDS Postgres `db.t4g.micro`
  (automated backups + PITR), S3 bucket for Binary, security groups,
  Secrets Manager.
- **Do not** provision NAT Gateway, ALB, or Fargate. Lean config only.
- Cloudflare in front for TLS and WAF.

### 2. Medplum
- `medplum/medplum-server` + Redis via docker-compose on the EC2 host.
- Postgres is RDS, never on the host.
- Config via Secrets Manager, not env files in the repo.
- Enable Bots via super admin (self-hosted feature flag).
- Enable Subscriptions; verify websocket subscriptions work — check the OSS repo
  if the docs are ambiguous.

### 3. Environments
- `staging` on Railway or a second EC2. **Synthetic data only, no PHI ever.**
- `production` on the AWS stack above.
- Seed script generating ~50 synthetic patients across program stages with
  realistic weight trajectories, check-ins, and lab panels.

### 4. Operations
- Automated nightly backup with a **tested restore procedure**. Write the
  runbook and execute it once. Record the RTO you actually achieved.
- Sentry for errors, Grafana or Betterstack for uptime.
- Documented upgrade procedure for Medplum releases including DB migrations.

## Acceptance criteria

- [ ] AWS BAA accepted, date recorded
- [ ] `terraform apply` from clean produces a working instance
- [ ] Medplum admin console reachable over TLS
- [ ] A Bot executes on a Subscription trigger
- [ ] Backup taken and **restored** into a scratch instance successfully
- [ ] Seed script populates staging with synthetic data
- [ ] Runbook in `ops/RUNBOOK.md`

## Do not

- Put PHI in staging.
- Run Postgres on the app host.
- Use the full Medplum CDK reference architecture.
