import React from 'react';

import "./Dice.css"


interface DiceProps {
  faceValue: number;
}

const Dice: React.FC<DiceProps> = ({ faceValue }) => {
  return <div className='img-container'> <img  src={`src/assets/pngs/dice${faceValue.toString()}.png`} className="dice"></img></div>;
};

export default Dice;

// file composed by chatgpt; inserted by euphina