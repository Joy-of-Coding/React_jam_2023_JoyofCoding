import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import './SelectPlayer.css'
import paper from "../assets/sounds/082229_pinkie-pie-39surprise39wav-86428.mp3"




interface SelectPlayerProps {
    yourPlayerId: string | undefined,
    playerIds: (string  | undefined)[]
    closePopup: () => void;
    players: Record<string, { playerId: string, displayName: string, avatarUrl: string }>,
    selectedDieIndex: number
}



const SelectPlayer: React.FC<SelectPlayerProps> = ({ yourPlayerId, playerIds, closePopup, players , selectedDieIndex}) => {

    const handleClick = ({playerId}: {playerId: string, closePopup: () => void}) => {
        //console.log("User Id: ", playerId)
        closePopup();
        Rune.actions.giveGifts({playerId: yourPlayerId, opponentId: playerId, dieIndex: selectedDieIndex})
        const paperAudio = new Audio(paper)
        paperAudio.play()
    }

    return (
        <div className="popup-container">
            <AnimatePresence>
                <motion.div transition={{ duration: .5 }} animate={{x:0}}initial={{x:250}}
                className="popup-body">
                    <span><b>To whom would you like to gift a random number of dice (including taking some away)?</b></span>

                    <div className='playerSelect'>

                        {playerIds.map((playerId, i) => {
                                if (playerId !== undefined && playerId != yourPlayerId) {
                                    return (
                                        <div  className="opponent avatar-container "
                                           key={i} onClick={() => handleClick({playerId: playerId, closePopup: closePopup}) }>
                                            <motion.img animate={{x:[3,-3,3]}}
                                            transition={{
                                                duration: 2.5,
                                                ease: "easeInOut",
                                               
                                                repeat: Infinity,
                                                repeatDelay: 0
                                              }} 
                                            
                                            alt='player-avator'  className='player-avatar' src={players[playerId].avatarUrl}></motion.img>
                                            <p className='opponent-name'>{players[playerId].displayName.split(" ")[0]}</p>
                                        </div>
                                    )
                            } else {
                                return null;
                            }
                        })}
                    </div>
                    {/*<button onClick={closePopup}>Close</button>*/}
                </motion.div>
            </AnimatePresence>
        </div>
    )
};

export default SelectPlayer;