import type {RuneClient} from "rune-games-sdk/multiplayer"
import board from "./components/Board.tsx";

const boardWidth = 9
const boardHeight = 9
const bombs = 10

function createBoard(height: number, width: number) {
  const matrix = [];
  for (let row = 0; row < height; row++) {
    const newRow = [];
    for (let col = 0; col < width; col++) {
      newRow.push({
        id: row + col,
        isBomb: false,
        isFlipped: false,
        isMarked: false,
        value: 0,
      });
    }
    matrix.push(newRow);
  }
  return matrix;
}

function insertBombs(matrix: Array<any>, bombs: number) {
  let bombsToInsert = bombs;

  while (bombsToInsert > 0) {
    const row = Math.floor(Math.random() * matrix.length);
    const col = Math.floor(Math.random() * matrix[0].length);

    if (!matrix[row][col].isBomb) {
      matrix[row][col].isBomb = true;
    }
    bombsToInsert--;
  }
  return matrix;
}


export interface GameState {
  count: number
  board: Array<any>
}

type GameActions = {
  increment: (params: { amount: number }) => void,
  addBombs: (params: {number: number}) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

export function getCount(game: GameState) {
  return game.count
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
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
    addBombs: ({number}, {game}) => {
      const oldBoard = game.board
      const newBoard = insertBombs(oldBoard, number)
      game.board = newBoard
      console.log(game.board)
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
