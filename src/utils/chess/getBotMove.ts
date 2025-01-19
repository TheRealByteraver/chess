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
  [KING]: 4,
} as const;

const evaluateMove = (game: ChessGame, move: MoveType): number => {
  const { target } = move;

  // simply return the value of the captured piece
  return pieceValues[(game.board[target] & PIECEMASK) as keyof typeof pieceValues];
};

const getRandomBestMove = (evalMoves: EvalType[], sign: number): EvalType => {
  if (evalMoves.length === 0) return { move: { square: 0, target: 0 }, score: sign * Infinity };

  const highestScore = evalMoves.reduce(
    (max, evalMove) => Math.max(max, evalMove.score),
    -Infinity,
  );
  const bestMoves = evalMoves.filter((evalMove) => evalMove.score === highestScore);

  // randomly return one of the best moves
  const randomIndex = Math.floor(Math.random() * bestMoves.length);

  return {
    move: bestMoves[randomIndex].move,
    // move: bestMoves[0].move,
    score: highestScore,
  };
};

const getBestMove = (
  game: ChessGame,
  depth: number,
  sign: number,
  parentScore: number,
): EvalType => {
  const game1 = game;
  const moves1 = getAllAvailableMoves(game1);
  if (moves1.length === 0) return { move: { square: 0, target: 0 }, score: -Infinity };

  const evalMoves1 = moves1.map((move) => ({ move, score: evaluateMove(game1, move) }));

  const bestMoves2 = evalMoves1.map((evalMove) => {
    const game2 = makeMove(game1, evalMove.move);
    const moves2 = getAllAvailableMoves(game2);
    const evalMoves2 = moves2.map((move) => ({
      move,
      score: evalMove.score - evaluateMove(game2, move),
    }));

    const bestMoves3 = evalMoves2.map((evalMove) => {
      const game3 = makeMove(game2, evalMove.move);
      const moves3 = getAllAvailableMoves(game3);
      const evalMoves3 = moves3.map((move) => ({
        move,
        score: evalMove.score + evaluateMove(game3, move),
      }));

      const hiScore3 = evalMoves3.reduce((acc, cur) => Math.max(acc, cur.score), -Infinity);
      return hiScore3;
    });

    const hiScore2 = bestMoves3.reduce((acc, cur) => Math.min(acc, cur), +Infinity);
    return hiScore2;
  });

  const hiScore1 = bestMoves2.reduce((acc, cur) => Math.max(acc, cur), -Infinity);

  const bestMovesIndex = bestMoves2.findIndex((bestMove) => bestMove === hiScore1);
  return {
    move: evalMoves1[bestMovesIndex].move,
    score: 0 + evalMoves1[bestMovesIndex].score,
  };
};

const getBotMove = (game: ChessGame): MoveType | undefined => {
  const depth = 4;
  const bestMove = getBestMove(game, depth, 1, 0);

  const { move, score } = bestMove;
  if (move.square === 0 && move.target === 0) return undefined;
  return move;
};

export default getBotMove;
