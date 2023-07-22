import React from 'react';

interface DiceProps {
  faceValue: number;
}

const Dice: React.FC<DiceProps> = ({ faceValue }) => {
  return <div className="dice">{faceValue}</div>;
};

export default Dice;

// file composed by chatgpt; inserted by euphina