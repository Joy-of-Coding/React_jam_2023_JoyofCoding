import Dice from "./Dice";
import './MainLayout.css'
import Tile from "./Tile"
import {useEffect, useState} from "react";
import React from "react"



const MainLayout  = () => {
    //changed name of constant to blank_dice Set since this won't change
    const diceSet = [4,6,8,10,12,20]

    //start with 1 d20 blank_dice on in blank_dice pool, and make it a state variable
    const [dicePool, setDicePool] = useState([20])

    //holds the current value of the selected blank_dice from the pool
    const [diceValue, setDiceValue] = useState(dicePool)

    const diceAddClick = (value) => {
        let newDicePool = [...dicePool]
        //splice dice
        newDicePool.splice(0,0,value)
        // newDicePool.push(value)
        setDicePool(newDicePool)
    }

    const diceSubtractClick = (value) => {
        let newDicePool = [...dicePool]
        let index = newDicePool.findIndex((element) => element === value)
        newDicePool.splice(index, 1 )
        setDicePool(newDicePool)
    }

    const rollDice = () => {
        console.log("Rolling Dice")
        if(dicePool.length > 0 ) {
            let newRoll = []
            dicePool.forEach((faces) => {
                newRoll.push(Math.floor(Math.random() * faces + 1))
            })
            setDiceValue(newRoll)
        } else {
            return "No blank_dice selected"
        }
    }



    return (

        <div className="container">
            <div className="top">
                <h2>Dice Roller</h2>
            </div>

            {/*update class name to reflect function, rather than position*/}
            <div className="diceSet">
                <h2>Select your dice to roll:</h2>

                <div className="diceHolder">
                    {diceSet.map((faces, i)=>
                        <>
                        <Dice
                            key = {i}
                            height="80"
                            width="80"
                            value={faces}
                            diceClick={diceAddClick}
                           />
                        </>
                    )}
                </div>

            </div>

            <div className="dicePoolContainer">
                <h2>Click dice to remove, or click Roll</h2>
                <div className="dicePool">
                    {dicePool.map((faces, i) =>
                        <Dice
                            height="48"
                            width="48"
                            key = {i}
                            value={faces}
                            diceClick={diceSubtractClick}
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


            <div className="resultContainer">
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