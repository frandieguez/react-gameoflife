import React from "react";
import { createRoot } from "react-dom/client";
import GameOfLife from "./components/GameOfLife";
import "./styles/index.scss";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GameOfLife />
  </React.StrictMode>
);
