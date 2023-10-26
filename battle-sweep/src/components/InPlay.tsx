import { GameState } from "../helper/Types";

interface InPlayProps {
  game: GameState;
  playerId: string;
  onboarding: boolean;
}

function InPlay({ game, playerId, onboarding }: InPlayProps) {
  if (
    game.playerState[playerId] &&
    game.playerState[playerId].bombsPlaced < game.setBombs &&
    !onboarding
  ) {
    return <div>A Game is Currently in Play</div>;
  }
}

export default InPlay;
