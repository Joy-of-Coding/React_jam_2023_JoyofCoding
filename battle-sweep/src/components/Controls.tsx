import "./Controls.css";

const Controls = () => {
  return (
    <>
      <button className="button" onClick={() => Rune.actions.addBombs()}>
        Add Bombs
      </button>
      <button className="button" onClick={() => Rune.actions.swap()}>
        Swap Boards
      </button>
    </>
  );
};

export default Controls;
