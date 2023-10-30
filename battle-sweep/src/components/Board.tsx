// import { useEffect, useState } from "react";
import { TileProp } from "../helper/Types";
import Tile from "./Tile";
import "./Board.css";

interface BoardProps {
  board: TileProp[][];
  display: boolean;
  onPress: (row: number, col: number) => void;
  onLongPress: (row: number, col: number) => void;
}

//add game props from rune SDK
function Board({ board, display, onPress, onLongPress }: BoardProps) {
  if (display) {
    return (
      <>
        
        <div className="board">
          {board.map((row) =>
            row.map((tile, index) => (
              <Tile
                key={index}
                onPress={onPress}
                onLongPress={onLongPress}
                {...tile}
              />
            ))
          )}
        </div>
      
      </>
    );
  }
}

export default Board;
