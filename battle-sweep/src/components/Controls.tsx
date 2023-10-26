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
          Add Bombs
        </button>
        <button className="button" onClick={() => Rune.actions.swap()}>
          Start Game?
        </button>
      </>
    );
  } else {
    return (
      <button className={`button ${useFlag ? 'flagged' : ""}`} onClick={() => toggleFlag()}>
        Flag
      </button>
    );
  }
};

export default Controls;