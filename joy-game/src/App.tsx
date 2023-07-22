import { useEffect, useState } from "react"
import "./App.css"
import Game from "./components/Game.tsx"
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

  const handleRoll = (i: number) =>
  {
    console.log("clicked button", i)
    const randomNum= Math.floor(Math.random() * 6) + 1;

    Rune.actions.updateDie({dieValue:randomNum, dieIndex: i})
    // const updatedGame = {...game, diceArray: [...game.diceArray]}
      //  updatedGame.diceArray[i] = randomNum
      // setGame(updatedGame)
  }
  



  return (
    <>
    {/* <h1>Joy of Coding team</h1> */}
    <div className="logo-container">
    <p>Joy<img className="logoImg" src="src/assets/logo.png" alt="" />Game</p>
    </div>
    
    <div>
      
    </div>

      <div className="card">
        
      </div>   

        <div className="buttons-container">
            {game.diceArray.map((die, i )=>(
                <button className="diceButton" key={i} value={i} onClick={()=>{handleRoll(i)}}><Dice faceValue={die} /></button>
            ))}

        </div>



        <Game />

    </>
  )
}

export default App
