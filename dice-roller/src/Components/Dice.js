import './Dice.css'

import d20Blue  from "../assets/blank_dice/d20-blue-blank.png"
import d20Line from "../assets/blank_dice/d20-lineart-blank.png"
import d12Line from "../assets/blank_dice/d12-lineart-blank.png"
import d12Green from "../assets/blank_dice/d12-green-blank.png"
import d10Line from "../assets/blank_dice/d10-lineart-blank.png"
import d10Orange from "../assets/blank_dice/d10-orange-blank.png"
import d8Line from "../assets/blank_dice/d8-lineart-blank.png"
import d8Purple from "../assets/blank_dice/d8-purple-blank.png"
import d6Line from "../assets/blank_dice/d6-lineart-blank.png"
import d6Red from "../assets/blank_dice/d6-red-blank.png"
import d4Line from "../assets/blank_dice/d4-lineart-blank.png"
import d4Yellow from "../assets/blank_dice/d4-yellow-blank.png"
import {useState} from "react";

const Dice = ({value, diceClick, height, width}) => {
    const [style, setStyle] = useState("color")

    const handleClick = () => {
        console.log("Clicked d" ,value)
        diceClick(value)
    }

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


    return (
            <div onClick={handleClick}
                  className="dice">
                <div className="diceImage">
                    <img  height={parseInt(height, 10)} width={parseInt(width, 10)}  src={diceObject[value].color} alt={`d${value}`}></img>
                </div>
                {value &&
                    <div className="diceValue">d{value}</div>
                }
            </div>
    )
}

export default Dice