import "./Tile.css";

interface TileProps {
  row: number;
  col: number;
  isBomb: boolean;
  isFlipped: boolean;
  isMarked: boolean;
  value: number;
  onPress: (row: number, col: number) => void;
}

function Tile({
  row,
  col,
  isBomb,
  isFlipped,
  isMarked,
  value,
  onPress,
}: TileProps) {
  return (
    <div
      onClick={() => onPress(row, col)}
      className={`tile ${
        isBomb && isFlipped
          ? "isBomb"
          : isFlipped
          ? "isFlipped"
          : isMarked
          ? "isMarked"
          : "hidden"
      }`}
    >
      {isBomb ? "" : value === 0 ? "" : value}
    </div>
  );
}

export default Tile;
