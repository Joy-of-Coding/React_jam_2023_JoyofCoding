import "./Player.css";
import { GameState } from "../helper/Types";

interface PlayerProps {
  players: Record<
    string,
    { playerId: string; displayName: string; avatarUrl: string }
  >;
  playerId: string;
  display: boolean;
  game: GameState;
}

const Player = ({ display, game }: PlayerProps) => {
  return (
    <div>
      {display &&
          <h4>{game.onboarding ? "Opponent's Board" : "Clear the Board!"}</h4>
        }
    </div>
  );
};

export default Player;
