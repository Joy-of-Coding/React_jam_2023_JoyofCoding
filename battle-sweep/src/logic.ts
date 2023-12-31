import type { RuneClient } from "rune-games-sdk/multiplayer"
import { TileProp, GameActions, GameState } from "./helper/Types.ts";
import { createBoard, flipAll, insertBombs, toggleFlag, turnEndCheck, resetReveal, getNeighbors, userInsertBomb, expand, flipCell } from "./helper/BoardCreation.tsx";

const boardWidth = 9;
const boardHeight = 9;

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

function endGame(players: {
  [playerId: string]: "WON" | "LOST";
}) {
  Rune.gameOver({
    players: players,
    delayPopUp: false,
  })
} 

function singlePlayerEndCheck(game: GameState, player:string) {
  if (!game.playerState[player].turnEnded) return 
  game.isGameOver = true
  if (game.playerState[player]. bombsFound == game.setBombs) {
    endGame({[player]: "WON"})
  } else {
    endGame({[player]: "LOST"})
  }
}

function multiPlayerEndCheck(game:GameState, allPlayerIds:string[]) {
  const [playerOne, playerTwo] = allPlayerIds
  if (game.playerState[playerOne].bombsFound > game.playerState[playerTwo].bombsFound) {
    if (game.playerState[playerTwo].turnEnded || game.playerState[playerOne].bombsFound == game.setBombs) {
      game.isGameOver = true
      endGame({[playerOne]: "WON", [playerTwo]: "LOST"})
    }
  } else if (game.playerState[playerTwo].bombsFound > game.playerState[playerOne].bombsFound) {
    if (game.playerState[playerOne].turnEnded || game.playerState[playerTwo].bombsFound == game.setBombs) {
      game.isGameOver = true
      endGame({[playerTwo]: "WON", [playerOne]: "LOST"})
    }
  } else if (game.playerState[playerOne].bombsFound == game.playerState[playerTwo].bombsFound) {
    if (game.playerState[playerOne].turnEnded && game.playerState[playerTwo].turnEnded ) {
      const playerOneWin = game.playerState[playerOne].playerTurnTime > game.playerState[playerTwo].playerTurnTime
      game.isGameOver = true
      endGame({[playerOneWin ? playerOne : playerTwo]: "WON", [playerOneWin ? playerTwo : playerOne]: "LOST"})
    }
  }
}


function endGameCheck(game:GameState, allPlayerIds:string[]) {

  const numPlayers = allPlayerIds.length
  if (numPlayers == 1 ) {
    singlePlayerEndCheck(game, allPlayerIds[0])
  } else {
    multiPlayerEndCheck(game, allPlayerIds)
  }
}

function getGameTime(game:GameState) {
  const getTime = game.playTime + game.timeElapsed - Rune.gameTime()/1000
  return getTime
}

function endTurn(game: GameState, playerId:string) {
  game.playerState[playerId].turnEnded = true;
  game.playerState[playerId].playerTurnTime = getGameTime(game);
}

