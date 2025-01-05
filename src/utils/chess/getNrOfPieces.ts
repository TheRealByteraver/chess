import { ChessBoardType } from '@/src/types/chess';
import { EMPTY } from '../constants';

const getNrOfPieces = (board: ChessBoardType): number => {
  return board.filter((square) => square !== EMPTY).length;
};

export default getNrOfPieces;
