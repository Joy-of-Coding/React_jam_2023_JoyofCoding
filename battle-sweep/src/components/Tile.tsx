import "./Tile.css";
import useLongPress from "../helper/UseLongPress";

interface TileProps {
  row: number;
  col: number;
  isBomb: boolean;
  isFlipped: boolean;
  isMarked: boolean;
  setReveal: boolean;
  value: number;
  onPress: (row: number, col: number) => void;
  onLongPress: (row: number, col: number) => void;
}

function Tile({
  row,
  col,
  isBomb,
  isFlipped,
  isMarked,
  setReveal,
  value,
  onPress,
  onLongPress,
}: TileProps) {
  const LongPress = useLongPress(onPress, onLongPress, row, col);

  return (
    <div
      {...LongPress}
      className={`tile ${
        isBomb && isFlipped
          ? "isBomb"
          : isFlipped
          ? "isFlipped"
          : isMarked
          ? "isMarked"
          : "hidden"
      } ${isBomb && isMarked && isFlipped && "gradient-border"}
      ${setReveal && "gradient-border"}`}
    >
      {isBomb ? "" : value === 0 ? "" : value}
    </div>
  );
}

export default Tile;
