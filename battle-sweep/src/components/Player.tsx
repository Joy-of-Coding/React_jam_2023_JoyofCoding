import "./Player.css";
import { GameState } from "../logic.ts";

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
          <h3>Battle Sweeper</h3>
          <img className="avatar" src={players[playerId].avatarUrl} alt="" />
          <h3>
            {game.onboarding
              ? players[playerId].displayName
              : "Opponents Board"}
            's Board
          </h3>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Player;
