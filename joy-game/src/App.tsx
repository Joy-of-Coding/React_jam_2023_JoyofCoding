import { useEffect, useState } from "react"
import React from "react";
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

  const handleRoll = (i: number) =>
  {
    console.log("clicked button", i)
    const randomNum= Math.floor(Math.random() * 6) + 1;
    Rune.actions.updateDie({dieValue:randomNum, dieIndex: i})

  }
  



  return (
    <>
      <div className="card">
      <div>
        <h4>
          {yourPlayerId ? (
              <>My count: {game.counters[yourPlayerId]}</>
          ) : (
              <>I am a spectator, so I don't have count</>
          )}
        </h4>

        <h4>Other Player counts</h4>
        {Object.keys(players)
            .filter((playerId) => playerId !== yourPlayerId)
            .map((playerId) => (
                <React.Fragment key={playerId}>
                  {players[playerId].displayName} count: {game.counters[playerId]}
                </React.Fragment>
            ))}

        {yourPlayerId ? (
            <>
              <button
                  className="increment"
                  onClick={() =>
                      Rune.actions.changeCounter({ amount: 1, playerId: yourPlayerId })
                  }
              >
                +
              </button>

              <button
                  className="decrement"
                  onClick={() =>
                      Rune.actions.changeCounter({ amount: -1, playerId: yourPlayerId })
                  }
              >
                -
              </button>
            </>
        ): <>Spectators are not able to call actions</>}

      </div>


      <div className="card">
        <button onClick={() => Rune.actions.increment({ amount: 1 })}>
          count is {game.count}
        </button>
      </div>   

        <div>
            {game.diceArray.map((die, i )=>(
                <button key={i} value={i} onClick={()=>{handleRoll(i)}}><Dice faceValue={die} /></button>
            ))}

        </div>
      </div>
    </>
  )
}

export default App
