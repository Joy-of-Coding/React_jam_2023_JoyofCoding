import './Header.css'
import {GameState} from "../helper/Types.ts";
import OpponentBoard from "./OpponentBoard.tsx";
import React from "react";

interface HeaderProps {
    players: Record<
        string,
        { playerId: string; displayName: string; avatarUrl: string }
    >;
    playerId: string;
    yourPlayerId: string | undefined;
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

       return (
        <div className="header">
            {yourPlayerId &&
                <>
                    <div className="avatar"><img className="avatar" src={players[yourPlayerId].avatarUrl} alt=""/></div>

                    <div className="stats">
                    {game.onboarding && opponentId &&
                        <div>Bombs Placed: {game.playerState[opponentId].bombsPlaced}</div>}

                    {!game.onboarding &&
                        <>
                            <div>Bombs Found: {game.playerState[yourPlayerId].bombsFound}</div>
                            <div>Lives: {game.playerState[yourPlayerId].lives}</div>
                        </>
                    }
                    </div>
                </>
            }

            {/*// */}
            {/*//
    {/    <div className="dash-item"> {game.setBombs}</div>*/}
            {/*//*/}
            {/*//     {!game.onboarding &&*/}
            {/*//         <OpponentBoard*/}
            {/*//             onPress={() => null}*/}
            {/*//             onLongPress={() => null}*/}
            {/*//             display={!game.onboarding ? playerId !== yourPlayerId : playerId === yourPlayerId}*/}
            {/*//             board={game.playerState[`${playerId}`].board}*/}
            {/*//         />*/}
            {/*//     }*/}
            {/*//*/}
            {/*// </div>*/}
        </div>
    )
};

export default Header;