import { useEffect, useState } from "react";
import Tile from "./Tile";
import './Board.css'


interface BoardProps {
  //remove original props from interface
  // width: number;
  // height: number;

  //add boardprops
      board: Array<any>


}

//moved this to logic.ts
// function createBoard(height: number, width: number) {
//   const matrix = [];
//   for (let row = 0; row < height; row++) {
//     const newRow = [];
//     for (let col = 0; col < width; col++) {
//       newRow.push({
//         id: row + col,
//         isBomb: false,
//         isFlipped: false,
//         isMarked: false,
//         value: 0,
//
//       });
//     }
//     matrix.push(newRow);
//   }
//   return matrix;
// }

//can remove height & width props from Board it is created in logic.tsx
//add game props from rune SDK
function Board({board}) {

  //board state is created in logic.tsx
  // const [board, setBoard] = useState(() => {
  //   return createBoard(height, width);
  // });


  //game logic moved to tsx
  // insert bombs
  // function insertBombs(matrix: [[]], bombs:number ) {
  //   let bombsToInsert = bombs;
  //
  //   while (bombsToInsert > 0) {
  //     const row = Math.floor(Math.random() * matrix.length);
  //     const col = Math.floor(Math.random() * matrix[0].length);
  //
  //     if (!matrix[row][col].isBomb) {
  //       matrix[row][col].isBomb = true;
  //     }
  //     bombsToInsert--;
  //   }
  //   return matrix;
  // }

  //game logic moved to tsx
  // show numbers for bombs
  // use effect to track board changes
  // useEffect(() => {
  //   const updateBoard = insertBombs(board, 10);
  //   setBoard(updateBoard);
  // }, [board]);

  return (
      <>
      <h1>Battle Sweeper</h1>
        <div className="board">
          {board.map((row) =>
              row.map((tile) =>
                  <Tile key={tile.id} {...tile} />
              )
          )}
        </div>
      </>
  );
}

export default Board;
