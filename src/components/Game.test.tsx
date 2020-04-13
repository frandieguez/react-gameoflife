import React from "react";
import { render } from "@testing-library/react";
import Game from "./GameOfLife";

test("renders update form", () => {
  const { getByText } = render(<Game />);
  const linkElement = getByText(/Update every/i);
  expect(linkElement).toBeInTheDocument();
});
