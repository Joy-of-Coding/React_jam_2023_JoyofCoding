// import {motion} from "framer-motion";
// import Dice from "./Dice.tsx";
// import React from "react";
// import {GameState} from "../logic.ts";
// import "./Table.css"

// interface TableProps {
//     game: GameState,
//     playerId: string,
//     playerIds: string[],
//     yourPlayerId: string | undefined

// }
// const Table:React.FC<TableProps> = ({game, playerId, playerIds, yourPlayerId}) => {
//     const currentPlayerId = playerIds.indexOf(playerId)
//     const handleDiceClick = (faceValue: number, playerId: string, i: number, playerIds: string | undefined[]) => {
//         //Trying to disable clicks by player
//         //if (yourPlayerId !== playerId) return
//         // console.log(playerId)

//         if (faceValue === 5 ) {
//             Rune.actions.updateDiceCount({playerId: playerId, amount: -1})
//             Rune.actions.adjustGameDice({index: i})
//         } else if (faceValue === 6){
//             const nextPlayerId = playerIds[(currentPlayerId + 1) % Object.keys(playerIds).length];
//            // console.log(playerId)
//            // console.log([nextPlayerId])
//             Rune.actions.updateDiceCount({playerId: nextPlayerId, amount: 1})
//             Rune.actions.updateDiceCount({playerId: playerId, amount: -1})
//             Rune.actions.adjustGameDice({index: i})
//         }

//     }

//    return (
//     <div className='middle-section'>





//         <div className='dice-container'>



//                 {game.gameDice.map((die, i )=>(
//                     <motion.button transition={{ duration: 1.3 }} animate={{
//                         scale: [1, 2, 2, 1, 1],
//                         rotate: [0, 0, 270, 270, 0],

//                     }}
//                                    onClick={()=>handleDiceClick(die, playerId, i, playerIds)}
//                                    className='dice-button' key={i} ><Dice faceValue={die} /></motion.button>))}



//         </div>




//     </div>
// );
// }

// export default Table;


// import { motion } from "framer-motion";
import Dice from "./Dice.tsx";
import React, {useState} from "react";
import { GameState } from "../logic.ts";
import "./Table.css"

interface TableProps {
  game: GameState;
  playerId: string | undefined;
  playerIds: (string | undefined)[];
  yourPlayerId: string | undefined;
}

const Table: React.FC<TableProps> = ({ game, playerId, playerIds }) => {
  // const [diceCount, setDiceCount] => useState()


  const currentPlayerId = playerIds.indexOf(playerId);

  const handleDiceClick = (faceValue: number, playerId: string | undefined, i: number, playerIds: (string | undefined)[]) => {
      //Trying to disable clicks by player
      if (game.currentPlayerIndex !== playerIds.indexOf(playerId)) {
          return
      }


      //Created individual if statements as they are not exclusive
      if (faceValue === 5 ) {
            Rune.actions.updateDiceCount({playerId: playerId, amount: -1})
            Rune.actions.adjustGameDice({index: i})
        }

        //Created individual if statements as they are not exclusive
        if (faceValue === 6){
            const nextPlayerId = playerIds[(currentPlayerId + 1) % Object.keys(playerIds).length];
           // console.log(playerId)
           // console.log([nextPlayerId])
            Rune.actions.updateDiceCount({playerId: nextPlayerId, amount: 1})
            Rune.actions.updateDiceCount({playerId: playerId, amount: -1})
            Rune.actions.adjustGameDice({index: i})
        }

      //Created individual if statements as they are not exclusive
        if (faceValue===1) {
            if (game.challengeStatus === false) {
                //setup new challenge by adding dice to challenge zone
                Rune.actions.updateChallengeCount({amount: 1})

                //decrement players dice (but can't win game with this action)
                Rune.actions.updateDiceCount({playerId: playerId, amount: -1})

                //remove the challenge dice from game board
                Rune.actions.adjustGameDice({index: i})

                //if there are no more challenge dice, create challenge!
                console.log("Dice Histogram: ", game.diceHistogram)
                Rune.actions.updateDiceHistogram({})
                if (game.diceHistogram[4]===0) {
                    Rune.actions.updateChallengeStatus({status: true})
                }
            }
        }

  }

    return (
        <div className='middle-section'>
          <div className='dice-container'>
            {game.gameDice.map((die, i) => (
                //moved motion animation inside dice component, cleans up code and functions the same
                <button
                onClick={() => handleDiceClick(die, playerId, i, playerIds)}
                className='dice-button'
                key={i}
              >
                <Dice faceValue={die} />

                </button>

            ))}
          </div>
        </div>
      );
    }
    
    export default Table;