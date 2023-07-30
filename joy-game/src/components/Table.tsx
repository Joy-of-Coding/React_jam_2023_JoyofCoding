
// import { motion } from "framer-motion";
import Dice from "./Dice.tsx";

import { GameState } from "../logic.ts";

import "./Table.css"
import { motion } from "framer-motion";

interface TableProps {
  game: GameState;
  playerId: string | undefined;
  playerIds: (string | undefined)[];
  yourPlayerId: string | undefined;
  previousPlayerId: string | undefined;
}


const Table: React.FC<TableProps> = ({ game, playerId, playerIds }) => {
  const currentPlayerId = playerIds.indexOf(playerId);

  
  const handleDiceClick = (faceValue: number, playerId: string | undefined, i: number, playerIds: (string | undefined)[]) => {
      //Trying to disable clicks by player
      
      if (game.currentPlayerIndex !== playerIds.indexOf(playerId)) {
        
          return
      }
       

        if (faceValue === 5 ) {
            Rune.actions.updateDiceCount({playerId: playerId, amount: -1})
            Rune.actions.adjustGameDice({index: i})
        }

        //Created individual if statements as they are not exclusive
        if (faceValue === 6){
            const nextPlayerId = playerIds[(currentPlayerId + 1) % Object.keys(playerIds).length];
           // console.log(playerId)
           // console.log([nextPlayerId])
           
            // window.navigator.vibrate([100]);
            Rune.actions.updateDiceCount({playerId: nextPlayerId, amount: 1})
            Rune.actions.updateDiceCount({playerId: playerId, amount: -1})
            Rune.actions.adjustGameDice({index: i})
        }

    }



    return (


        <div className='middle-section'>
          <div  className='dice-container'>
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


