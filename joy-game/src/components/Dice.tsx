import React from 'react';

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

        <div className='img-container'> <img  src={dices[faceValue-1]}></img></div>
      
      {/* if( {faceValue == 1}){
        <div className='img-container'> <img  src={dice1}></img></div>
      }
      else if({faceValue == 2}){
        <div className='img-container'> <img  src={dice2}></img></div>
      }

      else if({faceValue == }){
        <div className='img-container'> <img  src={dice3}></img></div>
      }

      else if({faceValue == 2}){
        <div className='img-container'> <img  src={dice4}></img></div>
      }

      else if({faceValue == 2}){
        <div className='img-container'> <img  src={dice5}></img></div>
      }

else if({faceValue == 2}){
        <div className='img-container'> <img  src={dice6}></img></div>
      }
      
     */}
    
    </>
  )
};

export default Dice;

// file composed by chatgpt; inserted by euphina