import React, { useState } from 'react';
import './Config.css';
import { motion, AnimatePresence} from "framer-motion"
import { Credits } from './Credits';


interface ConfigProps {
  closePopup: () => void;
}

export const Config: React.FC<ConfigProps> = ({ closePopup }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="popup-container">
      <AnimatePresence>
      <motion.div transition={{ duration: .5 }} animate={{x:0}}initial={{x:250}}

      className="popup-body">

      <h2>Battle Sweep</h2>
          <p>Competative Minesweeper!</p>
          <h2>How To Play</h2>
          <p>Classic Minesweeper with a twist! You place mines then send the field to your opponent for them to sweep. </p>

        {/* <div>
          {open && <Credits closePopup={() => setOpen(false)} />}
          <motion.button  whileHover={{ scale: 1.1 }}  onClick={() => setOpen(true)}><b>Credits</b></motion.button>
        </div>       */}
        <motion.button  whileHover={{ scale: 1.1 }} onClick={closePopup}>Close</motion.button>
      </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Config;