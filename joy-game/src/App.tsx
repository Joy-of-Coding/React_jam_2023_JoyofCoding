import { useEffect, useState } from "react"
import reactLogo from "./assets/rune.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import Game from "./components/Game.tsx"
import { GameState } from "./logic.ts"

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

  return (
    <>

        <Game />

    </>
  )
}

export default App
