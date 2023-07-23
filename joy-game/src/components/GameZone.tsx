
import './GameZone.css'
import Dice from "./Dice";
import { GameState } from "../logic.ts"
import { motion } from "framer-motion"

interface GameZoneProps {
    numPlayers: number,
    playerIds: string[],
    game: GameState,
    players: Record<string, any>,
    yourPlayerId: string,
}

const GameZone: React.FC<GameZoneProps> = ({game: game, players: players, yourPlayerId: yourPlayerId})=> {


    const playerIds = Object.keys(players)
    const numPlayers = playerIds.length

    const advanceTurn = () => {
        const nextIndex = (game.currentPlayerIndex + 1) % Object.keys(players).length;
        Rune.actions.nextPlayer({nextPlayerIndex: nextIndex})
    }

    const handleRoll = (playerId:string, i: number) =>
    {
        console.log("clicked button", i)
        const randomNum= Math.floor(Math.random() * 6) + 1;
        Rune.actions.updatePlayerDie({playerId: playerId, dieValue: randomNum, dieIndex: i})
    }
    const handleRollAll = (playerId: string) => {
        console.log("Rolled all dice")
        Rune.actions.rollAllDice({playerId: playerId})
        advanceTurn()
    }


    return (
        <div className='game-play-container'>
            
            <div className="container">
            <b className='player-gameboard-title'>{`${players[yourPlayerId].displayName}'s Game Board`}</b>
                <div className='top-section'>

                    <div className="player-section  right">

                        <div className= { `${playerIds[0] === yourPlayerId ? 'red-border' : ''}player`}>
                        <b>   {players[playerIds[0]].displayName} <br/> {game?.diceArrays[playerIds[0]].length}</b>
                        </div>
                    </div>


                    <div className="player-section left">

                        <div className={`top-right player-area grid-item ${playerIds[1] === yourPlayerId ? 'red-border' : ''}player-section`}>
                            {numPlayers > 1 ? (
                                <div>
                                    <b>{players[playerIds[1]].displayName}: {game?.diceArrays[playerIds[1]].length}</b>
                                </div>
                            ) : (
                                <div>
                                    Waiting for player 2
                                </div>
                            )}
                        </div>
                    </div>
                    


                </div>


                <div className='middle-section'>
                    
                <div className='player-name'>
                    
                    {`${players[yourPlayerId].displayName}'s Dice`}
                </div>
                    <div className='dice-container'>
                    {game.diceArrays[yourPlayerId].map((die, i )=>(
                        <motion.button transition={{ duration: 1 }} animate={{
                            scale: [1, 1.2, 1.2, 1, 1],
                            rotate: [0, 0, 270, 0, 0],
                            opacity:[0,0,1,1]
                            
                            
                          }} className='dice-button' key={i} value={i} onClick={()=>{handleRoll(yourPlayerId, i)}}><Dice faceValue={die} /></motion.button>
                    ))}
                    </div>
                    
                </div>

                    
                </div>


                <div className='bottom-section'>

                    
                </div>
                <div className="ice-container-parent">
                
              


               

                <div className={`bottom-right player-area grid-item ${playerIds[2] === yourPlayerId ? 'red-border' : ''}`}>
                    {numPlayers > 2 ? (
                        <div>
                            <b>{players[playerIds[2]].displayName}: {game?.diceArrays[playerIds[2]].length}</b>
                        </div>
                    ) : (
                        <div>
                            Waiting for player 3
                        </div>
                    )}
                </div>

                <div className={`bottom-left player-area grid-item ${playerIds[3] === yourPlayerId ? 'red-border' : ''}`}>
                    {numPlayers > 3 ? (
                        <div>
                            <b>{players[playerIds[3]].displayName}: {game?.diceArrays[playerIds[3]].length}</b>
                        </div>
                    ) : (
                        <div>
                            Waiting for player 4
                        </div>
                    )}
                </div>

                {/*Controls area*/}
                {/*Roll Dice, Challenge, Give away*/}
                <div className="bottom-row grid-item">{yourPlayerId ? (
                    <>
                        {(game.currentPlayerIndex===Object.keys(players).indexOf(yourPlayerId)) &&
                            <div>
                                <button onClick={()=>{handleRollAll(yourPlayerId)}}>Roll Dice</button>
                            </div>
                        }
                    </>
                ) : (
                    <>I am a spectator, so I don't have count</>
                )}</div>
            </div>


        </div>

    );
}

export default GameZone;

//grid layout start by ChatGPT
//typescript editing Chat GPT