import {
  BOARD_PADDING,
  COLUMNS,
  MAX_BOARD_DIMENSION,
  ROWS,
} from "../definitions/constants";
import { boundingBoxSize, centerCells, parseLifFile } from "./lifFile";

const gameFiles = import.meta.glob("../../games/*.lif", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// The exact cell counts for every curated pattern in games/, except the
// Gosper glider gun (36 cols wide, wider than this app's 30-col board,
// documented in its own file as expected to be clipped).
const expectedCounts: Record<string, number> = {
  "glider.lif": 5,
  "lwss.lif": 9,
  "pulsar.lif": 48,
  "pentadecathlon.lif": 16,
  "beacon.lif": 8,
  "toad.lif": 6,
  "diehard.lif": 7,
  "acorn.lif": 7,
  "queen-bee-shuttle.lif": 26,
};

test("every curated pattern in games/ parses into at least one cell", () => {
  expect(Object.keys(gameFiles).length).toBeGreaterThan(0);

  for (const content of Object.values(gameFiles)) {
    expect(parseLifFile(content).length).toBeGreaterThan(0);
  }
});

test("patterns that fit the 30x30 board keep every cell after centering", () => {
  for (const [file, count] of Object.entries(expectedCounts)) {
    const [path] = Object.keys(gameFiles).filter((p) => p.endsWith(file));
    const parsed = parseLifFile(gameFiles[path]);
    expect(parsed.length).toBe(count);
    expect(centerCells(parsed, ROWS, COLUMNS).length).toBe(count);
  }
});

test("gosper glider gun is wider than the default board, so centerCells alone would clip it", () => {
  const [path] = Object.keys(gameFiles).filter((p) =>
    p.endsWith("gosper-glider-gun.lif")
  );
  const parsed = parseLifFile(gameFiles[path]);
  expect(parsed.length).toBe(36);
  expect(centerCells(parsed, ROWS, COLUMNS).length).toBeLessThan(36);
});

test("but the app's auto-grow formula gives the gun enough room to keep every cell", () => {
  const [path] = Object.keys(gameFiles).filter((p) =>
    p.endsWith("gosper-glider-gun.lif")
  );
  const parsed = parseLifFile(gameFiles[path]);
  const { width, height } = boundingBoxSize(parsed);

  // Mirrors loadPatternFile's sizing in GameOfLife.tsx.
  const grownCols = Math.min(
    MAX_BOARD_DIMENSION,
    Math.max(COLUMNS, width + BOARD_PADDING * 2)
  );
  const grownRows = Math.min(
    MAX_BOARD_DIMENSION,
    Math.max(ROWS, height + BOARD_PADDING * 2)
  );

  expect(centerCells(parsed, grownRows, grownCols).length).toBe(36);
});
