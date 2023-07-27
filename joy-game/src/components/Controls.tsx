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
        const nextIndex = (game.currentPlayerIndex + 1) % Object.keys(players).length;
        const numDice = game.diceCount[yourPlayerId]
        console.log(players[yourPlayerId], "has", numDice, " dice")
        Rune.actions.rollDice({ nextIndex: nextIndex, numDice: numDice})
    }
    return (
        <div className='roll-dice-button-container'>

           
                <div className="button-container">{yourPlayerId ? (
                    <>

                        {(game.currentPlayerIndex===Object.keys(players).indexOf(yourPlayerId)) &&
                            <div>
                                <motion.button className='handleRoll-button' whileHover={{ scale: 1.1 }}
                                               whileTap={{ scale: 0.9 }} onClick={()=>{handleRollDice()}}>{players[yourPlayerId].displayName}, Roll!</motion.button>
                            </div>
                        }

                    </>
                ) : (
                    <>I am a spectator, so I don't have count</>
                )}</div>

        </div>
        
    );
}

export default Controls;