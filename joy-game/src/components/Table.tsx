
// import { motion } from "framer-motion";
import Dice from "./Dice.tsx";

import { GameState } from "../logic.ts";
import pop from  "../assets/sounds/pop.mp3"
import "./Table.css"
import { motion } from "framer-motion";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;
import {useState} from "react";
import SelectPlayer from "./SelectPlayer.tsx";

interface TableProps {
  game: GameState;
  playerId: string | undefined;
  playerIds: (string | undefined)[];
  yourPlayerId: string | undefined;
  previousPlayerId: string | undefined;
}


const Table: React.FC<TableProps> = ({ game, playerId, playerIds }) => {
    const [showSelectPlayer, setShowSelectPlayer] = useState(false)
    const [playerSelected, setPlayerSelected] = useState(false)

    const giveGifts = ({i}) => {
        const randomGift = Math.floor((Math.random() * 4)-1)
        const nextPlayerId = playerIds[(currentPlayerId + 1) % Object.keys(playerIds).length];
        Rune.actions.updateDiceCount({playerId: nextPlayerId, amount: randomGift})
        Rune.actions.updateDiceCount({playerId: playerId, amount: -1})
        Rune.actions.adjustGameDice({index: i})
    }

  const currentPlayerId = playerIds.indexOf(playerId);
    const nextPlayerId = playerIds[(currentPlayerId + 1) % Object.keys(playerIds).length];
    const handleDiceClick = (faceValue: number, playerId: string | undefined, i: number, playerIds: (string | undefined)[]) => {

    // useEffect(()=>{}, [playerSelected])
      //Trying to disable clicks by player
    
      if (game.currentPlayerIndex !== playerIds.indexOf(playerId)) {
          return
      }

          //Created individual if statements as they are not exclusive

        if (faceValue === 5 ) {  //balloons
            Rune.actions.updateDiceCount({playerId: playerId, amount: -1})
            Rune.actions.adjustGameDice({index: i})
            
            let popAudio = new Audio(pop)
            popAudio.play()
        }

        //Created individual if statements as they are not exclusive
        if (faceValue === 6){  //gifts
            setShowSelectPlayer(true)
            console.log("Show select player?", showSelectPlayer)
             giveGifts({i})
            // const randomGift = Math.floor((Math.random() * 4)-1)
            // const nextPlayerId = playerIds[(currentPlayerId + 1) % Object.keys(playerIds).length];
            // Rune.actions.updateDiceCount({playerId: nextPlayerId, amount: randomGift})
            // Rune.actions.updateDiceCount({playerId: playerId, amount: -1})
            // Rune.actions.adjustGameDice({index: i})
        }

      //Cake goes forwards & backwards
      if (faceValue === 2){  //cake


          if (game.previousPlayerIndex===null ) {
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

              {showSelectPlayer && <SelectPlayer closePopup={() => setShowSelectPlayer(false)} />}

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


