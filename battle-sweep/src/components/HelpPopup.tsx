import React, { useState } from 'react';
import './HelpPopup.css';
import { motion, AnimatePresence} from "framer-motion"
import { Credits } from './Credits';


interface HelpPopupProps {
  closePopup: () => void;
}

export const HelpPopup: React.FC<HelpPopupProps> = ({ closePopup }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="popup-container">
      <AnimatePresence>
      <motion.div transition={{ duration: .5 }} animate={{x:0}}initial={{x:250}}

      className="popup-body">

      <h2>Capture the Crabs</h2>
          <p>Capture the Crabs is an exciting and strategic two-player game that combines the classic elements of Minesweeper and Battleship. In this game, players must strategically deploy <b>hidden crabs</b> on their opponent's grid while also skillfully navigating their own lava field.</p>
          <h2>How To Play</h2>
          <p>
            <ul>
              <li><b>Setting up the lava field:</b> At the start of the game, strategically place a limited number of crabs in secret locations on the opposing player's grid.</li>
              <li><b>Uncovering Tiles:</b> Click (or tap on touchscreens) on a tile to uncover it. If a tile contains an opponent's crab, it bites with its lava claw and your game is over.</li>
              <li><b>Setting traps:</b> The objective of the game is to trap as many crabs as you can.  To trap a crab you must first place a trap by clicking on the trap button and then clicking the tile of the lava field where you believe the crab is. </li>
              <li><b>Trap the crabs: </b>Deselect the trap button and click the same tile to trigger the trap and catch the crab.</li>
              <li><b>Winning:</b> To win, you must successfully trap more crabs than your opponent.</li>
            </ul>  
          </p>

        <div>
          {open && <Credits closePopup={() => setOpen(false)} />}
          <motion.button  whileHover={{ scale: 1.1 }}  onClick={() => setOpen(true)}><b>Credits</b></motion.button>
        </div>      
        <motion.button  whileHover={{ scale: 1.1 }} onClick={closePopup}>Close</motion.button>
      </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HelpPopup;