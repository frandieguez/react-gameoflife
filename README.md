# Conway's Game of life implementation in React

[![dependencies Status](https://david-dm.org/frandieguez/react-gameoflife/status.svg)](https://david-dm.org/frandieguez/react-gameoflife)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![CI](https://github.com/frandieguez/react-gameoflife/actions/workflows/ci.yml/badge.svg)](https://github.com/frandieguez/react-gameoflife/actions/workflows/ci.yml)

This project is just a quick just-for-fun project implementaion of the Conway's Game of life with React and Vite. Take it as a tribute implementation to Dr. Conway.

The board loads as a **punch card**: live cells are amber-lit rectangular holes punched through warm kraft card stock, read by a reader deck below it. See [DESIGN.md](DESIGN.md) for the full visual system.

![Screenshot](screenshot.png?raw=true "Screenshot")

This project uses [Vite](https://vite.dev) and [Vitest](https://vitest.dev). It requires Node.js 22.12 or later.

## About the Game

[Conway's Game of life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) is a cellular automaton devised by the British mathematician John Horton Conway in 1970.

### 🎲 Rules

The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
​
The board starts seeded with an **R-pentomino** instead of an empty grid — just 5 cells, but the most famous "methuselah" in the Game of Life. On this board's finite 30x30 grid it evolves chaotically for around 400 generations before settling into a perpetual oscillation, so it never dies out and stays far more interesting than a simple glider.

You can also load your own pattern: the upload button in the controls reads a `.lif`/`.life` file (both the Life 1.05 and Life 1.06 formats) and centers it on the board. If the pattern is bigger than the default 30x30, the board grows to fit it (plus a margin to move/grow into), up to a 60-cell-per-side cap — it never shrinks below the default for a small pattern.

### 🕹 Example patterns

The [`games/`](games/) folder has 10 of the most famous and/or striking patterns in Game of Life history, ready to load with the upload button:

| File | Pattern | Why it's here |
| --- | --- | --- |
| `glider.lif` | Glider | The smallest, most famous spaceship — the hacker-culture emblem. |
| `lwss.lif` | Lightweight spaceship | One of Conway's original four spaceships. |
| `pulsar.lif` | Pulsar | The most common period-3 oscillator; perfectly symmetric. |
| `pentadecathlon.lif` | Pentadecathlon | A period-15 oscillator, one of the first found with period > 2. |
| `beacon.lif` | Beacon | A simple, very common period-2 oscillator. |
| `toad.lif` | Toad | Along with the blinker, the most common period-2 oscillator. |
| `gosper-glider-gun.lif` | Gosper glider gun | The pattern that proved unbounded growth is possible. At 36 columns wide it no longer fits the default 30-wide board, so loading it grows the board to fit. |
| `diehard.lif` | Diehard | 7 cells that vanish completely after exactly 130 generations. |
| `acorn.lif` | Acorn | A 7-cell methuselah that takes 5206 generations to stabilize. |
| `queen-bee-shuttle.lif` | Queen bee shuttle | A period-30 shuttle — the mechanism at the heart of the Gosper gun. |

## ⚒ How I have built it

I have used an iterative approach. Basically using only React without any additional library.

Hope you like it, and remember this is just a learn-while-doing application nothing fancy nor highly awesome.

## 🚀 Quick start

1. **Install the base tools.**

   Install Yarn to manage dependencies

   ```
   https://yarnpkg.com/lang/en/docs/install/
   ```

   Install the dependencies to work.

   ```
   yarn install
   ```

2. **Start developing.**

   Navigate into your new site’s directory and start it up.

   ```sh
   yarn dev
   ```

   Other scripts: `yarn build` (production build in `dist/`), `yarn preview` and `yarn test`.

## 💫 Deploy

Every push to `master` is published to GitHub Pages by the CI workflow: <https://frandieguez.github.io/react-gameoflife/>. It needs **Settings → Pages → Source: GitHub Actions** enabled once in the repository.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/frandieguez/react-gameoflife)

## Possible thinks to add

I've implemented this "toy" as fast as possible so I'm quite sure this is not something i could be really proud of. Therefore, here are some ideas to improve it or to add additional features.

- Migrate to a reducer (react context and reducer) to manage the state of the board and cells.

## ❔ And... what else?

If you find a bug or want to suggest a new video service, please let us know in a ticket.

Thanks!!
