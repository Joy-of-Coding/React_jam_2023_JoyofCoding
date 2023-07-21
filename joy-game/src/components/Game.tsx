// src/App.tsx
import React, { useState } from 'react';
import Player from './Player';
import "../App.css"

const Game: React.FC = () => {
  const [players, setPlayers] = useState([
    {
      name: 'Player 1',
      dicePool: [4, 4, 4], // Initial dice pool with 3 dice having value 4
    },
    {
      name: 'Player 2',
      dicePool: [6, 6, 6], // Initial dice pool with 3 dice having value 6
    },
  ]);

  const handleRollDice = (playerIndex: number) => {
    const newPlayers = [...players];
    const dicePool = newPlayers[playerIndex].dicePool.map(() => Math.floor(Math.random() * 6) + 1);
    newPlayers[playerIndex].dicePool = dicePool;
    setPlayers(newPlayers);
  };

  const handleAddDice = (playerIndex: number) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].dicePool.push(6); // You can add a die with a specific value
    setPlayers(newPlayers);
  };

  const handleRemoveDice = (playerIndex: number) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].dicePool.pop(); // Remove the last die from the pool
    setPlayers(newPlayers);
  };

  return (
    <div className="app">
      {players.map((player, index) => (
        <Player key={index} name={player.name} dicePool={player.dicePool} />
      ))}
      <div className="controls">
        {players.map((_, index) => (
          <div key={index}>
            <button onClick={() => handleRollDice(index)}>Roll Dice</button>
            <button onClick={() => handleAddDice(index)}>Add Dice</button>
            <button onClick={() => handleRemoveDice(index)}>Remove Dice</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
