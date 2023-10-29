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

const Player = ({ players, playerId, display, game }: PlayerProps) => {
  return (
    <div>
      {display ? (
        <>
          <h3>Capture the Crabs</h3>
          <img className="avatar" src={players[playerId].avatarUrl} alt="" />
          <h3>{game.onboarding ? "Opponent's Board" : "Find and TRAP all Crabs!"}</h3>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Player;
