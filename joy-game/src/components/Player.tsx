import './GameZone.css'

import React from 'react';
import './Player.css'
import {motion} from "framer-motion";
import {GameState} from "../logic.ts";


interface PlayerProps {
    players: Record<string, { playerId: string, displayName: string, avatarUrl: string }>,
    playerId: string;
    game: GameState,
    playerNum: number
}

const Player: React.FC<PlayerProps> = ({ game: game, players, playerId, playerNum }) => {
    const handleUpdateDiceCount = (playerId: string, amount: number) : void => {
        Rune.actions.updateDiceCount({ playerId: playerId, amount: amount });
    }

    return (
      // <motion.div transition={{ duration: 1 }} animate={{x:0}} initial={{x:-150}} className= { `${playerId === yourPlayerId ? 'red-border' : ''}player`}>
          <div className=' player-flex'>
              <div >
                  <img className='avatar' src={players[playerId].avatarUrl} alt="" />
              </div>
              <div className={`player-${playerNum}-name`}>
                  <b>{players[playerId].displayName} <br/>
                      <div className='flex '>
                          <button onClick={() => handleUpdateDiceCount(playerId, 1)}>Dice++</button> <br/>
                         <button onClick={() => handleUpdateDiceCount(playerId, -1)}>Dice--</button> <br/>
                      </div>
                      {game?.diceCount[playerId]}</b>
              </div>
          </div>

      // </motion.div>
  );
};

export default Player;

