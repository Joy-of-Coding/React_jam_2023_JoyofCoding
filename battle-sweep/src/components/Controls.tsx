import "./Controls.css";

interface ControlsProps {
  onboarding: boolean;
  toggleFlag: () => void;
}

const Controls = ({ onboarding, toggleFlag }: ControlsProps) => {
  if (onboarding) {
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
  } else {
    return (
      <button className="button" onClick={() => toggleFlag()}>
        Flag
      </button>
    );
  }
};

export default Controls;