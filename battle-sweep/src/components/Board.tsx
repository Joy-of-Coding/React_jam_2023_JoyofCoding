// import { useEffect, useState } from "react";
import { TileProp } from "../logic";
import Tile from "./Tile";
import "./Board.css";

interface BoardProps {
  board: Array<Array<TileProp>>;
}

//add game props from rune SDK
function Board({ board }: BoardProps) {
  return (
    <>
      <h1>Battle Sweeper</h1>
      <div className="board">
        {board.map((row) =>
          row.map((tile) => <Tile key={tile.id} {...tile} />)
        )}
      </div>
    </>
  );
}

export default Board;
