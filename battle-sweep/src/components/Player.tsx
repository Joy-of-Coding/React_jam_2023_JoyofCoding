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
    <>
      {players[playerId] ? (
        <div>
          <img
            className="avatar"
            src={players[playerId].avatarUrl}
            alt={players[playerId].displayName}
          />
          <h3 className="user-name">{players[playerId].displayName}</h3>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Player;
