import { ChessGame } from '@/src/types/chess';
import { EMPTY } from '../constants';
import getPieceColor from './getPieceColor';
import getPieceXY from './getPieceXY';

const getRookMoves = (game: ChessGame, square: number): number[] => {
  // PROPS
  const { board } = game;

  // VARS
  const piece = board[square];
  const pieceColor = getPieceColor(piece);
  const opponentColor = pieceColor === 'white' ? 'black' : 'white';

  const [x, y] = getPieceXY(square);
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

export default getRookMoves;
