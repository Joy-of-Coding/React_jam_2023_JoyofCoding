import React from 'react';
import "./Dice.css"


interface DiceProps {
  faceValue: number;
}

const Dice: React.FC<DiceProps> = ({ faceValue }) => {
  
  return <img className='dices' src={`src/assets/dice${faceValue}.png`} />
};

export default Dice;

// file composed by chatgpt; inserted by euphina


