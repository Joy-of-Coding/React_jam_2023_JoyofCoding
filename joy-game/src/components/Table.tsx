import {motion} from "framer-motion";
import Dice from "./Dice.tsx";
import React from "react";
import {GameState} from "../logic.ts";
import "./Table.css"

interface TableProps {
    game: GameState,

}
const Table:React.FC<TableProps> = ({game}) => (

    <div className='middle-section'>

        {/*<div className='player-name'>*/}
            {/* I suggest commenting this line out */}
            {/* will improve clarity, but this may change with ongoing UI updates*/}
            {/*{`${players[playerIds[game.currentPlayerIndex]].displayName}'s Turn`}*/}
            {/*<b>Most recent roll...</b>*/}
        {/*</div>*/}


       

        <div className='dice-container'>

            
            
            
            {game.gameDice.map((die, i )=>(
                <motion.button transition={{ duration: 1.3 }} animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],

                }}
                               className='dice-button' key={i} ><Dice faceValue={die} /></motion.button>))}
        </div>


        

    </div>
);

export default Table;