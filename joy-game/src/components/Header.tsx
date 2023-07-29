import "./Header.css"

interface HeaderProps {
    displayName: string;
}

const Header: React.FC<HeaderProps> =({ displayName }) => {
    


    return (


        <div className='player-gameboard-title'>
            <p>{`${displayName}'s Game Board`}</p>
        </div>
        
          
                
                

        
    );
};

export default Header;
