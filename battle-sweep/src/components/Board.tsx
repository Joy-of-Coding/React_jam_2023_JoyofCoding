import { useEffect, useState } from "react";
import Tile from "./Tile";

interface BoardProps {
  width: number;
  height: number;
}

function Board({ width, height }: BoardProps) {
  const [board, setBoard] = useState(() => {
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
  });

  // insert bombs
  function insertBombs(matrix, bombs) {
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

  // show bumbers for bombs
  // use effect to track board changes
  useEffect(() => {
    const updateBoard = insertBombs(board, 10);
    setBoard(updateBoard);
  }, [board]);

  return (
    <div className="board">
      {board.map((row) => row.map((tile) => <Tile key={tile.id} {...tile} />))}
    </div>
  );
}

export default Board;
