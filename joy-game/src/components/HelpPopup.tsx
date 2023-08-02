

import React from 'react';
import './HelpPopup.css';
import { motion, AnimatePresence} from "framer-motion"


interface HelpPopupProps {
  closePopup: () => void;
}

export const HelpPopup: React.FC<HelpPopupProps> = ({ closePopup }) => {
  return (
    <div className="popup-container"onClick={closePopup}>
      <AnimatePresence>
      <motion.div transition={{ duration: .5 }} animate={{x:0}}initial={{x:250}}

      className="popup-body">

      <h2>Share the Joy!</h2>
          <h3>Get rid of all of your dice to win!</h3>
          <h2>How To Play</h2>
          <p>Click the green "roll" button on your turn & tap the dice:</p>
          <p>1: Pop balloons to remove them <p>2: Gifts have a random amount of dice, choose who gets them </p>3: Share the cake with everyone else </p>
          <p>When only confetti is left, click the red "end turn" button.</p>
        <button onClick={closePopup}>Close</button>
      </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HelpPopup;
