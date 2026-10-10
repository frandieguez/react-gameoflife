import { boundingBoxSize, centerCells, parseLifFile } from "./lifFile";

test("parses a Life 1.06 file", () => {
  const content = ["#Life 1.06", "0 -1", "1 0", "-1 1", "0 1", "1 1"].join(
    "\n"
  );

  expect(parseLifFile(content)).toEqual([
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ]);
});

test("parses a Life 1.05 file with a single block", () => {
  const content = [
    "#Life 1.05",
    "#D Glider",
    "#P -1 -1",
    ".*.",
    "..*",
    "***",
  ].join("\n");

  expect(parseLifFile(content)).toEqual([
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ]);
});

test("parses a Life 1.05 file with multiple blocks", () => {
  const content = [
    "#Life 1.05",
    "#P 0 0",
    "**",
    "#P 5 5",
    "*.",
    ".*",
  ].join("\n");

  expect(parseLifFile(content)).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 5, y: 5 },
    { x: 6, y: 6 },
  ]);
});

test("ignores malformed and blank lines", () => {
  const content = ["#Life 1.06", "", "not a coordinate", "2 3"].join("\n");

  expect(parseLifFile(content)).toEqual([{ x: 2, y: 3 }]);
});

test("centerCells centers a pattern on the board", () => {
  const cells = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ];

  expect(centerCells(cells, 10, 10)).toEqual([
    { x: 4, y: 4 },
    { x: 5, y: 4 },
    { x: 4, y: 5 },
  ]);
});

test("centerCells drops cells that fall outside the board", () => {
  // A pattern wider than the 5-wide board: once centered, only the
  // middle cell still lands inside [0, 5).
  const cells = [
    { x: 0, y: 2 },
    { x: 4, y: 2 },
    { x: 9, y: 2 },
  ];

  expect(centerCells(cells, 5, 5)).toEqual([{ x: 1, y: 2 }]);
});

test("centerCells returns an empty list for an empty pattern", () => {
  expect(centerCells([], 10, 10)).toEqual([]);
});

test("boundingBoxSize measures a pattern regardless of its origin", () => {
  const cells = [
    { x: -2, y: 5 },
    { x: 3, y: 5 },
    { x: 0, y: 8 },
  ];

  expect(boundingBoxSize(cells)).toEqual({ width: 6, height: 4 });
});

test("boundingBoxSize is 0x0 for an empty pattern", () => {
  expect(boundingBoxSize([])).toEqual({ width: 0, height: 0 });
});
