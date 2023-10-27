import type { RuneClient } from "rune-games-sdk/multiplayer"
import { TileProp, GameActions, GameState } from "./helper/Types.ts";
import { createBoard, flipAll, insertBombs, toggleFlag, turnEndCheck, resetReveal, getNeighbors, userInsertBomb, expand, flipCell } from "./helper/BoardCreation.tsx";

const boardWidth = 9;
const boardHeight = 9;


declare global {
  const Rune: RuneClient<GameState, GameActions>
}

function endGame(game: GameState) {
  Rune.gameOver({
    players: Object.keys(game.playerState).reduce(
      (acc, playerId) => ({ ...acc, [playerId]: getScores(game, playerId) }),
      {}
    ),
    delayPopUp: false,
  })
} 

function endTurn(game: GameState, playerId:string) {
  game.playerState[playerId].turnEnded = true;
  game.playerState[playerId].playerTurnTime = game.gameTimer;
}

function getScores(game:GameState, player:string) {
  let playerScore = game.baselineScore;
  const totalBombs = game.setBombs;
  const bombsFound = game.playerState[player].bombsFound;
  // Lives represent bombs incorrectly triggered, totalbombs - lives
  // add lives bonus as well
  const bombsNotFound = totalBombs - bombsFound // - lives
  playerScore += (bombsFound/totalBombs*game.baselineScore) - (bombsNotFound/totalBombs*game.baselineScore)
  // Need timing score calc as well, or penalty if timer ended game
  
  if (game.playerState[player].playerTurnTime > 0 && bombsFound == totalBombs) {
    playerScore += ((game.playTime-game.playerState[player].playerTurnTime)/game.playTime*game.baselineScore)
  } else {
    const penalty = ((bombsNotFound/totalBombs*game.playTime) / 2)
    playerScore = (playerScore - penalty) > 0 ? playerScore - penalty : 0
  }
  return playerScore
}

