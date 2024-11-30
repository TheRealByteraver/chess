import { ChessBoardType, ChessGame, MoveType } from '@/src/types/chess';
import { BLACKKING, EMPTY, WHITEKING } from '../constants';
import getPieceColor from './getPieceColor';
import getPieceAvailableMoves from './getPieceAvailableMoves';

const isInCheck = (game: ChessGame, move: MoveType): boolean => {
  const testBoard: ChessBoardType = [...game.board];
  testBoard[move.target] = testBoard[move.square];
  // The check below is necessary for castling moves
  if (move.target !== move.square) testBoard[move.square] = EMPTY;
  const testGame: ChessGame = {
    ...game,
    board: testBoard,
    activeColor: game.activeColor === 'white' ? 'black' : 'white',
  };
  const testKing = game.activeColor === 'white' ? WHITEKING : BLACKKING;

  for (let square = 0; square < 64; square++) {
    // skip empty squares and opponent pieces
    if (getPieceColor(testBoard[square]) !== testGame.activeColor) continue;

    const moves = getPieceAvailableMoves(testGame, square);
    for (const move of moves) if (testBoard[move] === testKing) return true;
  }

  return false;
};

export default isInCheck;
