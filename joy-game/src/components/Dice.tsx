import React from 'react';
import {motion} from "framer-motion";

import "./Dice.css"
import dice1 from "../assets/pngs/dice1.png"
import dice2 from "../assets/pngs/dice2.png"
import dice3 from "../assets/pngs/dice3.png"
import dice4 from "../assets/pngs/dice4.png"
import dice5 from "../assets/pngs/dice5.png"
import dice6 from "../assets/pngs/dice6.png"


interface DiceProps {
  faceValue: number;
}

const Dice: React.FC<DiceProps> = ({ faceValue }) => {

  const dices = [dice1,dice2,dice3,dice4,dice5,dice6]


  return (
    <>

        <motion.div  transition={{ duration: 1.3 }} animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],

        }} key={faceValue} className='img-container'> <img  src={dices[faceValue-1]}></img></motion.div>
        
      
      
    </>
  )
};

export default Dice;

// file composed by chatgpt; inserted by euphina