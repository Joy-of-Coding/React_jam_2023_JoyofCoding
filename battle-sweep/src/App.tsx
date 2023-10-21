import { useEffect, useState } from "react";
import { GameState } from "./logic.ts";
import Board from "./components/Board.tsx";
import "./App.css";

function App() {
  const [game, setGame] = useState<GameState>();
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, playerIds, yourPlayerId }) => {
        setGame({ game, playerIds, yourPlayerId });
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
      <Board board={game.playerState[yourPlayerId].board} />
    </>
  );
}

export default App;
