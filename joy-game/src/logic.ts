import type {RuneClient} from "rune-games-sdk/multiplayer"
// import {Simulate} from "react-dom/test-utils";
// import play = Simulate.play;

const startingDiceCount = 10

export interface GameState {
  gameDice: number[],
  diceCount:Record<string, number>,
  currentPlayerIndex: number,
  gameOver: boolean
}

type GameActions = {
adjustDiceCount: (params: {
  playerId: string,
  count: number
  }) => void,
  rollDice: (params: {
    nextIndex: number,
    numDice: number
  }) => void,
  nextPlayer: (params: {
    nextIndex: number
  }) => void
}

const countOccurrences = ( array: number[], compare: number, currentPlayerId:string , targetPlayerId: string) => {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === compare) {
      count += 1;
    }
  }
  console.log(count)

  if (compare === 5) {
    Rune.actions.updateDiceCount({playerId: currentPlayerId, amount: -count});
  }
  return count;
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
    increment: ({ amount }, { game }) => {
      game.count += amount
    },
    updateDiceCount({playerId, amount}, {game}) {
      if (game.diceCount[playerId] === undefined) {
        throw Rune.invalidAction(); // incorrect playerId passed to the action
      }
      console.log("updating dice count:", playerId, amount)
      game.diceCount[playerId] += amount;
    },
    rollDice: ({ playerId, nextIndex, numDice}, {game}) => {
      game.gameDice = Array.from({length: numDice}, () => Math.floor(Math.random() * 6) + 1)
      // Game checks can happen here

      //check for fives
      countOccurrences(game.gameDice, 5, playerId, null);


      if (!game.gameOver) {
        game.currentPlayerIndex = nextIndex;
      }


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
