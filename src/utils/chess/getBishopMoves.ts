import { ChessGame } from 'src/types/chess';

import { EMPTY } from '../constants';
import getPieceColor from './getPieceColor';
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
    const targetSquare = (y - i) * 8 + x - i;
    if (board[targetSquare] === EMPTY) moves.push(targetSquare);
    else {
      if (getPieceColor(board[targetSquare]) === opponentColor) moves.push(targetSquare);
      break;
    }
  }
  // up-right
  for (let i = 1; x + i < 8 && y - i >= 0; i++) {
    const targetSquare = (y - i) * 8 + x + i;
    if (board[targetSquare] === EMPTY) moves.push(targetSquare);
    else {
      if (getPieceColor(board[targetSquare]) === opponentColor) moves.push(targetSquare);
      break;
    }
  }
  // down-left
  for (let i = 1; x - i >= 0 && y + i < 8; i++) {
    const targetSquare = (y + i) * 8 + x - i;
    if (board[targetSquare] === EMPTY) moves.push(targetSquare);
    else {
      if (getPieceColor(board[targetSquare]) === opponentColor) moves.push(targetSquare);
      break;
    }
  }
  // down-right
  for (let i = 1; x + i < 8 && y + i < 8; i++) {
    const targetSquare = (y + i) * 8 + x + i;
    if (board[targetSquare] === EMPTY) moves.push(targetSquare);
    else {
      if (getPieceColor(board[targetSquare]) === opponentColor) moves.push(targetSquare);
      break;
    }
  }
  return moves;
};

export default getBishopMoves;
