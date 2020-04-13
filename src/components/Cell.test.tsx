import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

test("renders create empty controls", () => {
  const { container } = render(<Cell x={0} y={0} cellSize={10} />);

  expect(container.firstChild.className).toBe("Cell");
});

test("renders create empty controls", () => {
  let x = 10;
  let y = 10;
  let cellSize = 10;
  const { container } = render(<Cell x={x} y={y} cellSize={cellSize} />);

  expect(container.firstChild).toHaveStyle(`top: ${cellSize * x + 1}px`);
  expect(container.firstChild).toHaveStyle(`left: ${cellSize * y + 1}px`);
  expect(container.firstChild).toHaveStyle(`width: ${cellSize - 1}px`);
  expect(container.firstChild).toHaveStyle(`height: ${cellSize - 1}px`);
});
