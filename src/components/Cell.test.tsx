import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

test("renders create empty controls", () => {
  const { container } = render(<Cell x={0} y={0} cellSize={10} />);

  expect(container.firstChild).toHaveClass("Cell", { exact: true });
});

test("renders create empty controls", () => {
  let x = 10;
  let y = 10;
  let cellSize = 10;
  const holeWidth = cellSize * 0.5;
  const holeHeight = cellSize * 0.8;
  const { container } = render(<Cell x={x} y={y} cellSize={cellSize} />);

  expect(container.firstChild).toHaveStyle(
    `left: ${cellSize * x + (cellSize - holeWidth) / 2}px`
  );
  expect(container.firstChild).toHaveStyle(
    `top: ${cellSize * y + (cellSize - holeHeight) / 2}px`
  );
  expect(container.firstChild).toHaveStyle(`width: ${holeWidth}px`);
  expect(container.firstChild).toHaveStyle(`height: ${holeHeight}px`);
});
