
import './GameZone.css'
import Dice from "./Dice";

interface GameZoneProps {
    players: Record<string, any>,
    yourPlayerId: string,


}

const GameZone: React.FC<GameZoneProps> = ({game: game, players: players, yourPlayerId: yourPlayerId})=> {
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
        <div>
            <b>{`${players[yourPlayerId].displayName}'s Game Board`}</b>
            <div className="grid-container">
                <div className="central-area grid-item">
                    <div>{`${players[yourPlayerId].displayName}'s Dice`}</div>
                    {game.diceArrays[yourPlayerId].map((die, i )=>(
                        <button key={i} value={i} onClick={()=>{handleRoll(yourPlayerId, i)}}><Dice faceValue={die} /></button>
                    ))}
                </div>
                <div className="top-left player-area grid-item">Top Left Player Area</div>
                <div className="top-right player-area grid-item">Top Right Player Area</div>
                <div className="bottom-left player-area grid-item">Bottom Left Player Area</div>
                <div className="bottom-right player-area grid-item">Bottom Right Player Area</div>
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