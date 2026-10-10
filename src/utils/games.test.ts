import { centerCells, parseLifFile } from "./lifFile";

const ROWS = 30;
const COLUMNS = 30;

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

test("gosper glider gun is wider than the board, so it gets clipped", () => {
  const [path] = Object.keys(gameFiles).filter((p) =>
    p.endsWith("gosper-glider-gun.lif")
  );
  const parsed = parseLifFile(gameFiles[path]);
  expect(parsed.length).toBe(36);
  expect(centerCells(parsed, ROWS, COLUMNS).length).toBeLessThan(36);
});
