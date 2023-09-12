import Dice from "./Dice";
import './MainLayout.css'
import Tile from "./Tile"
import {useEffect, useState} from "react";
import React from "react"



const MainLayout  = () => {

    const dicePool = [ 4,6,8,10,12,20]
    const [diceValue, setDiceValue] = useState(dicePool)
    const [numDice, setNumDice] = useState([0,0,0,0,0,0])

    // const handleNumDiceClick = (position, numDice) => {
    //     let newNumDice = numDice
    //     newNumDice[position] += 1
    //     setNumDice(newNumDice)
    // }



    const rollDice = () => {
        console.log("button clicked")
        let newRoll = []
        dicePool.forEach((faces)=> {
            newRoll.push(Math.floor(Math.random() * faces + 1 ))
        })
        console.log (newRoll)

        setDiceValue(newRoll)
    }



    return (

        <div className="container">
            <div className="top">
                <h2>Dice Roller</h2>
            </div>

            <div className="bottom">
                <h2>Select your dice to roll:</h2>

                <div className="diceHolder">
                    {dicePool.map((faces, i)=>
                        <Dice
                            key = {i}
                            position = {i}
                            value={faces}
                            numDice={numDice[i]}
                           />
                    )}

                </div>

                <div className="rollDiceDiv">
                    <button
                        className="rollDiceButton"
                        onClick={rollDice}
                    >Roll Dice</button>
                </div>


            </div>
            <div className="middle">
                <h2>Roll Result</h2>
                <div className="rollResult">
                    <div className="tileHolder">
                        {diceValue.map((value, index) => (
                            <React.Fragment key={index}>
                                <Tile value={value} />
                                {index !== diceValue.length - 1 && <span> + </span>}
                            </React.Fragment>
                        ))}
                        <span> = </span>
                        <div className="result">
                            <Tile value= {diceValue.reduce((acc, curr) => acc + curr)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default  MainLayout