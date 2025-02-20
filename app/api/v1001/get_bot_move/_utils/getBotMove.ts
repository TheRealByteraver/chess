import { ChessGame, MoveType } from 'src/types/chess';
import { getAllAvailableMoves, getPieceXY, makeMove } from 'src/utils/chess';
import { BISHOP, EMPTY, KING, KNIGHT, PAWN, PIECEMASK, QUEEN, ROOK } from 'src/utils/constants';

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
  const { square, target } = move;

  // pawn promotion logic
  const [, y] = getPieceXY(target);
  const finalRow = game.activeColor === 'white' ? 0 : 7;
  if ((game.board[square] & PIECEMASK) === PAWN && y === finalRow) {
    return pieceValues[QUEEN];
  }

  // simply return the value of the captured piece
  return pieceValues[(game.board[target] & PIECEMASK) as keyof typeof pieceValues];
};

const getEvalMoves = (
  game: ChessGame,
  evalMove: EvalType,
  sign: number,
): {
  game: ChessGame;
  evalMoves: EvalType[];
} => {
  const game2 = makeMove(game, evalMove.move);
  const moves2 = getAllAvailableMoves(game2);
  const evalMoves = moves2.map((move) => ({
    move,
    score: evalMove.score + sign * evaluateMove(game2, move),
  }));
  return {
    game: game2,
    evalMoves,
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
    const { game: game2, evalMoves: evalMoves2 } = getEvalMoves(game1, evalMove, -1);

    const bestMoves3 = evalMoves2.map((evalMove) => {
      const { game: game3, evalMoves: evalMoves3 } = getEvalMoves(game2, evalMove, 1);

      const hiScore3 = evalMoves3.reduce((acc, cur) => Math.max(acc, cur.score), -Infinity);
      return hiScore3;
    });

    const hiScore2 = bestMoves3.reduce((acc, cur) => Math.min(acc, cur), +Infinity);
    return hiScore2;
  });

  const hiScore1 = bestMoves2.reduce((acc, cur) => Math.max(acc, cur), -Infinity);

  const bestMoves = evalMoves1.filter((evalMove, index) => bestMoves2[index] === hiScore1);
  const bestMovesIndex = Math.floor(Math.random() * bestMoves.length);

  return {
    move: bestMoves[bestMovesIndex].move,
    score: 0 + bestMoves[bestMovesIndex].score,
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
