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
      className={`tile ${isBomb && "isBomb"} ${isFlipped && "isFlipped"} ${
        isMarked && "isMarked"
      }`}
    >
      {isBomb ? "B" : value}
    </div>
  );
}

export default Tile;
