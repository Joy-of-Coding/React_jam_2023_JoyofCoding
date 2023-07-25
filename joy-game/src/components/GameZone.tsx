import React from "react";
import './GameZone.css'
import Dice from "./Dice";
import { GameState } from "../logic.ts"
import { motion } from "framer-motion"

interface GameZoneProps {
    numPlayers: number,
    playerIds: string[],
    game: GameState,
    players: Record<string, any>,
    yourPlayerId: string,
}

const GameZone: React.FC<GameZoneProps> = ({game: game, players: players, yourPlayerId: yourPlayerId})=> {


    const playerIds = Object.keys(players)
    const numPlayers = playerIds.length

    const handleRollDice = () => {
        const nextIndex = (game.currentPlayerIndex + 1) % Object.keys(players).length;
        const numDice = game.diceCount[yourPlayerId]
        Rune.actions.rollDice({ playerId: yourPlayerId, nextIndex: nextIndex, numDice: numDice})
    }


    return (
        <div className='game-play-container'>
            
            <div className="container">
            <motion.b transition={{ duration: 1.2 }} animate={{y:20}} initial={{y:-150}}   className='player-gameboard-title'>{`${players[yourPlayerId].displayName}'s Game Board`}</motion.b>
                <div className='top-section'>

                    <div className="player-section  right">

                        <motion.div  transition={{ duration: 1 }} animate={{x:20}} initial={{x:-150}}   className= { `${playerIds[0] === yourPlayerId ? 'red-border' : ''}player`}>
                        <b>   {players[playerIds[0]].displayName} <br/> {game?.diceCount[playerIds[0]]}</b>
                        </motion.div>
                    </div>


                    <div className="player-section left">

                        <motion.div transition={{ duration: 1 }} animate={{x:-20}} initial={{x:150}}    className={`top-right player-area grid-item ${playerIds[1] === yourPlayerId ? 'red-border' : ''}player-section`}>
                            {numPlayers > 1 ? (
                                <div>
                                    <b>{players[playerIds[1]].displayName}: {game?.diceCount[playerIds[1]]}</b>
                                </div>
                            ) : (
                                <div>
                                    Waiting for player 2
                                </div>
                            )}
                        </motion.div>
                    </div>
                    


                </div>


                <div className='middle-section'>
                    
                    <div className='player-name'>
                        {/*Object.keys(players).indexOf(yourPlayerId))*/}
                        {/*Commented out this name b/c the dice on the table are showing the last person's roll*/}
                        {/*{`${players[playerIds[game.currentPlayerIndex]].displayName}'s Turn`}*/}
                        <b>Last player's roll...</b>
                        </div>
                            <div className='dice-container'>
                            {game.gameDice.map((die, i )=>(
                                <Dice key={i} faceValue={die} />
                            ))}
                            </div>

                    </div>

                    
                </div>


                <div className='bottom-section'>

                </div>

                <div className="ice-container-parent">

                    <div className={`bottom-right player-area grid-item ${playerIds[2] === yourPlayerId ? 'red-border' : ''}`}>
                        {numPlayers > 2 ? (
                            <div>
                                <b>{players[playerIds[2]].displayName}: {game?.diceCount[playerIds[2]]}</b>
                            </div>
                        ) : (
                            <div>
                                Waiting for player 3
                            </div>
                        )}
                    </div>

                    <div className={`bottom-left player-area grid-item ${playerIds[3] === yourPlayerId ? 'red-border' : ''}`}>
                        {numPlayers > 3 ? (
                            <div>
                                <b>{players[playerIds[3]].displayName}: {game?.diceCount[playerIds[3]]}</b>
                            </div>
                        ) : (
                            <div>
                                Waiting for player 4
                            </div>
                        )}
                    </div>

                    {/*Controls area*/}
                    {/*Roll Dice, Challenge, Give away*/}
                    <div className='roll-dice-button-container'>
                        <div className="bottom-row grid-item">{yourPlayerId ? (
                            <>

                                {(game.currentPlayerIndex===Object.keys(players).indexOf(yourPlayerId)) &&
                                    <div>
                                        {/*//Updated the button message to make it clear that dice roll hasn't occured yet*/}
                                        {/*//IE  dice on the table are not *this* roll.  Will also update the message on the table*/}
                                        {/*//to make the display less confusing*/}
                                        <button onClick={()=>{handleRollDice()}}>{players[yourPlayerId].displayName}, Roll the Dice!</button>
                                    </div>
                                }

                            </>
                        ) : (
                            <>I am a spectator, so I don't have count</>
                        )}</div>

                    </div>
                </div>


        </div>

    );
}

export default GameZone;

//grid layout start by ChatGPT
//typescript editing Chat GPT
// Image by <a href="https://www.freepik.com/free-vector/top-view-modern-restaurant-table-with-flat-design_2847028.htm#query=dining%20table%20top%20view&position=9&from_view=keyword&track=ais">Freepik</a>
{/* <a href="https://www.freepik.com/free-photo/faded-gray-wooden-textured-flooring-background_16246476.htm#page=2&query=flooring&position=8&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik */}
{/* <a href="https://www.freepik.com/free-vector/oak-wood-textured-design-background_16339756.htm#page=2&query=flooring&position=31&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik */}