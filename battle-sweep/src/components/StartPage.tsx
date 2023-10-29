import React, { useState } from "react";
import { motion } from "framer-motion";
import "./StartPage.css";
import HelpPopup from "./HelpPopup";
import Config from "./Config";
import { GameState } from "../helper/Types";
//
interface StartPageProps {
  game: GameState;
  closeStart: () => void;
}
const StartPage: React.FC<StartPageProps> = ({ game, closeStart }) => {
  const [openHelp, setOpenHelp] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div>
      <h1>Dragon Tamer</h1>
      {/* <h2>Start Game</h2> */}
      <div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="button"
          onClick={() => closeStart()}
        >
          <b>Start Game</b>
        </motion.button>
      </div>
      <div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="button"
          onClick={() => setOpenSettings(true)}
        >
          <b>Dragon Count</b>
        </motion.button>
      </div>
      <div>
        {openSettings && (
          <Config game={game} closePopup={() => setOpenSettings(false)} />
        )}
      </div>
      <div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="button"
          onClick={() => setOpenHelp(true)}
        >
          <b>How-to Play</b>
        </motion.button>
      </div>
      <div>
        {openHelp && <HelpPopup closePopup={() => setOpenHelp(false)} />}
      </div>
    </div>
  );
};

export default StartPage;
