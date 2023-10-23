import type { RuneClient, PlayerId } from "rune-games-sdk/multiplayer"
import { createBoard, flipAll, insertBombs, expand, flipCell } from "./helper/BoardCreation.tsx";

const boardWidth = 9
const boardHeight = 9
const bombs = 10

export interface TileProp {
  row: number,
  col: number,
  isBomb: boolean;
  isFlipped: boolean;
  isMarked: boolean;
  value: number;
}

export interface GameState {
  playerIds: PlayerId[],
  onboarding: boolean,
  isGameOver: boolean,
  playerState: {
    [playerId: string]: {
      board: Array<Array<TileProp>>
    }
  }
}

type GameActions = {
  // increment: (params: { amount: number }) => void,
  addBombs: () => void,
  swap: () => void,
  flip: (args: { row: number ; col: number }) => void,
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

/*
export function getCount(game: GameState) {
  return game.count
}
*/

const flipHandler = (game:GameState, oldBoard:Array<Array<TileProp>>, row:number, col:number ) => {
  if (oldBoard[row][col].isBomb) {
    game.isGameOver = true
     return flipAll(oldBoard, true)
    //isGameOver: true
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
    playerIds: playerIds,
    onboarding: true,
    isGameOver: false,
    playerState: playerIds.reduce<GameState["playerState"]>(
      (acc, playerId) => ({
        ...acc,
        [playerId]: {
          board: createBoard(boardHeight, boardWidth),
        },
      }),
      {}
    )
    
    //starting code
    // for (const playerId of playerIds) {
    //   game.boards[playerId] = createBoard(boardHeight,boardWidth)
    // }
    // game.count = 0
    // return { count: 0 }
  }),
  actions: {
    /*
    increment: ({ amount }, { game }) => {
      game.count += amount
    },
    */
    addBombs: (_,{ game, playerId }) => {
      const oldBoard = game.playerState[playerId].board
      const newBoard = insertBombs(oldBoard, bombs)
      game.playerState[playerId].board = newBoard
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
            Rune.gameOver({
              players: {
                [player]: "WON",
                [playerId]: "LOST",
              },
              delayPopUp: false,
            })
          }
        }
      })
    },
  }
  ,
  events: {
    playerJoined: (playerId, {game}) => {
      game.playerIds.push(playerId)
      game.playerState[playerId] = {
        board: createBoard(boardHeight, boardWidth)
      }
   },
    playerLeft:(playerId, {game}) => {
      delete game.playerState[playerId]
    },
  }
})
