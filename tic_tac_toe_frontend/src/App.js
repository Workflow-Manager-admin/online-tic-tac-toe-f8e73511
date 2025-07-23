import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import TicTacToeBoard from "./components/TicTacToeBoard";
import GameStatus from "./components/GameStatus";

// THEME COLORS FOR EASY REFERENCE
const THEME = {
  primary: "#1976d2",
  accent: "#ffca28",
  secondary: "#424242",
};

// --- Tic Tac Toe game logic utilities ---
// PUBLIC_INTERFACE
function calculateWinner(squares) {
  /** Returns {winner: 'X'|'O', line: [i,j,k]} or null if no winner. */
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diags
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return { winner: squares[a], line: [a, b, c] };
  }
  return null;
}

// Main App component
// PUBLIC_INTERFACE
function App() {
  const [theme] = useState("light"); // force-light, can allow theme toggle later
  const [board, setBoard] = useState(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState("X");
  const [status, setStatus] = useState("ongoing"); // "ongoing", "win", "draw"
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [moveAnim, setMoveAnim] = useState({}); // For per-cell pop animation
  const mounted = useRef(true);

  // Win/draw detection after each move
  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setStatus("win");
      setWinner(result.winner);
      setWinningLine(result.line);
    } else if (board.every(cell => cell)) {
      setStatus("draw");
      setWinner(null);
      setWinningLine(null);
    } else {
      setStatus("ongoing");
      setWinner(null);
      setWinningLine(null);
    }
    return () => { mounted.current = false; };
    // eslint-disable-next-line
  }, [board]);

  // Animate cell when marked
  const handleCellClick = idx => {
    if (board[idx] || status !== "ongoing") return;
    const newBoard = [...board];
    newBoard[idx] = nextPlayer;
    setBoard(newBoard);
    setNextPlayer(nextPlayer === "X" ? "O" : "X");
    // Anim: pop just-marked cell
    setMoveAnim(anim => ({ ...anim, [idx]: true }));
    setTimeout(() => {
      if (mounted.current) setMoveAnim(anim => ({ ...anim, [idx]: false }));
    }, 200); // 200ms pop animation
  };

  // Animate winning cells
  const animateCell = idx => moveAnim[idx];

  // PUBLIC_INTERFACE
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setNextPlayer("X");
    setStatus("ongoing");
    setWinner(null);
    setWinningLine(null);
    setMoveAnim({});
  };

  // Keyboard support: restart with R key
  useEffect(() => {
    const handler = (e) => {
      if (e.key.toLowerCase() === "r") handleRestart();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  // App layout: centered panel, status, board, buttons
  return (
    <div className="App" data-theme={theme}>
      <main className="ttt-main-panel">
        <h1 className="ttt-title" style={{ color: THEME.primary }}>Tic Tac Toe</h1>
        <GameStatus
          status={status}
          player={status === "win" ? winner : (status === "ongoing" ? nextPlayer : null)}
        />
        <TicTacToeBoard
          board={board}
          onCellClick={handleCellClick}
          winningLine={winningLine}
          animateCell={animateCell}
        />
        <div className="ttt-actions">
          <button
            className="ttt-btn"
            onClick={handleRestart}
            style={{
              background: THEME.primary,
              color: "#fff",
              border: `2px solid ${THEME.primary}`,
            }}
            aria-label="Restart game"
          >
            Restart
          </button>
        </div>
        <footer className="ttt-footer">
          <span>
            Player vs Player &mdash;{' '}
            <span style={{ color: THEME.secondary, fontWeight: 500 }}>Modern Minimal Demo</span>
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;
