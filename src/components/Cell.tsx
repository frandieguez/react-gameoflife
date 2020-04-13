import React from "react";
import { CELL_SIZE } from "../definitions/constants";

export interface CellProps {
  x: number;
  y: number;
}

/**
 * Represents a cell in a grid given its position
 *
 * @param x the horizontal position in the grid
 * @param y the vertical position in the grid
 */
const Cell: React.FunctionComponent<CellProps> = ({ x, y }) => {
  let styles = {
    left: `${CELL_SIZE * x + 1}px`,
    top: `${CELL_SIZE * y + 1}px`,
    width: `${CELL_SIZE - 1}px`,
    height: `${CELL_SIZE - 1}px`,
  };

  return <div className="Cell" style={styles} />;
};

/**
 * Use React.memo to memoize the Cell if previously rendered
 */
export default React.memo(Cell);
