import { ChessGame, MoveType } from '@/src/types/chess';

import getPieceColor from './getPieceColor';
import getPieceAvailableMoves from './getPieceAvailableMoves';
import isInCheck from './isInCheck';

const getAllAvailableMoves = (game: ChessGame): MoveType[] => {
  const allMoves: MoveType[] = [];

  for (let square = 0; square < 64; square++) {
    if (getPieceColor(game.board[square]) !== game.activeColor) continue;
    const moves = getPieceAvailableMoves(game, square);
    if (moves.length > 0) moves.forEach((target) => allMoves.push({ square, target }));
  }

  const legalMoves = allMoves.filter((move) => !isInCheck(game, move));
  return legalMoves;
};

export default getAllAvailableMoves;
