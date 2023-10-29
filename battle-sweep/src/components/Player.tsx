import "./Player.css";

interface PlayerProps {
  players: Record<
    string,
    { playerId: string; displayName: string; avatarUrl: string }
  >;
  playerId: string;
}

const Player = ({ players, playerId }: PlayerProps) => {
  return (
    <div>
      {players[playerId] ? (
        <>
          <img
            className="avatar"
            src={players[playerId].avatarUrl}
            alt={players[playerId].displayName}
          />
          <h3>{players[playerId].displayName}</h3>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Player;
