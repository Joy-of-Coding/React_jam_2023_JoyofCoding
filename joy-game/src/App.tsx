import { useEffect, useState } from "react"
import "./App.css"
import type { Players, PlayerId } from "rune-games-sdk/multiplayer"
import { GameState } from "./logic.ts"
import GameZone from "./components/GameZone";

function App() {
  const [game, setGame] = useState<GameState>()
  const [players, setPlayers] = useState<Players>({})
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId>()

  useEffect(() => {
    Rune.initClient({
          onChange: ({ newGame, players, yourPlayerId }) => {
              setGame(newGame)
              setPlayers(players)
              setYourPlayerId(yourPlayerId)
              console.log("onchange occurred")

          },
        }
    )
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    <>
      <GameZone game={game} players={players} yourPlayerId={yourPlayerId} numPlayers={0} playerIds={[]} avatarUrl={""}/>

      {/* <div className="card">

        <h4>Other Player's Dice Counts</h4>
        {Object.keys(players)
            .filter((playerId) => playerId !== yourPlayerId)
            .map((playerId) => (
                <div key={playerId}>
                  {players[playerId].displayName} Dice: {game?.diceCount[playerId]}
                </div>
            ))}

      </div> */}
    </>
  )
}

export default App
