# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who open the app from a shared link in a single casual session (chat, social post, a quick "look what I made") — not returning users, not a signed-up audience. They size it up in a couple of seconds, play with the board for a bit, and move on. Desktop and mobile both matter.

## Product Purpose

A React + Vite implementation of Conway's Game of Life, built as a learn-while-doing tribute to Dr. Conway (per the README). It exists to be a small, satisfying toy: paint cells, press play, watch the generations evolve. Success is a visitor immediately understanding what it is and enjoying using it within that first session — there is no retention or conversion goal.

## Positioning

Not claiming novelty — it is an honest, well-crafted implementation of a well-known automaton, not a unique mechanism. Its edge is craft and polish rather than a different idea.

## Operating Context

Single-page client-only app, no backend, no persistence between sessions. Runs entirely in the browser; state (board, generation, speed) lives only in memory for the current visit.

## Capabilities and Constraints

- Fixed 30x30 board (`ROWS`/`COLUMNS` in `src/definitions/constants.tsx`), no edge wraparound.
- Click/paint cells alive or dead while stopped; disabled while running.
- Play/Pause, Reset, and a numeric generation-interval control.
- Live generation counter.
- Board renders at a fixed 299x299px (`CELL_SIZE` = 10px), which already fits comfortably on mobile viewports without needing responsive scaling of the grid itself.
- No new npm dependencies for this redesign; Poppins is already loaded via Google Fonts in `index.html`.
- Must look and work well on mobile, not just desktop.

## Evidence on Hand

- `README.md` (project framing, rules, screenshot).
- `screenshot.png` (prior visual state, now outdated after this redesign).
- CI (`.github/`) and a Netlify deploy badge — this is a publicly shareable, deployed app.

## Product Principles

1. First-impression speed: a cold open from a shared link must read clearly and look intentional within seconds — no generic/default-template feel.
2. The automaton is the content. Decoration supports the grid and its motion; it never competes with or obscures it.
3. One honest craft pass, not a gimmick: polish typography, color, spacing, and interaction states rather than adding unrelated features.
4. Stay dependency-free and presentation-only: visual changes live in markup/styles, game logic and rules are untouched.
5. Equally good on a phone and a laptop — this will be opened cold on either.
