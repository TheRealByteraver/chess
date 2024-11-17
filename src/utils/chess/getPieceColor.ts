import { ChessPieceType, PlayerColor } from '@/src/types/chess';
import { BLACK, EMPTY } from '../constants';

const getPieceColor = (piece: ChessPieceType): PlayerColor | undefined => {
  if (piece === EMPTY) return undefined;
  return !!(piece & BLACK) ? 'black' : 'white';
};

export default getPieceColor;
