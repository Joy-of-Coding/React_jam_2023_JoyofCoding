import React from "react";
import './GameZone.css'
import { GameState } from "../logic.ts"
import { motion } from "framer-motion"
import Controls from "./Controls.tsx";
import Table from "./Table.tsx";
import Player from "./Player.tsx";
//import Header from "./Header.tsx";
import {useState} from  'react'
import {HelpPopup} from './HelpPopup.tsx'

interface GameZoneProps {
    numPlayers: number,
    playerIds: string[],
    game: GameState,
    players: Record<string, { playerId: string, displayName: string, avatarUrl: string }>,
    yourPlayerId: string | undefined,
    spectators?: string[],
    avatarUrl: string,
}

const GameZone: React.FC<GameZoneProps> = ({game, players, yourPlayerId})=> {
    const [open, setOpen] = useState(false);
  
    if(!yourPlayerId) return <div>Spectating...</div>
  
    const playerIds = Object.keys(players).filter(id => !game.spectators.includes(id));
    const numPlayers = playerIds.length;
  
    return (
      <div className='game-play-container'>
        <div className='top-section'>
          {/* Render players 1-3 */}
          {[0, 1, 2].map(index => (
            <motion.div key={index} className="players" transition={{ duration: 1 }} animate={{x:0}} initial={{x: index === 1 ? 0 : (index === 0 ? -150 : 150)}}>
              {numPlayers > index ? (
                <Player playerId={playerIds[index]} players={players} game={game} playerNum={index + 1}/>
              ) : (
                <div className={`player-${index + 1}-name player-flex`}>
                  Waiting for player {index + 1}
                </div>
              )}
            </motion.div>
          ))}
        </div>
  
        <Table
          game={game}
          playerId={yourPlayerId}
          playerIds={playerIds}
          yourPlayerId={yourPlayerId}
          players={players}
        />
  
        <div className='bottom-section'>
          {/* Render players 4-6 */}
          {[3, 4, 5].map(index => (
            <motion.div key={index} className="players" transition={{ duration: 1 }} animate={{x:0}} initial={{x: index === 4 ? 0 : (index === 3 ? -150 : 150)}}>
              {numPlayers > index ? (
                <Player playerId={playerIds[index]} players={players} game={game} playerNum={index + 1}/>
              ) : (
                <div className={`player-${index + 1}-name player-flex`}>
                  Waiting for player {index + 1}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <Controls game={game} players={players} yourPlayerId={yourPlayerId} />


      </div>
    );
  }


                    
                   


export default GameZone;

{/* //grid layout start by ChatGPT
//typescript editing Chat GPT
// Image by <a href="https://www.freepik.com/free-vector/top-view-modern-restaurant-table-with-flat-design_2847028.htm#query=dining%20table%20top%20view&position=9&from_view=keyword&track=ais">Freepik</a> */}
{/* <a href="https://www.freepik.com/free-photo/faded-gray-wooden-textured-flooring-background_16246476.htm#page=2&query=flooring&position=8&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik */}
{/* <a href="https://www.freepik.com/free-vector/oak-wood-textured-design-background_16339756.htm#page=2&query=flooring&position=31&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik */}