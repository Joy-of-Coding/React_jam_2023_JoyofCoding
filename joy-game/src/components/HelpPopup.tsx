// import React from 'react';
// import "./HelpPopup.css"



// export const HelpPopup = ({closePopup}) => {
//     return (
//         <div className="popup-container">
//             <div className="popup-body">
//                 <h1> Gameplay </h1>
//                 <h2> Object of the Game </h2>
//                 <p> Be the first player to have zero dice. </p>
//                 <h2> Gampplay Loop </h2>
//                 <p> Each turn, players roll all of their dice. Each die roll causes diffirent results.</p>
//                 <ul><b>Balloons:</b>These dice are removed from the game, as Balloons float away.</ul>
//                 <ul><b>Gifts:</b>These dice are given to any other player of your choice. If multiple Gifts are rolled, those dice can be given to the same player or split amoung multiple players.</ul>
//                 <ul><b>Noisemakers:</b>These dice are compared with the amount of Noisemakers that the previous player rolled. If they have more Noisemakers than you, they must pass you the difference. </ul>


//                 {/* <h1>{text}</h1> */}
                
//                 <button onClick={closePopup}>Close</button>
//             </div>
//         </div>
//     );
// };

// export default HelpPopup;


import React from 'react';
import './HelpPopup.css';
import { motion,AnimatePresence} from "framer-motion"


interface HelpPopupProps {
  closePopup: () => void;
}

export const HelpPopup: React.FC<HelpPopupProps> = ({ closePopup }) => {
  return (
    <div className="popup-container">
      <AnimatePresence>
      <motion.div transition={{ duration: .5 }} animate={{x:0}}initial={{x:250}}


      className="popup-body">
            <h1> Share the Joy </h1>
            <h2> Object of the Game </h2>
            <p> Be the first player to have zero dice. </p>
            <h2> How To Play </h2>
            <p> When it is your turn, click the green "roll" button</p>
            <p>Click on the dice to resolve them:
            Pop the balloons to remove them from the game,
            Send the gifts forward to the next player</p>
            <p> When theres nothing but confetti left, click the red "end turn" button</p>
        <button onClick={closePopup}>Close</button>
      </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HelpPopup;
