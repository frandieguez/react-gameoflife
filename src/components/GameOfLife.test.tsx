import React from "react";
import { render } from "@testing-library/react";
import GameOfLife from "./GameOfLife";

test("renders update form", () => {
  const { getByText } = render(<GameOfLife />);
  const linkElement = getByText(/Update every/i);
  expect(linkElement).toBeInTheDocument();
});

// test("renders update form", () => {
//   const { container, getAllByTestId } = render(<GameOfLife />);

//   expect(container.firstChild).toHaveClass("Running");
// });
