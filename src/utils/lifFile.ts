export interface LifeCell {
  x: number;
  y: number;
}

// Parses the two classic ".lif"/".life" pattern formats:
//  - Life 1.05: "#P x y" headers followed by rows of "." (dead) / "*" (alive).
//  - Life 1.06 (also the fallback for unrecognized headers): one "x y" pair per line.
// Coordinates are relative to the pattern's own origin and may be negative;
// use centerCells to place them on an actual board.
export function parseLifFile(content: string): LifeCell[] {
  const lines = content.split(/\r?\n/);
  const cells: LifeCell[] = [];

  if (lines[0] && lines[0].trim().startsWith("#Life 1.05")) {
    let originX = 0;
    let originY = 0;
    let row = 0;

    for (const line of lines) {
      if (line.startsWith("#P")) {
        const parts = line.trim().split(/\s+/);
        originX = Number.parseInt(parts[1], 10) || 0;
        originY = Number.parseInt(parts[2], 10) || 0;
        row = 0;
        continue;
      }

      if (line.startsWith("#") || line.trim() === "") {
        continue;
      }

      for (let col = 0; col < line.length; col++) {
        if (line[col] === "*") {
          cells.push({ x: originX + col, y: originY + row });
        }
      }
      row++;
    }

    return cells;
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("#")) {
      continue;
    }

    const parts = trimmed.split(/\s+/);
    const x = Number.parseInt(parts[0], 10);
    const y = Number.parseInt(parts[1], 10);
    if (!Number.isNaN(x) && !Number.isNaN(y)) {
      cells.push({ x, y });
    }
  }

  return cells;
}

// The pattern's own width and height, regardless of where its origin sits.
export function boundingBoxSize(
  cells: LifeCell[]
): { width: number; height: number } {
  if (cells.length === 0) {
    return { width: 0, height: 0 };
  }

  const xs = cells.map((cell) => cell.x);
  const ys = cells.map((cell) => cell.y);

  return {
    width: Math.max(...xs) - Math.min(...xs) + 1,
    height: Math.max(...ys) - Math.min(...ys) + 1,
  };
}

// Centers a pattern on a rows x cols board and drops any cell that still
// falls outside it (for patterns larger than the board).
export function centerCells(
  cells: LifeCell[],
  rows: number,
  cols: number
): LifeCell[] {
  if (cells.length === 0) {
    return [];
  }

  const xs = cells.map((cell) => cell.x);
  const ys = cells.map((cell) => cell.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const offsetX = Math.floor((cols - (maxX - minX + 1)) / 2) - minX;
  const offsetY = Math.floor((rows - (maxY - minY + 1)) / 2) - minY;

  return cells
    .map((cell) => ({ x: cell.x + offsetX, y: cell.y + offsetY }))
    .filter((cell) => cell.x >= 0 && cell.x < cols && cell.y >= 0 && cell.y < rows);
}
