import './styles.scss';
import { useState } from 'react';
import Board from './components/Board';
import { calculateWinner } from './winner';
import History from './components/History';
import StatusMessage from './components/StatusMessage';

const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: false }];

function App() {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentmove, setCurrentmove] = useState(0);
  const gamingBoard = history[currentmove];

  const winner = calculateWinner(gamingBoard.squares);

  const handleSquareClick = clickedPosition => {
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }
    setHistory(currentHistory => {
      const isTraversing = currentmove + 1 !== currentHistory.length;

      const lastGamingState = isTraversing
        ? currentHistory[currentmove]
        : history[history.length - 1];

      const nextSquaresState = lastGamingState.squares.map(
        (squareValue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isXNext ? 'X' : 'O';
          }
          return squareValue;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextSquaresState,
        isXNext: !lastGamingState.isXNext,
      });
    });
    setCurrentmove(move => move + 1);
  };

  const moveTo = move => {
    setCurrentmove(move);
  };

  return (
    <div className="app">
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
      />
      <h2>Current game history</h2>
      <History history={history} moveTo={moveTo} currentmove={currentmove} />
    </div>
  );
}

export default App;
