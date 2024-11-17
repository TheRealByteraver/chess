import { ChessBoardType, ChessGame, MoveType } from '@/src/types/chess';
import {
  BISHOP,
  BLACKKING,
  EMPTY,
  KING,
  KNIGHT,
  PAWN,
  PIECEMASK,
  QUEEN,
  ROOK,
  WHITEKING,
} from '../constants';
import getPieceColor from './getPieceColor';
import getPieceXY from './getPieceXY';

const isInCheck = (game: ChessGame, move: MoveType): boolean => {
  const testBoard: ChessBoardType = [...game.board];
  testBoard[move.target] = testBoard[move.square];
  testBoard[move.square] = EMPTY;
  const testGame: ChessGame = {
    ...game,
    board: testBoard,
    activeColor: game.activeColor === 'white' ? 'black' : 'white',
  };
  const testKing = game.activeColor === 'white' ? WHITEKING : BLACKKING;

  for (let square = 0; square < 64; square++) {
    if (getPieceColor(testBoard[square]) !== testGame.activeColor) continue;

    const moves = getPieceAvailableMoves(testGame, square);
    for (const move of moves) if (testBoard[move] === testKing) return true;
  }

  return false;
};

const getAllAvailableMoves = (game: ChessGame): MoveType[] => {
  const allMoves: MoveType[] = [];

  console.log('game.activeColor:', game.activeColor);
  for (let square = 0; square < 64; square++) {
    if (getPieceColor(game.board[square]) !== game.activeColor) continue;
    const moves = getPieceAvailableMoves(game, square);
    if (moves.length > 0)
      moves.forEach((target) => allMoves.push({ square, target }));
  }

  console.log('allMoves:', allMoves);
  const legalMoves = allMoves.filter((move) => !isInCheck(game, move));
  return legalMoves;
};

const getPieceAvailableMoves = (game: ChessGame, square: number): number[] => {
  // PROPS
  const { board, enPassant } = game;

  // METHODS
  const getRookMoves = (): number[] => {
    const moves: number[] = [];
    // up
    for (let i = y - 1; i >= 0; i--) {
      const square = i * 8 + x;
      if (board[square] === EMPTY) moves.push(square);
      else {
        if (getPieceColor(board[square]) === opponentColor) moves.push(square);
        break;
      }
    }
    // down
    for (let i = y + 1; i < 8; i++) {
      const square = i * 8 + x;
      if (board[square] === EMPTY) moves.push(square);
      else {
        if (getPieceColor(board[square]) === opponentColor) moves.push(square);
        break;
      }
    }
    // left
    for (let i = x - 1; i >= 0; i--) {
      const square = y * 8 + i;
      if (board[square] === EMPTY) moves.push(square);
      else {
        if (getPieceColor(board[square]) === opponentColor) moves.push(square);
        break;
      }
    }
    // right
    for (let i = x + 1; i < 8; i++) {
      const square = y * 8 + i;
      if (board[square] === EMPTY) moves.push(square);
      else {
        if (getPieceColor(board[square]) === opponentColor) moves.push(square);
        break;
      }
    }
    return moves;
  };

  const getBishopMoves = (): number[] => {
    const moves: number[] = [];
    // up-left
    for (let i = 1; x - i >= 0 && y - i >= 0; i++) {
      const square = (y - i) * 8 + x - i;
      if (board[square] === EMPTY) moves.push(square);
      else {
        if (getPieceColor(board[square]) === opponentColor) moves.push(square);
        break;
      }
    }
    // up-right
    for (let i = 1; x + i < 8 && y - i >= 0; i++) {
      const square = (y - i) * 8 + x + i;
      if (board[square] === EMPTY) moves.push(square);
      else {
        if (getPieceColor(board[square]) === opponentColor) moves.push(square);
        break;
      }
    }
    // down-left
    for (let i = 1; x - i >= 0 && y + i < 8; i++) {
      const square = (y + i) * 8 + x - i;
      if (board[square] === EMPTY) moves.push(square);
      else {
        if (getPieceColor(board[square]) === opponentColor) moves.push(square);
        break;
      }
    }
    // down-right
    for (let i = 1; x + i < 8 && y + i < 8; i++) {
      const square = (y + i) * 8 + x + i;
      if (board[square] === EMPTY) moves.push(square);
      else {
        if (getPieceColor(board[square]) === opponentColor) moves.push(square);
        break;
      }
    }
    return moves;
  };

  // VARS
  const piece = board[square];
  const pieceColor = getPieceColor(piece);
  const opponentColor = pieceColor === 'white' ? 'black' : 'white';
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
      } else {
        if (
          y === 1 &&
          board[square + 8] === EMPTY &&
          board[square + 16] === EMPTY
        )
          moves.push(square + 16);
        if (y < 7) {
          if (board[square + 8] === EMPTY) moves.push(square + 8);
          if (
            x > 0 &&
            (getPieceColor(board[square + 7]) === 'white' ||
              square + 7 === enPassant)
          )
            moves.push(square + 7);
          if (
            x < 7 &&
            (getPieceColor(board[square + 9]) === 'white' ||
              square + 9 === enPassant)
          )
            moves.push(square + 9);
        }
      }
      break;
    case ROOK:
      const rookMoves = getRookMoves();
      moves.push(...rookMoves);
      break;
    case KNIGHT:
      const knightPositions = [
        [x - 1, y - 2],
        [x + 1, y - 2],
        [x - 2, y - 1],
        [x + 2, y - 1],
        [x - 2, y + 1],
        [x + 2, y + 1],
        [x - 1, y + 2],
        [x + 1, y + 2],
      ]
        .filter(([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8)
        .filter(
          ([x, y]) =>
            board[y * 8 + x] === EMPTY ||
            getPieceColor(board[y * 8 + x]) === opponentColor
        );

      moves.push(...knightPositions.map(([x, y]) => y * 8 + x));
      break;
    case BISHOP:
      const bishopMoves = getBishopMoves();
      moves.push(...bishopMoves);
      break;
    case QUEEN:
      const straightMoves = getRookMoves();
      const diagonalMoves = getBishopMoves();
      moves.push(...straightMoves, ...diagonalMoves);
      break;
    case KING:
      // todo: castling
      const kingPositions = [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
      ]
        .filter(([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8)
        .filter(
          ([x, y]) =>
            board[y * 8 + x] === EMPTY ||
            getPieceColor(board[y * 8 + x]) === opponentColor
        );
      moves.push(...kingPositions.map(([x, y]) => y * 8 + x));
      break;
    default:
      break;
  }

  return moves;
};

export { getAllAvailableMoves, getPieceAvailableMoves, isInCheck };
