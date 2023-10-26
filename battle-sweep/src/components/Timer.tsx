import React, {  useEffect } from "react";
import { GameState } from "../helper/Types.ts"
import "./Timer.css"
import explosionGif from "../assets/Explosions/fire_ball_side_medium/fireball_side_medium_explode.gif"

interface TimerProps {
  game: GameState;

}

function Timer({ game }: TimerProps) {

  useEffect(() => {
    if (game.onBoardTimer == 0) {
      Rune.actions.swap()
    }
  }, [game])

  return (
    game.onBoardTimer > 0 ? 
      <div className={game.onBoardTimer <= 5 ? "timer-red-bold" : "timer"}>
        Timer: {game.onBoardTimer} second(s)
      </div> : 
      <div>
          <b>Popup Alert here, "onboarding timer up" begin playing in 3...2...1...</b>

        {/*<img src={explosionGif} alt="exploding fireball"/>*/}
        {/*<p>Game Over</p>*/}
      </div>
  );
}

export default Timer;
