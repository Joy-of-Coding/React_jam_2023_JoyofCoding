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

  const handleBombChange = (num) => {
    console.log("handling change of bomb count", num)
    Rune.actions.updateBombCount({num})

  }

  
  return (
    <div className="popup-container">
      <AnimatePresence>
      <motion.div transition={{ duration: .5 }} animate={{x:0}}initial={{x:250}}

      className="popup-body">

    <div>
      <p>Total Bombs: {game?.setBombs} </p>
    </div>
    <div>
    <label>Bomb Count:</label>
        <input 
        type="number" 
        // min="2" 
        // max="30" 
        value={game?.setBombs}
        onChange={e => handleBombChange(e.target.value)}
          ></input>

    </div>
    <div>
      
    {/* <button className="button" onClick={() => Rune.actions.userSetBombCount(5)}>
          Swap Boards
        </button> */}
    </div>


    {/* <script>
        function saveConfig() {
            const bombCount = parseInt(document.getElementById("bombCount").value);
            const gameTimer = parseInt(document.getElementById("gameTimer").value);
            const turnTimer = parseInt(document.getElementById("turnTimer").value);
            const fieldSize = document.getElementById("fieldSize").value;

            // You can use these values in your JavaScript game code
            console.log("Max Lives: " + maxLives);
            console.log("Bomb Count: " + bombCount);
            console.log("Game Timer: " + gameTimer + " seconds");
            console.log("Turn Timer: " + turnTimer + " seconds");
            console.log("Field Size: " + fieldSize);
        {'}'}
}
    </script> */}

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