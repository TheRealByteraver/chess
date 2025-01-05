import { ChessGame } from 'src/types/chess';
import getPieceColor from './getPieceColor';
import { BISHOP, KING, KNIGHT, PAWN, PIECEMASK, QUEEN, ROOK } from '../constants';
import getPawnMoves from './getPawnMoves';
import getRookMoves from './getRookMoves';
import getKnightMoves from './getKnightMoves';
import getBishopMoves from './getBishopMoves';
import getKingMoves from './getKingMoves';

const getPieceAvailableMoves = (game: ChessGame, square: number): number[] => {
  // PROPS
  const { board } = game;

  // VARS
  const piece = board[square];
  const pieceColor = getPieceColor(piece);
  if (!pieceColor) return []; // empty square

  const pieceType = piece & PIECEMASK;
  const moves: number[] = [];

  switch (pieceType) {
    case PAWN:
      const pawnMoves = getPawnMoves(game, square);
      moves.push(...pawnMoves);
      break;
    case ROOK:
      const rookMoves = getRookMoves(game, square);
      moves.push(...rookMoves);
      break;
    case KNIGHT:
      const knightMoves = getKnightMoves(game, square);
      moves.push(...knightMoves);
      break;
    case BISHOP:
      const bishopMoves = getBishopMoves(game, square);
      moves.push(...bishopMoves);
      break;
    case QUEEN:
      const straightMoves = getRookMoves(game, square);
      const diagonalMoves = getBishopMoves(game, square);
      moves.push(...straightMoves, ...diagonalMoves);
      break;
    case KING:
      const kingMoves = getKingMoves(game, square);
      moves.push(...kingMoves);
      break;
    default:
      break;
  }

  return moves;
};

export default getPieceAvailableMoves;
