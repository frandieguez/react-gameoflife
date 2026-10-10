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
    <label className="SpeedControl">
      <span>Update every</span>
      <span className="SpeedControl-field">
        <input
          type="number"
          min={100}
          step={100}
          value={interval}
          onChange={onIntervalChange}
          aria-label="Update interval in milliseconds"
        />
        <span className="SpeedControl-unit">msec</span>
      </span>
    </label>

    <div className="buttons">
      <button
        id="StartStop"
        className={`button startStop ${isRunning ? "is-running" : ""}`}
        onClick={() => {
          isRunning ? stopGame() : runGame();
        }}
        aria-label={isRunning ? "Pause" : "Play"}
      >
        {isRunning ? (
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 4.5v15l13-7.5-13-7.5z" />
          </svg>
        )}
      </button>

      <button
        id="Reset"
        onClick={() => resetBoard()}
        disabled={isRunning}
        className="button reset"
        aria-label="Reset board"
      >
        <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
        </svg>
      </button>
    </div>
  </div>
);

export default Controls;