const flipHandler = (game:GameState, player: string, oldBoard:TileProp[][], row:number, col:number ) => {
  if (oldBoard[row][col].isBomb && !oldBoard[row][col].isMarked) {
    // game.isGameOver = true
    endTurn(game, player)
    return flipAll(oldBoard, true)
  } else if (oldBoard[row][col].isBomb && oldBoard[row][col].isMarked) {
    game.playerState[player].bombsFound += 1;
    return flipCell(row, col, oldBoard)
  } else if (oldBoard[row][col].value === 0) {
    // expand
    return expand(row, col, oldBoard)
  } else {
    return flipCell(row, col, oldBoard)
  }}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (playerIds) => ({
    playerIds: playerIds,
    onboarding: true,
    isGameOver: false,
    onBoardTime: 15,
    playTime: 30,
    gameTimer: Rune.gameTime()/1000,
    timeElapsed: 0,
    stopTimer: false,
    setBombs: 5,
    baselineScore: 100,
    playerState: playerIds.reduce<GameState["playerState"]>(
      (acc, playerId) => ({
        ...acc,
        [playerId]: {
          board: createBoard(boardHeight, boardWidth),
          bombsPlaced: 0,
          bombsFound: 0,
          turnEnded: false,
          playerTurnTime: 0,
        },
      }),
      {}
    )
  }),
  actions: {
    addBombs: (_,{ game, allPlayerIds, playerId }) => {

      allPlayerIds.map((player) => {
        if (player != playerId) {
          const oldBoard = game.playerState[player].board
          const newBoard = insertBombs(oldBoard, game.setBombs)
          game.playerState[player].board = newBoard;
          game.playerState[player].bombsPlaced = game.setBombs;
        }
      })
    },
    userAddBomb: ({row, col}, { game, allPlayerIds, playerId }) =>{
      allPlayerIds.map((player) => {
        if (player != playerId) {
          const oldBoard = game.playerState[player].board;
          const isBomb = oldBoard[row][col].isBomb;
          const userBombs = game.playerState[player].bombsPlaced;
      if ( !isBomb && userBombs < game.setBombs) {
        const newBoard = userInsertBomb(row, col, oldBoard, true);
        game.playerState[player].board = newBoard;
        game.playerState[player].bombsPlaced = userBombs + 1;
      } else if (isBomb) {
        const newBoard = userInsertBomb(row, col, oldBoard, false);
        game.playerState[player].board = newBoard;
        game.playerState[player].bombsPlaced = userBombs - 1;
      }
        }
      })
    },
    updateBombCount: ({amount}, { game }) => {
        return game.setBombs = amount;
  },
    swap: (_,{ game, allPlayerIds }) => {
      allPlayerIds.map((player) => {
        let oldBoard = game.playerState[player].board
        if (game.playerState[player].bombsPlaced < game.setBombs) {
          oldBoard = insertBombs(oldBoard, game.setBombs)
          game.playerState[player].bombsPlaced = game.setBombs;
        }
        const newBoard = flipAll(oldBoard, false)
        game.playerState[player].board = newBoard
      })
      game.onboarding = false;
    },
    flip:({row, col}, { game, playerId }) => {
      
          const oldBoard = game.playerState[playerId].board
          const newBoard = flipHandler(game, playerId, oldBoard, row, col)
          game.playerState[playerId].board = newBoard
          /*
          if (game.isGameOver) {
            endGame(game)
          }
          */
    },
    flag:({row, col}, { game, playerId }) => {
          const oldBoard = game.playerState[playerId].board
          const newBoard = toggleFlag(row, col, oldBoard)
          game.playerState[playerId].board = newBoard
    },
    reveal: ({row, col}, { game, playerId }) => {
          const oldBoard = game.playerState[playerId].board
          const refreshBoard = resetReveal(oldBoard)
    
          const cell = refreshBoard[row][col];
          const neighbors = getNeighbors(row, col, refreshBoard);

          const value = cell.value;
          const flags = [];
          const bombs = [];
          for (const neighbor of neighbors) {
              const [row, col] = neighbor;
              refreshBoard[row][col] = {...refreshBoard[row][col], setReveal: true}
              if (refreshBoard[row][col].isMarked) {flags.push([row, col])}
              if (refreshBoard[row][col].isBomb && !refreshBoard[row][col].isMarked) {bombs.push([row, col])}
          }

          // reveal animation
          if (!cell.isFlipped) { return game.playerState[playerId].board = refreshBoard}
          if (flags.length != value ) {return game.playerState[playerId].board = refreshBoard}
          
          //bomb check
          if (bombs.length > 0) {
            const [bombRow, bombCol] = bombs[0]
            const newBoard = flipHandler(game, playerId, oldBoard, bombRow, bombCol)
            game.playerState[playerId].board = newBoard
            /*
            if (game.isGameOver) {
              endGame(game)
            }
            */
          } else {
            let newBoard = refreshBoard
            for (const neighbor of neighbors) {
              const [row, col] = neighbor;
              if (refreshBoard[row][col].isBomb && refreshBoard[row][col].isMarked && !refreshBoard[row][col].isFlipped) {
                game.playerState[playerId].bombsFound += 1
              }
              newBoard[row][col] = {...refreshBoard[row][col], isFlipped: true}
              if(refreshBoard[row][col].value == 0) {
                newBoard = expand(row, col, newBoard)
              }
            }
            //game.isGameOver = turnEndCheck(newBoard, game.setBombs)
            game.playerState[playerId].board = newBoard
            if (turnEndCheck(newBoard, game.setBombs)) {
              endTurn(game, playerId)
            }
          }
    },
    revealReset: (_, { game, playerId }) => {
          const oldBoard = game.playerState[playerId].board
          const refreshBoard = resetReveal(oldBoard)
          game.playerState[playerId].board = refreshBoard
    },
    endTimer: (_, {game, allPlayerIds}) => {
      allPlayerIds.map((player) => {
        if (!game.playerState[player].turnEnded) {
          endTurn(game, player)
        }
      })
      endGame(game)
    },
  }
  ,
  update : ({game})=>{

    if (game.onboarding && !game.stopTimer) {
      game.timeElapsed = Rune.gameTime()/1000;
      game.gameTimer = game.onBoardTime - game.timeElapsed
    } 
    if (!game.onboarding && !game.stopTimer) {
      game.gameTimer = game.playTime + game.timeElapsed - Rune.gameTime()/1000
    }

    if(game.onboarding && game.gameTimer < 0 && !game.stopTimer) {
      game.timeElapsed = game.timeElapsed - Rune.gameTime()/1000;
      game.gameTimer = 0;
      game.stopTimer = true;
      game.gameTimer = 0;
      Rune.actions.swap();
    }
    if(!game.onboarding && game.gameTimer < 0 && !game.stopTimer) {
      game.gameTimer = 0;
      game.stopTimer = true;
      game.gameTimer = 0;
      Rune.actions.endTimer();
    }
  },
  events: {
    playerJoined: (playerId, {game}) => {
      game.playerIds.push(playerId)
      game.playerState[playerId] = {
        board: createBoard(boardHeight, boardWidth),
        bombsPlaced: 0,
        bombsFound: 0,
        turnEnded: false,
        playerTurnTime: 0,
      }
   },
    playerLeft:(playerId, {game}) => {
      delete game.playerState[playerId]
    },
  },
})

