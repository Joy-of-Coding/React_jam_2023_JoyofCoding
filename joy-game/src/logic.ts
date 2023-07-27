import type {RuneClient} from "rune-games-sdk/multiplayer"
// import {Simulate} from "react-dom/test-utils";
// import play = Simulate.play;

import type { PlayerId} from "rune-games-sdk/multiplayer";

const startingDiceCount = 5
interface isGameOver {
  game:GameState
}


//game is over if any player's score is <=0
const isGameOver = (game: GameState): boolean => {
  return Object.values(game.diceCount).some((player: any) => player <= 0);
};

const getScores = (game: any): Record<string, string> => {
  return Object.entries(game.diceCount).reduce((acc, [playerId, score]) => {
    const winLoss = score <= 0 ? "WON" : "LOST";
    acc[playerId] = winLoss;
    return acc;
  }, {} as Record<string, string>);
};

export interface GameState {
  gameDice: number[],
  diceCount:Record<string, number>,
  currentPlayerIndex: number,
  playerToRoll: true,
  playerPlaying: false,
  gameOver: boolean
}

type GameActions = {

  updateDiceCount: (params: {
  playerId: string,
    amount: number
  }) => void,
  rollDice: (params: {
    //nextIndex: number,
    numDice: number
  }) => void,

  nextPlayer: (params: {
    nextIndex: number
    }) => void,
  // gameOver: (params: {
  //   playerIds: string[]
  // }) => void
}

const countOccurrences = ( array: number[], compare: number) => {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === compare) {
      count += 1;
    }
  }
  console.log("Number of occurances of ", compare, ": ", count)

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
      playerToRoll: true,
      playerPlaying: true,
      gameOver: false
    }
  },
  actions: {


    updateDiceCount: ({playerId, amount}, {game}) => {
      if (game.diceCount[playerId] === undefined) {
        throw Rune.invalidAction(); // incorrect playerId passed to the action
      }
      console.log("updating dice count:", playerId, amount)
      game.diceCount[playerId] += amount;

      //game over if 1 or more players has 0 dice after adjusting
      //this can be moved to an 'end turn' action / button so it doesn't happen automatically
      const gameOver = isGameOver(game)
      console.log("Is game over? ", gameOver)

      if (gameOver) {
        Rune.gameOver({
          players: getScores(game),
         })
      }
    },
    rollDice: ({  numDice}, {game}) => {
      game.gameDice = Array.from({length: numDice}, () => Math.floor(Math.random() * 6) + 1)
      // Game checks can happen here

      //check for fives
      const fives = countOccurrences(game.gameDice, 5);
      console.log("num fives", fives)
      // if (fives > 0) {
      //   floatAwayFives({fivesCount: fives, playerId: playerId})
      // }


    },
    nextPlayer: ({nextIndex}, {game}) => {
      // console.log("taking turns. Current player index:", game.currentPlayerIndex)
      // console.log("next player index: ", nextIndex)

      if (!game.gameOver) {
        game.currentPlayerIndex = nextIndex;
      }
    },
    //REMOVE THIS CODE FUNCTIONALITY MOVED TO UPDATE ACTION
    // gameOver:({playerIds}) => {
    //   console.log(" game over")
      // for now just say the first entry is the winner
      // const winner = playerIds[0]
      // Rune.gameOver({
      //   players: {
      //     [winner]: "WON",
      //   },
      //   delayPopUp: false,
      // })
    // }
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