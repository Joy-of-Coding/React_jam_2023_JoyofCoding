import { TileProp } from "../logic";

const emptyCell = {
  isBomb: false,
  isFlipped: true,
  isMarked: false,
  setReveal: false,
  value: 0,
};

export function createBoard(height: number, width: number): TileProp[][] {
  const matrix = [];
  for (let row = 0; row < height; row++) {
    const newRow = [];
    for (let col = 0; col < width; col++) {
      newRow.push({ ...emptyCell, row: row, col: col });
    }
    matrix.push(newRow);
  }
  return matrix;
}

export function insertBombs(matrix: TileProp[][], bombs: number) {
  let bombsToInsert = bombs;
  const refreshBoard = createBoard(matrix.length, matrix[0].length);

  while (bombsToInsert > 0) {
    const row = Math.floor(Math.random() * refreshBoard.length);
    const col = Math.floor(Math.random() * refreshBoard[0].length);

    if (!refreshBoard[row][col].isBomb) {
      refreshBoard[row][col].isBomb = true;
    } else {
      continue;
    }
    bombsToInsert--;
  }
  // increase nums
  increaseNums(refreshBoard);

  return refreshBoard;
}

export function userInsertBomb(
  row: number,
  col: number,
  board: TileProp[][],
  bombState: boolean
) {
  const newBoard = board.slice();
  const cell = newBoard[row][col];
  const newCell = {
    ...cell,
    isBomb: bombState,
  };
  newBoard[row][col] = newCell;

  const refreshBoard = [];
  for (let row = 0; row < newBoard.length; row++) {
    const newRow = [];
    for (let col = 0; col < newBoard[0].length; col++) {
      newRow.push({ ...newBoard[row][col], value: 0 });
    }
    refreshBoard.push(newRow);
  }

  // increase nums
  increaseNums(refreshBoard);
  return refreshBoard;
}

export function increaseNums(matrix: TileProp[][]) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col].isBomb) {
        const neighbors = getNeighbors(row, col, matrix);

        for (const neighbor of neighbors) {
          const [row, col] = neighbor;
          matrix[row][col].value += 1;
        }
      }
    }
  }
}

export function getNeighbors(row: number, col: number, matrix: TileProp[][]) {
  const height = matrix.length;
  const width = matrix[row].length;
  const neighbors = [];

  if (row - 1 >= 0) neighbors.push([row - 1, col]); // UP
  if (row + 1 < height) neighbors.push([row + 1, col]); // DOWN
  if (col + 1 < width) neighbors.push([row, col + 1]); // RIGHT
  if (col - 1 >= 0) neighbors.push([row, col - 1]); // LEFT

  if (row - 1 >= 0 && col - 1 >= 0) neighbors.push([row - 1, col - 1]); // UP-LEFT
  if (row - 1 >= 0 && col + 1 < width) neighbors.push([row - 1, col + 1]); // UP-RIGHT
  if (row + 1 < height && col + 1 < width) neighbors.push([row + 1, col + 1]); // DOWN-RIGHT
  if (row + 1 < height && col - 1 >= 0) neighbors.push([row + 1, col - 1]); // DOWN-LEFT

  return neighbors;
}

export function resetReveal(board: TileProp[][]) {
  const refreshBoard = [];
  for (let row = 0; row < board.length; row++) {
    const newRow = [];
    for (let col = 0; col < board[0].length; col++) {
      newRow.push({ ...board[row][col], setReveal: false });
    }
    refreshBoard.push(newRow);
  }
  return refreshBoard;
}

export function gameEndCheck(board: TileProp[][], gameBombs: number) {
  let count = 0;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col].isBomb && board[row][col].isFlipped) {
        count += 1;
      }
    }
  }

  if (count == gameBombs) {
    return true;
  } else {
    return false;
  }
}

export function toggleFlag(row: number, col: number, board: TileProp[][]) {
  const newBoard = board.slice();
  const cell = newBoard[row][col];
  const flagState = cell.isMarked;
  const flipState = cell.isFlipped;
  if (flipState) return newBoard;
  const newCell = {
    ...cell,
    isMarked: !flagState,
  };
  newBoard[row][col] = newCell;
  return newBoard;
}

export function flipCell(row: number, col: number, board: TileProp[][]) {
  const newBoard = board.slice();
  const cell = newBoard[row][col];
  const newCell = {
    ...cell,
    isFlipped: true,
  };
  newBoard[row][col] = newCell;
  return newBoard;
}

export function expand(row: number, col: number, board: TileProp[][]) {
  const newBoard = board.slice();
  const stack = [[row, col]];
  const start = [row, col];

  while (stack.length > 0) {
    const [row, col] = stack.pop() || start;
    const neighbors = getNeighbors(row, col, newBoard);

    for (const neighbor of neighbors) {
      const [row, col] = neighbor;
      if (newBoard[row][col].isFlipped) continue;
      if (!newBoard[row][col].isBomb) {
        newBoard[row][col].isFlipped = true;
        if (newBoard[row][col].value > 0) {
          continue;
        }
        stack.push(neighbor);
      }
    }
  }
  return newBoard;
}

export function flipAll(board: TileProp[][], flipState: boolean) {
  const newBoard = board.slice();
  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[row].length; col++) {
      const cell = newBoard[row][col];
      const newCell = {
        ...cell,
        isFlipped: flipState,
      };
      newBoard[row][col] = newCell;
    }
  }
  return newBoard;
}
