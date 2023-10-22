// import { useEffect, useState } from "react";
import { TileProp } from "../logic";
import Tile from "./Tile";
import "./Board.css";

interface BoardProps {
  board: Array<Array<TileProp>>;
  display: boolean;
}

//add game props from rune SDK
function Board({ board, display }: BoardProps) {
  if (display) {
    return (
      <>
        <div className="board">
          {board.map((row) =>
            row.map((tile) => <Tile key={tile.id} {...tile} />)
          )}
        </div>
      </>
    );
  }
}

export default Board;
