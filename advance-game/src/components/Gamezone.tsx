//import React from "react";
import './GameZone.css'
//import { GameState } from "../logic.ts"
//import { motion } from "framer-motion"
import React, { useState } from "react";

//import skeletonImage from "../assets/skeleton-00_run_00.png";

// we need to configure the ground to gravity and combine characters for opposition, Punch

interface GameZoneProps {
  x: number;
  y: number;
  onMoveForward: () => void;
  onMoveBackward: () => void;
  onJump: () => void;
}



const GameZone: React.FC<GameZoneProps> = ({
  x,
  y,
  onMoveForward,
  onMoveBackward,
  onJump,
}) => {
  return (
    <div>



      {/* <button onClick={onMoveForward}>Fight</button>
      <button onClick={onMoveBackward}>Dodge</button>
      <br />
      <button onClick={onJump}>Jump</button>
      <br />
      <b>Player Position: ({x}, {y})</b>
    </div> */}
    <div 
        className="player"
        style={{ left: `${x}px`, top: `${y}px` }}
      ></div>

      <button onClick={onMoveForward}>Fight</button>
      <button onClick={onMoveBackward}>Dodge</button>
      <br />
      <button onClick={onJump}>Jump</button>
      <br />
      <b>Player Position: ({x}, {y})</b>
    </div>
  );
};

function App() {
  const [game, setGame] = useState({
    x: 50,
    y: 0,
  });

  const handleMoveForward = () => {
    setGame((prevGame) => {
      const newX = prevGame.x + 10;
      console.log("New X position:", newX);
      return { ...prevGame, x: newX };
    });
  };

  const handleMoveBackward = () => {
    setGame((prevGame) => {
      const newX = prevGame.x - 10;
      console.log("New X position:", newX);
      return {...prevGame, x: newX };
      //return { ...prevGame, x: prevGame.x - 1 };
    });
  };

  const GRAVITY = 1;
  const MAX_JUMP_HEIGHT = 200;
  const GROUND_LEVEL = 0;

  const handleJump = () => {
    setGame((prevGame) => {
      const newY = prevGame.y - 50;
      return { ...prevGame, y: newY < MAX_JUMP_HEIGHT ? newY : MAX_JUMP_HEIGHT };
    });

    // Simulate gravity by updating y position in intervals of space to ground
    const fallInterval = setInterval(() => {
      setGame((prevGame) => {
        const newY = prevGame.y + GRAVITY;
        return { ...prevGame, y: newY > GROUND_LEVEL ? newY : GROUND_LEVEL };
      });
    }, 50); // Adjust the interval for desired fall speed

    // Stop the falling effect after a certain time
    setTimeout(() => {
      clearInterval(fallInterval);
    }, 1000); // Adjust the time for how long you want the character to fall
  };


  return (
    <div>

      <GameZone
        x={game.x}
        y={game.y}
        onMoveForward={handleMoveForward}
        onMoveBackward={handleMoveBackward}
        onJump={handleJump}
      />
    </div>
  );
}






export default App;

{/* //grid layout start by ChatGPT
//typescript editing Chat GPT
// Image by <a href="https://www.freepik.com/free-vector/top-view-modern-restaurant-table-with-flat-design_2847028.htm#query=dining%20table%20top%20view&position=9&from_view=keyword&track=ais">Freepik</a> */}
{/* <a href="https://www.freepik.com/free-photo/faded-gray-wooden-textured-flooring-background_16246476.htm#page=2&query=flooring&position=8&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik */}
{/* <a href="https://www.freepik.com/free-vector/oak-wood-textured-design-background_16339756.htm#page=2&query=flooring&position=31&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik */}