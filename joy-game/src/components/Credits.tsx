

import React from 'react';
import './HelpPopup.css';
import { motion} from "framer-motion"
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

           
            <motion.p transition={{ duration: .5, delay:.5 }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>Project Lead: Katrina Wright</motion.p> 
            <motion.p transition={{ duration: .5, delay:1  }} animate={{x:0,opacity: 100}}initial={{x:'100vw',opacity:0}}>Head Engineeer: Suzanne Atkinson</motion.p> 
            <motion.p transition={{ duration: .5, delay:1.5  }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>Head UI/UX Engineer: Joel Davila</motion.p> 
            <motion.p transition={{ duration: .5, delay:2  }} animate={{x:0,opacity: 100}}initial={{x:'100vw',opacity:0}}>Artist: Kassandra "Chase" Tramel</motion.p> 
            <motion.p transition={{ duration: .5, delay:2.5  }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>Project Consultant: Dr. Dana</motion.p> 
            

            <div className='developers'>
                <div className='software-developers'>
                <motion.h3 transition={{ duration: .5, delay:2.7  }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>Developers: </motion.h3>
                
                    <motion.p transition={{ duration: .5, delay:3  }} animate={{x:0,opacity: 100}}initial={{x:'100vw',opacity:0}}>Alyssa</motion.p> 
                    <motion.p transition={{ duration: .5, delay:3.5  }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>Andrew Salas</motion.p> 
                    <motion.p transition={{ duration: .5, delay:4  }} animate={{x:0,opacity: 100}}initial={{x:'100vw',opacity:0}}>Kassandra "Chase" Tramel</motion.p> 
                    <motion.p transition={{ duration: .5, delay:4.5  }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>Katrina Wright</motion.p> 
                    <motion.p transition={{ duration: .5, delay:5  }} animate={{x:0,opacity: 100}}initial={{x:'100vw',opacity:0}}>Joel Davila</motion.p> 

                </div>

                <div className='testers'>
                <motion.h3 transition={{ duration: .5, delay:5.2 }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>Game Testers:</motion.h3>
                <motion.p transition={{ duration: .5, delay:5.5  }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>David Neil</motion.p>
                <motion.p transition={{ duration: .5, delay:6  }} animate={{x:0,opacity: 100}}initial={{x:'100vw',opacity:0}}>historyJen</motion.p> 
                <motion.p transition={{ duration: .5, delay:6.5  }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>Michela</motion.p> 
                <motion.p transition={{ duration: .5, delay:7  }} animate={{x:0,opacity: 100}}initial={{x:'100vw',opacity:0}}>Priscilla</motion.p>  
                <motion.p transition={{ duration: .5, delay:7.5  }} animate={{x:0,opacity: 100}}initial={{x:'-100vw',opacity:0}}>JeanMarie McCormack</motion.p>  

                </div>

            </div>
            
            




            <motion.button  whileHover={{ scale: 1.1 }} onClick={closePopup}>Close</motion.button>

        </div>
      
        {/* <button onClick={closePopup}>Credits</button> to add credits */}
      </motion.div>
      
    </div>
   
  );
};

export default Credits;
