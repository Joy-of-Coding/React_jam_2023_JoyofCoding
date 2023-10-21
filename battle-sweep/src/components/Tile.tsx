interface TileProps {
  id: number;
  isBomb: boolean;
  isFlipped: boolean;
  isMarked: boolean;
  value: number;
}

/*
isBomb &&
        "isBomb " + isFlipped &&
        "isFlipped " + isMarked &&
        "isMarked "
*/

function Tile({ id, isBomb, isFlipped, isMarked, value }: TileProps) {
  return (
    <div id={id.toString()} className={isBomb ? "isBomb" : ""}>
      {value && value}
    </div>
  );
}

export default Tile;
