import "./Controls.css";

interface ControlsProps {
  onboarding: boolean;
  toggleFlag: () => void;
  useFlag: boolean;
}

const Controls = ({ onboarding, toggleFlag, useFlag }: ControlsProps) => {
  if (onboarding) {
    return (
      <>
        <button className="button" onClick={() => Rune.actions.addBombs()}>
          Randomize
        </button>
        <button className="button" onClick={() => Rune.actions.swap()}>
          Ready!
        </button>
      </>
    );
  } else {
    return (
      <button
        className={`button ${useFlag ? "flagged" : ""}`}
        onClick={() => toggleFlag()}
      >
      {useFlag ? "Trap Mode ⛓️" : "Find Mode 🔎"}
      </button>
    );
  }
};

export default Controls;
