import { GameState } from "../helper/Types.ts";
import "./Timer.css";

interface TimerProps {
  game: GameState;
}

function Timer({ game }: TimerProps) {
  return (
    <>
      {game.gameTimer > -1 ? (
        <div className={game.gameTimer <= 9 ? "timer-red-bold" : "timer"}>
          Timer: {game.gameTimer} second(s)
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Timer;
