import { GameState } from "../helper/Types.ts";
import "./OnboardTimer.css";
import {dangerTime} from "../logic.ts";
interface TimerProps {
  game: GameState;
}

function OnboardTimer({ game }: TimerProps) {
  return (
    <>
        {  game.onBoardTimer >0 &&
      <div className={game.onBoardTimer <= dangerTime ? "timer-red-bold" : "timer"}>
        Timer: {game.onBoardTimer} second(s)
      </div>
        }
    </>
  );
}

export default OnboardTimer;
