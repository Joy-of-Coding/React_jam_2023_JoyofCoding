import React, { useState, useEffect } from "react";
import { endGame } from "../logic.ts";
import { GameState } from "../helper/Types.ts"
import "./Timer.css"

interface TimerProps {
  game: GameState;
  initialTime: number;
  onTimerEnd: () => void;
  playerWin: string; // Add this prop
  playerLose: string; // Add this prop
  endGame: (playerWin: string, playerLose: string) => void; // Add this prop

}

function Timer({ game, initialTime, onTimerEnd, playerWin, playerLose }: TimerProps) {
  const [timer, setTimer] = useState<number>(initialTime);

  // useEffect(() => {
  //   if (timer > 0) {
  //     const interval = setInterval(() => {
  //       setTimer((prevTimer) => {
  //         if (prevTimer > 0) {
  //           return prevTimer - 1;
  //         } else {
  //           clearInterval(interval);
  //           onTimerEnd(); // Call the onTimerEnd function when the timer reaches zero
  //           endGame(playerWin, playerLose); // Call endGame function to end the game
  //           return 0; // Ensure the timer remains at 0
  //         }
  //       });
  //     }, 1000);

  //     // Clean up the timer when the component unmounts or when the timer reaches zero
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   } else {
  //     console.log("Time's Up")
  //   }
  // }, [onTimerEnd, playerLose, playerWin, timer]);

  useEffect(() => {
    if (game.onBoardTimer == 0) {
      Rune.actions.timerEnd()
    }
  }, [game])

  return (
    game.onBoardTimer > 0 ? 
      <div className={game.onBoardTimer <= 5 ? "timer-red-bold" : "timer"}>
        Timer: {game.onBoardTimer} second(s)
      </div> : 
      <p>Game Over</p>
  );
}

export default Timer;
