// // 
// import { useEffect, useState } from "react"
// import reactLogo from "./assets/rune.svg"
// import viteLogo from "/vite.svg"
// import "./App.css"
// import { GameState } from "./logic.ts"

// function App() {
//   const [game, setGame] = useState<GameState>()
//   useEffect(() => {
//     Rune.initClient({
//       onChange: ({ newGame }) => {
//         setGame(newGame)
//       },
//     })
//   }, [])

//   if (!game) {
//     return <div>Loading...</div>
//   }

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://developers.rune.ai" target="_blank">
//           <img src={reactLogo} className="logo rune" alt="Rune logo" />
//         </a>
//       </div>
//       <h1>Vite + Rune</h1>
//       <h1>Joy of Coding team</h1>
//       <h2>advance-game</h2>
//       <div className="card">
//         <button onClick={() => Rune.actions.increment({ amount: 1 })}>
//           count is {game.count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> or <code>src/logic.ts</code> and save to
//           test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and Rune logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// Import the necessary libraries and types
import React, { useState } from "react";
import { RuneClient } from "rune-games-sdk/multiplayer";

// Define the GameState and GameActions interfaces to match the game logic
interface GameState {
  x: number;
  y: number;
  gameOver: boolean;
}

type GameActions = {
  moveForward: () => void;
  moveBackward: () => void;
  jump: () => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

// Define the GameZone component to use the game state and actions
const GameZone: React.FC<GameState & GameActions> = ({
  x,
  y,
  gameOver,
  moveForward,
  moveBackward,
  jump,
}) => {
  return (
    <div className="game-zone">
      <div className="player" style={{ left: `${x}px`, top: `${y}px` }}></div>

      <div className="floor"></div>

      <button onClick={moveForward}>Fight</button>
      <button onClick={moveBackward}>Dodge</button>
      <br />
      <button onClick={jump}>Jump</button>
      <br />
      <b>Player Position: ({x}, {y})</b>
      {gameOver && <b>Game Over!</b>}
    </div>
  );
};

// Initialize the game logic using Rune.initLogic
Rune.initLogic({
  // ... (rest of your game logic goes here)
});

// Define the App component
function App() {
  const [game, setGame] = useState<GameState>({
    x: 50,
    y: 0,
    gameOver: false,
  });

  const handleMoveForward = () => {
    // Apply the game logic action to move forward
    Rune.update("moveForward");
  };

  const handleMoveBackward = () => {
    // Apply the game logic action to move backward
    Rune.update("moveBackward");
  };

  const handleJump = () => {
    // Apply the game logic action to jump
    Rune.update("jump");
  };

  // ... (rest of your game state updates and logic go here)

  return (
    <div>
      <GameZone
        x={game.x}
        y={game.y}
        gameOver={game.gameOver}
        moveForward={handleMoveForward}
        moveBackward={handleMoveBackward}
        jump={handleJump}
      />
    </div>
  );
}

export default App;
