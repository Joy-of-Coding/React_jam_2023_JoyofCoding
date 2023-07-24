
import './GameZone.css'
import Dice from "./Dice";
import { GameState } from "../logic.ts"
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

    // const advanceTurn = () => {
    //     const nextIndex = (game.currentPlayerIndex + 1) % Object.keys(players).length;
    //     Rune.actions.nextPlayer({nextPlayerIndex: nextIndex})
    // }

    const handleRollAll = (playerId: string) => {
        Rune.actions.rollAllDice({playerId: playerId})


        // advanceTurn()
    }


    return (
        <div>
            <b>{`${players[yourPlayerId].displayName}'s Game Board`}</b>
            <div className="grid-container">
                <div className="central-area grid-item">
                    <div>{`${players[yourPlayerId].displayName}'s Dice`}</div>
                    {game.diceArrays[yourPlayerId].map((die, i )=>(
                        <button key={i} value={i} onClick={()=>{handleRoll(yourPlayerId, i)}}><Dice faceValue={die} /></button>
                    ))}
                </div>

                <div className={`player-area grid-item top-left ${playerIds[0] === yourPlayerId ? 'red-border' : ''}`}>
                  <b>   {players[playerIds[0]].displayName}: {game?.diceArrays[playerIds[0]].length}</b>
                </div>

                    
                </div>


                <div className='bottom-section'>

                <div className={`bottom-right player-area ${playerIds[2] === yourPlayerId ? 'red-border' : ''}`}>
                    {numPlayers > 2 ? (
                        <div className=' player-flex'>
                            <b className='player-3-name'>{players[playerIds[2]].displayName}: {game?.diceArrays[playerIds[2]].length}</b>
                        </div>
                    ) : (
                        <div className="player-3-name player-flex">
                            <b>Waiting for player 3</b>
                        </div>
                    )}
                </div>


                <div className={`bottom-left player-area  ${playerIds[3] === yourPlayerId ? 'red-border' : ''}`}>
                    {numPlayers > 3 ? (
                        <div>
                            <b className='player-4-name'>{players[playerIds[3]].displayName}: {game?.diceArrays[playerIds[3]].length}</b>
                        </div>
                    ) : (
                        <div>
                           <b> Waiting for player 4</b>
                        </div>
                    )}
                </div>

                    
                </div>
                <div className="ice-container-parent">
                
              


               

                

               

                {/*Controls area*/}
                {/*Roll Dice, Challenge, Give away*/}
                <div className='roll-dice-button-container'>
                <div className="bottom-row grid-item">{yourPlayerId ? (
                    <>
                    
                        {(game.currentPlayerIndex===Object.keys(players).indexOf(yourPlayerId)) &&
                            <div>
                                <motion.button className='handleRoll-button' whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }} onClick={()=>{handleRollAll(yourPlayerId)}}>Roll Dice</motion.button>
                            </div>
                        }
                   
                    </>
                ) : (
                    <>I am a spectator, so I don't have count</>
                )}</div>

                </div>
            </div>


        </div>

    );
}

export default GameZone;

//grid layout start by ChatGPT
//typescript editing Chat GPT
// Image by <a href="https://www.freepik.com/free-vector/top-view-modern-restaurant-table-with-flat-design_2847028.htm#query=dining%20table%20top%20view&position=9&from_view=keyword&track=ais">Freepik</a>
{/* <a href="https://www.freepik.com/free-photo/faded-gray-wooden-textured-flooring-background_16246476.htm#page=2&query=flooring&position=8&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik */}
{/* <a href="https://www.freepik.com/free-vector/oak-wood-textured-design-background_16339756.htm#page=2&query=flooring&position=31&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik */}