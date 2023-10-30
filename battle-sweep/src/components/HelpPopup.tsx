import React, { useState } from "react";
import "./HelpPopup.css";
import { motion, AnimatePresence } from "framer-motion";
import { Credits } from "./Credits";

interface HelpPopupProps {
  closePopup: () => void;
}

export const HelpPopup: React.FC<HelpPopupProps> = ({ closePopup }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="popup-container">
      <AnimatePresence>
        <motion.div
          transition={{ duration: 0.5 }}
          animate={{ x: 0 }}
          initial={{ x: 250 }}
          className="popup-body"
        >
          <h2>Dragon Tamer</h2>
          {/* <p>Capture the Crabs is an exciting and strategic two-player game that combines the classic elements of Minesweeper and Battleship. In this game, players must strategically deploy <b>hidden crabs</b> on their opponent's grid while also skillfully navigating their own lava field.</p> */}
          <h3>How To Play</h3>
          <p>
            <ul>
              <li>
                <b>Setting up:</b> Strategically place a limited number of
                dragons in secret locations on the opposing player's grid in 2
                player mode.
              </li>
              <li>
                <b>Uncovering Tiles:</b> Tap or click on a tile to uncover it.
                If a tile contains an untrapped dragon, it bites and your game
                is over.
              </li>
              <li>
                <b>Setting traps:</b> The objective of the game is to trap and
                tame as many dragons as you can. Toggle the trap button and then
                click on the tile where you believe a dragon is hiding.{" "}
              </li>
              <li>
                <b>Taming: </b>Once you have laid your traps, press and hold the
                numbered tile connected to your traps to tame the adjacent
                dragons inside.{" "}
                <b>Be careful though, if you're wrong – your game is over!</b>
              </li>
              <li>
                <b>Winning:</b> To win, you must successfully tame more dragons
                than your opponent.
              </li>
            </ul>
          </p>

          <div>
            {open && <Credits closePopup={() => setOpen(false)} />}
            <motion.button
              className="button"
              whileHover={{ scale: 1.1 }}
              onClick={() => setOpen(true)}
            >
              <b>Credits</b>
            </motion.button>
            <motion.button
              className="button"
              whileHover={{ scale: 1.1 }}
              onClick={closePopup}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HelpPopup;
