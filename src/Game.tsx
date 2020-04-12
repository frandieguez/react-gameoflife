import React from "react";
import Cell from "./components/Cell";
import { HEIGHT, WIDTH, CELL_SIZE, DEFAULT_INTERVAL } from "./constants";

class GameOfLife extends React.Component {
  rows: number = HEIGHT / CELL_SIZE;
  cols: number = WIDTH / CELL_SIZE;
  board: any;
  state = {
    cells: [
      { x: 15, y: 7 },
      { x: 19, y: 7 },
      { x: 20, y: 7 },
      { x: 21, y: 7 },
      { x: 15, y: 8 },
      { x: 16, y: 8 },
      { x: 17, y: 8 },
      { x: 20, y: 8 },
    ],
    interval: DEFAULT_INTERVAL,
    isRunning: false,
  };
  timeoutHandler: any = null;
  boardRef: any = null;

  constructor(props) {
    super(props);

    this.board = this.makeEmptyBoard();
  }

  runGame = () => {
    this.setState({ isRunning: true });

    this.runIteration();
  };

  stopGame = () => {
    this.setState({ isRunning: false });

    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  };

  reset = () => {
    this.board = this.makeEmptyBoard();
    this.setState({ cells: [] });
    return;
  };

  runIteration = () => {
    // console.log("running iteration");
    let newBoard = this.makeEmptyBoard();

    // TODO: add logic for each iteration here
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let neighbors = this.calculateNeighbors(
          this.board,
          x,
          y,
          this.cols,
          this.rows
        );
        if (this.board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!this.board[y][x] && neighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }

    this.board = newBoard;
    this.setState({ cells: this.makeCells() });
    // console.log(this.state);
    this.timeoutHandler = window.setTimeout(() => {
      this.runIteration();
    }, this.state.interval);
  };

  handleIntervalChange = (event) => {
    this.setState({ interval: event.target.value });
  };

  calculateNeighbors = (board, x, y, cols, rows) => {
    let neighbors = 0;
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (x1 >= 0 && x1 < cols && y1 >= 0 && y1 < rows && board[y1][x1]) {
        neighbors++;
      }
    }

    return neighbors;
  };

  // Create an empty board
  makeEmptyBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  }

  // Create cells from this.board
  makeCells() {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }

  getElementOffset() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;
    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  }

  handleClick = (event) => {
    if (this.state.isRunning) {
      return;
    }

    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;
    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);
    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      this.board[y][x] = !this.board[y][x];
      // console.log(x, y);
    }
    console.log(this.state.cells);
    this.setState({ cells: this.makeCells() });
  };

  render() {
    let { cells, isRunning } = this.state;

    return (
      <div className="Game">
        <div
          className="Board"
          style={{
            width: WIDTH,
            height: HEIGHT,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
          }}
          onClick={this.handleClick}
          ref={(n) => {
            this.boardRef = n;
          }}
        >
          {cells.map((cell) => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
          ))}
        </div>
        <div className="controls">
          Update every{" "}
          <input
            type="number"
            value={this.state.interval}
            onChange={this.handleIntervalChange}
          />{" "}
          msec{" "}
          <button
            className="button"
            onClick={() => {
              isRunning ? this.stopGame() : this.runGame();
            }}
          >
            {`${!isRunning ? "Start" : "Stop"} game of life`}
          </button>
          {!isRunning && <button onClick={this.reset}>Reset game</button>}
        </div>
      </div>
    );
  }
}

export default GameOfLife;
