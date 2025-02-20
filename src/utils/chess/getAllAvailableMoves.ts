import { ChessGame, MoveType } from 'src/types/chess';

import getPieceColor from './getPieceColor';
import getPieceAvailableMoves from './getPieceAvailableMoves';
import isInCheck from './isInCheck';
import { KING, PIECEMASK } from '../constants';

const getAllAvailableMoves = (game: ChessGame): MoveType[] => {
  const allMoves: MoveType[] = [];

  for (let square = 0; square < 64; square++) {
    if (getPieceColor(game.board[square]) !== game.activeColor) continue;
    const moves = getPieceAvailableMoves(game, square);
    if (moves.length === 0) continue;
    const piece = game.board[square] & PIECEMASK;
    if (piece !== KING) {
      moves.forEach((target) => allMoves.push({ square, target }));
      continue;
    }
    // We are dealing with the king, check castling rules
    const castlingMoves: number[] = [];
    const regularMoves: number[] = [];
    moves.forEach((target) => {
      if (Math.abs(target - square) !== 2) regularMoves.push(target);
      else castlingMoves.push(target);
    });
    // push the regular moves
    regularMoves.forEach((target) => allMoves.push({ square, target }));

    // push the castling moves if the king is not in check
    castlingMoves.forEach((target) => {
      const delta = target - square;
      const kingPositions = [square, square + (delta >> 1), target];
      const kingInCheck = kingPositions.some((target) => isInCheck(game, { square, target }));
      if (!kingInCheck) allMoves.push({ square, target });
    });
    // end of castling logic
  }

  const legalMoves = allMoves.filter((move) => !isInCheck(game, move));
  return legalMoves;
};

export default getAllAvailableMoves;
