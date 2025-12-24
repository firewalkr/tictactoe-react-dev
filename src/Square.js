export default function Square({ i, j, setBoardAt, state, currentPlayer }) {
  const clickHandler = () => {
    console.log("clickety click");
    setBoardAt(i, j, currentPlayer);
  };

  return (
    <button className="square" onClick={clickHandler}>
      {state}
    </button>
  );
}
