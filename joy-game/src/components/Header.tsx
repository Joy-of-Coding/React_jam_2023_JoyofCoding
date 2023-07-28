import React, {useState} from  'react'
import {HelpPopup} from './HelpPopup.tsx'

interface HeaderProps {
    displayName: string;
}
const Header = ({ displayName }) => {
    const [open, setOpen] = useState(false);


    return (
        <div>
                {open && <HelpPopup closePopup={() => setOpen(false)} />
                    }
                <button onClick={() => setOpen(true)}>?</button>
                
                <div className='player-gameboard-title'>{`${displayName}'s Game Board`}</div>

        </div>
    );
};

export default Header;
