import React from "react";
import Cell, { CellProps } from "./Cell";
import { CELL_SIZE } from "../definitions/constants";

interface BoardProps {
  width: number;
  height: number;
  onToggleCell(event: React.MouseEvent<HTMLDivElement, MouseEvent>);
  cells: Array<CellProps>;
  isRunning: boolean;
}
const Board = (
  { width, height, onToggleCell, cells, isRunning }: BoardProps,
  ref: React.LegacyRef<HTMLDivElement>
) => {
  return (
    <div className={`${isRunning ? "Running" : ""} Game`}>
      <div
        className="Board"
        style={{
          width,
          height,
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        }}
        onClick={onToggleCell}
        ref={ref}
      >
        {cells.map((cell) => (
          <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
        ))}
      </div>
    </div>
  );
};

export default React.forwardRef(Board);
