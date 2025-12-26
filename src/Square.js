let xSquare = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const Square = function ({ i, j, setBoardAt, state, currentPlayer }) {
  console.log(`Square Render [${j}][${i}] #` + Math.floor(xSquare[j][i] / 2)); // div by 2 due to strict mode
  xSquare[j][i]++;

  const clickHandler = () => {
    console.log("clickety click");
    setBoardAt(i, j, currentPlayer);
  };

  return (
    <button className="square" onClick={clickHandler}>
      {state}
    </button>
  );
};

export default Square;
