import React from 'react';
import './HelpPopup.css';
import { motion } from "framer-motion"
import "./Credits.css"


interface Credits {
  closePopup: () => void;
}

export const Credits: React.FC<Credits> = ({ closePopup }) => {
  return (

  
        
    <div className="credits-container">
      
      <motion.div transition={{ duration: .5 }} animate={{x:0,opacity:1}}initial={{x:250}}

      className="popup-credit">

    <div className='credits'>


        <h1>Development Team</h1>

            <motion.p transition={{ duration: .5, delay:.5 }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>Game Producer / Additional Development: Katrina Wright</motion.p> 
            <motion.p transition={{ duration: .5, delay:1  }} animate={{x:0,opacity: 100}}initial={{x:'100vw',opacity:0}}>Head Engineer: Patrick McLain</motion.p> 
            <motion.p transition={{ duration: .5, delay:1.5  }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>Peer Mentor / Engineer : Dr. Suzanne Atkinson</motion.p> 
            <motion.p transition={{ duration: .5, delay:2  }} animate={{x:0,opacity: 100}}initial={{x:'100vw',opacity:0}}>UI Help / Developer: Andrew Salas</motion.p> 
            <motion.p transition={{ duration: .5, delay:2.5  }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>Developer: Julio D. Chavez</motion.p>
            <motion.p transition={{ duration: .5, delay:3  }} animate={{x:0,opacity: 100}}initial={{x:'100vw',opacity:0}}>Developer: Thomas Lee</motion.p>
            <motion.p transition={{ duration: .5, delay:3.5  }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>Tester: Adam Herman</motion.p>
            <motion.p transition={{ duration: .5, delay:4  }} animate={{x:0,opacity: 100}}initial={{x:'100vw',opacity:0}}>Tester: David Neil</motion.p>
            <motion.p transition={{ duration: .5, delay:4.5  }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>Project Consultant: Dr. Dana Wortman</motion.p> 
           
            <motion.button  whileHover={{ scale: 1.1 }} onClick={closePopup}>Close</motion.button>

        </div>
      
        {/* <button onClick={closePopup}>Credits</button> to add credits */}
      </motion.div>
      
    </div>
   
  );
};

export default Credits;
