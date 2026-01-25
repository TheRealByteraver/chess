import { ChessGame } from 'src/types/chess';

import { EMPTY } from '../constants';
import getPieceColor from './getPieceColor';
import getPieceXY from './getPieceXY';

const getKingMoves = (game: ChessGame, square: number): number[] => {
  // PROPS
  const { board } = game;

  // VARS
  const piece = board[square];
  const pieceColor = getPieceColor(piece);
  if (!pieceColor) return []; // only required for typescript
  const opponentColor = pieceColor === 'white' ? 'black' : 'white';
  const [x, y] = getPieceXY(square);

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
    .filter(([posX, posY]) => posX >= 0 && posX < 8 && posY >= 0 && posY < 8)
    .filter(([posX, posY]) => {
      const target = board[(posY << 3) + posX];
      return target === EMPTY || getPieceColor(target) === opponentColor;
    });
  const moves = kingPositions.map(([posX, posY]) => (posY << 3) + posX);

  // castling moves
  const castlingOptions = game.castling[pieceColor];
  if (castlingOptions.kingSide) {
    const kingSideEmpty = board[square + 1] === EMPTY && board[square + 2] === EMPTY;
    if (kingSideEmpty) moves.push((y << 3) + x + 2);
  }
  if (castlingOptions.queenSide) {
    const queenSideEmpty =
      board[square - 1] === EMPTY && board[square - 2] === EMPTY && board[square - 3] === EMPTY;
    if (queenSideEmpty) moves.push((y << 3) + x - 2);
  }
  return moves;
};

export default getKingMoves;
