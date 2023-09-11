import './Dice.css'
import Icosahedron from "./polyhedrons/Icosahedron";


const Dice = ({value}) => {
    return (
        value === 20 ? <Icosahedron/> :

            <div className="dice">
                {value}
            </div>

    )
}

export default Dice