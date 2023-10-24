import "./Player.css";
import { GameState } from "../logic.ts";
import Header from "./Header.tsx";

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
    <div className="player">
      {display ? (
        <>

          <div>
          <img className="avatar" src={players[playerId].avatarUrl} alt="" />
          <h3>
            {game.onboarding ? players[playerId].displayName : "Opponent"}
            's Board
          </h3>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Player;
