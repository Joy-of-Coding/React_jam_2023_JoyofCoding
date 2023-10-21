import { useEffect, useState } from "react"
import reactLogo from "./assets/rune.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { GameState } from "./logic.ts"

function App() {
  const [game, setGame] = useState<GameState>()

  const [timer, setTimer] = useState(60) //Added timer to countdown

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game }) => {
        setGame(game)
      },
    })

    // Start the countdown timer when the component mounts
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1) //Decrement the timer directly
      }
    }, 1000) // Timer will decrement every 1 second

    // Clean up the timer when the component unmounts
    return () => clearInterval(interval)
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://developers.rune.ai" target="_blank">
          <img src={reactLogo} className="logo rune" alt="Rune logo" />
        </a>
      </div>
      <h1>Vite + Rune</h1>
      <div className="card">
        <button onClick={() => Rune.actions.increment({ amount: 1 })}>
          count is {game.count}
        </button>
        <p>Timer: {timer} second(s)</p>
        <p>
          Edit <code>src/App.tsx</code> or <code>src/logic.ts</code> and save to
          test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and Rune logos to learn more
      </p>
    </>
  )
}

export default App
