import type {RuneClient} from "rune-games-sdk/multiplayer"
// import {Simulate} from "react-dom/test-utils";
// import play = Simulate.play;

const startingDiceCount = 5

export interface GameState {
  gameDice: number[],
  diceCount:Record<string, number>,
  currentPlayerIndex: number,
  gameOver: boolean
}

type GameActions = {
  // adjustDiceCount: (params: {
  //   playerId: string,
  //   count: number
  //   }) => void,
  updateDiceCount: (params: {
    playerId: string,
    amount: number
    }) => void,
  rollDice: (params: {
    nextIndex: number,
    numDice: number
    }) => void,
  nextPlayer: (params: {
    nextIndex: number
    }) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

export function getCount(game: GameState) {
  return game.currentPlayerIndex
}



Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  setup: (playerIds): GameState => {
    const diceCount = Object.fromEntries(
        playerIds.map((playerId) => [
            playerId,
            startingDiceCount
        ])
    )
    const startingDice = Array.from({ length: startingDiceCount }, () => Math.floor(Math.random() * 6) + 1)

    return {
      gameDice:startingDice,
      diceCount,
      currentPlayerIndex:0,
      gameOver: false
    }
  },
  actions: {
    updateDiceCount: ({playerId, amount}, {game}) => {
      if (game.diceCount[playerId] === undefined) {
        throw Rune.invalidAction(); // incorrect playerId passed to the action
      }
      game.diceCount[playerId] += amount;
    },
    rollDice: ({nextIndex, numDice}, {game}) => {
      game.gameDice = Array.from({length: numDice}, () => Math.floor(Math.random() * 6) + 1)
      // Game checks can happen here

      if (!game.gameOver) {
        game.currentPlayerIndex = nextIndex;
      }
    },
    nextPlayer: ({nextIndex}, {game}) => {
      // console.log("taking turns. Current player index:", game.currentPlayerIndex)
      // console.log("next player index: ", nextIndex)
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