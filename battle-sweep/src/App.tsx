import { useEffect, useRef, useState } from "react";
import { GameState } from "./logic.ts";
import type { Players, PlayerId } from "rune-games-sdk/multiplayer";
import Board from "./components/Board.tsx";
import "./App.css";
import Player from "./components/Player.tsx";
import Controls from "./components/Controls.tsx";
import { HelpPopup } from "./components/HelpPopup.tsx";
import { motion } from "framer-motion";
import Timer from "./components/Timer.tsx"; // Import the Timer component with correct casing


function App() {
  const [game, setGame] = useState<GameState>();
  const [players, setPlayers] = useState<Players>({});
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId>();
  const playerIds = Object.keys(players);
  const [open, setOpen] = useState(false);
  const [useFlag, setUseFlag] = useState(false);
  const timerRef = useRef<number>(0);
  const [useFlag, setUseFlag] = useState(false); // Add useFlag state
  const [open, setOpen] = useState(false); // Add open state
  // const [timerDuration, setTimerDuration] = useState<number>(10); // Define and initialize the timer duration
  // const [gameFinished, setGameFinished] = useState(false); // Declare and initialize gameFinished

  // console.log(timerDuration)

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
      clearTimeout(timerRef.current || 0);
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

  const toggleFlagState = () => {
    setUseFlag(!useFlag);
  const toggleFlag = () => {
    setUseFlag((prevUseFlag) => !prevUseFlag);
  };

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
            onPress={handleTilePress}
            onLongPress={handleLongTilePress}
            display={game.onboarding ? id == yourPlayerId : id != yourPlayerId}
            board={game.playerState[`${id}`].board}
          />
        </>
      ))}
      {/*//Onboard timer*/}
      <Timer
          key={"-onboardtimer"}
          initialTime={game.onBoardTimer}
          endFunction={Rune.actions.swap}
          // setTimerDuration={setTimerDuration}
      />

      <Controls onboarding={game.onboarding} toggleFlag={toggleFlagState} useFlag={useFlag}/>
      <div>
        {open && <HelpPopup closePopup={() => setOpen(false)} />}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="helpButton"
          onClick={() => setOpen(true)}
        >
          <b>Info</b>
        </motion.button>
      </div>
    </>
  );
}

export default App;
