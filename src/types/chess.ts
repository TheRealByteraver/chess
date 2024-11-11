type Orientation = 'whiteOnBottom' | 'blackOnBottom';

type GameType = 'none' | 'chess';

type GameState =
  | 'begin'
  | 'waitingForUser'
  | 'thinking'
  | 'checkmate'
  | 'stalemate'
  | 'draw';

// attention: square 0 is A8, square 63 is H1
type ChessGame = {
  board: number[]; // 0-63
  activeColor: 'white' | 'black';
  castling: {
    white: {
      kingSide: boolean;
      queenSide: boolean;
    };
    black: {
      kingSide: boolean;
      queenSide: boolean;
    };
  };
  enPassant: number | undefined; // 0-63
  halfMoveClock: number;
  fullMoveNumber: number;
};

export type { Orientation, ChessGame, GameType, GameState };
