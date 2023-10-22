import { useEffect, useState } from "react";
import { GameState } from "./logic.ts";
import type { Players, PlayerId } from "rune-games-sdk/multiplayer";
import Board from "./components/Board.tsx";
import "./App.css";

function App() {
  const [game, setGame] = useState<GameState>();
  const [players, setPlayers] = useState<Players>({});
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId>();
  const playerIds = Object.keys(players);

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, players, yourPlayerId }) => {
        setGame(game);
        setPlayers(players);
        setYourPlayerId(yourPlayerId);
      },
    });
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/*<button onClick={() => Rune.actions.increment({ amount: 1 })}></button>*/}
      <button onClick={() => Rune.actions.addBombs()}>Add Bombs</button>
      {playerIds.map((id) => (
        <Board
          key={id}
          display={id == yourPlayerId}
          board={game.playerState[`${id}`].board}
        />
      ))}
    </>
  );
}

export default App;
