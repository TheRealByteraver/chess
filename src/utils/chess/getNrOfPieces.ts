import { ChessBoardType } from 'src/types/chess';

import { EMPTY } from '../constants';

const getNrOfPieces = (board: ChessBoardType): number =>
  board.filter((square) => square !== EMPTY).length;

export default getNrOfPieces;
