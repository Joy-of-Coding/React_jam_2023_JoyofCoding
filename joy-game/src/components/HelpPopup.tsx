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
        <div className="popup-content">
          <h2>🎉 Share the Joy! 🎉</h2>
          <p>🏆 Get rid of all your dice to win! (0️⃣🎲 = 🏆!) 🏆</p>
          <h2>🎲 How To Play 🎲</h2>
          <p>1️⃣ On your turn, tap the green "Roll" button 🟢</p>
          <p>2️⃣ Tap the dice to perform actions:</p>
          <p>🎈 Balloons: -1🎲 die from your count</p> 
          <p>🎁 Gifts: Give or take a random number of dice (-2🎲 to +3🎲) to/from another player</p>
          <p>🍰 Cake: Everyone else gets +1🎲 die, you lose -1🎲 die</p>
          <p>🎊 Confetti: No action, just pretty!</p>
          <p>3️⃣ When only confetti remains, tap the red "End Turn" button 🔴</p>
          <p>✨ Inspired by "Pass the Pandas" and built by Joy of Coding Academy students ✨</p>
        </div>

        <div className="popup-buttons">
          {open && <Credits closePopup={() => setOpen(false)} />}
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => setOpen(true)}><b>Credits</b></motion.button>
          <motion.button whileHover={{ scale: 1.1 }} onClick={closePopup}>Close</motion.button>
        </div>
      </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HelpPopup;