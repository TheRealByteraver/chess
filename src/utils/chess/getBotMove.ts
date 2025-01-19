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
  const evalMoves1 = moves1.map((move) => ({ move, score: 1 * evaluateMove(game1, move) }));

  // console.log('evalMoves1:');
  // evalMoves1.forEach((evalMove) => {
  //   console.log(evalMove.move.square, '->', evalMove.move.target, ', score:', evalMove.score);
  // });
  // evalMoves1.sort((a, b) => b.score - a.score);

  const bestMoves2: EvalType[] = [];
  evalMoves1.forEach((evalMove, index) => {
    const game2 = makeMove(game1, evalMove.move);
    const moves2 = getAllAvailableMoves(game2);
    const evalMoves2 = moves2.map((move) => ({
      move,
      score: 1 * evaluateMove(game2, move),
    }));

    const hiScore2 = evalMoves2.reduce((acc, cur) => Math.max(acc, cur.score), -Infinity);
    const hiScore2Move = evalMoves2.find((evalMove) => evalMove.score === hiScore2) as EvalType;
    bestMoves2.push({
      move: hiScore2Move.move,
      score: evalMove.score - hiScore2Move.score,
    });

    // debug / console.log code
    const { square, target } = bestMoves2[bestMoves2.length - 1].move;
    const { score } = bestMoves2[bestMoves2.length - 1];
    console.log(
      evalMove.move.square,
      '->',
      evalMove.move.target,
      ': best move = ',
      square,
      '->',
      target,
      ', score:',
      score,
    );

    if (evalMove.move.square == 16 && evalMove.move.target == 33) {
      console.log('******************************');
      console.log('evalMoves2:');
      evalMoves2.forEach((evalMove) => {
        console.log(evalMove.move.square, '->', evalMove.move.target, ', score:', evalMove.score);
      });
      console.log('******************************');
    }
  });

  const hiScore1 = bestMoves2.reduce((acc, cur) => Math.max(acc, cur.score), -Infinity);
  const bestMovesIndex = bestMoves2.findIndex((bestMove) => bestMove.score === hiScore1);
  console.log('bestMoves2', bestMoves2);
  console.log('bestMovesIndex', bestMovesIndex);
  console.log('making move:', evalMoves1[bestMovesIndex].move);

  return evalMoves1[bestMovesIndex];

  // const hiScore1 = evalMoves1.reduce((acc, cur) => Math.max(acc, cur.score), -Infinity);
  // const bestMoves = moves1.filter((move, index) => scores1[index] === hiScore1);

  // let bestMoves2: MoveType[] = [];
  // moves1.forEach((move, index) => {
  //   const game2 = makeMove(game1, move);

  //   const moves2 = getAllAvailableMoves(game2);
  //   const scores2 = moves2.map((move) => scores1[index] -1 * evaluateMove(game2, move));
  //   const hiScore2 = scores2.reduce((acc, cur) => Math.max(acc, cur), -Infinity);

  //   const bestMoves = moves2.filter((move, index) => scores2[index] === hiScore2);
  //   bestMoves2.push(bestMoves[0]);
  // });

  // const scores = bestMoves2.map((move) => scores1[index] -1 * evaluateMove(game2, move));

  // const bestMoves = bestMoves2.filter((move, index) => scores2[index] === hiScore2);
  // bestMoves2.push(bestMoves[0]);

  // console.log('bestMoves', bestMoves2);
  // return {
  //   move: bestMoves2[0],
  //   score: hiScore1,
  // };

  // let evalCount = 0;
  // // bot move (+)
  // // let hiScore1 = -Infinity;
  // const moves1 = getAllAvailableMoves(game);
  // let hiScore2 = -Infinity;
  // moves1.forEach((move, index) => {
  //   // player move (-)
  //   const game2 = makeMove(game, move);
  //   const moves2 = getAllAvailableMoves(game2);
  //   let hiScore3 = -Infinity;
  //   moves2.forEach((move, index) => {
  //     // bot move (+)
  //     const game3 = makeMove(game2, move);
  //     const moves3 = getAllAvailableMoves(game3);
  //     let hiScore4 = -Infinity;
  //     moves3.forEach((move, index) => {
  //       // player move (-)
  //       const game4 = makeMove(game3, move);
  //       const moves4 = getAllAvailableMoves(game4);
  //       evalCount += moves4.length;

  //       const scores4 = moves4.map((move) => -1 * evaluateMove(game4, move));
  //       const bestScore4 = scores4.reduce((acc, cur) => Math.max(acc, cur), -Infinity);
  //       hiScore4 = Math.max(hiScore4, bestScore4);
  //     });
  //     // moves2 section
  //     const scores3 = moves3.map((move) => 1 * evaluateMove(game3, move));
  //     const bestScore3 = scores3.reduce((acc, cur) => Math.max(acc, cur), -Infinity);
  //     hiScore3 = Math.max(hiScore3, hiScore4 + bestScore3);
  //   });
  //   // moves1 section
  //   const scores2 = moves2.map((move) => -1 * evaluateMove(game2, move));
  //   const bestScore2 = scores2.reduce((acc, cur) => Math.max(acc, cur), -Infinity);
  //   hiScore2 = Math.max(hiScore2, hiScore3 + bestScore2);
  // });
  // // root section
  // const scores1 = moves1.map((move) => ({
  //   score: hiScore2 + 1 * evaluateMove(game, move),
  //   move,
  // }));
  // const bestScore1 = scores1.reduce((acc, cur) => Math.max(acc, cur.score), -Infinity);
  // // hiScore1 = Math.max(hiScore1, hiScore2 + bestScore1);
  // const bestMove = scores1.find((score) => score.score === bestScore1);
  // console.log('evalCount', evalCount);
  // return bestMove as EvalType;

  // .map((move) => {
  //   const score = 1 * evaluateMove(game, move);
  //   return { move, score };
  // });

  // const moves1: EvalType[] = [];
  // evalMoves1.forEach((evalMove1) => {
  //   const game2 = makeMove(game, evalMove1.move);
  //   const evalMoves2 = getAllAvailableMoves(game2).map((move) => {
  //     const score = (-1) * evaluateMove(game2, move);
  //     return { move, score };
  //   });
  //   moves.push(move);
  // });

  // if (depth > 1) {
  //   const evalMoves = getAllAvailableMoves(game).map((move) => {
  //     const score = sign * evaluateMove(game, move);
  //     return { move, score };
  //   });

  //   const moves: EvalType[] = [];
  //   evalMoves.forEach((evalMove) => {
  //     const newGame = makeMove(game, evalMove.move);
  //     const move = getBestMove(newGame, depth - 1, -sign, parentScore + evalMove.score);
  //     moves.push(move);
  //   });
  // }

  // const evalMoves = getAllAvailableMoves(game).map((move) => {
  //   const score = parentScore + sign * evaluateMove(game, move);
  //   return { move, score };
  // });

  // if (depth <= 1) return getRandomBestMove(evalMoves, sign);

  // const moves: EvalType[] = [];
  // evalMoves.forEach((evalMove) => {
  //   const newGame = makeMove(game, evalMove.move);
  //   const move = getBestMove(newGame, depth - 1, -sign, parentScore + evalMove.score);
  //   moves.push(move);
  // });

  // console.log('depth', depth);
  // return getRandomBestMove(evalMoves, sign);

  // new:
  // const evalMoves1 = getAllAvailableMoves(game).map((move) => ({
  //   score: sign * evaluateMove(game, move),
  //   move,
  // }));

  // // voor iedere move, make een new game en evalueer alle moves

  // const moves: EvalType[] = [];
  // evalMoves.forEach((evalMove) => {
  //   const newGame = makeMove(game, evalMove.move);
  //   const move = getBestMove(newGame, depth - 1, -sign, parentScore + evalMove.score);
  //   moves.push(move);
  // });
};

const getBotMove = (game: ChessGame): MoveType | undefined => {
  const depth = 4;
  const bestMove = getBestMove(game, depth, 1, 0);

  const { move, score } = bestMove;
  if (move.square === 0 && move.target === 0) return undefined;
  return move;
};

export default getBotMove;
