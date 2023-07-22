import type { RuneClient } from "rune-games-sdk/multiplayer"

export interface GameState {
  count: number,
  diceArrays: Record<string,number[]>,
  counters:Record<string, number>
}

type GameActions = {
  changeCounter: (params: {
    playerId: string;
    amount: number;
  }) => void;
  increment: (params: { amount: number }) => void,
  updatePlayerDie: (params: {playerId: string, dieValue: number, dieIndex: number}) => void
  // ,
  // rollDice: () => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

export function getCount(game: GameState) {
  return game.count
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  setup: (playerIds): GameState => {
    const diceArrays = Object.fromEntries(
        playerIds.map((playerId) => [
          playerId,
          Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1),
        ])
    );

    return {
      count: 0,
      counters: Object.fromEntries(playerIds.map(playerId => [playerId, 0])),
      diceArrays,
    }
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount
    },
    updatePlayerDie: ({playerId, dieValue, dieIndex },{game}) => {
      game.diceArrays[playerId][dieIndex] = dieValue
    },
    changeCounter({playerId, amount}, {game}) {
      if (game.counters[playerId] === undefined) {
        throw Rune.invalidAction(); // incorrect playerId passed to the action
      }
      game.counters[playerId] += amount;
    }
  },
  events: {
    playerJoined: (playerId, {game}) => {
      game.counters[playerId] = 0;
      game.diceArrays[playerId]=Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1)
    },
    playerLeft(playerId, {game}) {
      delete game.counters[playerId];
      delete game.diceArrays[playerId];
    },
  }
})
