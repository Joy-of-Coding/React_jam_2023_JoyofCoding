import { TileProp } from "../logic";

const emptyCell = {
  isBomb: false,
  isFlipped: false,
  isMarked: false,
  value: 0,
};

export function createBoard(height: number, width: number) {
  const matrix = [];
  for (let row = 0; row < height; row++) {
    const newRow = [];
    for (let col = 0; col < width; col++) {
      newRow.push({ ...emptyCell, id: row + col });
    }
    matrix.push(newRow);
  }
  return matrix;
}

export function insertBombs(matrix: Array<Array<TileProp>>, bombs: number) {
  let bombsToInsert = bombs;
  const refreshBoard = createBoard(matrix.length, matrix[0].length);

  while (bombsToInsert > 0) {
    const row = Math.floor(Math.random() * refreshBoard.length);
    const col = Math.floor(Math.random() * refreshBoard[0].length);

    if (!refreshBoard[row][col].isBomb) {
      refreshBoard[row][col].isBomb = true;
    }
    bombsToInsert--;
  }

  // increase nums
  increaseNums(refreshBoard);

  return refreshBoard;
}

export function increaseNums(matrix: Array<Array<TileProp>>) {
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

export function getNeighbors(
  row: number,
  col: number,
  matrix: Array<Array<TileProp>>
) {
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
