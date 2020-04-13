import React, { useEffect, useRef, useState } from "react";
import {
  CELL_SIZE,
  COLUMNS,
  DEFAULT_INTERVAL,
  ROWS,
} from "../definitions/constants";
import Board from "./Board";
import Controls from "./Controls";

type Board = Array<Array<boolean>>;

// Create an empty board
let makeEmptyBoard = (rows: number, cols: number): Board => {
  let matrix = [];
  for (let y = 0; y < rows; y++) {
    matrix[y] = [];

    for (let x = 0; x < cols; x++) {
      matrix[y][x] = false;
    }
  }

  return matrix;
};

// Calculate how many alive heighbors has a position x,y in the board
let calculateNeighbors = (board, x, y, cols, rows) => {
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

// Create cells from board
let makeCells = (matrix) => {
  let cells = [];
  for (let y = 0; y < matrix.length - 1; y++) {
    for (let x = 0; x < matrix[0].length - 1; x++) {
      if (matrix[y][x]) {
        cells.push({ x, y });
      }
    }
  }
  return cells;
};

let board: Board;

const GameOfLife: React.FunctionComponent = () => {
  const [rows, setRows] = useState(ROWS);
  const [cols, setCols] = useState(COLUMNS);
  const [cells, setCells] = useState([]);
  let [generation, setGeneration] = useState(0);
  const [timeForEachGeneration, settimeForGeneration] = useState(
    DEFAULT_INTERVAL
  );
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(null);
  const timerRef = useRef(timer);

  useEffect(() => {
    board = makeEmptyBoard(ROWS, COLUMNS);

    return () => {
      if (timer) {
        window.clearTimeout(timer);
        setTimer(null);
      }
    };
  }, []);

  const boardRef = useRef(null);

  let runGame = () => {
    setIsRunning(true);

    runIteration();
  };

  let stopGame = () => {
    setIsRunning(false);
    setGeneration(0);

    if (timer) {
      window.clearTimeout(timer);
      setTimer(null);
    }
  };

  let resetBoard = () => {
    board = makeEmptyBoard(rows, cols);

    setCells([]);
  };

  let runIteration = () => {
    console.log("generation nº ", new Date().getTime());
    let newBoard: Board = makeEmptyBoard(rows, cols);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let neighbors = calculateNeighbors(board, x, y, cols, rows);
        if (board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!board[y][x] && neighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }

    board = newBoard;
    let newCells = makeCells(newBoard);
    console.log(newCells);
    setCells(newCells);
    setGeneration(generation++);

    setTimer(window.setTimeout(() => runIteration(), timeForEachGeneration));
  };

  let handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settimeForGeneration(Number.parseInt(event.target.value));
  };

  let getElementOffset = () => {
    const rect = boardRef.current.getBoundingClientRect();
    const doc = document.documentElement;

    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  };

  let onCellClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isRunning) {
      return;
    }

    const elemOffset = getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;
    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);

    if (x >= 0 && x <= cols && y >= 0 && y <= rows) {
      board[y][x] = !board[y][x];
    }

    let newCells = makeCells(board);
    setCells(newCells);
  };

  return (
    <div className={`${isRunning ? "Running" : ""} Game`}>
      <header className="Header">
        <h2>Conway's Game of Life</h2>
      </header>
      <Board
        cellSize={CELL_SIZE}
        width={ROWS * CELL_SIZE - 1}
        height={COLUMNS * CELL_SIZE - 1}
        onToggleCell={onCellClick}
        cells={cells}
        ref={boardRef}
      />
      <div className="">Generation: {generation}</div>
      <Controls
        isRunning={isRunning}
        interval={timeForEachGeneration}
        onIntervalChange={handleIntervalChange}
        stopGame={stopGame}
        runGame={runGame}
        resetBoard={resetBoard}
      />
    </div>
  );
};

export default GameOfLife;
