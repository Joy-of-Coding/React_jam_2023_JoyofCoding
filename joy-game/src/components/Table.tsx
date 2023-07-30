
// import { motion } from "framer-motion";
import Dice from "./Dice.tsx";

import { GameState } from "../logic.ts";
import pop from  "../assets/sounds/pop.mp3"
import "./Table.css"
import { motion } from "framer-motion";

import {useState} from "react";
import SelectPlayer from "./SelectPlayer.tsx";


interface TableProps {
  game: GameState;
  playerId: string | undefined;
  playerIds: (string | undefined)[];
  yourPlayerId: string | undefined;
  previousPlayerId: string | undefined;
  players: Record<string, { playerId: string, displayName: string, avatarUrl: string }>,
}


const Table: React.FC<TableProps> = ({ game, playerId, playerIds, yourPlayerId, previousPlayerId, players }) => {
    const [showSelectPlayer, setShowSelectPlayer] = useState(false)

  const currentPlayerId = playerIds.indexOf(playerId);
    const nextPlayerId = playerIds[(currentPlayerId + 1) % Object.keys(playerIds).length];
    const handleDiceClick = (faceValue: number, playerId: string | undefined, i: number, playerIds: (string | undefined)[]) => {

        Rune.actions.setSelectedDieIndex({dieIndex: i})


      //Trying to disable clicks by player
        //this may be fully moved into logic.ts, havn't tested it yet so leave this check in place for now
    
      if (game.currentPlayerIndex !== playerIds.indexOf(playerId)) {
          return
      }


        if (faceValue === 5 ) {  //balloons
            const popAudio = new Audio(pop)
            popAudio.play()
            Rune.actions.popBalloons({playerId: playerId, dieIndex: i})


        }


        if (faceValue === 6){  //gifts
            setShowSelectPlayer(true)
        }

      //Cake goes forwards & backwards
      if (faceValue === 2){  //cake


          if (game.previousPlayerIndex===-1 ) {
              const previousPlayerIndex = game.currentPlayerIndex === 0 ? playerIds.length - 1 : game.currentPlayerIndex - 1;
              Rune.actions.updateDiceCount({playerId: playerIds[previousPlayerIndex] , amount: 1})
          } else {
              Rune.actions.updateDiceCount({playerId: playerIds[game.previousPlayerIndex], amount: 1})
          }

          Rune.actions.updateDiceCount({playerId: nextPlayerId, amount: 1})
          Rune.actions.updateDiceCount({playerId: playerId, amount: -1})
          Rune.actions.adjustGameDice({index: i})
      }

    }



    return (


        <div className='middle-section'>
          <div  className='dice-container'>

              {showSelectPlayer &&
                  <SelectPlayer
                      selectedDieIndex= {game.selectedDieIndex}
                      yourPlayerId= {yourPlayerId}
                      players={players}
                      playerIds={playerIds}
                      closePopup={() => setShowSelectPlayer(false)}
                  />}

            {game.gameDice.map((die, i) => (
                //moved motion animation inside dice component, cleans up code and functions the same
                
                <motion.button
                
                initial={{opacity:0,rotate:0}} animate={{opacity:1,rotate:360,}} transition={{duration:.3,delay:i * 0.3}}
                
                onClick={() => handleDiceClick(die, playerId, i, playerIds)}
                className='dice-button'
                key={i}
              > 
               
                <Dice faceValue={die} />
              
                </motion.button>

            ))}
          </div>
        </div>
      );
    }
    
    export default Table;


