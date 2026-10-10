import React, { useEffect, useRef, useState } from "react";
import {
  BOARD_PADDING,
  CELL_SIZE,
  COLUMNS,
  DEFAULT_INTERVAL,
  MAX_BOARD_DIMENSION,
  ROWS,
} from "../definitions/constants";
import Board from "./Board";
import Controls from "./Controls";
import { boundingBoxSize, centerCells, parseLifFile } from "../utils/lifFile";

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

// The R-pentomino: just 5 cells, but the most famous "methuselah" in
// the Game of Life — it evolves chaotically for 1103 generations before
// settling, far longer and more intricate than a glider's simple glide.
const R_PENTOMINO_PATTERN: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [2, 1],
];

let applyPattern = (
  board: Board,
  pattern: Array<[number, number]>,
  startY: number,
  startX: number
): Board => {
  pattern.forEach(([dy, dx]) => {
    board[startY + dy][startX + dx] = true;
  });
  return board;
};

// Centered so the chaotic spread has equal room to unfold in every
// direction before this board's finite, non-wrapping edges cut it off.
let makeInitialBoard = (rows: number, cols: number): Board =>
  applyPattern(
    makeEmptyBoard(rows, cols),
    R_PENTOMINO_PATTERN,
    Math.floor(rows / 2) - 1,
    Math.floor(cols / 2) - 1
  );

const GameOfLife: React.FunctionComponent = () => {
  const [rows, setRows] = useState(ROWS);
  const [cols, setCols] = useState(COLUMNS);
  const boardMatrixRef = useRef<Board>(makeInitialBoard(ROWS, COLUMNS));
  const [cells, setCells] = useState(() => makeCells(boardMatrixRef.current));
  let [generation, setGeneration] = useState(0);
  const [timeForEachGeneration, settimeForGeneration] = useState(
    DEFAULT_INTERVAL
  );
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(null);
  const timerRef = useRef(timer);

  useEffect(() => {
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
    boardMatrixRef.current = makeEmptyBoard(rows, cols);

    setCells([]);
  };

  let loadPatternFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === "string" ? reader.result : "";
      const parsedCells = parseLifFile(content);
      if (parsedCells.length === 0) {
        return;
      }

      // Grow the board to fit the pattern plus breathing room on each
      // side, but never shrink below the default size or past a sane cap.
      const { width, height } = boundingBoxSize(parsedCells);
      const newCols = Math.min(
        MAX_BOARD_DIMENSION,
        Math.max(COLUMNS, width + BOARD_PADDING * 2)
      );
      const newRows = Math.min(
        MAX_BOARD_DIMENSION,
        Math.max(ROWS, height + BOARD_PADDING * 2)
      );

      const placedCells = centerCells(parsedCells, newRows, newCols);
      if (placedCells.length === 0) {
        return;
      }

      let newBoard = makeEmptyBoard(newRows, newCols);
      placedCells.forEach(({ x, y }) => {
        newBoard[y][x] = true;
      });

      setRows(newRows);
      setCols(newCols);
      boardMatrixRef.current = newBoard;
      setGeneration(0);
      setCells(makeCells(newBoard));
    };
    reader.readAsText(file);
  };

  let runIteration = () => {
    console.log("generation nº ", new Date().getTime());
    let newBoard: Board = makeEmptyBoard(rows, cols);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let neighbors = calculateNeighbors(
          boardMatrixRef.current,
          x,
          y,
          cols,
          rows
        );
        if (boardMatrixRef.current[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!boardMatrixRef.current[y][x] && neighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }

    boardMatrixRef.current = newBoard;
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
      boardMatrixRef.current[y][x] = !boardMatrixRef.current[y][x];
    }

    let newCells = makeCells(boardMatrixRef.current);
    setCells(newCells);
  };

  return (
    <div
      className={`${isRunning ? "Running" : ""} Game`}
      style={{ "--board-width": `${cols * CELL_SIZE}px` } as React.CSSProperties}
    >
      <header className="Header">
        <h1>Conway's Game of Life</h1>
        <p className="Tagline">A program you punch by hand, one generation at a time.</p>
      </header>
      <div className="Stage">
        <span className="Sprockets left" aria-hidden="true" />
        <span className="Sprockets right" aria-hidden="true" />
        <div className="ColumnTicks" aria-hidden="true" />
        <div style={{ position: "relative" }}>
          <Board
            cellSize={CELL_SIZE}
            width={cols * CELL_SIZE - 1}
            height={rows * CELL_SIZE - 1}
            onToggleCell={onCellClick}
            cells={cells}
            ref={boardRef}
          />
          <span className="ScanBar" aria-hidden="true" />
        </div>
        <div className="Stat">
          <span>Generation</span>
          <span className="Stat-value">{generation}</span>
        </div>
      </div>
      <Controls
        isRunning={isRunning}
        interval={timeForEachGeneration}
        onIntervalChange={handleIntervalChange}
        stopGame={stopGame}
        runGame={runGame}
        resetBoard={resetBoard}
        onLoadPatternFile={loadPatternFile}
      />
    </div>
  );
};

export default GameOfLife;
