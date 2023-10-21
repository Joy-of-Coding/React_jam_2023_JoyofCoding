import React from 'react';
import {motion} from "framer-motion";

import "./Dice.css"
import dice1 from "../assets/pngs/dice1Alt.png"
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
       {faceValue === 5 || faceValue === 4 ? 
        <motion.div animate={{scale:[1,1.2,1]}} transition={{duration:1.7,delay: 0.3, repeat:Infinity}} className='img-container'>
            <img  src={dices[faceValue-1]}></img>
     
          </motion.div> 
          
          :

          faceValue === 6 ?

          <motion.div animate={{rotate:[-30,30,-30]}} transition={{duration:2,delay: 0, repeat:Infinity}} className='img-container'>
            <img  src={dices[faceValue-1]}></img>
          </motion.div> 

          :

          <div className='img-container'>
            <img  src={dices[faceValue-1]}></img>
          </div>

       }
          
        
          
        
        
        





    </>
  )
};

export default Dice;

// file composed by chatgpt; inserted by euphina