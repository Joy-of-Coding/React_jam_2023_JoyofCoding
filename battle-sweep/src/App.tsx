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
 return (

     <>
       {console.log(game.boards)}
      {/*<button onClick={() => Rune.actions.increment({ amount: 1 })}></button>*/}
      <button onClick={() => Rune.actions.addBombs({ number: 10 })}>Add Bombs</button>
       <Board board = {game.board}/>;
     </>
)
}

export default App;
