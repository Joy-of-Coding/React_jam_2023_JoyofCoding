import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './StartPage.css';
import HelpPopup from './HelpPopup';
import Config from './Config';
import { GameState } from '../helper/Types';
//
interface StartPageProps {

    game: GameState;
  }
const StartPage: React.FC<StartPageProps> = ({ game }) => {
    const [openHelp, setOpenHelp] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    
  
    return (
      <div>
        <h1>Start Game</h1>
        <div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="helpButton"
            onClick={() => {
              // Handle the logic for starting the game
              // For example, you can navigate to the main game page
            }}
          >
            <b>Start Game</b>
          </motion.button>
        </div>
        <h1>Settings</h1>
        <div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="helpButton"
            onClick={() => setOpenSettings(true)}
          >
            <b>Settings</b>
          </motion.button>
        </div>
        <div>
          {openSettings && (
            <Config game={game} closePopup={() => setOpenSettings(false)} />
          )}
        </div>
        <h1>Help</h1>
        <div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="helpButton"
            onClick={() => setOpenHelp(true)}
          >
            <b>Help</b>
          </motion.button>
        </div>
        <div>
          {openHelp && <HelpPopup closePopup={() => setOpenHelp(false)} />}
        </div>
      </div>
    );
  };
  
  export default StartPage;

  