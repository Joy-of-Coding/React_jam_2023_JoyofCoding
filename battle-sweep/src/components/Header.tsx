import './Header.css'
import {GameState} from "../helper/Types.ts";
import OpponentBoard from "./OpponentBoard.tsx";
import React from "react";

interface HeaderProps {
    players: Record<
        string,
        { playerId: string; displayName: string; avatarUrl: string }
    >;
    yourPlayerId: string | undefined;
    opponentId: string | null;
    game: GameState;
}
const Header = ({ game, players, yourPlayerId, opponentId}: HeaderProps) => {

    //get Hearts Icon
    const heartIcons = [];

    if (yourPlayerId) {
        for (let i = 0; i < game.playerState[yourPlayerId].lives; i++) {
            heartIcons.push(
                <img
                    key={i}
                    src="src/assets/Sprites/7-Objects/17-Heart/1-Idle/1.png"
                    alt="heart icon"
                />
            );
        }
    }




       return (
        <div className="header">
            {yourPlayerId &&
                <>
                    <div className="left-section">
                        <div className="section-wrapper">
                        <img className="avatar-image" src={players[yourPlayerId].avatarUrl} alt="Crabby Avatar"/></div>

                        <div className="stats">

                        {game.onboarding && opponentId &&
                            <div className="stat-item">Bombs Placed:

                                <img
                                    src="src/assets/png/Bomb-20.png"
                                    alt="bomb icon"
                                />
                                {game.playerState[opponentId].bombsPlaced}
                            </div>
                        }

                        {!game.onboarding &&
                            <>
                                <div className="stat-item">Bombs Found:
                                    <img

                                        src="src/assets/png/Bomb-20.png"
                                        alt="bomb icon"
                                    />
                                    {/*{bombsFound}*/}
                                    {game.playerState[yourPlayerId].bombsFound}
                                </div>
                            </>
                        }

                        <div className="stat-item">Lives:
                            {heartIcons}

                        </div>

                    </div>

                    </div>
                { opponentId &&
                    <div className="right-section">
                        <div className="section-wrapper">
                            {!game.onboarding &&
                            <div className="opponent-board">

                                    <OpponentBoard
                                        onPress={() => null}
                                        onLongPress={() => null}
                                        display={true}
                                        board={game.playerState[`${opponentId}`].board}
                                    />

                            </div>
                            }
                        </div>
                    </div>
                }
                </>
            }


        </div>
    )
};

export default Header;