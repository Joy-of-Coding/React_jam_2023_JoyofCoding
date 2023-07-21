import type { RuneClient } from "rune-games-sdk/multiplayer"

export interface GameState {
  count: number,
  die1: number
}

type GameActions = {
  increment: (params: { amount: number }) => void,
  randomize: (params: {value: number}) => void
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
  setup: (): GameState => {
    return {
      count: 0,
      die1: 2
    }
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount
    },
    randomize: ({value}, {game}) => {
      game.die1 = value
    }
  },
  events: {
    playerJoined: () => {
      // Handle player joined
    },
    playerLeft() {
      // Handle player left
    },
  },
})
    // = Math.floor(Math.random() * 6) + 1;