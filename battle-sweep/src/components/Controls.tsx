import "./Controls.css";

interface ControlsProps {
  // setTimerDuration: (newDuration: number) => void;
  onboarding: boolean;
  toggleFlag: () => void;
}

const Controls = ({ onboarding }: ControlsProps) => {
  if (onboarding) {
    return (
      <>
        <button className="button" onClick={() => Rune.actions.addBombs()}>
          Add Bombs
        </button>
        <button className="button" onClick={() => Rune.actions.swap()}>
          Swap Boards
        </button>
        <div>

        </div>
      </>
    );
  }
};

export default Controls;