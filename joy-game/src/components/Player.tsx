import './GameZone.css';
import React from 'react';
import './Player.css';
import { GameState } from '../logic.ts';

interface PlayerProps {
  players: Record<string, { playerId: string; displayName: string; avatarUrl: string }>;
  playerId: string;
  game: GameState;
  playerNum: number;
}

const Player: React.FC<PlayerProps> = ({ game, players, playerId, playerNum }) => {
  return (
      // <motion.div transition={{ duration: 1 }} animate={{x:0}} initial={{x:-150}} className= { `${playerId === yourPlayerId ? 'red-border' : ''}player`}>
             
              <div  className={`player-${playerNum}-name player`} >
                  

                   <div className='player-count-section'>
                        <div className='avatar-container'>
                            <img className='avatar' src={players[playerId].avatarUrl} alt="" />
                        </div>
                        
                        <div className='dice-counter'><span className='counter-h4'>{game?.diceCount[playerId]}</span></div>
                   </div>
                    
                   

                    {/* <h4 className='player-id-name'>{players[playerId].displayName} </h4> */}
                    {/*<div className='button-group '>*/}
                    {/*    <button onClick={() => handleUpdateDiceCount(playerId, 1)}><h2>+</h2></button> <br/>*/}
                    {/*    <button onClick={() => handleUpdateDiceCount(playerId, -1)}><h2>-</h2></button> <br/>*/}
                    {/*</div>*/}
                    <h4 className='player-h4'>{players[playerId].displayName} </h4>

                 
                      
              </div>
          

      // </motion.div>
  );
};

export default Player;

