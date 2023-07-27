import { useEffect, useState } from "react"
import "./App.css"
import type { Players, PlayerId } from "rune-games-sdk/multiplayer"
import { GameState } from "./logic.ts"
import GameZone from "./components/GameZone";

function App() {
  const [game, setGame] = useState<GameState>()
  const [players, setPlayers] = useState<Players>({})
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId>()


    // const checkForFives = (diceArray: number[]) => {
    //     const countFives = diceArray.reduce((count, element) => {
    //         if (element === 5) {
    //             return count + 1;
    //         }
    //         return count;
    //     }, 0);
    //     if (countFives > 0) {
    //         // Rune.actions.removeDie(yourPlayerId, countFives)
    //         console.log("The array contains one or more occurrences of 5.");
    //         console.log("Number of 5s:", countFives);
    //     } else {
    //         console.log("The array does not contain 5.");
    //     }
    // }

    // const isGameOver=(game: GameState)=>{
    //     const playersWithZeroDice = Object.entries(game.diceCount)
    //         .filter(([playerId, count]) => count === 0)
    //         .map(([playerId]) => playerId);
    //
    //     if (playersWithZeroDice.length > 1) {
    //         console.log("More than one player has 0 dice.");
    //         console.log("Player IDs:", playersWithZeroDice);
    //         // Rune.gameOver()
    //     } else if (playersWithZeroDice.length === 1) {
    //         console.log("Only one player has 0 dice.");
    //         console.log("Player ID:", playersWithZeroDice[0]);
    //
    //         Rune.actions.gameOver({playerIds: playersWithZeroDice})
    //     } else {
    //         console.log("No player has 0 dice.");
    //     }
    // }

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
