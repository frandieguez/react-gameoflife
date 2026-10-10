import React from "react";

export interface CellProps {
  x: number;
  y: number;
  cellSize: number;
}

/**
 * Represents a cell in a grid given its position
 *
 * @param x the horizontal position in the grid
 * @param y the vertical position in the grid
 */
const Cell: React.FunctionComponent<CellProps> = ({ x, y, cellSize = 10 }) => {
  // Real punch-card holes are narrow vertical slots, not squares, and
  // this card is "punched by hand" — each hole gets a tiny deterministic
  // skew so the grid doesn't look machine-perfect.
  const holeWidth = cellSize * 0.5;
  const holeHeight = cellSize * 0.8;
  const jitter = ((x * 37 + y * 17) % 5) - 2;

  let styles = {
    left: `${cellSize * x + (cellSize - holeWidth) / 2}px`,
    top: `${cellSize * y + (cellSize - holeHeight) / 2}px`,
    width: `${holeWidth}px`,
    height: `${holeHeight}px`,
    transform: `rotate(${jitter}deg)`,
  };

  return <div className="Cell" style={styles} />;
};

/**
 * Use React.memo to memoize the Cell if previously rendered
 */
export default React.memo(Cell);
