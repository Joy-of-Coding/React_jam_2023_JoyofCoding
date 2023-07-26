import React from "react";
import './GameZone.css'
import Dice from "./Dice";
import { GameState } from "../logic.ts"
import { motion } from "framer-motion"
import Controls from "./Controls.tsx";
import Table from "./Table.tsx";
import Player from "./Player.tsx";

interface GameZoneProps {
    numPlayers: number,
    playerIds: string[],
    game: GameState,
    players: Record<string, { playerId: string, displayName: string, avatarUrl: string }>,
    yourPlayerId: string,
    avatarUrl: string,
}
// const GameZone: React.FC<GameZoneProps> = ({game: game, players: players, yourPlayerId: yourPlayerId, avatarUrl:avatarUrl})=> {
const GameZone: React.FC<GameZoneProps> = ({game: game, players: players, yourPlayerId: yourPlayerId})=> {

    const playerIds = Object.keys(players)
    //const avatarUrl = Object.values(players)
    const numPlayers = playerIds.length

    //moved handleRollDice function to Controls.tsx. OK to delete this
    // const handleRollDice = () => {
    //     const nextIndex = (game.currentPlayerIndex + 1) % Object.keys(players).length;
    //     const numDice = game.diceCount[yourPlayerId]
    //     console.log(players[yourPlayerId], "has", numDice, " dice")
    //     Rune.actions.rollDice({ nextIndex: nextIndex, numDice: numDice})
    // }

    const handleUpdateDiceCount = (playerId: string, amount: number) : void => {
        Rune.actions.updateDiceCount({ playerId: playerId, amount: amount });
    }

    //logic from joels:
    /*const advanceTurn = () => {
        const nextIndex = (game.currentPlayerIndex + 1) % Object.keys(players).length;
        Rune.actions.nextPlayer({nextPlayerIndex: nextIndex})
    }
    const handleRoll = (playerId:string, i: number) =>
    {
        console.log("clicked button", i)
        const randomNum= Math.floor(Math.random() * 6) + 1;
        Rune.actions.updatePlayerDie({playerId: playerId, dieValue: randomNum, dieIndex: i})
    }
    const handleRollAll = (playerId: string) => {
        console.log("Rolled all dice")
        Rune.actions.rollAllDice({playerId: playerId})
        advanceTurn()
    }
    */


    return (
        <div className='game-play-container'>
            
            <div className="container">
                <motion.b transition={{ duration: 1.2 }} animate={{y:20}} initial={{y:-150}}   className='player-gameboard-title'>{`${players[yourPlayerId].displayName}'s Game Board`}</motion.b>

                    <div className='top-section'>


                       
                        <motion.div transition={{ duration: 1 }} animate={{x:0}} initial={{x:-150}} className= { `${playerIds[0] === yourPlayerId ? 'red-border' : ''}player`}>
                        {/*    <div className=' player-flex'>*/}
                        {/*        <div >*/}
                        {/*        <img className='avatar' src={players[playerIds[0]].avatarUrl} alt="" />*/}
                        {/*        </div>*/}
                        {/*            <div className='player-1-name'>*/}
                        {/*            <b>{players[playerIds[0]].displayName} <br/>*/}
                        {/*            <button onClick={() => handleUpdateDiceCount(playerIds[0], 1)}>Dice++</button> <br/>*/}
                        {/*            <button onClick={() => handleUpdateDiceCount(playerIds[0], -1)}>Dice--</button> <br/>*/}
                        {/*            {game?.diceCount[playerIds[0]]}</b>*/}
                        {/*            </div>*/}
                        {/*    </div>    */}
                            <Player playerId={playerIds[0]} players={players} game={game} playerNum={1}/>
                        </motion.div>
                        
                        <motion.div transition={{ duration: 1 }} animate={{x:-20}} initial={{x:150}}    className={`${playerIds[1] === yourPlayerId ? 'red-border' : ''}player-section`}>
                            {numPlayers > 1 ? (
                                // <div className='player-flex'>
                                //     <div>
                                //     <img className='avatar' src={players[playerIds[1]].avatarUrl} alt="" />
                                //     </div>
                                //         <div className='player-2-name'>
                                //         <b>{players[playerIds[1]].displayName} <br/>
                                //         <button onClick={() => handleUpdateDiceCount(playerIds[1], 1)}>Dice++</button> <br/>
                                //         <button onClick={() => handleUpdateDiceCount(playerIds[1], -1)}>Dice--</button> <br/>
                                //         {game?.diceCount[playerIds[1]]}</b>
                                //         </div>
                                // </div>
                                <Player playerId={playerIds[1]} players={players} game={game} playerNum={2}/>

                            ) : (
                                <div className='player-2-name player-flex'>
                                    Waiting for player 2
                                </div>
                            )}
                        </motion.div>
                       


                    </div>

                    {/*Added to Table Component*/}
                    {/*<div className='middle-section'>*/}
                    
                    {/*    <div className='player-name'>*/}
                    {/*       /!* I suggest commenting this line out and changing to the following line*!/*/}
                    {/*       /!* will improve clarity, but this may change with ongoing UI updates*!/*/}
                    {/*       /!*{`${players[playerIds[game.currentPlayerIndex]].displayName}'s Turn`}*!/*/}
                    {/*        <b>Last player's roll...</b>*/}
                    {/*    </div>*/}
                    {/*        <div className='dice-container'>*/}
                    {/*            {game.gameDice.map((die, i )=>(*/}
                    {/*            <motion.button transition={{ duration: 1.3 }} animate={{*/}
                    {/*                scale: [1, 2, 2, 1, 1],*/}
                    {/*                rotate: [0, 0, 270, 270, 0],*/}
                    {/*                */}
                    {/*            }}                         */}
                    {/*            className='dice-button' key={i} ><Dice faceValue={die} /></motion.button>))}*/}
                    {/*        </div>*/}

                    {/*</div>*/}
                    <Table game={game}/>

                    
            </div>

{/*             
                                       <div className='roll-dice-button-container'>
                                <div className="bottom-row grid-item">{yourPlayerId ? (
                                <>
                                
                                    {(game.currentPlayerIndex===Object.keys(players).indexOf(yourPlayerId)) &&
                                        <div>
                                            <motion.button className='handleRoll-button' whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }} onClick={()=>{handleRollAll(yourPlayerId)}}>Roll Dice</motion.button>
                                        </div>
                                    }
                            
                                </>
                            ) : (
                                <>I am a spectator, so I don't have count</>
                            )}</div>
             */}





                    
                {/* <motion.div  transition={{ duration: 1 }} animate={{x:0}} initial={{x:-150}}className={` ${playerIds[2] === yourPlayerId ? 'red-border' : ''}`}>
                    {numPlayers > 2 ? (
                        <div>
                            <b>{players[playerIds[2]].displayName} <br/>
                            <button onClick={() => handleUpdateDiceCount(playerIds[2], 1)}>Dice++</button> <br/>
                            <button onClick={() => handleUpdateDiceCount(playerIds[2], -1)}>Dice--</button> <br/>
                            {game?.diceCount[playerIds[2]]}</b>
                        </div>
                        ) : (
                        <div className=" player-flex player-3-name">
                            <b>Waiting for player 3</b>
                        </div>
                      )}
                </motion.div>
                            

                <div className={`bottom-left player-area grid-item ${playerIds[3] === yourPlayerId ? 'red-border' : ''}`}>
                    {numPlayers > 3 ? (
                        <div>
                            <b>{players[playerIds[3]].displayName} <br/>
                            <button onClick={() => handleUpdateDiceCount(playerIds[3], 1)}>Dice++</button> <br/>
                            <button onClick={() => handleUpdateDiceCount(playerIds[3], -1)}>Dice--</button> <br/>
                            {game?.diceCount[playerIds[3]]}</b>
                        </div>
                    ) : (
                        <div>
                            Waiting for player 4
                        </div>
                    )}
                </div> */}

            <div className='bottom-section'>
                    <motion.div  transition={{ duration: 1 }} animate={{x:0}} initial={{x:-150}}className={` ${playerIds[3] === yourPlayerId ? 'red-border' : ''}`}>
                    {numPlayers > 3 ? (
                            // <div className='player-flex'>
                            //     <div>
                            //     <img className='avatar' src={players[playerIds[3]].avatarUrl} alt="" />
                            //     </div>
                            //            <div className='player-4-name'>
                            //            <b>{players[playerIds[3]].displayName} <br/>
                            //            <button onClick={() => handleUpdateDiceCount(playerIds[3], 1)}>Dice++</button> <br/>
                            //            <button onClick={() => handleUpdateDiceCount(playerIds[3], -1)}>Dice--</button> <br/>
                            //            {game?.diceCount[playerIds[3]]}</b>
                            //            </div>
                            //    </div>
                        <Player playerId={playerIds[3]} players={players} game={game} playerNum={4} />

                    ) : (
                               <div className='player-flex player-4-name'>
                                   Waiting for player 4
                               </div>
                           )}
                       </motion.div>

                    {/*The prior code here was moved to new component!*/}
                    <Controls game={game} players={players} yourPlayerId={yourPlayerId} />

                {/* end roll dice container */ }
                    {/* <div className='bottom-section'> */}
                       


                        <motion.div  transition={{ duration: 1 }} animate={{x:0}} initial={{x:150}} className={` ${playerIds[2] === yourPlayerId ? 'red-border' : ''}`}>

                       {numPlayers > 2 ? (
                            // <div className=' player-flex '>
                            //     <div>
                            //     <img className='avatar' src={players[playerIds[2]].avatarUrl} alt="" />
                            //     </div>
                            //         <div className='player-3-name'>
                            //         <b>{players[playerIds[2]].displayName} <br/>
                            //         <button onClick={() => handleUpdateDiceCount(playerIds[2], 1)}>Dice++</button> <br/>
                            //         <button onClick={() => handleUpdateDiceCount(playerIds[2], -1)}>Dice--</button> <br/>
                            //         {game?.diceCount[playerIds[2]]}</b>
                            //         </div>
                            // </div>
                           <Player playerId={playerIds[2]} players={players} game={game} playerNum={3}/>

                       ) : (
                            <div className=" player-flex player-3-name ">
                                <b>Waiting for player 3</b>
                            </div>
                        )}

                        </motion.div>


                       <div className="dice-container-parent">


                                {/*Controls area*/}
                                {/*Roll Dice, Challenge, Give away*/}


                        </div>
                    {/* </div> */}







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