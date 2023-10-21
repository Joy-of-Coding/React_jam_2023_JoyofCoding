import type {RuneClient} from "rune-games-sdk/multiplayer"
import { createBoard, insertBombs } from "./helper/BoardCreation.tsx";

const boardWidth = 9
const boardHeight = 9
const bombs = 10

export interface TileProp {
  id: number;
  isBomb: boolean;
  isFlipped: boolean;
  isMarked: boolean;
  value: number;
}

export interface GameState {
  count: number
  board: Array<Array<TileProp>>
}

type GameActions = {
  increment: (params: { amount: number }) => void,
  addBombs: () => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

export function getCount(game: GameState) {
  return game.count
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 2,
  setup: (allPlayerIds): GameState => {
    return {
      count: 0,
      board: createBoard(boardHeight, boardWidth),
    }

    //starting code
    // for (const playerId of allPlayerIds) {
    //   game.boards[playerId] = createBoard(boardHeight,boardWidth)
    // }
    // game.count = 0
    // return { count: 0 }
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount
    },
    addBombs: (_,{game}) => {
      const oldBoard = game.board
      const newBoard = insertBombs(oldBoard, bombs)
      game.board = newBoard
    }
    

  },
  events: {
    playerJoined: (playerId, {game}) => {
     //some actions
   },
    playerLeft:(playerId, {game}) => {
     //some actions
    },
  }
})
