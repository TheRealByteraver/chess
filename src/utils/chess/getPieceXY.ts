const getPieceXY = (square: number): [number, number] => {
  const x = square & 7;
  const y = square >> 3;
  return [x, y];
};

export default getPieceXY;
