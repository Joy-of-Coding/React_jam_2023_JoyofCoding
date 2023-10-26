import React, { useState } from 'react';
import './Config.css';
import { motion, AnimatePresence} from "framer-motion"
import { Credits } from './Credits';
import { GameState } from "../logic.ts";


interface ConfigProps {
  closePopup: () => void;
  game: GameState;
}

export const Config: React.FC<ConfigProps> = ({ closePopup, game }) => {
  const [open, setOpen] = useState(false);


  
  return (
    <div className="popup-container">
      <AnimatePresence>
      <motion.div transition={{ duration: .5 }} animate={{x:0}}initial={{x:250}}

      className="popup-body">

    {/* <div>
      <p>Total Bombs: {game?.setBombs} </p>
    </div> */}
    <div>
    <label>Bomb Count: {game?.setBombs}  </label>
        <input 
        type="range" 
        min="2" 
        max="30" 
        value={game?.setBombs}
        // onChange={e => Rune.actions.updateBombCount({amount: e.target.value})}
        onChange={e => Rune.actions.updateBombCount({amount: e.target.valueAsNumber})}
          ></input>

    </div>
    <div>
        <motion.button  whileHover={{ scale: 1.1 }} onClick={closePopup}>Close</motion.button>
      </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Config;
