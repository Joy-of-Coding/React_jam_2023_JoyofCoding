import "./Header.css"
import {motion} from "framer-motion";


interface HeaderProps {
    displayName: string;
    challengeCounter: number;
    challengeStatus: boolean;
}

const Header: React.FC<HeaderProps> =({ displayName, challengeCounter, challengeStatus }) => {
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


                {/*Challenge Zone*/}
                <div className='challenge-dice'>
                    {challengeStatus &&
                        <div style={{fontSize: '30px'}}>&#x1F6E1;</div>
                    }
                    {challengeCounter >0 &&
                        <div className='challenge-notification'>
                           <span className='challenge-counter'>
                                {challengeCounter}
                           </span>
                        </div>
                    }
                </div>
        </div>
    );
};

export default Header;
