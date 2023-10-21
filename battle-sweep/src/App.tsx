import { useEffect, useState } from "react";
import { GameState } from "./logic.ts";
import Board from "./components/Board.tsx";
import "./App.css";

function App() {
  const [game, setGame] = useState<GameState>();
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game }) => {
        setGame(game);
      },
    });
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }

  // <button onClick={() => Rune.actions.increment({ amount: 1 })}></button>
  return <Board width={9} height={9} />;
}

export default App;
