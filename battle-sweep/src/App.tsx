import { useEffect, useState } from "react";
import { GameState } from "./logic.ts";
import type { Players, PlayerId } from "rune-games-sdk/multiplayer";
import Board from "./components/Board.tsx";
import "./App.css";
import Player from "./components/Player.tsx";
import Controls from "./components/Controls.tsx";
import Timer from "./timer.tsx"; // Import the Timer component with correct casing


function App() {
  const [game, setGame] = useState<GameState>();
  const [players, setPlayers] = useState<Players>({});
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId>();
  const playerIds = Object.keys(players);

  const [timerDuration, setTimerDuration] = useState(20); // Set the timer duration in seconds
  const [gameFinished, setGameFinished] = useState(false); // State variable to track if the game is finished

  const handleTimerEnd = () => {
    setGameFinished(true); // Set the game as finished when the timer ends
  };

  // Update the timer duration when needed
  const updateTimerDuration = (newDuration: number) => {
    setTimerDuration(newDuration);
  };

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
      {playerIds.map((id) => (
        <>
          <Player
            key={id + "-player"}
            display={game.onboarding ? id == yourPlayerId : id != yourPlayerId}
            players={players}
            playerId={id}
            game={game}
          />
          <Board
            key={id}
            display={game.onboarding ? id == yourPlayerId : id != yourPlayerId}
            board={game.playerState[`${id}`].board}
          />
          <Timer
            key={id + "-timer"}
            initialTime={timerDuration}
            onTimerEnd={handleTimerEnd}
          />
          {gameFinished && <p>FINISHED!</p>}
        </>
      ))}
      <Controls updateTimerDuration={updateTimerDuration}/>
    </>
  );
}

export default App;
