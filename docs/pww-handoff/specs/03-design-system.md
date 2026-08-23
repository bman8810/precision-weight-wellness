# Design system

The mockups in `mockups/` are the source of truth. This file states the rules
they encode so they survive contact with new screens.

## Tokens

```css
--navy:      #1F2C4C;   /* primary, headers, dark surfaces */
--navy-2:    #2C3D63;   /* hover */
--navy-soft: #5A6784;
--cream:     #F7F5F0;   /* patient-facing page ground */
--sheet:     #FFFFFF;   /* clinical console ground */
--tint:      #FAFAF8;   /* row hover, field fill */
--gold:      #BFA163;   /* accent, brand */
--gold-dk:   #9C8348;
--gold-bg:   #F5F0E4;
--green:     #1E3B33;   /* good / normal */
--green-bg:  #E7EFEA;
--rose:      #A8443C;   /* abnormal / urgent */
--rose-bg:   #F8ECEA;
--amber:     #946400;   /* borderline */
--amber-bg:  #F6EFDC;
--ink:       #1F2C4C;
--muted:     #66707E;
--muted-2:   #99A1AD;
--rule:      #E4E6EA;   /* section rule */
--rule-2:    #F0F1F3;   /* row rule */
```

## Type

- **Display:** Playfair Display, weight 500. Headings, figures, patient names,
  any number the eye should land on. Italic for the accent word in a heading
  ("Select your *plan*").
- **Body:** Poppins, weight 300 default / 400–500 for emphasis.
- **Data:** IBM Plex Mono. Times, lab values, ages, IDs, reference ranges.
  Anything tabular or scannable as a column.

Section labels: 10px, `letter-spacing: .18em`, uppercase, `--muted`, with a
1px `--ink` rule beneath.

## THE STRUCTURAL RULE — no bento

**Do not wrap content in rounded white cards floating on a grey background.**
This was explicitly rejected. It flattens hierarchy (a visit note and a
check-in list get identical weight) and makes every page read as a grid of
containers rather than a document.

Instead:

- One continuous sheet, edge to edge.
- Sections marked by a letterspaced label + hairline rule, sitting directly on
  the surface.
- Multi-column layouts split by a **vertical rule**, not by two panels.
- Rows and tables run flush to the column edge.
- Inputs have no box: faint tint fill with a 2px left rule, which darkens on
  focus.

**Spend elevation exactly once per screen.** In the clinical console that is the
navy vitals band. Callouts that need to stand out (protocol suggestion, urgent
alert) use a 3px left rule plus a tinted background — an annotation on the
document, not a separate object.

Filled = *act on this*. If more than three things are filled, the hierarchy is broken.

## Signature component: the vitals band

Chart header, navy, full bleed. Left: current weight, start weight, status
chips. Right: eight cells separated by hairlines — total loss, recent trend
window, sparkline, current dose + weeks at dose, adherence %, side-effect grade,
check-in completion, last labs with flag count.

Cells turn `#E8A9A1` when the value should worry the clinician and `#A8CDB8`
when it should reassure. This one strip is the entire clinical picture and is
the main reason a purpose-built console beats a generic EHR here.

## Copy rules

- Sentence case everywhere. No title case headings.
- Buttons name what happens: "Sign and close", not "Submit".
- The same action keeps its name across the whole flow.
- Errors say what went wrong and how to fix it. They do not apologise.
- Empty states are invitations to act, not decoration.
- Never say "medication included." Say what the pharmacy bills and who bills it.

## Quality floor

Responsive to 375px. Visible keyboard focus (`outline: 2px solid var(--gold)`).
`prefers-reduced-motion` respected. No `localStorage` in artifacts. Semantic
buttons for anything clickable.
