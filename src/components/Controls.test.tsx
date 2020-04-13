import React from "react";
import { render } from "@testing-library/react";
import Controls from "./Controls";

test("renders create empty controls", () => {
  const { getByText } = render(
    <Controls
      interval={100}
      isRunning={false}
      onIntervalChange={() => {}}
      stopGame={() => {}}
      runGame={() => {}}
      resetBoard={() => {}}
    />
  );
  const linkElement = getByText(/Update every/i);
  expect(linkElement).toBeInTheDocument();
});
