import { ChessGame } from 'src/types/chess';
import getPieceColor from './getPieceColor';
import { EMPTY } from '../constants';
import getPieceXY from './getPieceXY';

const getBishopMoves = (game: ChessGame, square: number): number[] => {
  // PROPS
  const { board } = game;

  // VARS
  const piece = board[square];
  const pieceColor = getPieceColor(piece);
  const opponentColor = pieceColor === 'white' ? 'black' : 'white';

  const [x, y] = getPieceXY(square);

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

export default getBishopMoves;
