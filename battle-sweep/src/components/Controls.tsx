import './Controls.css'

const Controls = () => {
    return (
        <div>
            <button
                className="button"
                onClick={() => Rune.actions.addBombs()}
            >
                Add Bombs
            </button>
        </div>
    )
};

export default Controls;