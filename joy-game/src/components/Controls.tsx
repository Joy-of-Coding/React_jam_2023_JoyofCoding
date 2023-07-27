import {motion} from "framer-motion";
import React from "react";
import { GameState } from "../logic.ts"

interface ControlProps {
    game: GameState,
    players: Record<string, { playerId: string, displayName: string, avatarUrl: string }>,
    yourPlayerId: string
}
const Controls: React.FC<ControlProps> = ({game: game, yourPlayerId: yourPlayerId, players:players}) => {
    const handleRollDice = () => {
        const nextIndex = (game.currentPlayerIndex + 1) % Object.key(players).length;
        const numDice = game.diceCount[yourPlayerId]
        console.log(players[yourPlayerId], "has", numDice, " dice")
        Rune.actions.rollDice({ nextIndex: nextIndex, numDice: numDice})
    }

    const handleEndTurn = () => {
        const nextIndex = (game.currentPlayerIndex + 1) % Object.key(players).length;
        Rune.actions.nextPlayer({ nextIndex: nextIndex})
    }


    // const Controls: React.FC<ControlProps> = ({game: game, yourPlayerId: yourPlayerId, players:players}) => {
    //     const handleRollDice = () => {
    //         const nextIndex = (game.currentPlayerIndex + 1) % Object.keys(players).length;
    //         const numDice = game.diceCount[yourPlayerId]
    //         console.log(players[yourPlayerId], "has", numDice, " dice")
    //         Rune.actions.rollDice({ nextIndex: nextIndex, numDice: numDice})
    //     }
    
    //     const handleEndTurn = () => {
    
    //        Rune.actions.nextPlayer
    //     }


    return (
        <div>

            <div className='roll-dice-button-container'>
                <div className="bottom-row grid-item">{yourPlayerId ? (
                    <>

                        {/*First player action is to roll*/}
                        {/*Roll dice shows for current player when game.playerToRoll = true*/}
                        {/*after roll game.playerPlaying becomes true, playerToRoll becomes false and "End Turn" button appears*/}
                        {/*when End Turn is pressed, next player is called, playerToRoll = true and PlayerPlaying = false and */}
                        {/*Roll button appears*/}
                        {(game.currentPlayerIndex===Object.keys(players).indexOf(yourPlayerId)) &&
                            <div>
                                <motion.button className='handleRoll-button' whileHover={{ scale: 1.1 }}
                                               whileTap={{ scale: 0.9 }} onClick={()=>{handleRollDice()}}>{players[yourPlayerId].displayName}, Roll!</motion.button>
                            </div>
                        }

                        {(game.currentPlayerIndex===Object.keys(players).indexOf(yourPlayerId)) &&
                            <div>
                                <motion.button className='handleEndTurn-button' whileHover={{ scale: 1.1 }}
                                               whileTap={{ scale: 0.9 }} onClick={()=>{handleEndTurn()}}>End Turn</motion.button>
                            </div>
                        }

                    </>
                ) : (
                    <>I am a spectator, so I don't have count</>
                )}</div>

            </div>
        </div>
    );
}

export default Controls;