

interface HeaderProps {
    displayName: string;
}
const Header = ({displayName}) => {
    return (
        <div>
                <button onClick={()=>{console.log("help!")}}>?</button>
                <div className='player-gameboard-title'>{`${displayName}'s Game Board`}</div>

        </div>
    );
};

export default Header;
