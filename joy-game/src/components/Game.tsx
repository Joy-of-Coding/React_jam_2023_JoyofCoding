// src/App.tsx
import React, {useState} from 'react';
import Player from './Player';
import "../App.css"

const Game: React.FC = () => {
    const [players, setPlayers] = useState([
        {
            id: 0,
            name: 'Rockin Emily',
            dicePool: [4, 4, 4], // Initial dice pool with 3 dice having value 4
        },
        {
            id: 1,
            name: 'Dynamite Dana',
            dicePool: [6, 6, 6], // Initial dice pool with 3 dice having value 6
        },
    ]);

    const [currentPlayerId, setCurrentPlayerId] = useState(0)

    const handleRollDice = (playerIndex: number) => {
        const newPlayers = [...players];
        const dicePool = newPlayers[playerIndex].dicePool.map(() => Math.floor(Math.random() * 6) + 1);
        newPlayers[playerIndex].dicePool = dicePool;
        setPlayers(newPlayers);

        //move to next player
        handleNextPlayer(playerIndex)
    };

    const handleAddDice = (playerIndex: number) => {
        const newPlayers = [...players];
        newPlayers[playerIndex].dicePool.push(6); // You can add a die with a specific value
        setPlayers(newPlayers);

        //move to next player
        handleNextPlayer(playerIndex)
    };

    const handleRemoveDice = (playerIndex: number) => {
        const newPlayers = [...players];
        newPlayers[playerIndex].dicePool.pop(); // Remove the last die from the pool
        setPlayers(newPlayers);

        //move to next player
        handleNextPlayer(playerIndex)
    };

    //filter player array by current player's ID
    const selectedPlayer = players.filter((player) => player.id === currentPlayerId)

    //get next player
    const handleNextPlayer = (playerIndex: number) => {
        //increment by one unless it's the last player
        //modulus operater wraps around to 0 after the last player
        const nextPlayer = (playerIndex + 1) % players.length;
        setCurrentPlayerId(nextPlayer);
    }

    return (
        <div className="app">
            {players.map((player) => (
                <Player key={player.id}  {...player}  />
            ))}


            <div className="controls">
                <div>
                    <h3>{selectedPlayer.length > 0 ? selectedPlayer[0].name : ''}'s Turn</h3>
                </div>
                <div key={currentPlayerId}>
                    <button onClick={() => handleRollDice(currentPlayerId)}>Roll Dice</button>
                    <button onClick={() => handleAddDice(currentPlayerId)}>Add Dice</button>
                    <button onClick={() => handleRemoveDice(currentPlayerId)}>Remove Dice</button>
                </div>
            </div>
        </div>
    );
};

export default Game;
