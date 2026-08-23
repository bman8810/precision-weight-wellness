# P5 — Patient portal

**Depends on:** p2, p3. **Read first:** `specs/04-requirements.md` FR-2,
`specs/03-design-system.md`.
**Open the mockups:** `mockups/pww-patient-portal-web.html` (desktop) and
`mockups/pww-patient-portal.html` (mobile). One responsive codebase, not two.

## Build

Next.js App Router under `/portal`. Mobile is the primary usage context.

### Views
`home` · `check-in` · `progress` · `medication` · `labs` · `visits` ·
`messages` · `billing` · `settings`

### The weekly check-in — build this first, get it right
The highest-frequency surface in the system and the input to every downstream
metric. Target **60 seconds on a phone**.

- Weight (manual or pulled from a connected scale)
- Per-symptom grade: none / mild / moderate / severe — nausea, constipation,
  fatigue, injection site
- Adherence: all doses / missed one / missed more, with reason picker
- Hunger 1–5
- Optional free note

On submit, write coded `Observation`s **and** the `QuestionnaireResponse`.
A `severe` grade fires a clinical triage `Task` immediately, before the patient
sees the confirmation.

### Other view notes
- **Home** — one next-action card, weight chart with dose-change markers,
  current dose + ladder, next visit, task list.
- **Medication** — refill status timeline (requested → approved → pharmacy →
  shipped → delivered), days remaining, injection schedule with site rotation,
  guides, and **the pharmacy price**.
- **Labs** — plain-language summary above the values. Reference ranges and
  trends per analyte, never a lone flagged number. Results release immediately;
  assume the patient reads before anyone explains.
- **Progress** — includes non-scale outcomes (BP, A1c, meds discontinued, waist).
  This page exists for plateau weeks.
- **Billing** — plan fee and medication separate; **pause offered above cancel**
  with a duration picker.
- **Settings** — address change warns that it may change the care team.

## Acceptance criteria

- [ ] Check-in completes in under 60s on a 375px viewport
- [ ] Submission produces coded Observations visible in the clinical console
- [ ] `severe` symptom creates a triage Task before confirmation renders
- [ ] Weight chart renders correctly from migrated historical data
- [ ] Pause flow completes self-serve without staff involvement
- [ ] No `localStorage`; state is server-backed

## Do not

- Build separate mobile and desktop codebases.
- Show a flagged lab value without its trend.
- Put cancel above pause.
