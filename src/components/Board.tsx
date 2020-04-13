import React from "react";
import Cell, { CellProps } from "./Cell";

interface BoardProps {
  width: number;
  height: number;
  cellSize: number;
  onToggleCell(event: React.MouseEvent<HTMLDivElement, MouseEvent>);
  cells: Array<CellProps>;
}

const Board = (
  { width, height, cellSize, onToggleCell, cells }: BoardProps,
  ref: React.LegacyRef<HTMLDivElement>
) => {
  return (
    <div
      className="Board"
      style={{
        width,
        height,
        backgroundSize: `${cellSize}px ${cellSize}px`,
      }}
      onClick={onToggleCell}
      ref={ref}
    >
      {cells.map((cell) => (
        <Cell
          x={cell.x}
          y={cell.y}
          cellSize={cellSize}
          key={`${cell.x},${cell.y}`}
        />
      ))}
    </div>
  );
};

export default React.forwardRef(Board);
