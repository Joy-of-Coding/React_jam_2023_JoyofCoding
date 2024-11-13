import React from 'react';
import './SpectatorList.css';

interface SpectatorListProps {
    spectators: string[];
    players: Record<string, { playerId: string, displayName: string, avatarUrl: string }>;
    yourPlayerId: string | undefined;
}

const SpectatorList: React.FC<SpectatorListProps> = ({ spectators, players, yourPlayerId }) => {
    if (spectators.length === 0) return null;

    return (
        <div className="spectator-list">
            <h3>Spectators:</h3>
            <div className="spectator-avatars">
                {spectators.map(spectatorId => (
                    <div key={spectatorId} className="spectator-avatar">
                        <img src={players[spectatorId].avatarUrl} alt={players[spectatorId].displayName} />
                        <span>{players[spectatorId].displayName}</span>
                    </div>
                ))}
            </div>
            {yourPlayerId && !spectators.includes(yourPlayerId) && (
                <button onClick={() => Rune.actions.toggleSpectator({ playerId: yourPlayerId })}>
                    Become Spectator
                </button>
            )}
            {yourPlayerId && spectators.includes(yourPlayerId) && (
                <button onClick={() => Rune.actions.toggleSpectator({ playerId: yourPlayerId })}>
                    Join Game
                </button>
            )}
        </div>
    );
};

export default SpectatorList;