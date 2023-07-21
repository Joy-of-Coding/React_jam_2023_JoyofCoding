import React from 'react';

interface DiceProps {
  value: number;
}

const Dice: React.FC<DiceProps> = ({ value }) => {
  return <div className="dice">{value}</div>;
};

export default Dice;

// file composed by chatgpt; inserted by euphina