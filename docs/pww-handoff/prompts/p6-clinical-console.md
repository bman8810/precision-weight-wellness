# P6 — Clinical console

**Depends on:** p2, p3, p9. **Read first:** `specs/04-requirements.md` FR-3,
`specs/03-design-system.md`.
**Open the mockup:** `mockups/pww-provider-console.html`.

## Build

Next.js App Router under `/console`. Desktop-first, dense, keyboard-friendly.

### Structural rule
**No bento.** One continuous sheet, hairline-ruled sections, columns split by a
vertical rule, flush tables, borderless inputs. Elevation is spent exactly once
per screen. Re-read `specs/03-design-system.md` before writing CSS.

### Today
Schedule with AI-drafted pre-visit briefs — change since last visit, side
effects, adherence, missed doses, and an explicit **Decision:** line. Prep flags
visible before the visit. Right rail: needs-you queue and panel summary.

### Patient chart
- **Vitals band** (navy, full bleed): weight, start, chips, then eight cells —
  total loss, recent window, sparkline, dose + weeks at dose, adherence,
  side-effect grade, check-in completion, last labs with flag count. Cells
  colour-shift on concern. This component is the reason the console exists.
- **Protocol suggestion**: advisory callout with Accept / Override. Never automatic.
- Note editor: template by visit type, prefilled from check-ins and labs, with
  the prefill source labeled. Sign-and-close locks; later edits become addenda.
- Right column: program timeline, check-in history, medications.

### Result inbox — cross-patient
Triage only. No patient detail on this screen. Rows: patient, analyte, value
with reference range, sparkline of recent draws, age. Sections: critical /
abnormal / routine / reviewed. Segmented control for inbox state.

### Lab detail — patient-scoped
Separate route, reached from the inbox, the chart, or the roster.
- Latest panel: value, prior, delta, sparkline per analyte. **Rows are
  clickable and expand an inline trend chart** with the reference range shaded.
  No separate analyte picker — the table is the picker.
- Full flowsheet: analytes × dates, most recent first, weight included as a row.
- Right rail order: **context → drafted explanation → actions.**

### Ops work queue
Unified, filterable. `paid_not_booked` pinned as an alert. At-risk-of-churn as
a standing section.

### Configuration
Plans, scheduling rules, titration protocols, care team — editable by
non-engineers, writing to the `app` schema.

## Acceptance criteria

- [ ] Zero rounded cards floating on a grey background
- [ ] Vitals band renders live data and colour-shifts on threshold
- [ ] Protocol suggestion never mutates state without Accept
- [ ] Result inbox contains no patient-scoped panels
- [ ] Clicking an analyte row expands its trend inline
- [ ] Flowsheet renders 4+ panels with out-of-range colouring
- [ ] Changing a scheduling rule in Configuration affects booking without a deploy

## Do not

- Merge the ops queue and the clinical day view.
- Let the protocol engine act automatically.
- Show a lab value without its history.
