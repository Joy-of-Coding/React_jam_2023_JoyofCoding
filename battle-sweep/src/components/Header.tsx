import './Header.css'
import {GameState} from "../helper/Types.ts";
import OpponentBoard from "./OpponentBoard.tsx";
import React from "react";

interface HeaderProps {
    players: Record<
        string,
        { playerId: string; displayName: string; avatarUrl: string }
    >;
    yourPlayerId: string | any;
    game: GameState;
}
const Header = ({ game, players, yourPlayerId}: HeaderProps) => {
   const getOpponentId = () =>{
       if (yourPlayerId && Object.keys(players).length>1) { //non spectator, more than one player
           return Object.keys(players).filter((playerId) => playerId !== yourPlayerId)[0];
       } else {
           return null
       }
   }

   const opponentId = getOpponentId()

    //get Hearts Icon
    const heartIcons = [];
    for (let i = 0; i < game.playerState[yourPlayerId].lives; i++) {
        heartIcons.push(
            <img
                key={i}
                src="src/assets/Sprites/7-Objects/17-Heart/1-Idle/1.png"
                alt="heart icon"
            />
        );
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
                            <div className="opponent-board">
                                 {!game.onboarding &&
                                    <OpponentBoard
                                        onPress={() => null}
                                        onLongPress={() => null}
                                        display={true}
                                        board={game.playerState[`${opponentId}`].board}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                }
                </>
            }


        </div>
    )
};

export default Header;