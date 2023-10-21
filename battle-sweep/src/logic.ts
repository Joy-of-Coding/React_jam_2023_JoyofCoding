import type { RuneClient } from "rune-games-sdk/multiplayer"

export interface GameState {
  count: number
}

type GameActions = {
  increment: (params: { amount: number }) => void
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
  setup: (allPlayerIds): GameState => {
    const game = {
      count: null,
      scores: {}
    }
    for (const playerId of allPlayerIds) {
      game.scores[playerId] = 0
    }
    game.count = 0
    return game
    // return { count: 0 }
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount
    },
  },
  events: {
    playerJoined: (playerId, {game}) => {
    game.scores[playerId] = 0
   },
    playerLeft:(playerId, {game}) => {
       delete game.scores[playerId]
    },
  }
})