const flipHandler = (game:GameState, player: string, oldBoard:TileProp[][], row:number, col:number ) => {
  if (oldBoard[row][col].isBomb && !oldBoard[row][col].isMarked) {
    // end turn
    endTurn(game, player)
    return flipAll(oldBoard, true)
  } else if (oldBoard[row][col].isBomb && oldBoard[row][col].isMarked) {
    // bomb found
    game.playerState[player].bombsFound += 1;
    return flipCell(row, col, oldBoard)
  } else if (oldBoard[row][col].value === 0) {
    // expand zeros
    return expand(row, col, oldBoard)
  } else {
    return flipCell(row, col, oldBoard)
  }}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 2,
  setup: (playerIds) => ({
    playerIds: playerIds,
    openStartModal: true,
    onboarding: false,
    isGameOver: false,
    onBoardTime: 30,
    playTime: 120,
    gameTimer: 30,
    timeElapsed: 0,
    stopTimer: false,
    setBombs: 9,
    baselineScore: 100,
    playerState: playerIds.reduce<GameState["playerState"]>(
      (acc, playerId) => ({
        ...acc,
        [playerId]: {
          board: createBoard(boardHeight, boardWidth),
          gameStarted: false,
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
    setStartGame: (_,{ game, playerId }) => {
      game.playerState[playerId].gameStarted = true;
    },
    startOnboarding: (_,{ game }) => {
      game.openStartModal = false;
      game.onboarding = true;
      game.timeElapsed = Rune.gameTime()/1000;
  },
    swap: (_,{ game, allPlayerIds }) => {
      game.timeElapsed = Rune.gameTime()/1000;
      game.gameTimer = game.playTime;
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
    flip:({row, col}, { game, allPlayerIds, playerId }) => {
      
          const oldBoard = game.playerState[playerId].board
          const newBoard = flipHandler(game, playerId, oldBoard, row, col)
          game.playerState[playerId].board = newBoard
          if (turnEndCheck(oldBoard, game.setBombs)) {
            endTurn(game, playerId)
          }
          endGameCheck(game, allPlayerIds)
    },
    flag:({row, col}, { game, playerId }) => {
          const oldBoard = game.playerState[playerId].board
          const newBoard = toggleFlag(row, col, oldBoard)
          game.playerState[playerId].board = newBoard
    },
    reveal: ({row, col}, { game, allPlayerIds, playerId }) => {
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
            endGameCheck(game, allPlayerIds)
          } else {
            let newBoard = refreshBoard
            for (const neighbor of neighbors) {
              const [row, col] = neighbor;
              if (refreshBoard[row][col].isBomb && refreshBoard[row][col].isMarked && !refreshBoard[row][col].isFlipped) {
                game.playerState[playerId].bombsFound += 1
              }
              newBoard[row][col] = {...refreshBoard[row][col], isFlipped: true}
              if(refreshBoard[row][col].value == 0 && !refreshBoard[row][col].isBomb) {
                newBoard = expand(row, col, newBoard)
              }
            }
            game.playerState[playerId].board = newBoard
            if (turnEndCheck(newBoard, game.setBombs)) {
              endTurn(game, playerId)
            }
            endGameCheck(game, allPlayerIds)
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
      game.isGameOver = true
      endGameCheck(game, allPlayerIds)
    },
  }
  ,
  update : ({game})=>{

    /*
      Things you MUST check if refactoring here:
      - game play timer/numbers updates correctly, and swap boards, when oboarding timer hits 0
      - game play timer/numbers updates correctly when when manually swapping boards via button
      - time elapsed equals 15 in first scenario above or it equals onboarding timer - time swap clicked
      - check in the get time function too
      - game ends when play time clock reaches 0 with no errors
      - game ends when both players turn ends, before clock, with no errors
    */
    if (game.onboarding) {
      game.gameTimer = game.onBoardTime + game.timeElapsed - Rune.gameTime()/1000;
      if(game.gameTimer < 0) {
        Rune.actions.swap();
      }
    } else if (!game.openStartModal) {
      game.gameTimer = game.playTime + game.timeElapsed - Rune.gameTime()/1000
      if(game.gameTimer < 0) {
        Rune.actions.endTimer();
      }
    }
  },
  events: {
    playerJoined: (playerId, {game}) => {
      game.playerIds.push(playerId)
      let board;
      if (game.openStartModal) {
        board = createBoard(boardHeight, boardWidth)
      } else {
        board = insertBombs(createBoard(boardHeight, boardWidth), game.setBombs)
        board = flipAll(board, false)
      }
      game.playerIds.push(playerId)
      game.playerState[playerId] = {
        board: board,
        gameStarted: false,
        bombsPlaced: 0,
        bombsFound: 0,
        turnEnded: false,
        playerTurnTime: 0,
      }
   },
    playerLeft:(playerId, {game, allPlayerIds}) => {

      let players = {};
      allPlayerIds.forEach((id) => {
        if (id != playerId) {
          players = {...players, [id]: "WON"}
        } else {
          players = {...players, [id]: "LOST"}
        }
      });
      game.isGameOver = true;
      endGame(players)

      delete game.playerState[playerId]
    },
  },
})

