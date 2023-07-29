import {motion} from "framer-motion";
import React from "react";
import { GameState } from "../logic.ts"


//count challenge dice


interface ControlProps {
    game: GameState,
    players: Record<string, { playerId: string, displayName: string, avatarUrl: string }>,
    yourPlayerId: string
}
const Controls: React.FC<ControlProps> = ({
      game: game,
      yourPlayerId: yourPlayerId,
      players:players}) => {

    const handleRollDice = () => {
        const numDice = game.diceCount[yourPlayerId]
        Rune.actions.rollDice({  numDice: numDice})
        //Check for challenge & resolution

           //there is a challenge in play
           //check for number of challenges rolled
           //
           //if challenge dice < challenge count
           // -- current player gets the difference in dice
           // if challenge dice > challenge count
           // --


       }

    const handleEndTurn = () => {
        const nextIndex = (game.currentPlayerIndex + 1) % Object.keys(players).length;
        Rune.actions.nextPlayer({ nextIndex: nextIndex})
    }




    return (
        <div className='roll-dice-button-container'>

           
                <div className="button-container">{yourPlayerId ? (
                    <>

                        {/*First player action is to roll*/}
                        {/*Roll dice shows for current player when game.playerToRoll = true*/}
                        {/*after roll game.playerPlaying becomes true, playerToRoll becomes false and "End Turn" button appears*/}
                        {/*when End Turn is pressed, next player is called, playerToRoll = true and PlayerPlaying = false and */}
                        {/*Roll button appears*/}

                        {/*Roll Button*/}
                        {game.playerToRoll && <div>
                            {(game.currentPlayerIndex===Object.keys(players).indexOf(yourPlayerId)) &&
                                <div>
                                    <motion.button className='handleRoll-button button-green' whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }} onClick={()=>{handleRollDice()}}>{players[yourPlayerId].displayName}, Roll!</motion.button>
                                </div>
                            }
                        </div>}

                        {/*End Turn Button*/}
                        {game.playerPlaying && <div>
                            {(game.currentPlayerIndex===Object.keys(players).indexOf(yourPlayerId)) &&
                                <div>
                                    <motion.button className='handleEndTurn-button button-red' whileHover={{ scale: 1.1 }}
                                                   whileTap={{ scale: 0.9 }} onClick={()=>{handleEndTurn()}}>End Turn</motion.button>
                                </div>
                            }
                        </div>}

                    </>
                ) : (
                    <>I am a spectator, so I don't have count</>
                )}</div>

        </div>
        
    );
}

export default Controls;