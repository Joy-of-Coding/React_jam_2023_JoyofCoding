// import { useEffect, useState } from "react";
import { TileProp } from "../logic";
import Tile from "./Tile";
import "./Board.css";

interface BoardProps {
  board: Array<Array<TileProp>>;
  display: boolean;
  onPress: (row: number, col: number) => void;
}

//add game props from rune SDK
function Board({ board, display, onPress }: BoardProps) {
  if (display) {
    return (
      <>
        <div className="board">
          {board.map((row) =>
            row.map((tile, index) => (
              <Tile key={index} onPress={onPress} {...tile} />
            ))
          )}
        </div>
      </>
    );
  }
}

export default Board;
