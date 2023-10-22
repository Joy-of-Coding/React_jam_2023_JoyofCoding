import "./Tile.css";

interface TileProps {
  id: number;
  isBomb: boolean;
  isFlipped: boolean;
  isMarked: boolean;
  value: number;
}

function Tile({ id, isBomb, isFlipped, isMarked, value }: TileProps) {
  return (
    <div
      id={id.toString()}
      className={`tile ${
        isBomb && isFlipped ? "isBomb" : isFlipped ? "isFlipped" : "hidden"
      } ${isMarked && "isMarked"}`}
    >
      {isBomb ? "" : value === 0 ? "" : value}
    </div>
  );
}

export default Tile;
