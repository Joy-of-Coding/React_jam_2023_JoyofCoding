import type { RuneClient } from "rune-games-sdk/multiplayer"

export interface GameState {
  count: number, 
  // die1: number,
  diceArray: number[],
  counters:Record<string, number>
}

type GameActions = {
  changeCounter: (params: {
    playerId: string;
    amount: number;
  }) => void;
  increment: (params: { amount: number }) => void, 
  updateDie: (params: {dieValue: number, dieIndex: number}) => void
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
    return {
      count: 0,
      diceArray: [1,2,6,5,4],
      counters: Object.fromEntries(playerIds.map(playerId => [playerId, 0]))
    }
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount
    },
    updateDie: ({dieValue, dieIndex}, {game}) => {
      game.diceArray[dieIndex] = dieValue
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
    },
    playerLeft(playerId, {game}) {
      delete game.counters[playerId];
    },
  }
})
