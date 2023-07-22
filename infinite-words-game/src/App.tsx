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

  const handleRoll=(i: number) => {
      console.log("clicked button",i)
      const randomNum= Math.floor(Math.random() * 6) + 1;

      Rune.actions.updateDie({dieValue: randomNum, dieIndex: i})
      // const updatedGame = {...game, diceArray: [...game.diceArray]}
      //  updatedGame.diceArray[i] = randomNum
      // setGame(updatedGame)
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
            {game.diceArray.map((die, i )=>(
                <button key={i} value={i} onClick={()=>{handleRoll(i)}}><Dice faceValue={die} /></button>
            ))}

        </div>
      <p className="read-the-docs">
        Click on the Vite and Rune logos to learn more
      </p>
    </>
  )
}

export default App
