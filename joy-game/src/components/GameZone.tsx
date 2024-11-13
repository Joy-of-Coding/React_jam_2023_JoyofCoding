import React, {useState} from "react";
import './GameZone.css'
import { GameState } from "../logic.ts"
import { motion } from "framer-motion"
import Controls from "./Controls.tsx";
import Table from "./Table.tsx";
import Player from "./Player.tsx";
import {HelpPopup} from './HelpPopup.tsx'

interface GameZoneProps {
    numPlayers: number,
    playerIds: string[],
    game: GameState,
    players: Record<string, { playerId: string, displayName: string, avatarUrl: string }>,
    yourPlayerId: string | undefined,
    avatarUrl: string,
}

const GameZone: React.FC<GameZoneProps> = ({game, players, yourPlayerId})=> {
    const [open, setOpen] = useState(false);

    const calculateTableDice = () => {
        return game.gameDice.length;
    };

    const calculatePoolDice = () => {
        return Object.values(game.diceCount).reduce((sum, count) => sum + count, 0);
    };

    const getDiceCounterColor = (totalDice: number) => {
        if (totalDice <= 35) return 'green';
        if (totalDice <= 70) return 'yellow';
        return 'red';
    };

    const playerIds = Object.keys(players);
    const numPlayers = playerIds.length;

    const renderGameContent = () => (
        <>
            <div className='dice-stats' style={{display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: '10px'}}>
                <div className='dice-counter-display'
                     style={{
                         backgroundColor: getDiceCounterColor(calculatePoolDice()),
                         padding: '10px',
                         borderRadius: '5px',
                         color: 'white',
                         fontWeight: 'bold'
                     }}>
                    Pool Dice: {calculatePoolDice()}
                </div>
                <div className='dice-counter-display'
                     style={{
                         backgroundColor: 'blue',
                         padding: '10px',
                         borderRadius: '5px',
                         color: 'white',
                         fontWeight: 'bold'
                     }}>
                    Table Dice: {calculateTableDice()}
                </div>
            </div>

            <div className='top-section'>
                <motion.div className="players" transition={{ duration: 1 }} animate={{x:0}} initial={{x:-150}} >
                    {numPlayers > 0 ? (
                        <Player playerId={playerIds[0]} players={players} game={game} playerNum={1}/>
                    ) : (
                        <div className='player-1-name player-flex'>
                            Waiting for player 1
                        </div>
                    )}
                </motion.div>

                <div>
                    {open && <HelpPopup closePopup={() => setOpen(false)} />}
                    <motion.button whileHover={{ scale: 1.1 }} className="helpButton" onClick={() => setOpen(true)}>
                        <b>Info</b>
                    </motion.button>
                </div>

                <motion.div className="players" transition={{ duration: 1 }} animate={{x:0}} initial={{x:150}} >
                    {numPlayers > 1 ? (
                        <Player playerId={playerIds[1]} players={players} game={game} playerNum={2} />
                    ) : (
                        <div className='player-2-name player-flex'>
                            Waiting for player 2
                        </div>
                    )}
                </motion.div>
            </div>

            <Table
                game={game}
                playerId={yourPlayerId}
                playerIds={playerIds}
                yourPlayerId={yourPlayerId}
                players={players}
            />

            <div className='bottom-section'>
                <motion.div className="players" transition={{ duration: 1 }} animate={{x:0}} initial={{x:-150}}>
                    {numPlayers > 3 ? (
                        <Player playerId={playerIds[3]} players={players} game={game} playerNum={4} />
                    ) : (
                        <div className='player-flex player-4-name'>
                            Waiting for player 4
                        </div>
                    )}
                </motion.div>

                <Controls game={game} players={players} yourPlayerId={yourPlayerId} />

                <motion.div className="players" transition={{ duration: 1 }} animate={{x:0}} initial={{x:150}}>
                    {numPlayers > 2 ? (
                        <Player playerId={playerIds[2]} players={players} game={game} playerNum={3} />
                    ) : (
                        <div className="player-flex player-3-name">
                            <b>Waiting for player 3</b>
                        </div>
                    )}
                </motion.div>
            </div>
        </>
    );

    if (!yourPlayerId) {
        return (
            <div className='game-play-container spectator-view'>
                <h2>Spectating</h2>
                {renderGameContent()}
            </div>
        );
    }

    return (
        <div className='game-play-container'>
            {renderGameContent()}
        </div>
    );
}

export default GameZone;