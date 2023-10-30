// import { useEffect, useState } from "react";
import { TileProp } from "../helper/Types";
import Tile from "./OpponentTile";
import "./OpponentBoard.css";

interface BoardProps {
  board: TileProp[][];
  onPress: (row: number, col: number) => void;
  onLongPress: (row: number, col: number) => void;
}

//add game props from rune SDK
function Board({ board, onPress, onLongPress }: BoardProps) {
  return (
    <>
      <div className="opponentboard">
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

export default Board;
