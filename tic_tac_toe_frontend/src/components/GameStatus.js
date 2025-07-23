import React from "react";

// PUBLIC_INTERFACE
export default function GameStatus({ status, player }) {
  /**
   * GameStatus displays current game state ("X wins", "O wins", "Draw", or "Player X's turn").
   * @param {string} status - One of: 'win', 'draw', 'ongoing'
   * @param {string|null} player - Current player ('X' or 'O'), or winner ('X'/'O') if win.
   */
  let message = "";
  let statusClass = "";
  if (status === "win") {
    message = `Player ${player} wins!`;
    statusClass = "status-win";
  } else if (status === "draw") {
    message = "It's a draw!";
    statusClass = "status-draw";
  } else if (status === "ongoing") {
    message = `Player ${player}'s turn`;
    statusClass = "status-turn";
  }
  return (
    <div className={`ttt-status ${statusClass}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
