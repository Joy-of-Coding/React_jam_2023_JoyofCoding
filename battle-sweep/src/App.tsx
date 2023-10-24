import { useEffect, useState } from "react";
import { GameState } from "./logic.ts";
import type { Players, PlayerId } from "rune-games-sdk/multiplayer";
import Board from "./components/Board.tsx";
import "./App.css";
import Player from "./components/Player.tsx";
import Controls from "./components/Controls.tsx";
import { HelpPopup } from "./components/HelpPopup.tsx";
import { motion } from "framer-motion";
import Timer from "./timer.tsx"; // Import the Timer component with correct casing


function App() {
  const [game, setGame] = useState<GameState>();
  const [players, setPlayers] = useState<Players>({});
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId>();
  const playerIds = Object.keys(players);
  const [useFlag, setUseFlag] = useState(false); // Add useFlag state
  const [open, setOpen] = useState(false); // Add open state
  const [timerDuration, setTimerDuration] = useState<number>(20); // Define and initialize the timer duration
  const [gameFinished, setGameFinished] = useState(false); // Declare and initialize gameFinished

  

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, players, yourPlayerId }) => {
        setGame(game);
        setPlayers(players);
        setYourPlayerId(yourPlayerId);
      },
    });
  }, []);

  useEffect(() => {
    if (game?.isGameOver) {
      setUseFlag(false);
      setOpen(false);
    }
  }, [game]);

  const handleTilePress = (row: number, col: number) => {
    if (game?.onboarding) {
      Rune.actions.userAddBomb({ row, col });
      return;
    }
    if (useFlag) {
      Rune.actions.flag({ row, col });
    } else {
      Rune.actions.flip({ row, col });
    }
  };

  const toggleFlag = () => {
    setUseFlag((prevUseFlag) => !prevUseFlag);
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  const handleTimerEnd = () => {
    // Set the game as finished when the timer ends
    setGame((prevGame) => {
      if (prevGame) {
        return {
          ...prevGame,
          isGameOver: true, // Set a property in your game state to indicate that the game is finished
          playerIds: prevGame ? prevGame.playerIds || [] : [], // Ensure playerIds is an array
          onboarding: prevGame.onboarding || false, // Ensure onboarding is a boolean
        };
      }
      return prevGame;  // Return the original state if it's undefined
    });
  };
  

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
            onPress={handleTilePress}
            display={game.onboarding ? id == yourPlayerId : id != yourPlayerId}
            board={game.playerState[`${id}`].board}
          />
          <Timer
            key={id + "-timer"}
            initialTime={timerDuration}
            onTimerEnd={handleTimerEnd}
          />
          {gameFinished && <p>FINISHED!</p>}
          
          <Controls 
            updateTimerDuration={setTimerDuration}
            onboarding={game.onboarding}
            toggleFlag={toggleFlag}
          />
        </>
      ))}

    
    </>
  );
}

export default App;
