import { ChessGame } from '@/src/types/chess';
import getPieceColor from './getPieceColor';
import getPieceXY from './getPieceXY';
import { EMPTY } from '../constants';

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
    .filter(([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8)
    .filter(([x, y]) => {
      const target = board[(y << 3) + x];
      return target === EMPTY || getPieceColor(target) === opponentColor;
    });
  const moves = kingPositions.map(([x, y]) => (y << 3) + x);

  // castling moves
  // const castlingOptions = game.castling[pieceColor];
  // if (castlingOptions.kingSide) {
  //   // check if the squares between the king and rook are empty
  //   const kingSideEmpty = board[square + 1] === EMPTY && board[square + 2] === EMPTY;
  //   if (kingSideEmpty) moves.push((y << 3) + 6);
  // }

  // WIP

  return moves;
};

export default getKingMoves;
