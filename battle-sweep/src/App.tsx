import { useEffect, useState } from "react";
import { GameState } from "./logic.ts";
import type { Players, PlayerId } from "rune-games-sdk/multiplayer";
import Board from "./components/Board.tsx";
import "./App.css";
import Player from "./components/Player.tsx";
import Controls from "./components/Controls.tsx";
import Timer from "./timer.tsx"; // Import the Timer component

function App() {
  const [game, setGame] = useState<GameState | undefined>();
  const [players, setPlayers] = useState<Players>({});
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();
  const playerIds = Object.keys(players);

  const [timerDuration, setTimerDuration] = useState(10); // Set the initial timer duration
  const [gameFinished, setGameFinished] = useState(false); // Initialize gameFinished state

  // Function to handle what happens when the timer reaches 0
  const handleTimerEnd = () => {
    const [gameFinished, setGameFinished] = useState(false);
  // Update the game state to mark it as finished.
  setGameFinished(true);
  };

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, players, yourPlayerId }) => {
        setGame(game);
        setPlayers(players);
        setYourPlayerId(yourPlayerId);
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>;
  }

  // Conditionally render the "FINISHED!" message
  const finishedMessage = gameFinished ? (
    <div style={{ fontSize: "36px" }}>FINISHED!</div>
  ) : null;

  return (
    <>
      
      {playerIds.map((id) => (
          <>
            <Timer 
              initialTime={timerDuration} 
              onTimerEnd={handleTimerEnd} 
            />
            <Player
                players={players}
                playerId={id}
                game={game}
                yourPlayerId={yourPlayerId}
                key={id+"-player"}
            />
              <Board
                key={id}
                display={id == yourPlayerId}
                board={game.playerState[`${id}`].board}
              />
          </>
      ))}

      <Controls />
    </>
  );
}

export default App;
