import "./Controls.css";
import "./Controls.css";

interface ControlsProps {
  updateTimerDuration: (newDuration: number) => void;
}

const Controls = ({ updateTimerDuration }: ControlsProps) => {
  return (
    <>
      <button className="button" onClick={() => Rune.actions.addBombs()}>
        Add Bombs
      </button>
      <button className="button" onClick={() => Rune.actions.swap()}>
        Swap Boards
      </button>
      <div>
        <input
          type="number"
          placeholder="New Timer Duration"
          onChange={(e) => {
            const newDuration = parseInt(e.target.value, 10);
            updateTimerDuration(newDuration);
          }}
        />
        <button onClick={() => updateTimerDuration(60)}>Set Timer</button>
      </div>
    </>
  );
};

export default Controls;
