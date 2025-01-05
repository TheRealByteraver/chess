import { ChessGame, MoveType } from 'src/types/chess';
import getAllAvailableMoves from './getAllAvailableMoves';
import makeMove from './makeMove';
import { BISHOP, EMPTY, KING, KNIGHT, PAWN, PIECEMASK, QUEEN, ROOK } from '../constants';

type EvalType = {
  move: MoveType;
  score: number;
};

const pieceValues = {
  [EMPTY]: 0,
  [PAWN]: 1,
  [ROOK]: 5,
  [KNIGHT]: 3,
  [BISHOP]: 3,
  [QUEEN]: 9,
  [KING]: 12,
} as const;

const getBotMove = (game: ChessGame): MoveType | undefined => {
  const allMoves = getAllAvailableMoves(game);
  if (allMoves.length === 0) return undefined;

  const movesTree: EvalType[] = allMoves.map((move) => {
    const { target } = move;
    const score = pieceValues[(game.board[target] & PIECEMASK) as keyof typeof pieceValues];
    return { move, score };
  });

  movesTree.forEach((moveEval) => {
    const newGame = makeMove(game, moveEval.move);
    const allMoves = getAllAvailableMoves(newGame);
    if (allMoves.length === 0) return;

    const movesTree: EvalType[] = allMoves.map((move) => {
      const { target } = move;
      const score = pieceValues[(newGame.board[target] & PIECEMASK) as keyof typeof pieceValues];
      return { move, score };
    });

    const bestMove = movesTree.reduce((prev, current) =>
      prev.score > current.score ? prev : current,
    ).move;
    moveEval.score -=
      pieceValues[(newGame.board[bestMove.target] & PIECEMASK) as keyof typeof pieceValues];
  });

  console.log(movesTree);

  return movesTree.reduce((prev, current) => (prev.score > current.score ? prev : current)).move;
};

export default getBotMove;
