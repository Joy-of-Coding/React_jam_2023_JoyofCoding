import { useEffect, useRef, useState } from "react";
import { GameState } from "./helper/Types.ts";
import type { Players, PlayerId } from "rune-games-sdk/multiplayer";
import Board from "./components/Board.tsx";
import "./App.css";
import Player from "./components/Player.tsx";
import Controls from "./components/Controls.tsx";
import InPlay from "./components/InPlay.tsx";
import { Config } from "./components/Config.tsx";
import { HelpPopup } from "./components/HelpPopup.tsx";
import { motion } from "framer-motion";
import Timer from "./components/Timer.tsx"

function App() {
  const [game, setGame] = useState<GameState>();
  const [players, setPlayers] = useState<Players>({});
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId>();
  const playerIds = Object.keys(players);
  const [useFlag, setUseFlag] = useState(false); // Add useFlag state
  const [openHelp, setOpenHelp] = useState(false);
  const [openSettings, setOpenSettings] = useState(false); // Add open state
  const [timerDuration, setTimerDuration] = useState<number>(20); // Define and initialize the timer duration
  const [gameFinished, setGameFinished] = useState(false); // Declare and initialize gameFinished

  
  const timerRef = useRef<number>(0);
  console.log("app.tsx",game?.setBombs)

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
      setOpenSettings(false);
      setOpenHelp(false);
      clearTimeout(timerRef.current || 0);
    }

    if (game?.onboarding && playerIds.length < 2) {
      Rune.actions.swap();
    }
  }, [game, playerIds]);

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

  const handleLongTilePress = (row: number, col: number) => {
    if (game?.onboarding) {
      return;
    }
    clearTimeout(timerRef.current || 0);
    timerRef.current = 0;

    timerRef.current = setTimeout(() => {
      Rune.actions.revealReset();
      clearTimeout(timerRef.current || 0);
      timerRef.current = 0;
    }, 1500);

    Rune.actions.reveal({ row, col });
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
        setGameFinished(true); // Update the gameFinished state
        
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
      <InPlay
        game={game}
        playerId={yourPlayerId || ""}
        onboarding={game.onboarding}
      />
      {playerIds.map((id) => (
        <>
          <Player
            key={id + "-player"}
            display={game.onboarding ? id != yourPlayerId : id == yourPlayerId}
            players={players}
            playerId={id}
            game={game}
          />
          <Board
            key={id}
            onPress={handleTilePress}
            onLongPress={handleLongTilePress}
            display={game.onboarding ? id != yourPlayerId : id == yourPlayerId}
            board={game.playerState[`${id}`].board}
          />
          
          {gameFinished && <p>FINISHED!</p>}
        </>
      ))}
      <Timer
        game={game}
        initialTime={timerDuration}
        onTimerEnd={handleTimerEnd}
        // playerWin="YOU WIN!!!" // Replace with the actual value
        // playerLose="MAYBE NEXT TIME" // Replace with the actual value
        endGame={function (game: GameState): void {
          throw new Error("Function not implemented.");
        }}          
      />
      <Controls
        onboarding={game.onboarding}
        toggleFlag={toggleFlag}
        useFlag={useFlag}
        updateTimerDuration={function (): void {
          throw new Error("Function not implemented.");
        }}      
      />
      <div>
        {openHelp && <HelpPopup closePopup={() => setOpenHelp(false)} />}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="helpButton"
          onClick={() => setOpenHelp(true)}
        >
          <b>Info</b>
        </motion.button>
      </div> 
      <div>
        {openSettings && <Config game={game} closePopup={() => setOpenSettings(false)} />}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="helpButton"
          onClick={() => setOpenSettings(true)}
                  >
          <b>Settings</b>
        </motion.button>
      </div>

      <div>
      <p>Total Bombs: {game.setBombs} </p>
    </div>
    </>
  );
}

export default App;
