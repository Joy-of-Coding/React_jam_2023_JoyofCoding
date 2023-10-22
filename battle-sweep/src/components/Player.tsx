import './Player.css'
import { React } from 'react'
import {GameState} from "../logic.ts";


interface PlayerProps {
    players: Record<string, { playerId: string; displayName: string; avatarUrl: string }>;
    playerId: string;
    game: GameState;
    yourPlayerId: string;
}


const Player:React.FC<PlayerProps> = ({players, playerId, game, yourPlayerId}) => {
    console.log(playerId)
    return (
        <div>

            {playerId === yourPlayerId ?
            <>
            <h3>{players[playerId].displayName}'s Board</h3>
            <img className='avatar' src={players[playerId].avatarUrl} alt="" />
            </>
                : ""}
        </div>
    )
}


export default Player;