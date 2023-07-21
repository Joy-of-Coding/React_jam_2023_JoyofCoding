import React from 'react';
import Dice from './Dice';

interface PlayerProps {
  name: string;
  dicePool: number[];
}

const Player: React.FC<PlayerProps> = ({ name, dicePool }) => {
  return (
    <div className="player">
      <h3>{name}'s Turn</h3>
      <div className="dice-pool">
        {dicePool.map((diceValue, index) => (
          <Dice key={index} value={diceValue} />
        ))}
      </div>
    </div>
  );
};

export default Player;

 // file composed by chatgpt; inserted by euphina