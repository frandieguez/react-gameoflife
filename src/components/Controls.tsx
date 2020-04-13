import React from "react";

interface ControlsProps {
  interval: number;
  isRunning: boolean;
  onIntervalChange(event: React.ChangeEvent<HTMLInputElement>): any;
  stopGame: Function;
  runGame: Function;
  resetBoard: Function;
}

let Controls: React.FunctionComponent<ControlsProps> = ({
  interval,
  isRunning,
  onIntervalChange,
  stopGame,
  runGame,
  resetBoard,
}) => (
  <div className="Controls">
    Update every{" "}
    <input type="number" value={interval} onChange={onIntervalChange} /> msec{" "}
    <div className="buttons">
      <button
        id="StartStop"
        className={`${isRunning ? "started" : ""} button rounded startStop`}
        onClick={() => {
          isRunning ? stopGame() : runGame();
        }}
      >
        <span
          className={`${!isRunning ? "arrow-right" : "square"} game of life`}
        ></span>
      </button>

      <button
        id="Reset"
        onClick={() => resetBoard()}
        disabled={isRunning}
        className="button rounded reset"
      >
        <svg
          className="trash"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
        >
          <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
        </svg>
      </button>
    </div>
  </div>
);

export default Controls;
