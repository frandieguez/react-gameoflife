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
  let styles = {
    left: `${cellSize * x + 1}px`,
    top: `${cellSize * y + 1}px`,
    width: `${cellSize - 1}px`,
    height: `${cellSize - 1}px`,
  };

  return <div className="Cell" style={styles} />;
};

/**
 * Use React.memo to memoize the Cell if previously rendered
 */
export default React.memo(Cell);
