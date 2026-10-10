# Design

<!-- impeccable:design-schema 1 -->

## World

"Living circuit": a near-black phosphor-screen world built around Conway's Game of Life itself. The automaton's glowing green cells are the only accent; everything else recedes into dark panels so the grid stays the thing you look at.

## Palette

- `--bg-deep` `#05080a` — page background, with a faint radial accent-tinted glow behind the header.
- `--bg-panel` `#0a130e` — the Stage (board) and Controls panels.
- `--accent` `rgb(91, 248, 112)` (`--accent-rgb: 91, 248, 112` for translucent uses) — live cells, the primary action, stat values, focus rings, selection color. Used consistently as the single accent, never duplicated as a second hue.
- `--ink` `#e4f1e8` / `--ink-muted` `#7f9a8a` — primary and secondary text, both tinted from the accent's hue family rather than plain gray.
- `--border-soft` `rgba(91, 248, 112, 0.16)` — hairline borders on panels, pills, and inputs.

Color strategy: Committed — one saturated accent carries the interactive and data-bearing elements against a near-black ground.

## Type

- Display/UI: Poppins (already in the project, loaded via Google Fonts in `index.html`), weights 400/500/600.
- Data/measurement: Space Mono, for the generation counter and the millisecond interval value only — never used as a generic "technical" costume elsewhere.
- Scale: h1 1.65rem/600, body/labels 0.85–0.9rem, stat/mono labels 0.75–0.9rem with uppercase + letter-spacing for the small-caps readouts.

## Components

- **Stage**: a rounded dark panel (`--radius-lg: 14px`) housing the board and the generation stat, with an ambient offset+blur shadow (`--shadow-ambient`) and a one-time entrance animation (`stage-in`).
- **Board**: unchanged pixel grid (`CELL_SIZE` 10px, 30x30), grid lines drawn from `--grid-line`. Cells glow via `box-shadow` in the accent color and fade/scale in (`cell-in`) when they're born — the one signature motion, reused everywhere a cell appears.
- **Controls**: a second panel matching the Stage's language, holding the speed field (a pill input themed in Space Mono) and a `buttons` group.
- **Buttons**: circular, 2.75rem (≥44px touch target). Play/Pause is the filled accent action (inline SVG triangle/bars, swapped on state, never emoji or CSS-shape hacks); Reset is a ghost icon button that dims to 35% opacity + `not-allowed` cursor while running.
- Focus rings, text selection, and input caret are themed from the accent rather than left as browser defaults.

## Responsive

The board is a fixed 299×299px, which already fits mobile viewports without scaling. The Stage and Controls panels, plus the header, flow in a centered single column (`max-width: 420px`); on ≤420px the Controls row stacks vertically instead of wrapping awkwardly.

## Provenance

Established in this redesign pass (no prior DESIGN.md existed for the CRA-era dark/green theme this evolves from). No new npm dependencies were added — Space Mono is loaded the same way Poppins already was, via Google Fonts in `index.html`.
