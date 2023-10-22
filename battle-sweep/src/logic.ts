import type { RuneClient, PlayerId } from "rune-games-sdk/multiplayer"
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
  playerIds: PlayerId[],
  playerState: {
    [playerId: string]: {
      board: Array<Array<TileProp>>
    }
  }
}

type GameActions = {
  // increment: (params: { amount: number }) => void,
  addBombs: () => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

/*
export function getCount(game: GameState) {
  return game.count
}
*/

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 2,
  setup: (playerIds) => ({
    playerIds: playerIds,
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
    }
    

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
