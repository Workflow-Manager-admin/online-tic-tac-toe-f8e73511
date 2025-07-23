import React from "react";

// PUBLIC_INTERFACE
export default function TicTacToeBoard({ board, onCellClick, winningLine, animateCell }) {
  /** 
   * TicTacToeBoard renders a 3x3 grid, handles click, and displays winning cells with animation.
   * @param {Array} board - Array of 9 elements ('X', 'O', or null)
   * @param {Function} onCellClick - Handler for cell clicks
   * @param {Array} winningLine - Array of winning cell indices
   * @param {Function} animateCell - If defined, passing index triggers animation for that cell
   */
  return (
    <div className="ttt-board">
      {board.map((cell, idx) => {
        const isWinning = winningLine && winningLine.includes(idx);
        return (
          <button
            key={idx}
            className={`ttt-cell${cell ? " filled" : ""}${isWinning ? " win" : ""}${animateCell && animateCell(idx) ? " pop" : ""}`}
            onClick={() => onCellClick(idx)}
            disabled={!!cell || winningLine}
            aria-label={`Cell ${idx + 1}${cell ? `: ${cell}` : ""}`}
          >
            {cell}
          </button>
        );
      })}
    </div>
  );
}
