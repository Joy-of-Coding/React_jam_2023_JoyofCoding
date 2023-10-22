import { useEffect, useState } from "react";
import { GameState } from "./logic.ts";
import type { Players, PlayerId } from "rune-games-sdk/multiplayer";
import Board from "./components/Board.tsx";
import "./App.css";
import Player from "./components/Player.tsx";
import Controls from "./components/Controls.tsx";
import {HelpPopup} from "./components/HelpPopup.tsx";
import { motion } from "framer-motion"

function App() {
  const [game, setGame] = useState<GameState>();
  const [players, setPlayers] = useState<Players>({});
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId>();
  const playerIds = Object.keys(players);
  const [open, setOpen] = useState(false);

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
        </>
      ))}

      <Controls />
      <div>
        {open && <HelpPopup closePopup={() => setOpen(false)} />}
        <motion.button  whileHover={{ scale: 1.1 }} className="helpButton" onClick={() => setOpen(true)}><b>Info</b></motion.button>
      </div>  
    </>
  );
}

export default App;
