import './GameZone.css';
import React from 'react';
import './Player.css';
import { GameState } from '../logic.ts';
import {motion} from "framer-motion";
import partying from "../assets/partying.gif"
// import splat from "../assets/pngs/splat.png"

interface PlayerProps {
  players: Record<string, { playerId: string; displayName: string; avatarUrl: string }>;
  playerId: string;
  game: GameState;
  playerNum: number;
}

const Player: React.FC<PlayerProps> = ({ game, players, playerId, playerNum }) => {
    const handlePlayerClick = (playerId: string) => {
        console.log("clicked Player ",playerId )
        Rune.actions.setSelectedPlayerId(playerId)

    }



    return (
      // <motion.div transition={{ duration: 1 }} animate={{x:0}} initial={{x:-150}} className= { `${playerId === yourPlayerId ? 'red-border' : ''}player`}>
             
              <div  onClick={() => handlePlayerClick(playerId)} className={`player-${playerNum}-name player`} >
                  <div className='user-name'>
                      <h4 className='player-h4'>{players[playerId].displayName} </h4>
                  </div>
                  
                   
                   <div className='player-count-section'>

                        <div className='avatar-container'>
                          
                          {game.currentPlayerIndex===Object.keys(players).indexOf(playerId)? <motion.img
                            
                            animate={{
                              
                              rotate: [0, 0, -50, 30, 0],
                              scale:[1,1.05,1,1.05,1]
                             
                            }}
                            transition={{
                              duration: 2.5,
                              ease: "easeInOut",
                              times: [0, 0.2, 0.5, 0.8, 1],
                              repeat: Infinity,
                              repeatDelay: 1
                            }}  className='avatar' src={players[playerId].avatarUrl} alt="" ></motion.img> : 
                            
                            <img className='avatar' src={players[playerId].avatarUrl} alt="" />}
                          

                        </div>

                        
                        
                        <div className='dice-counter'>
                          <span className='counter-h4'>{game?.diceCount[playerId]}</span>

                        </div>
                   </div>
                    
                   

                    {/* <h4 className='player-id-name'>{players[playerId].displayName} </h4> */}
                    {/*<div className='button-group '>*/}
                    {/*    <button onClick={() => handleUpdateDiceCount(playerId, 1)}><h2>+</h2></button> <br/>*/}
                    {/*    <button onClick={() => handleUpdateDiceCount(playerId, -1)}><h2>-</h2></button> <br/>*/}
                    {/*</div>*/}

                    <div>

                        <hr />
                        <div className='challenge-text'>
                          <small>Challenges</small>
                        </div>
                        <div className='challenges'>
                            <img src={`${partying}`} alt="" />
                        </div>

                        

                      

                    </div>
                    

                 
                      
              </div>
          

      // </motion.div>
  );
};

export default Player;

{/* <motion.img animate={{scale:[5,1], opacity:[0,1,1,.5,0]}} transition={{duration:1,delay:2}}  className='splat' src={splat}  alt="" /> */}