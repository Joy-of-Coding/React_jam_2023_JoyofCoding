

interface HeaderProps {
    displayName: string;
}
const Header = ({displayName}) => {
    return (
        <div>

                <div className='player-gameboard-title'>{`${displayName}'s Game Board`}</div>

        </div>
    );
};

export default Header;
