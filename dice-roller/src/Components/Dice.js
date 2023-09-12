import './Dice.css'

import d20Blue  from "../assets/dice/d20-blue-blank.png"
import d20Line from "../assets/dice/d20-lineart-blank.png"
import d12Line from "../assets/dice/d12-lineart-blank.png"
import d12Green from "../assets/dice/d12-green-blank.png"
import d10Line from "../assets/dice/d10-lineart-blank.png"
import d10Orange from "../assets/dice/d10-orange-blank.png"
import d8Line from "../assets/dice/d8-lineart-blank.png"
import d8Purple from "../assets/dice/d8-purple-blank.png"
import d6Line from "../assets/dice/d6-lineart-blank.png"
import d6Red from "../assets/dice/d6-red-blank.png"
import d4Line from "../assets/dice/d4-lineart-blank.png"
import d4Yellow from "../assets/dice/d4-yellow-blank.png"
import {useState} from "react";

const Dice = ({value, position, numDice, diceClick}) => {
    const [style, setStyle] = useState("color")
    // const [thisDiceNum, setThisDiceNum] = useState(numDice)

    // const handleClick = () => {
    //     console.log("Clicked d" , {value})
    //     let newNum = numDice
    //     setThisDiceNum(newNum+1)
    //     diceClick(value, numDice)
    // }

    const diceObject = {
        20: {
            color: d20Blue,
            line: d20Line
        },
        12: {
            color: d12Green,
            line: d12Line
        },
        10: {
            color: d10Orange,
            line: d10Line
        },
        8: {
            color: d8Purple,
            line: d8Line
        },
        6: {
            color: d6Red,
            line: d6Line
        },
        4: {
            color: d4Yellow,
            line: d4Line
        }
    };


    console.log(diceObject);

    console.log(diceObject[value].color)

    return (
            <div
                  className="dice">
                <div className="diceImage">
                    <img  height="64" width="64" src={diceObject[value].color} alt={`d${value}`}></img>
                </div>
               <div className="diceValue">d{value}</div>
                {/*<div className="numDice">{numDice}</div>*/}
            </div>
    )
}

export default Dice