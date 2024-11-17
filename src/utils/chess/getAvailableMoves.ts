import { ChessGame } from '@/src/types/chess';
import {
  BISHOP,
  EMPTY,
  KING,
  KNIGHT,
  PAWN,
  PIECEMASK,
  QUEEN,
  ROOK,
} from '../constants';
import getPieceColor from './getPieceColor';
import getPieceXY from './getPieceXY';

// const isValidTarget = (game: ChessGame, square: number): boolean => {

// };

const getAvailableMoves = (game: ChessGame, square: number): number[] => {
  const { board, enPassant } = game;

  const piece = board[square];
  const pieceColor = getPieceColor(piece);
  // const opponentColor = pieceColor === 'white' ? 'black' : 'white';
  if (!pieceColor) return []; // empty square

  const pieceType = piece & PIECEMASK;
  const [x, y] = getPieceXY(square);
  const moves: number[] = [];

  switch (pieceType) {
    case PAWN:
      if (pieceColor === 'white') {
        if (
          y === 6 &&
          board[square - 8] === EMPTY &&
          board[square - 16] === EMPTY
        )
          moves.push(square - 16);
        if (y > 0) {
          if (board[square - 8] === EMPTY) moves.push(square - 8);
          if (
            x > 0 &&
            (getPieceColor(board[square - 9]) === 'black' ||
              square - 9 === enPassant)
          )
            moves.push(square - 9);
          if (
            x < 7 &&
            (getPieceColor(board[square - 7]) === 'black' ||
              square - 7 === enPassant)
          )
            moves.push(square - 7);
        }
      }
      break;
    case ROOK:
      return [];
    case KNIGHT:
      return [];
    case BISHOP:
      return [];
    case QUEEN:
      return [];
    case KING:
      return [];
    default:
      return [];
  }

  return moves;
};

export default getAvailableMoves;
