

import React from 'react';
import './HelpPopup.css';
import { motion, AnimatePresence} from "framer-motion"


interface HelpPopupProps {
  closePopup: () => void;
}

export const HelpPopup: React.FC<HelpPopupProps> = ({ closePopup }) => {
  return (
    <div className="popup-container">
      <AnimatePresence>
      <motion.div transition={{ duration: .5 }} animate={{x:0}}initial={{x:250}}


      className="popup-body">
            <h1> Share the Joy </h1>
            <h2> Object of the Game </h2>
            <p> Be the first player to have zero dice. </p>
            <h2> How To Play </h2>
            <p> When it is your turn, click the green "roll" button</p>
            <p>Click on the dice to resolve them:
            Pop the balloons to remove them from the game,
            send the gifts forward to the next player, and pass the cake backwards to the prior player</p>
            <p> When theres nothing but confetti left, click the red "end turn" button</p>
        <button onClick={closePopup}>Close</button>
      </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HelpPopup;
