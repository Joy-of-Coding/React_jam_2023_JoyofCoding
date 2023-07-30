import type {RuneClient} from "rune-games-sdk/multiplayer"
// import {Simulate} from "react-dom/test-utils";
// import play = Simulate.play;

const startingDiceCount = 5
interface isGameOver {
  game:GameState
}


//game is over if any player's score is <=0
const isGameOver = (game: GameState): boolean => {
  //can't end game by going to zero while challenging
  if (game.challengeCounter > 0) {
    console.log("Can't win before Conquering challenge")
    return false
  }
  return Object.values(game.diceCount).some((player: any) => player <= 0);
};

function countDiceValues(arr: number[]): { [key: number]: number } {
  const challengeDice: { [key: number]: number } = {};

  for (let i = 1; i <= 6; i++) {
    challengeDice[i] = 0;
  }

  arr.forEach((element) => {
    // eslint-disable-next-line no-prototype-builtins
    if (challengeDice.hasOwnProperty(element)) {
      challengeDice[element]++;
    }
  });

  return challengeDice;
}


const getScores = (game: GameState): { [playerId: string]: number | "WON" | "LOST" } => {
  return Object.entries(game.diceCount).reduce((acc, [playerId, score]) => {
    const winLoss = score as number <= 0 ? "WON" : "LOST";
    acc[playerId] = winLoss;
    return acc;
  }, {} as { [playerId: string]: number | "WON" | "LOST" });
};

export interface GameState {
  gameDice: number[],
  diceCount:Record<string, number>,
  currentPlayerIndex: number,
  previousPlayerIndex: number | null,
  challengeCounter: number,
  challengeStatus: boolean,
  playerToRoll: boolean,
  playerPlaying: boolean,
  gameOver: boolean,
  showHelp: boolean
}

type GameActions = {
  clearDice: ({}) => void,
  updateDiceCount: (params: {
  playerId: string | undefined,
    amount: number
  }) => void,
  rollDice: (params: {
    numDice: number
  }) => void,
  nextPlayer: (params: {
    nextIndex: number
    }) => void,
  adjustGameDice: (params: {
    index: number
  }) => void,
  updateChallengeCount: (params: {
    amount: number
  }) => void,
  updateChallengeStatus: (params: {
    status: boolean
  }) => boolean,
  // eslint-disable-next-line @typescript-eslint/ban-types
  setPreviousPlayer: (params:
  {playerIndex: number}) => void
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


    //Starting Dice Array of Confetti Dice!
    // const startingDice = Array.from({ length: startingDiceCount }, () => Math.floor(Math.random() * 6) + 1)
    // const startingDice = Array.from({ length: startingDiceCount },()=> 4)
    // const diceHistogram = countDiceValues(startingDice)
    return {
      gameDice:[],
      diceCount,
      currentPlayerIndex:0,
      previousPlayerIndex: null,
      challengeCounter: 0,
      challengeStatus: false,
      playerToRoll: true,
      playerPlaying: false,
      gameOver: false,
      showHelp: false
    }
  },
  actions: {
    clearDice: ({},{game}) => {
      game.gameDice = []
    },
    updateDiceCount: ({playerId, amount}, {game}) => {
      if (playerId === undefined){
        playerId= "spectator"
      }
        
      else

      if (game.diceCount[playerId] === undefined) {
        throw Rune.invalidAction(); // incorrect playerId passed to the action
      }
      //console.log("updating dice count:", playerId, amount)
      game.diceCount[playerId] += amount;

      //game over if 1 or more players has 0 dice after adjusting
      //this can be moved to an 'end turn' action / button so it doesn't happen automatically
      const gameOver = isGameOver(game)
      //console.log("Is game over? ", gameOver)

      if (gameOver) {
        //console.log("Game Over object", getScores(game))
        Rune.gameOver({

          players: getScores(game),
         })
      }
    },
    updateChallengeCount: ({amount},  {game}) => {
      game.challengeCounter += amount;
    },
    updateChallengeStatus: ({status}, {game} ) => {
      game.challengeStatus = status
    },
    rollDice: ({  numDice}, {game}) => {
      game.gameDice = Array.from({length: numDice}, () => Math.floor(Math.random() * 6) + 1)
      // Game checks can happen here
      // When dice are rolled, playerToRoll becomes false and playerPlaying becomes true
      game.playerToRoll = false
      game.playerPlaying = true


    },
    nextPlayer: ({nextIndex}, {game}) => {
      if (!game.gameOver) {
        game.previousPlayerIndex = game.currentPlayerIndex
        game.currentPlayerIndex = nextIndex;
        game.playerToRoll = true
        game.playerPlaying = false
      }
    },

    adjustGameDice: ({index},{game})=>{
      game.gameDice.splice(index, 1)
      game.diceHistogram = countDiceValues(game.gameDice)

    },
    setPreviousPlayer: ({playerIndex}, {game})=> {
      game.previousPlayerIndex = playerIndex
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