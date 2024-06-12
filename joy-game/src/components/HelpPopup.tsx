

import React, { useState } from 'react';
import './HelpPopup.css';
import { motion, AnimatePresence} from "framer-motion"
import { Credits } from './Credits';
import Content from './ReadMore';


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
        <Content />
        {/* <Image URL={("src/assets/joygame instructions.png")}></Image> */}
        <div className="container">
        <img src="src/assets/joygame instructions 2.png" alt="HowToWin"></img>
        <img src="src/assets/joygame instructions 3.png" alt="HowToPlay"></img>
        </div>

        <div>
          {open && <Credits closePopup={() => setOpen(false)} />}
          <motion.button  whileHover={{ scale: 1.1 }}  onClick={() => setOpen(true)}><b>Credits</b></motion.button>
        </div>      
        <motion.button  whileHover={{ scale: 1.1 }} onClick={closePopup}>Close (X)</motion.button>
      </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HelpPopup;
