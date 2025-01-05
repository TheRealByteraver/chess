import { ChessGame } from 'src/types/chess';
import getPieceColor from './getPieceColor';
import { EMPTY } from '../constants';
import getPieceXY from './getPieceXY';

const getPawnMoves = (game: ChessGame, square: number): number[] => {
  // PROPS
  const { board, enPassant } = game;

  // VARS
  const piece = board[square];
  const pieceColor = getPieceColor(piece);
  const opponentColor = pieceColor === 'white' ? 'black' : 'white';
  const [x, y] = getPieceXY(square);

  const moves: number[] = [];
  if (pieceColor === 'white') {
    if (y === 6 && board[square - 8] === EMPTY && board[square - 16] === EMPTY)
      moves.push(square - 16);
    if (y > 0) {
      if (board[square - 8] === EMPTY) moves.push(square - 8);
      if (x > 0 && (getPieceColor(board[square - 9]) === opponentColor || square - 9 === enPassant))
        moves.push(square - 9);
      if (x < 7 && (getPieceColor(board[square - 7]) === opponentColor || square - 7 === enPassant))
        moves.push(square - 7);
    }
  } else {
    if (y === 1 && board[square + 8] === EMPTY && board[square + 16] === EMPTY)
      moves.push(square + 16);
    if (y < 7) {
      if (board[square + 8] === EMPTY) moves.push(square + 8);
      if (x > 0 && (getPieceColor(board[square + 7]) === opponentColor || square + 7 === enPassant))
        moves.push(square + 7);
      if (x < 7 && (getPieceColor(board[square + 9]) === opponentColor || square + 9 === enPassant))
        moves.push(square + 9);
    }
  }
  return moves;
};

export default getPawnMoves;
