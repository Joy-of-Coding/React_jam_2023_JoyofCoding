

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

      <h2>Share the Joy!</h2>
          <p>Get rid of all of your dice to win!</p>
          <h2>How To Play</h2>
          <p>Click the green "roll" button on your turn & tap the dice:</p>
          <p>1: Pop balloons to remove them</p> 
          <p>2: Gifts have a random amount of dice, choose who gets them </p>
          <p>3: Share the cake with everyone else </p>
          <p>When only confetti is left, click the red "end turn" button</p>
          <p>*inspired by “Pass the Pandas” and built by Joy of Coding Academy students </p>

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
