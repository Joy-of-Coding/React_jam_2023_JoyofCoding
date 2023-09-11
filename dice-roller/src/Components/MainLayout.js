import Dice from "./Dice";
import './MainLayout.css'
import Tile from "./Tile"
import { useState} from "react";
import React from "react"



const MainLayout  = () => {

    const dicePool = [ 6,6,6,6,6,6]
    const [diceValue, setDiceValue] = useState(dicePool)

    const rollDice = () => {
        console.log("button clicked")
        let newRoll = []
        dicePool.forEach((faces)=> {
            newRoll.push(Math.floor(Math.random() * faces + 1 ))
        })
        console.log (newRoll)

        setDiceValue(newRoll)
    }

    // const DiceResult = ({ diceValue }) => {
    //     return (
    //         <div>
    //             {diceValue.map((value, index) => (
    //                 <React.Fragment key={index}>
    //                     <Dice value={value} />
    //                     {index !== diceValue.length - 1 && <span> + </span>}
    //                 </React.Fragment>
    //             ))}
    //         </div>
    //     );
    // };


    return (

        <div className="container">
            <div className="top">
                <h2>Top Container</h2>
            </div>
            <div className="middle">
                <h2>Middle Container</h2>
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
            <div className="bottom">
                <h2>Bottom Container</h2>

                <div className="diceHolder">
                    {diceValue.map((faces, i)=>
                        <Dice key = {i} value={faces} />
                    )}

                </div>

                <div className="rollDiceDiv">
                    <button
                        className="rollDiceButton"
                        onClick={rollDice}
                    >Roll Dice</button>
                </div>


            </div>
        </div>
    )
}
export default  MainLayout