// src/App.tsx
import React, {useEffect, useState} from 'react';
import Player from './Player';
import "../App.css"

const Game: React.FC = () => {
    const [players, setPlayers] = useState([
        {
            id: 0,
            name: 'Rockin Emily',
            dicePool: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4], // Initial dice pool with 10 dice having all values
        },
        {
            id: 1,
            name: 'Dynamite Dana',
            dicePool: [6, 5, 4], // Initial dice pool with 3 dice having value 6 - 4
        },
    ]);
    const [currentPlayerId, setCurrentPlayerId] = useState(0)
    const [sixesToGive, setSixesToGive] = useState<number[]>([])

    const handleRollDice = (playerIndex: number) => {
        const newPlayers = [...players];
        const dicePool = newPlayers[playerIndex].dicePool.map(() => Math.floor(Math.random() * 6) + 1);
        newPlayers[playerIndex].dicePool = dicePool;
        setPlayers(newPlayers);

        //check for "6s" to give away
        checkForSixes(dicePool)

    };

    //move to next player each time sixes to give is reset to 0
    useEffect(() => {
        if (sixesToGive.length === 0) {
            handleNextPlayer(currentPlayerId)
        }

    },[sixesToGive])

    // const handleAddDice = (playerIndex: number) => {
    //     const newPlayers = [...players];
    //     newPlayers[playerIndex].dicePool.push(6); // You can add a die with a specific value
    //     setPlayers(newPlayers);
    //
    //     //move to next player
    //     handleNextPlayer(playerIndex)
    // };
    //
    // const handleRemoveDice = (playerIndex: number) => {
    //     const newPlayers = [...players];
    //     newPlayers[playerIndex].dicePool.pop(); // Remove the last die from the pool
    //     setPlayers(newPlayers);
    //
    //     //move to next player
    //     handleNextPlayer(playerIndex)
    // };


    //get next player
    const handleNextPlayer = (playerIndex: number) => {
        //increment by one unless it's the last player
        //modulus operater wraps around to 0 after the last player
        const nextPlayer = (playerIndex + 1) % players.length;
        setCurrentPlayerId(nextPlayer);
    }

    const checkForSixes = (dicePool: number[]) => {
        const indicesOfSixes:number[] = [];
        dicePool.forEach((element, index) => {
            if (element === 6) {
                indicesOfSixes.push(index);
            }
        });

        //Can comment this out, just fun to verify it's working
        if (indicesOfSixes.length > 0) {
            console.log("The array contains one or more occurrences of 6.");
            console.log("Indices of 6s:", indicesOfSixes);
        } else {
            console.log("The array does not contain 6.");
        }

        setSixesToGive(indicesOfSixes)
    }


    //Pass a die from one player to another player
    const handleGiveAwayDice = (diceFrom: number) => {
        //get other player's Id. strategy is the same as "next player" function, and rolls to the next player
        //we will want to add the ability to "choose" later
        const diceTo = (diceFrom + 1) % players.length

        //create copies of each dicePool
        const newDicePoolPlayerFrom = players[diceFrom].dicePool.slice() //create copy
        const newDicePoolPlayerTo = players[diceTo].dicePool.slice() //create copy

        // Log the initial values
        console.log("newDicePoolPlayerFrom:", newDicePoolPlayerFrom);
        console.log("newDicePoolPlayerTo:", newDicePoolPlayerTo);
        console.log("sixesToGive:", sixesToGive);


        //remove dice for each position in 'sixesToGive' array
        //and add dice to diceTO player using push
        for (let i = sixesToGive.length - 1; i >= 0; i--) {
            const die = sixesToGive[i];
            const removedDie = newDicePoolPlayerFrom.splice(die, 1)[0];
            console.log("removedDie:", removedDie);
            newDicePoolPlayerTo.push(removedDie);
        }

        // Log the final values
        console.log("newDicePoolPlayerFrom after splicing:", newDicePoolPlayerFrom);
        console.log("newDicePoolPlayerTo after pushing:", newDicePoolPlayerTo);

        //update players state with new Dice Pools
        const newPlayers = [...players]  //create copy of players
        newPlayers[diceFrom] = { ...newPlayers[diceFrom], dicePool: newDicePoolPlayerFrom}
        newPlayers[diceTo] =  { ...newPlayers[diceTo], dicePool: newDicePoolPlayerTo}

        //Update player state from the new updated arrays
        setPlayers(newPlayers)

        //reset sixes to give array & move to next player
        setSixesToGive([])
        // handleNextPlayer(currentPlayerId)

    }


    //filter player array by current player's ID
    const selectedPlayer = players.filter((player) => player.id === currentPlayerId)


    return (
        <div className="app">


                <h3>{selectedPlayer.length > 0 ? selectedPlayer[0].name : ''}'s Turn</h3>
            <div className='player-container'>
            {players.map((player) => (
                <Player key={player.id}  {...player}  />
            ))}

            </div>
            

            <div className="controls">

                <div key={currentPlayerId}>
                    <button onClick={() => handleRollDice(currentPlayerId)}>Roll Dice</button>
                    {/*<button onClick={() => handleAddDice(currentPlayerId)}>Add Dice</button>*/}
                    {/*<button onClick={() => handleRemoveDice(currentPlayerId)}>Remove Dice</button>*/}
                </div>
                {(sixesToGive.length>0) && <div>
                    <button onClick={() => handleGiveAwayDice(currentPlayerId)}>Give Away Your 6s?</button>
                </div>}
            </div>
        </div>
    );
};

export default Game;
