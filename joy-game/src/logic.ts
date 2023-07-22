import type { RuneClient } from "rune-games-sdk/multiplayer"

export interface GameState {
  count: number, 
  // die1: number,
  diceArray: number[]
}

type GameActions = {
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
  setup: (): GameState => {
    return {
      count: 0,
      diceArray: [1,2,6,5,4]
      // ,
      // die1: 2
    }
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount
    },
    updateDie: ({dieValue, dieIndex}, {game}) => {
      game.diceArray[dieIndex] = dieValue
    }
      // ,
    // rollDice: ({}, { game }) => {
    //   game.diceArray = game.diceArray.slice().map(() => Math.floor(Math.random() * 6) + 1);
    // }
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
