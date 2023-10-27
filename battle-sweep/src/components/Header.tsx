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
const Header = ({ game, players, playerId, yourPlayerId}: HeaderProps) => (
    <div className="header">
        <div className="dash-item">{game.setBombs}</div>
    {/*// */}
    {/*//     <div className="avatar" ><img className="avatar" src={players[playerId].avatarUrl} alt="" /></div>*/}
    {/*//    <div className="dash-item"> {game.setBombs}</div>*/}
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
);

export default Header;