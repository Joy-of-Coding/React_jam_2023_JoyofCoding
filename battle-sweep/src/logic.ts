import type { RuneClient, PlayerId } from "rune-games-sdk/multiplayer"
import { createBoard, flipAll, insertBombs, toggleFlag, gameEndCheck, resetReveal, getNeighbors, userInsertBomb, expand, flipCell } from "./helper/BoardCreation.tsx";

const boardWidth = 9;
const boardHeight = 9;

export interface TileProp {
  row: number,
  col: number,
  isBomb: boolean;
  isFlipped: boolean;
  isMarked: boolean;
  setReveal: boolean;
  value: number;
}

export interface GameState {
  onBoardTimer: number,
  gameStart: number,
  playerIds: PlayerId[],
  onboarding: boolean,
  isGameOver: boolean,
  setBombs: number,
  playerState: {
    [key: string]: {
      board: TileProp[][];
      bombsPlaced: number;
    }
  }
}

type GameActions = {
  // increment: (params: { amount: number }) => void,
  addBombs: () => void,
  userAddBomb: (args: { row: number ; col: number }) => void,
  swap: () => void,
  flip: (args: { row: number ; col: number }) => void,
  flag: (args: { row: number ; col: number }) => void,
  reveal: (args: { row: number ; col: number }) => void,
  revealReset: () => void,
  timerEnd: () => void,
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

export function endGame(playerWin:string, playerLose:string) {
  Rune.gameOver({
    players: {
      [playerWin]: "WON",
      [playerLose]: "LOST",
    },
    delayPopUp: false,
  })
} 

const flipHandler = (game:GameState, oldBoard:Array<Array<TileProp>>, row:number, col:number ) => {
  if (oldBoard[row][col].isBomb && !oldBoard[row][col].isMarked) {
    game.isGameOver = true
    return flipAll(oldBoard, true)
  } else if (oldBoard[row][col].value === 0) {
    // expand
    return expand(row, col, oldBoard)
  } else {
    return flipCell(row, col, oldBoard)
  }}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 2,
  setup: (playerIds) => ({
    onBoardTimer: 10,
    gameStart: Rune.gameTime(),
    playerIds: playerIds,
    onboarding: true,
    isGameOver: false,
    setBombs: 10,
    playerState: playerIds.reduce<GameState["playerState"]>(
      (acc, playerId) => ({
        ...acc,
        [playerId]: {
          board: createBoard(boardHeight, boardWidth),
          bombsPlaced: 0,
        },
      }),
      {}
    )
  }),
  actions: {
    addBombs: (_,{ game, playerId }) => {
      const oldBoard = game.playerState[playerId].board
      const newBoard = insertBombs(oldBoard, game.setBombs)
      game.playerState[playerId].board = newBoard;
      game.playerState[playerId].bombsPlaced = game.setBombs;
    },
    userAddBomb: ({row, col}, { game, playerId }) =>{
      const oldBoard = game.playerState[playerId].board;
      const isBomb = oldBoard[row][col].isBomb;
      const userBombs = game.playerState[playerId].bombsPlaced;
      if ( !isBomb && userBombs < game.setBombs) {
        const newBoard = userInsertBomb(row, col, oldBoard, true);
        game.playerState[playerId].board = newBoard;
        game.playerState[playerId].bombsPlaced = userBombs + 1;
      } else if (isBomb) {
        const newBoard = userInsertBomb(row, col, oldBoard, false);
        game.playerState[playerId].board = newBoard;
        game.playerState[playerId].bombsPlaced = userBombs - 1;
      }
    },
    swap: (_,{ game, allPlayerIds }) => {
      allPlayerIds.map((player) => {
        const oldBoard = game.playerState[player].board
        const newBoard = flipAll(oldBoard, !game.onboarding)
        game.playerState[player].board = newBoard
      })
      game.onboarding = !game.onboarding;
    },
    flip:({row, col}, { game, allPlayerIds, playerId }) => {
      allPlayerIds.map((player) => {
        if (player != playerId) {
          const oldBoard = game.playerState[player].board
          const newBoard = flipHandler(game, oldBoard, row, col)
          game.playerState[player].board = newBoard
          if (game.isGameOver) {
            endGame(player, playerId)
          }
        }
      })
    },
    flag:({row, col}, { game, allPlayerIds, playerId }) => {
      allPlayerIds.map((player) => {
        if (player != playerId) {
          const oldBoard = game.playerState[player].board
          const newBoard = toggleFlag(row, col, oldBoard)
          game.playerState[player].board = newBoard
        }})
    },
    reveal: ({row, col}, { game, allPlayerIds, playerId }) => {
      allPlayerIds.map((player) => {
        if (player != playerId) {
          const oldBoard = game.playerState[player].board
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
          if (!cell.isFlipped) { return game.playerState[player].board = refreshBoard}
          if (flags.length != value ) {return game.playerState[player].board = refreshBoard}
          
          //bomb check
          if (bombs.length > 0) {
            const [bombRow, bombCol] = bombs[0]
            const newBoard = flipHandler(game, oldBoard, bombRow, bombCol)
            game.playerState[player].board = newBoard
            if (game.isGameOver) {
              endGame(player, playerId)
            }
          } else {
            let newBoard = refreshBoard
            for (const neighbor of neighbors) {
              const [row, col] = neighbor;
              newBoard[row][col] = {...refreshBoard[row][col], isFlipped: true}
              if(refreshBoard[row][col].value == 0) {
                newBoard = expand(row, col, newBoard)
              }
            }
            game.isGameOver = gameEndCheck(newBoard, game.setBombs)
            game.playerState[player].board = newBoard
            if (game.isGameOver) {
              endGame(playerId, player)
            }
          }
        }
      })
    },
    revealReset: (_, { game, allPlayerIds, playerId }) => {
      allPlayerIds.map((player) => {
        if (player != playerId) {
          const oldBoard = game.playerState[player].board
          const refreshBoard = resetReveal(oldBoard)
          game.playerState[player].board = refreshBoard
        }
      })
    },
    endTimer: (_, {_}) => {
      console.log("Time!");
    }
  }
  ,
  events: {
    playerJoined: (playerId, {game}) => {
      game.playerIds.push(playerId)
      game.playerState[playerId] = {
        board: createBoard(boardHeight, boardWidth),
        bombsPlaced: 0,
      }
   },
    playerLeft:(playerId, {game}) => {
      delete game.playerState[playerId]
    },
  }, 
  update : ({game})=>{
    game.onBoardTimer = 10-(Rune.gameTime()/1000  - game.gameStart)
  }
})

