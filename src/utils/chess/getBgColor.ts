import { PlayerColor } from 'src/types/chess';

const getBgColor = (squareNr: number): PlayerColor => {
  const rowNr = squareNr >> 3;
  const colNr = squareNr & 7;
  return ((rowNr + colNr) & 1) === 1 ? 'black' : 'white';
};

export default getBgColor;
