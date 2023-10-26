import "./Controls.css";

interface ControlsProps {
  updateTimerDuration: (newDuration: number) => void;
  onboarding: boolean;
  toggleFlag: () => void;
  useFlag: boolean;
}

const Controls = ({ updateTimerDuration, onboarding, toggleFlag }: ControlsProps) => {
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