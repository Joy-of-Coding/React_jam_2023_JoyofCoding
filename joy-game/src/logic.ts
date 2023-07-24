import type { RuneClient } from "rune-games-sdk/multiplayer"
// import {Simulate} from "react-dom/test-utils";
// import play = Simulate.play;

const startingDiceCount = 10

export interface GameState {
  gameDice: number[],
  count: number,
  diceCount:Record<string, number>,
  currentPlayerIndex: number
}

type GameActions = {
adjustDiceCount: (params: {
  playerId: string,
  count: number
  }) => void,
  rollDice: (params: {
    numPlayers: number
  }) => void,
  nextPlayer: (params: {
    nextIndex: number
  }) => void
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
    const diceCount = Object.fromEntries(
        playerIds.map((playerId) => [
            playerId,
            startingDiceCount
        ])
    )
    const gameDice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1)

    return {
      gameDice,
      diceCount,
      currentPlayerIndex:0,
      count: 0,
      counters: Object.fromEntries(playerIds.map(playerId => [playerId, 0])),
      diceArrays,
    }
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount
    },
    updateDiceCount({playerId, amount}, {game}) {
      if (game.diceCount[playerId] === undefined) {
        throw Rune.invalidAction(); // incorrect playerId passed to the action
      }
      game.diceCount[playerId] += amount;
    },
    rollDice: ({ nextIndex}, {game}) => {
      game.gameDice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1)
      //Game checks can happen here
      Rune.actions.nextPlayer({nextIndex: nextIndex})
    },
    nextPlayer: ({nextIndex}, {game}) => {
      console.log("taking turns. Current player index:", game.currentPlayerIndex)
      console.log("next player index: ", nextIndex)
      game.currentPlayerIndex = nextIndex;
    }
  },
  events: {
    playerJoined: (playerId, {game}) => {
      game.diceCount[playerId] = startingDiceCount;
    },
    playerLeft(playerId, {game}) {
      delete game.diceCount[playerId];
    },
  }
})
