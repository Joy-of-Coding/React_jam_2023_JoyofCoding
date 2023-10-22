import './Player.css'
import { React } from 'react'

interface PlayerProps {
    players: Record<string, { playerId: string; displayName: string; avatarUrl: string }>;
    playerId: string;
}


const Player:React.FC<PlayerProps> = ({players, playerId}) => {
    console.log(players)
    return (
        <div>
            <h3>{players[playerId].displayName}'s Board</h3>
            <img className='avatar' src={players[playerId].avatarUrl} alt="" />
        </div>
    )
}


export default Player;