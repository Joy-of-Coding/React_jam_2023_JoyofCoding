import type {RuneClient} from "rune-games-sdk/multiplayer"
// import {Simulate} from "react-dom/test-utils";
// import play = Simulate.play;

const startingDiceCount = 10
interface isGameOver {
  game:GameState
}

// const isGameOver = (game: GameState): boolean => {
//   let gameOver = false;
//   Object.keys(game.diceCount).forEach((player) => {
//     if (game.diceCount[player] <= 0) {
//       gameOver = true;
//     }
//   });
//   return gameOver;
// };

const isGameOver = (game: GameState): boolean => {
  //can't end game by going to zero while challenging
  // if (game.challengeCounter > 0) {
  //   //console.log("Can't win before Conquering challenge")
  //   return false
  // }
  // return Object.values(game.diceCount).some((player: any) => player <= 0);

    for (const player in game.diceCount) {
      if (game.diceCount[player] <= 0) {
        return true;
      }
    }
    return false;
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
  previousPlayerIndex: number,
  selectedPlayerId: string ,
  // challengeCounter: number,
  // challengeStatus: boolean,
  // challengeCounter: number,
  // challengeStatus: boolean,
  playerToRoll: boolean,
  playerPlaying: boolean,
  gameOver: boolean,
  showHelp: boolean,
  selectedDieIndex: number;
}

type GameActions = {
  shareCake: (params: {
    playerId: string | undefined,
    playerIds: (string | undefined)[],
    dieIndex: number
  }) => void,
  setSelectedPlayerId: (params: {
    playerId: string
  }) => void,
  setSelectedDieIndex: (params: {
    dieIndex: number;
  }) => void,
  giveGifts: (params: {
    playerId: string|undefined,
    opponentId:string,
    dieIndex: number
  }) => void,
  popBalloons: (params: {
    playerId: string | undefined,
    dieIndex: number
  }) => void,
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
  // updateChallengeCount: (params: {
  //   amount: number
  // }) => void,
  // updateChallengeStatus: (params: {
  //   status: boolean
  // }) => boolean,
  // updateChallengeCount: (params: {
  //   amount: number
  // }) => void,
  // updateChallengeStatus: (params: {
  //   status: boolean
  // }) => boolean,
  // eslint-disable-next-line @typescript-eslint/ban-types
  setPreviousPlayer: (params:
  {playerIndex: number}) => void
}


declare global {
  const Rune: RuneClient<GameState, GameActions>

}


Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 5,
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
      previousPlayerIndex: -1,
      selectedPlayerId: '',
      // challengeCounter: 0,
      // challengeStatus: false,
      // challengeCounter: 0,
      // challengeStatus: false,
      playerToRoll: true,
      playerPlaying: false,
      gameOver: false,
      showHelp: false,
      selectedDieIndex: -1
    }
  },
  actions: {
    shareCake: ({playerId, playerIds,  dieIndex}, {game}) => {
      if (playerId === undefined){
        playerId= "spectator"
      } else  if (game.diceCount[playerId] === undefined) {
        throw Rune.invalidAction(); // incorrect playerId passed to the action
      }

      // Filter playerIds
      // const otherPlayers = playerIds.filter((id) => id !== playerId );
      const otherPlayers: string[] = [];

      // for (const id of playerIds) {
      //   if (id !== playerId) {
      //     if (id != null) {
      //       otherPlayers.push(id);
      //     }
      //   }
      // }
      for (let i = 0; i < playerIds.length; i++) {
        const id = playerIds[i];
        if (id !== playerId && id != null) {
          otherPlayers.push(id);
        }
      }

      //console.log("Other players", otherPlayers.length, otherPlayers)


      //and add 1 to diceCount of each other player
      for (let i = 0; i < otherPlayers.length; i++) {
        const id = otherPlayers[i];
      
        if (id === undefined || game.diceCount[id] === undefined) {
          throw Rune.invalidAction(); // incorrect playerId passed to the action
        }
      
        game.diceCount[id] += 1;
              //remove 1 from player per player
        // game.diceCount[playerId] += -1
      }

      //remove 1 from player
      game.diceCount[playerId] += -1

      // Remove Die
      game.gameDice.splice(dieIndex, 1)

      //check for game over
      const gameOver = isGameOver(game)

      if (gameOver) {
        Rune.gameOver({
          players: getScores(game),
        })
      }
    },
    popBalloons: ({playerId, dieIndex}, {game}) => {
      if (playerId === undefined){
        playerId= "spectator"
      } else  if (game.diceCount[playerId] === undefined) {
        throw Rune.invalidAction(); // incorrect playerId passed to the action
      }
      game.diceCount[playerId] += -1
      game.gameDice.splice(dieIndex, 1)

      //check for game over
      const gameOver = isGameOver(game)

      if (gameOver) {
        Rune.gameOver({

          players: getScores(game),
        })
      }
    },
    setSelectedDieIndex:({dieIndex}, {game}) => {
      game.selectedDieIndex = dieIndex
      //console.log("Selected Die Index", game.selectedDieIndex)
},
    giveGifts: ({playerId, opponentId, dieIndex }, {game}) => {
    //console.log("exchanging gifts")

      if (playerId === undefined){
        playerId= "spectator"
      } else  if (game.diceCount[playerId] === undefined) {
        throw Rune.invalidAction(); // incorrect playerId passed to the action
      }

      // if (playerId===opponentId) {
      //
      //   return
      // }

        let randomGift = Math.floor((Math.random() * 5)-2)
        if (randomGift===0) randomGift = 1
        game.diceCount[opponentId] += randomGift;
        game.diceCount[playerId] += -1
        game.gameDice.splice(dieIndex, 1)

      //check for game over
      const gameOver = isGameOver(game)

      if (gameOver) {
        Rune.gameOver({

          players: getScores(game),
        })
      }

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
    // updateChallengeCount: ({amount},  {game}) => {
    //   game.challengeCounter += amount;
    // },
    // updateChallengeStatus: ({status}, {game} ) => {
    //   game.challengeStatus = status
    // },
    // updateChallengeCount: ({amount},  {game}) => {
    //   game.challengeCounter += amount;
    // },
    // updateChallengeStatus: ({status}, {game} ) => {
    //   game.challengeStatus = status
    // },
    rollDice: ({  numDice}, {game}) => {
      game.gameDice = Array.from({length: numDice}, () => Math.floor(Math.random() * 6) + 1)
     // game.gameDice.forEach(die, i)=> {
        // if (die === 6) {
        //   game.gameDice[i] = Math.random() < 0.5 ? 5 : 6;
        // }      })
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
        game.gameDice = []
      }
    },

    adjustGameDice: ({index},{game})=>{
      game.gameDice.splice(index, 1)

    },
    setPreviousPlayer: ({playerIndex}, {game})=> {
      game.previousPlayerIndex = playerIndex
    },
    setSelectedPlayerId: ({playerId }, {game} ) => {
      game.selectedPlayerId = playerId
    }
  },
  events: {
    playerJoined: (playerId, {game}) => {
      game.diceCount[playerId] = startingDiceCount;
    },
    playerLeft(playerId, {game}) {
      //const playerIndex = Object.keys(game.diceCount).indexOf(playerId)
      //console.log("Player leaving index", playerIndex)
      //console.log("current player", game.currentPlayerIndex)
      delete game.diceCount[playerId];


      game.currentPlayerIndex = Object.keys(game.diceCount).length-1;
      game.playerToRoll = true
      game.playerPlaying = false
      game.gameDice = []

    },
  }
})