# P10 — Agent layer

**Depends on:** p2, p6, p8. **Read first:** `specs/04-requirements.md` FR-7.

The reason Medplum was chosen: every agent action lands in the same
`AuditEvent` stream as a human's. Do not build any path that bypasses this.

## Build

### 1. MCP server — before any agent
`services/mcp/`. Scoped tools over the FHIR API. One `ClientApplication` and
one `AccessPolicy` per agent, least-privilege. Read-only agents get read-only
policies enforced at the server, not in the prompt.

### 2. Eval harness — before any agent ships
`evals/` with golden cases per agent: input, expected output shape, assertions.
Run in CI. This is what makes an agent clinically defensible rather than a demo.
**Build it first, not after.**

### 3. Approval queue
Anything touching money, medication, or the chart routes to a human. Auto-execute
only reversible, low-stakes actions. Every run logs to `agent_run` with prompt,
tool calls, output, and reviewer disposition. Track approve-without-edit vs
override rate — it is the health metric for the whole layer.

### 4. Agents, in this order

**Intake summarization** — 40-field intake → six-line pre-visit brief.
Low risk, immediate daily value. Good first agent.

**Pre-visit brief** — since last visit: weight change, side effects, adherence,
missed doses, open questions, and an explicit **Decision:** line. Drafted
nightly for the next day's schedule.

**Lab explanation** — plain-language patient-facing draft with abnormals flagged.
Clinician reviews and sends. **Never auto-sends.**

**Prior authorization** — assembles clinical justification from the chart,
submits on approval. Highest dollar value per hour of build.

**No-show recovery** — reschedule outreach on missed and cancelled visits.

## Acceptance criteria

- [ ] Every agent action appears in Medplum `AuditEvent` attributed to its
      service account
- [ ] An agent cannot write outside its AccessPolicy — verified by a test that
      attempts it and asserts the denial
- [ ] Eval suite runs in CI and fails the build on regression
- [ ] No agent sends patient communication without approval
- [ ] `agent_run` captures full provenance for every execution
- [ ] Approve / override rate visible in the Insights view

## Do not

- Give an agent a broad-scope token.
- Auto-send anything to a patient.
- Ship an agent before its evals exist.
- Log PHI outside BAA-covered infrastructure.
