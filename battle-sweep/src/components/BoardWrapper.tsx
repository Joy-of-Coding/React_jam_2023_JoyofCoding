import Board from './Board.tsx'

import {TileProp} from "../helper/Types.ts";
interface BoardWrapperProps {
    board: TileProp[][];
    // display: boolean;
    onPress: (row: number, col: number) => void;
    onLongPress: (row: number, col: number) => void;
}

const BoardWrapper = ({board, onPress, onLongPress}:BoardWrapperProps) => {
    return (
        <div className="board-wrapper">
        {
            <>
                <div className="board-notifications">
                    <div className="board-item">Captured</div>
                    <div className="board-item">Timer</div>
                    <div className="board-item"><button>Flags</button></div>
                </div>
                <Board board={board} onPress={onPress} onLongPress={onLongPress}/>
            </>
        }
        </div>

    )
};

export default BoardWrapper;