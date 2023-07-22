import { useEffect, useState } from "react"
import "./App.css"
import type { Players, PlayerId } from "rune-games-sdk/multiplayer"
import { GameState } from "./logic.ts"
import Dice from "./components/Dice";

function App() {
  const [game, setGame] = useState<GameState>()
  const [players, setPlayers] = useState<Players>({})
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId>()


  useEffect(() => {
    Rune.initClient({
          onChange: ({ newGame,players, yourPlayerId }) => {
            {
              setGame(newGame)
              setPlayers(players)
              setYourPlayerId(yourPlayerId)
            }
          },
        }
    )
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  const handleRoll = (playerId:string, i: number) =>
  {
    console.log("clicked button", i)
    const randomNum= Math.floor(Math.random() * 6) + 1;
    Rune.actions.updatePlayerDie({playerId: playerId, dieValue: randomNum, dieIndex: i})
  }


  return (
    <>
      <div className="card">
        <h4>
          {yourPlayerId ? (
              <><h3><span>{players[yourPlayerId].displayName}</span></h3>
                  <div>
                  {game.diceArrays[yourPlayerId].map((die, i )=>(
                      <button key={i} value={i} onClick={()=>{handleRoll(yourPlayerId, i)}}><Dice faceValue={die} /></button>
                  ))}
              </div>
              </>
          ) : (
              <>I am a spectator, so I don't have count</>
          )}
        </h4>

        <h4>Other Player's Dice Counts</h4>
        {Object.keys(players)
            .filter((playerId) => playerId !== yourPlayerId)
            .map((playerId) => (
                <div key={playerId}>
                  {players[playerId].displayName} Dice: {game?.diceArrays[playerId].length}
                </div>
            ))}

        {/*{yourPlayerId ? (*/}
        {/*    <>*/}

        {/*      <button*/}
        {/*          className="increment"*/}
        {/*          onClick={() =>*/}
        {/*              Rune.actions.changeCounter({ amount: 1, playerId: yourPlayerId })*/}
        {/*          }*/}
        {/*      >*/}
        {/*        +*/}
        {/*      </button>*/}

        {/*      <button*/}
        {/*          className="decrement"*/}
        {/*          onClick={() =>*/}
        {/*              Rune.actions.changeCounter({ amount: -1, playerId: yourPlayerId })*/}
        {/*          }*/}
        {/*      >*/}
        {/*        -*/}
        {/*      </button>*/}
        {/*    </>*/}
        {/*): <>Spectators are not able to call actions</>}*/}

      </div>
    </>
  )
}

export default App
