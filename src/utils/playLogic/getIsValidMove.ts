import { ChessGame, MoveType } from '@/src/types/chess';
import { getAllAvailableMoves } from '../chess';

const getIsValidMove = (game: ChessGame, move: MoveType): boolean => {
  const allMoves = getAllAvailableMoves(game);
  return !!allMoves.find((_move) => _move.square === move.square && _move.target === move.target);
};

export default getIsValidMove;
