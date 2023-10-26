import React, {  useEffect } from "react";
import { GameState } from "../helper/Types.ts"
import "./Timer.css"


interface TimerProps {
  game: GameState;

}

function Timer({ game }: TimerProps) {

  useEffect(() => {
    if (game.onBoardTimer == 0 ) {
      
      Rune.actions.swap()
      
    }
  }, [game])

  if (game.onboarding == true) {return (
    game.onBoardTimer > 1 ? 
      <div className={game.onBoardTimer <= 5 ? "timer-red-bold" : "timer"}>
        Game Starts in: {game.onBoardTimer} second(s)
      </div> : 
      <div>
          <strong><b>Start!</b></strong>

        {/*<img src={explosionGif} alt="exploding fireball"/>*/}
        {/*<p>Game Over</p>*/}
      </div>
  );}
  return <b>Capture Monsters!!!</b>
}

export default Timer;
