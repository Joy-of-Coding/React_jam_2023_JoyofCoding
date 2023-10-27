import { GameState } from "../helper/Types.ts";
import "./OnboardTimer.css";
import {dangerTime} from "../logic.ts";
interface TimerProps {
  game: GameState;
}

function OnboardTimer({ game }: TimerProps) {
  return (
    <>
        { !game.onboarding && game.gameTimer > 0 &&
      <div className={game.gameTimer <= dangerTime ? "timer-red-bold" : "timer"}>
        Timer: {game.gameTimer} second(s)
      </div>
        }
    </>
  );
}

export default OnboardTimer;
