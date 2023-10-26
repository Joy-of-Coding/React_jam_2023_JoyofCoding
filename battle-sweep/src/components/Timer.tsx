import React, { useState, useEffect } from "react";
import { endGame } from "../logic.ts";
import { GameState } from "../helper/Types.ts"
import "./Timer.css"
import explosionGif from "../assets/Explosions/fire_ball_side_medium/fireball_side_medium_explode.gif"

interface TimerProps {
  game: GameState;
  initialTime: number;
  endGame: (game: GameState) => void; // Add this prop

}

function Timer({ game, initialTime }: TimerProps) {

  useEffect(() => {
    if (game.onBoardTimer == 0) {
      // Action to take on Timer End
    }
  }, [game])

  return (
    game.onBoardTimer > 0 ? 
      <div className={game.onBoardTimer <= 5 ? "timer-red-bold" : "timer"}>
        Timer: {game.onBoardTimer} second(s)
      </div> : 
      <div>
        <img src={explosionGif}/>
        <p>Game Over</p>
      </div>
  );
}

export default Timer;
