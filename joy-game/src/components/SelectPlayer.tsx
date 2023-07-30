import React from "react";
import {AnimatePresence, motion} from "framer-motion";


interface SelectPlayerProps {
    closePopup: () => void;
}

const SelectPlayer: React.FC<SelectPlayerProps> = ({ closePopup }) => {

    return (
        <div className="popup-container">
            <AnimatePresence>
                <motion.div transition={{ duration: .5 }} animate={{x:0}}initial={{x:250}}
                className="popup-body">
                    <h2>Choose who to share your cake with! </h2>
                    <button onClick={closePopup}>Close</button>
                </motion.div>
            </AnimatePresence>
        </div>
    )
};

export default SelectPlayer;