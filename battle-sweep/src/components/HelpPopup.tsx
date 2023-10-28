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

      <h2>Battle Sweep</h2>
          <p>Battle Sweep is an exciting and strategic two-player game that combines the classic elements of Minesweeper and Battleship. In this game, players must strategically deploy hidden mines on their opponent's grid while also skillfully navigating their own minefield.</p>
          <h2>How To Play</h2>
          <p>
            <ul>
              <li><b>Setting up the Battlefield:</b> At the start of the game, strategically place a limited number of mines in secret locations on the opposing player's grid.</li>
              <li><b>Uncovering Tiles:</b> Click (or tap on touchscreens) on a tile to uncover it. If a tile contains an opponent's mine, it detonates and your game is over.</li>
              <li><b>Flagging Mines:</b> The objective of the game is to uncover as many mines as you can.  To uncover a mine you must first flag it by clicking on the flag button and then clicking the tile containg the mine.  Deselect the flag button and click the same tile to uncover the mine.</li>
              <li><b>Winning:</b> To win, you must successfully uncover more mines than your opponent.</li>
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