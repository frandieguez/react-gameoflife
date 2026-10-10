# Design

<!-- impeccable:design-schema 1 -->

## World

"Punch Card": the board is a Hollerith-style punch card loaded into a reader, not a screen. A live cell is a physical rectangular hole punched through warm kraft card stock, glowing amber with the reader's lamp light; a dead position stays a faint pre-printed registration dot, never simply blank.

This is the user's own pinned choice — originally offered as "Impeccable's pick" (the agent's own top-ranked grounded candidate) in the direction round that assigned a different direction ("Culture Plate", seed `c6986f96`, dice index 3) by the `concept-seed` roll. A pinned user choice outranks the roll by the flow's own rules; the pick was recorded via `concept-seed --kind pick`. Direction contract at `.impeccable/surfaces/src-components-gameoflife-tsx.md`.

## Palette

- `--desk` `#141110` — the room/desk the reader sits on.
- `--deck` `#211c18` — the reader's machine chassis (the Controls panel).
- `--card` `#ddc9a0` / `--card-shade` `#d2bc8e` / `--card-edge` `#c3ab79` — the kraft card stock itself (the Stage panel), gradient top-to-bottom.
- `--hole` `rgb(255, 179, 71)` — the single saturated accent: amber reader-lamp light glowing through every punched hole, the primary action, and focus/selection.
- `--ink` `#3a2d1a` / `--ink-muted` `#5a4425` — sepia print ink on the card (tuned dark enough to clear 4.5:1 against the card's mid-tone — an earlier, lighter muted tone measured under that floor and was corrected after a manual contrast check).
- `--ink-on-dark` / `--ink-on-dark-muted` — text on the machine chassis.

Color strategy: Committed, two-register, same split discipline as the prior world but swapped: here the *upper* region (the card) is the light, warm, printed surface, and the *lower* region (the reader deck) is the dark machine — paper above, machine below.

## Type

- Display/UI: Poppins (incumbent, kept).
- Data/measurement and all card/deck chrome: Space Mono — doubly justified here, since fixed-pitch type is literally what punch-card-era computing used.

## Components

- **Stage ("the card")**: kraft card stock with a `clip-path`-cut top-left corner (the real Hollerith registration cut), a feed-in entrance (`card-feed-in`: slides up from below with a decisive snap, no bounce).
- **ColumnTicks**: a thin repeating-gradient strip of print-registration ticks along the top margin, standing in for a card's column index marks.
- **Sprockets**: repeating-gradient void columns down the card's left/right margins.
- **Board**: unchanged pixel grid and click math. Every one of the 900 positions keeps a faint printed registration dot even when unpunched.
- **Cell**: a small rectangular (2px radius) die-cut hole, amber-lit, with a tight inset rim and a small contained glow — tuned from the start (not after a legibility miss this time) to stay individually legible even when several live cells sit adjacent.
- **ScanBar**: a horizontal amber band that sweeps once top-to-bottom right after the card feeds in (confirming the seeded holes), then loops continuously, slower, while a simulation runs — the signature "reader actively scanning" cue.
- **Stat**: a tear-off ticket stub (dashed top rule, sepia ink) holding the generation readout, printed directly on the card rather than a separate panel.
- **Buttons**: square-ish (3px radius, not pill-shaped) to read as reader-deck keys rather than soft app buttons; Play fills amber, Reset dims to 35% opacity + `not-allowed` while running.
- **Motion**: three state-scoped authored moments — the one-time card-feed entrance + scan sweep, the continuous slower scan loop while running, and a quick "impact" punch-in scale on every newly-born cell. All disabled under `prefers-reduced-motion`.

## Responsive

The card is a fixed 299×299px active grid, comfortable on mobile. Header, card, and reader deck flow in a centered single column (`max-width: 420px`); Controls stack vertically at ≤420px.

## Provenance

Replaces the "Culture Plate" world in full (no tokens carried over), per the user explicitly choosing the previously-declined "Impeccable's pick" direction over the dice-assigned one. No new npm dependencies; Poppins and Space Mono are both already loaded via Google Fonts from the prior passes.
