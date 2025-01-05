import { ChessGame } from 'src/types/chess';
import getPieceColor from './getPieceColor';
import getPieceXY from './getPieceXY';
import { EMPTY } from '../constants';

const getKnightMoves = (game: ChessGame, square: number): number[] => {
  // PROPS
  const { board } = game;

  // VARS
  const piece = board[square];
  const pieceColor = getPieceColor(piece);
  const opponentColor = pieceColor === 'white' ? 'black' : 'white';
  const [x, y] = getPieceXY(square);

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
    .filter(([x, y]) => {
      const target = board[y * 8 + x];
      return target === EMPTY || getPieceColor(target) === opponentColor;
    });

  return knightPositions.map(([x, y]) => y * 8 + x);
};

export default getKnightMoves;
