import { useState, useCallback } from "react";
import Square from "./Square";

let x = 0;

export default function Board() {
  console.log("Render #" + Math.floor(x / 2)); // div by 2 due to strict mode
  x++;
  const [boardState, setBoardState] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [currentPlayer, setCurrentPlayer] = useState("X");

  const [gameWinner, setGameWinner] = useState(false);

  function switchPlayer() {
    if (currentPlayer === "X") {
      setCurrentPlayer("O");
    } else {
      setCurrentPlayer("X");
    }
  }

  const checkForWinner = (state) => {
    for (let j = 0; j < 3; j++) {
      const row = state[j];
      if (row[0] === row[1] && row[1] === row[2] && row[0]) {
        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        state[0][i] === state[1][i] &&
        state[1][i] === state[2][i] &&
        state[0][i]
      ) {
        return true;
      }
    }

    const mid = state[1][1];
    if (!mid) {
      return false;
    }

    if (state[0][0] === mid && state[2][2] === mid) {
      return true;
    }

    if (state[0][2] === mid && state[2][0] === mid) {
      return true;
    }

    return false;
  };

  const setBoardAt = useCallback((iPos, jPos, play) => {
    if (gameWinner) {
      console.log("Player " + currentPlayer + " has already won");
      return;
    }
    const currentPosMove = boardState[jPos][iPos];
    if (currentPosMove) {
      console.log(
        `position [${jPos}][${iPos}] already contains an ${currentPosMove} move`
      );
      return;
    }

    console.log("oldState:", boardState);
    console.log("i", iPos, "j", jPos);
    const newState = boardState.map((row, j) => {
      return row.map((sq, i) => {
        console.log("inner i", i, "inner j", j, "sq", sq);
        if (iPos === i && jPos === j) {
          console.log("applying play", play);
          return play;
        } else {
          return sq;
        }
      });
    });
    console.log("newState:", newState);

    setBoardState(newState);
    const hasWinner = checkForWinner(newState);
    if (hasWinner) {
      console.log("Winner is", currentPlayer);
      setGameWinner(true);
      return;
    }
    switchPlayer();
  });

  return (
    <>
      {boardState.map((row, j) => {
        return (
          <div key={`row-${j}`} className="board-row">
            {row.map((sq, i) => {
              return (
                <Square
                  key={`square-${i}-${j}`}
                  i={i}
                  j={j}
                  setBoardAt={setBoardAt}
                  state={sq}
                  currentPlayer={currentPlayer}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}
