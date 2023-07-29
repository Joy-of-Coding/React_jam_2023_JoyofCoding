import React from "react";
import './GameZone.css'
// import Dice from "./Dice";
import { GameState } from "../logic.ts"
import { motion } from "framer-motion"
import Controls from "./Controls.tsx";
import Table from "./Table.tsx";
import Player from "./Player.tsx";
import Header from "./Header.tsx";

interface GameZoneProps {
    numPlayers: number,
    playerIds: string[],
    game: GameState,
    players: Record<string, { playerId: string, displayName: string, avatarUrl: string }>,
    yourPlayerId: string | undefined,
    avatarUrl: string,
}
// const GameZone: React.FC<GameZoneProps> = ({game: game, players: players, yourPlayerId: yourPlayerId, avatarUrl:avatarUrl})=> {
const GameZone: React.FC<GameZoneProps> = ({game: game, players: players, yourPlayerId: yourPlayerId})=> {
    if(!yourPlayerId) return <div>loading</div>
    const playerIds = Object.keys(players)
    //const avatarUrl = Object.values(players)
    const numPlayers = playerIds.length

    // const nextPlayerId = players[(game.currentPlayerIndex + 1) % Object.keys(players).length];
    // console.log(typeof(nextPlayerId))

    return (
        <div className='game-play-container'>
            
                <div>

                    {/*Moved the motion animation into the header to clean up area for challenge dice*/}
                    <Header
                        displayName={players[yourPlayerId].displayName}
                        challengeCounter = {game.challengeCounter}
                        challengeStatus = {game.challengeStatus}
                    />

                </div>


                <div className='top-section'>


                {/* <motion.div transition={{ duration: 1 }} animate={{x:0}} initial={{x:-150}} > */}

                    <motion.div className="players" transition={{ duration: 1 }} animate={{x:0}} initial={{x:-150}} >
                    {numPlayers > 0 ? (

                        <Player playerId={playerIds[0]} players={players} game={game} playerNum={1}/>


                                
                            
                        ) : (
                            <div className='player-1-name  player-flex'>
                                Waiting for player 1
                            </div>
                        )}
                    </motion.div>

                    {/* </motion.div> */}
                        
                    <motion.div className="players"  transition={{ duration: 1 }} animate={{x:0}} initial={{x:150}} >
                        {numPlayers > 1 ? (

                            <Player playerId={playerIds[1]} players={players} game={game} playerNum={2} />

                        ) : (
                            <div className='player-2-name player-flex'>
                                Waiting for player 2
                            </div>
                        )}
                    </motion.div>
                       


                </div>


                <Table
                    game={game}
                    playerId={yourPlayerId}
                    playerIds ={playerIds}
                    yourPlayerId={yourPlayerId}
                    previousPlayerId = {playerIds[game.previousPlayerIndex]}
                />

                    
           





            <div className='bottom-section'>

                    <motion.div className="players"   transition={{ duration: 1 }} animate={{x:0}} initial={{x:-150}}>
                    {numPlayers > 3 ? (

                        <Player playerId={playerIds[3]} players={players} game={game} playerNum={4}  />

                    ) : (
                               <div className='player-flex player-4-name'>
                                   Waiting for player 4
                               </div>
                           )}
                    </motion.div>


                    <Controls game={game} players={players} yourPlayerId={yourPlayerId} />

                
                    
                       


                    <motion.div className="players"   transition={{ duration: 1 }} animate={{x:0}} initial={{x:150}}>

                    {numPlayers > 2 ? (

                        <Player playerId={playerIds[2]} players={players} game={game} playerNum={3} />

                    ) : (
                        <div className=" player-flex player-3-name ">
                            <b>Waiting for player 3</b>
                        </div>
                    )}

                    </motion.div>


                   







            </div> {/* end bottom section container */ }

        </div> // full container
    );
}

export default GameZone;

{/* //grid layout start by ChatGPT
//typescript editing Chat GPT
// Image by <a href="https://www.freepik.com/free-vector/top-view-modern-restaurant-table-with-flat-design_2847028.htm#query=dining%20table%20top%20view&position=9&from_view=keyword&track=ais">Freepik</a> */}
{/* <a href="https://www.freepik.com/free-photo/faded-gray-wooden-textured-flooring-background_16246476.htm#page=2&query=flooring&position=8&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik */}
{/* <a href="https://www.freepik.com/free-vector/oak-wood-textured-design-background_16339756.htm#page=2&query=flooring&position=31&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik */}