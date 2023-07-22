import React from 'react';
import Dice from './Dice';
import "./Player.css"

interface PlayerProps {
    id: number;
  name: string;
  dicePool: number[];
}

const Player: React.FC<PlayerProps> = ({ name, dicePool }) => {
  return (
    <div className='player-dices-container'>
      <div className="player">
        <h3>{name}'s Dice</h3>
        <div className="dice-pool">
          {dicePool.map((diceValue, index) => (
            <Dice key={index} faceValue={diceValue} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Player;

 // file composed by chatgpt; inserted by euphina