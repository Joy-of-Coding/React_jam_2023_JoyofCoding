import {motion} from "framer-motion";
import Dice from "./Dice.tsx";
import React from "react";
import {GameState} from "../logic.ts";
import "./Table.css"

interface TableProps {
    game: GameState,
    playerId: string

}
const Table:React.FC<TableProps> = ({game, playerId}) => {

    const handleDiceClick = (faceValue, playerId, i) => {
        if (faceValue === 5 ) {
            //pop balloons
            console.log("pop")
            Rune.actions.updateDiceCount({playerId: playerId, amount: -1})
            Rune.actions.adjustGameDice({index: i})
        }

    }

   return (
    <div className='middle-section'>





        <div className='dice-container'>


            {game.gameDice.map((die, i )=>(
                <motion.button transition={{ duration: 1.3 }} animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],

                }}
                               onClick={()=>handleDiceClick(die, playerId, i)}
                               className='dice-button' key={i} ><Dice faceValue={die} /></motion.button>))}
        </div>




    </div>
);
}

export default Table;