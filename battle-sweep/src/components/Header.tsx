import './Header.css'
import {GameState} from "../logic.ts";

interface HeaderProps {
    players: Record<
        string,
        { playerId: string; displayName: string; avatarUrl: string }
    >;
    playerId: string;
    game: GameState;
    display: boolean;
}
const Header = ({playerId, game, display}) => (
    <div className="header">
     <h3>Battle Sweeper</h3>
    </div>
);

export default Header;