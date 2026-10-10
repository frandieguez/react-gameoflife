import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { vi } from "vitest";
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
      onLoadPatternFile={() => {}}
    />
  );
  const linkElement = getByText(/Update every/i);
  expect(linkElement).toBeInTheDocument();
});

test("calls onLoadPatternFile when a file is picked", () => {
  const onLoadPatternFile = vi.fn();
  const { container } = render(
    <Controls
      interval={100}
      isRunning={false}
      onIntervalChange={() => {}}
      stopGame={() => {}}
      runGame={() => {}}
      resetBoard={() => {}}
      onLoadPatternFile={onLoadPatternFile}
    />
  );

  const fileInput = container.querySelector('input[type="file"]');
  const file = new File(["#Life 1.06\n0 0"], "glider.lif", {
    type: "text/plain",
  });
  fireEvent.change(fileInput, { target: { files: [file] } });

  expect(onLoadPatternFile).toHaveBeenCalledTimes(1);
});
