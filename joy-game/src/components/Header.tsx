import {useState} from  'react'
import {HelpPopup} from './HelpPopup.tsx'
import {motion} from "framer-motion";

interface HeaderProps {
    displayName: string;
}

const Header: React.FC<HeaderProps> =({ displayName }) => {
    const [open, setOpen] = useState(false);


    return (
        <div className='header-container'>
                {open && <HelpPopup closePopup={() => setOpen(false)} />
                    }
                <button className="help-button"  onClick={() => setOpen(true)}>?</button>
                {/*Wrapped this title in Motion to format header space better*/}
            <div style={{ flex: 1, textAlign: 'center' }}>
            <motion.b transition={{ duration: 1.2 }} animate={{y:20}} initial={{y:-150}} className='player-gameboard-title'>{`${displayName}'s Game Board`}</motion.b>
            </div>
                <div className='challenge-dice'>Challenge Dice Go here</div>
        </div>
    );
};

export default Header;
