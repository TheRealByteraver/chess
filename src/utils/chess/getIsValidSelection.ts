import { ChessGame, PlayerColor } from '@/src/types/chess';
import getPieceColor from './getPieceColor';

const getIsValidSelection = (
  board: ChessGame['board'],
  square: number,
  playerColor: PlayerColor
): boolean => {
  const piece = board[square];
  const pieceColor = getPieceColor(piece);
  // TODO: check if this piece can make a valid move
  return pieceColor === playerColor;
};

export default getIsValidSelection;
