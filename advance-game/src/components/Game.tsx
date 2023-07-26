// /*// src/App.tsx
// import React, {useEffect, useState} from 'react';
// import Player from './Player';
// import "../App.css"

// const Game: React.FC = () => {

//     const checkForSixes = (dicePool: number[]) => {
//         const indicesOfSixes:number[] = [];
//         dicePool.forEach((element, index) => {
//             if (element === 6) {
//                 indicesOfSixes.push(index);
//             }
//         });

//         //Can comment this out, just fun to verify it's working
//         if (indicesOfSixes.length > 0) {
//             console.log("The array contains one or more occurrences of 6.");
//             console.log("Indices of 6s:", indicesOfSixes);
//         } else {
//             console.log("The array does not contain 6.");
//         }

//         setSixesToGive(indicesOfSixes)
//     }


//     //Pass a die from one player to another player
//     const handleGiveAwayDice = (diceFrom: number) => {
//         //get other player's Id. strategy is the same as "next player" function, and rolls to the next player
//         //we will want to add the ability to "choose" later
//         const diceTo = (diceFrom + 1) % players.length

//         //create copies of each dicePool
//         const newDicePoolPlayerFrom = players[diceFrom].dicePool.slice() //create copy
//         const newDicePoolPlayerTo = players[diceTo].dicePool.slice() //create copy

//         // Log the initial values
//         console.log("newDicePoolPlayerFrom:", newDicePoolPlayerFrom);
//         console.log("newDicePoolPlayerTo:", newDicePoolPlayerTo);
//         console.log("sixesToGive:", sixesToGive);


//         //remove dice for each position in 'sixesToGive' array
//         //and add dice to diceTO player using push
//         for (let i = sixesToGive.length - 1; i >= 0; i--) {
//             const die = sixesToGive[i];
//             const removedDie = newDicePoolPlayerFrom.splice(die, 1)[0];
//             console.log("removedDie:", removedDie);
//             newDicePoolPlayerTo.push(removedDie);
//         }

//         // Log the final values
//         console.log("newDicePoolPlayerFrom after splicing:", newDicePoolPlayerFrom);
//         console.log("newDicePoolPlayerTo after pushing:", newDicePoolPlayerTo);

//         //update players state with new Dice Pools
//         const newPlayers = [...players]  //create copy of players
//         newPlayers[diceFrom] = { ...newPlayers[diceFrom], dicePool: newDicePoolPlayerFrom}
//         newPlayers[diceTo] =  { ...newPlayers[diceTo], dicePool: newDicePoolPlayerTo}

//         //Update player state from the new updated arrays
//         setPlayers(newPlayers)

//         //reset sixes to give array & move to next player
//         setSixesToGive([])
//         // handleNextPlayer(currentPlayerId)

//     }


//     //filter player array by current player's ID
//     const selectedPlayer = players.filter((player) => player.id === currentPlayerId)


//     return (
//         <div className="app">


//                 <h3>{selectedPlayer.length > 0 ? selectedPlayer[0].name : ''}'s Turn</h3>
//             <div className='player-container'>
//             {players.map((player) => (
//                 <Player key={player.id}  {...player}  />
//             ))}

//             </div>
            

//             <div className="controls">

//                 <div key={currentPlayerId}>
//                     <button onClick={() => handleRollDice(currentPlayerId)}>Roll Dice</button>
//                     {/*<button onClick={() => handleAddDice(currentPlayerId)}>Add Dice</button>*/}
//                     {/*<button onClick={() => handleRemoveDice(currentPlayerId)}>Remove Dice</button>*/}
//                 </div>
//                 {(sixesToGive.length>0) && <div>
//                     <button onClick={() => handleGiveAwayDice(currentPlayerId)}>Give Away Your 6s?</button>
//                 </div>}
//             </div>
//         </div>
//     );
// };

// export default Game;
