import { GameState } from "../helper/Types.ts";
import "./Timer.css";

interface TimerProps {
  game: GameState;
}

function Timer({ game }: TimerProps) {
  return (
    <>
      <div className={game.gameTimer <= 5 ? "timer-red-bold" : "timer"}>
        Timer: {game.gameTimer} second(s)
      </div>
    </>
  );
}

export default Timer;
