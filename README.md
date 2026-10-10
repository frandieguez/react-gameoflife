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

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/frandieguez/react-gameoflife)

## Possible thinks to add

I've implemented this "toy" as fast as possible so I'm quite sure this is not something i could be really proud of. Therefore, here are some ideas to improve it or to add additional features.

- Migrate to a reducer (react context and reducer) to manage the state of the board and cells.
- Add a system to import .lif files into de board.

## ❔ And... what else?

If you find a bug or want to suggest a new video service, please let us know in a ticket.

Thanks!!
