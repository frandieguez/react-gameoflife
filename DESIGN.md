# Design

<!-- impeccable:design-schema 1 -->

## World

"Culture Plate": the board is a specimen under observation, not a screen. Conway's cells are bioluminescent colonies growing and dying on a warm, backlit culture plate sitting in a dark incubator housing on a lab bench — refusing both the neon-hacker-terminal costume this project wore before and a pastel edtech-cute opposite.

Chosen via the impeccable `concept-seed --scope direction --mode experience` roll (seed key `c6986f96`, assigned index 3 of the grounded candidate list — "Petri dish / microbiology culture plate under a scope"). Direction contract recorded at `.impeccable/surfaces/src-components-gameoflife-tsx.md`.

## Palette

- `--bench` `#170f0a` — the page/room, warm near-black (never cold blue-black).
- `--panel` `#241a12` — the incubator housing (Stage and Controls panels).
- `--plate-top` `#f6e8c8` / `--plate-edge` `#e4c98e` — the agar itself: warm cream/amber, always backlit, never black.
- `--colony` `rgb(72, 224, 178)` — live cells, the single saturated accent, teal-bioluminescent against the warm plate.
- `--stamp-ink` `#b35a35` — the rotating specimen stamp and the "paused" state.
- Tape labels (`#efe2c0` background, `--ink-on-light` `#2d2013` text) — generation and speed readouts.

Color strategy: Committed, two-register. The housing/bench stays dark and warm; the plate itself is the one light, saturated region — light-vs-dark chosen from the use scene (a lit specimen on a dim bench), not from category default.

## Type

- Display/UI: Poppins (incumbent, kept deliberately — legible, warm enough not to clash with the lab register).
- Data/measurement only: Space Mono, for the generation counter and the millisecond interval — never used as a generic "technical" costume elsewhere.

## Components

- **Stage**: the incubator housing — a dark rounded panel with an ambient offset+blur shadow, that flickers on (`stage-flicker-in`) once per load like a lamp finding its filament before settling, rather than a flat fade.
- **PlateFrame / Board**: the plate keeps its exact pixel grid and click math untouched. Its background is a per-cell radial-gradient dot pattern — every one of the 900 wells stays faintly etched even when empty, so a dead cell is never simply invisible. Four small registration crosshairs mark the plate's corners, settling in just after the plate itself is visible.
- **Cell**: a circular well, filled with a soft, tightly-contained glow (not a wide blurred halo) so adjacent live cells stay individually legible instead of merging into a blob — product clarity (the grid reading as discrete cells) was prioritized over the originally-drafted wider "layered ring" glow once built and inspected.
- **Stamp**: an SVG circular seal ("LIVE CULTURE · EST. 1970", 1970 being the year Conway published Life in Scientific American) rotating slowly and continuously, pure decoration, `pointer-events: none`.
- **Stat / SpeedControl**: cream "lab tape" strips, slightly rotated, holding the generation and interval readouts in Space Mono.
- **Buttons**: circular, 2.75rem (≥44px touch target). Play is the filled colony-teal action; running state switches to a stamp-ink ring; Reset dims to 35% opacity + `not-allowed` while running.
- **Motion**: three authored, state-scoped moments — the one-time lamp-flicker entrance, a slow ambient "breathe" pulse on the plate while a simulation runs, and a quick scale/fade when any cell is born. All disabled under `prefers-reduced-motion`.

## Responsive

The plate is a fixed 299×299px, already comfortable on mobile. Header, Stage, and Controls flow in a centered single column (`max-width: 420px`); the Controls row stacks vertically at ≤420px.

## Provenance

Replaces the prior "Living circuit" dark/neon world in full (no tokens carried over) per an explicit user request to run impeccable's full redesign flow and land somewhere "más impresionante y novedoso." Challengers considered and declined in favor of the assigned direction: an oscilloscope/signal-bench world (strong audience identification, but too close to the just-retired neon-terminal register and to a continuous-signal grammar that doesn't fit discrete cells) and a vernacular kiosk-print world (strong structural fit — dead cell as an "empty rule box" — but weaker instant identification as Conway's Game of Life). Their donations were folded into this direction: tape-label texture, flat-layered (non-blurred) glow discipline, the ghost/empty-well idea, and the registration-crosshair + rotating stamp chrome. No new npm dependencies; Poppins and Space Mono are both loaded the same way (Google Fonts, already established by the prior pass).
