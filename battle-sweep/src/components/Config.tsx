import "./Config.css";
import { motion, AnimatePresence } from "framer-motion";
import { GameState } from "../helper/Types";

interface ConfigProps {
  closePopup: () => void;
  game: GameState;
}

export const Config: React.FC<ConfigProps> = ({ closePopup, game }) => {
  return (
    <div className="popup-container">
      <AnimatePresence>
        <motion.div
          transition={{ duration: 0.5 }}
          animate={{ x: 0 }}
          initial={{ x: 250 }}
          className="popup-body"
        >
          {/* <div>
      <p>Total Bombs: {game?.setBombs} </p>
    </div> */}
          <div>
            <label>Dragon Count: {game?.setBombs} </label>
            <input
              type="range"
              min="2"
              max="30"
              value={game?.setBombs}
              // onChange={e => Rune.actions.updateBombCount({amount: e.target.value})}
              onChange={(e) =>
                Rune.actions.updateBombCount({ amount: e.target.valueAsNumber })
              }
            ></input>
          </div>
          <motion.button
            className="button"
            whileHover={{ scale: 1.1 }}
            onClick={closePopup}
          >
            Close
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Config;
