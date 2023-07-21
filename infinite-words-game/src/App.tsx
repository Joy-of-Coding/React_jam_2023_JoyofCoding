import { useEffect, useState } from "react"
import "./App.css"
import { GameState } from "./logic.ts"
import Dice from "./components/Dice";

function App() {
  const [game, setGame] = useState<GameState>()
  useEffect(() => {
    Rune.initClient({
      onChange: ({ newGame }) => {
        setGame(newGame)
      },
    })
  }, [])



  if (!game) {
    return <div>Loading...</div>
  }

  const handleRoll=() => {
      const randomNum= Math.floor(Math.random() * 6) + 1;
      Rune.actions.randomize({ value: randomNum })
  }

  return (
    <>
      <h1>Joy of Coding team</h1>
      <h2>infinite-words-game</h2>
      <div className="card">
        <button onClick={() => Rune.actions.increment({ amount: 1 })}>
          count is {game.count}
        </button>
      </div>
        <div>
            <button onClick={handleRoll}><Dice faceValue={game.die1} /></button>
        </div>
      <p className="read-the-docs">
        Click on the Vite and Rune logos to learn more
      </p>
    </>
  )
}

export default App
