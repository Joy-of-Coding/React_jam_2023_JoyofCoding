import './Header.css'
import {GameState} from "../logic.ts";

interface HeaderProps {

    game: GameState;
}
const Header = ({ game}: HeaderProps) => (
    <div className="header">
     <h3>Battle Sweeper</h3>
        {game.setBombs}
    </div>
);

export default Header;