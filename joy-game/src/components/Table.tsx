
// import { motion } from "framer-motion";
import Dice from "./Dice.tsx";
import React from "react";
import { GameState } from "../logic.ts";
import "./Table.css"

interface TableProps {
  game: GameState;
  playerId: string | undefined;
  playerIds: (string | undefined)[];
  yourPlayerId: string | undefined;
  previousPlayerId: string | undefined;
}

const Table: React.FC<TableProps> = ({
         game,
         playerId,
         playerIds,
         previousPlayerId
}) => {

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
            //Create Challenge
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
                if (game.diceHistogram[1]===0) {
                    Rune.actions.updateChallengeStatus({status: true})
                }
            } else if (game.challengeStatus === true )
                //Challenge is taking place, resolve challenge dice appropriately
                //Depending on whether there are any challenge dice remaining
                 if (game.challengeCounter>0) {
                     //part 2 defending logic goes here
                     //players swap dice counts
                     Rune.actions.updateDiceCount({playerId: playerId, amount: -1})
                     Rune.actions.updateDiceCount({playerId: previousPlayerId, amount: 1})

                     //Decrease challenge count
                     Rune.actions.updateChallengeCount({amount: -1})

                     //Update game board
                     Rune.actions.adjustGameDice({index: i})
                 } else if (game.challengeCounter===0) {
                    //additional challenge dice go to previous player and challenge counter remains zero
                     //Swap dice
                     Rune.actions.updateDiceCount({playerId: playerId, amount: -1})
                     Rune.actions.updateDiceCount({playerId: previousPlayerId, amount: 1})

                     //update game board
                     Rune.actions.adjustGameDice({index: i})

                }
                 //if this was the last challenge dice, turn challenge off
                Rune.actions.updateDiceHistogram({})
                if (game.diceHistogram[1]===0) {
                    Rune.actions.updateChallengeStatus({status: false})
                }

            }

            console.log("Challenge Dice:", game.challengeCounter)
            console.log("Challenge Status:", game.challengeStatus)
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