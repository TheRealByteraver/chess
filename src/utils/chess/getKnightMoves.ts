import { ChessGame } from 'src/types/chess';

import { EMPTY } from '../constants';
import getPieceColor from './getPieceColor';
import getPieceXY from './getPieceXY';

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
    .filter(([posX, posY]) => posX >= 0 && posX < 8 && posY >= 0 && posY < 8)
    .filter(([posX, posY]) => {
      const target = board[posY * 8 + posX];
      return target === EMPTY || getPieceColor(target) === opponentColor;
    });

  return knightPositions.map(([posX, posY]) => posY * 8 + posX);
};

export default getKnightMoves;
