import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import './SelectPlayer.css'


interface SelectPlayerProps {
    closePopup: () => void;
}

const handleClick = ({playerId}) => {
    console.log("User Id: ", playerId)
}

const SelectPlayer: React.FC<SelectPlayerProps> = ({ closePopup }) => {

    return (
        <div className="popup-container">
            <AnimatePresence>
                <motion.div transition={{ duration: .5 }} animate={{x:0}}initial={{x:250}}
                className="popup-body">
                    <span><b>To whom would you like to gift a random number of dice?</b></span>
                    <div className='playerSelect'>
                        <div className='opponent' value={"1"} onClick={()=> (handleClick({playerId: "1"}))}>1</div>
                        <div className='opponent' value={"2"} onClick={()=> (handleClick({playerId: "2"}))}>2</div>
                        <div className='opponent' value={"3"} onClick={()=> (handleClick({playerId: "3"}))}>3</div>
                    </div>
                    <button onClick={closePopup}>Close</button>
                </motion.div>
            </AnimatePresence>
        </div>
    )
};

export default SelectPlayer;