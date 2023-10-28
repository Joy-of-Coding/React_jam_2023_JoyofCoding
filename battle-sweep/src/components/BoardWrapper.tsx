import Board from './Board.tsx'

import {GameState, TileProp} from "../helper/Types.ts";
import Controls from "./Controls.tsx";
import React from "react";
interface BoardWrapperProps {
    game: GameState;
    yourPlayerId: string;
    board: TileProp[][];
    // display: boolean;
    onPress: (row: number, col: number) => void;
    onLongPress: (row: number, col: number) => void;
    useFlag: boolean;
    toggleFlag: () => void;
}

const BoardWrapper = ({game, yourPlayerId, board, onPress, onLongPress, useFlag, toggleFlag}:BoardWrapperProps) => {
    return (
        <div className="board-wrapper">
            {!game.onboarding &&
                <div className="board-notifications">
                    <div className="board-item"><b>Captured:</b>
                        <img
                            src="src/assets/png/Bomb-20.png"
                            alt="bomb icon"
                        />
                        {game.playerState[yourPlayerId].bombsFound}
                    </div>
                    <button
                        className={`board-item button ${useFlag ? "flagged" : ""}`}
                        onClick={() => toggleFlag()}
                    >
                        Flag
                    </button>
                </div>
            }


            <Board board={board} onPress={onPress} onLongPress={onLongPress}/>
        </div>

    )
};

export default BoardWrapper;