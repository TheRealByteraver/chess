type Orientation = 'whiteOnBottom' | 'blackOnBottom';

type ChessPiece =
  | 'P'
  | 'N'
  | 'B'
  | 'R'
  | 'Q'
  | 'K'
  | 'p'
  | 'n'
  | 'b'
  | 'r'
  | 'q'
  | 'k';

type ChessPieceName =
  | 'blackPawn'
  | 'blackKnight'
  | 'blackBishop'
  | 'blackRook'
  | 'blackQueen'
  | 'blackKing'
  | 'whitePawn'
  | 'whiteKnight'
  | 'whiteBishop'
  | 'whiteRook'
  | 'whiteQueen'
  | 'whiteKing';

type Fen = Record<ChessPiece, ChessPieceName>;

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

export type { ChessPiece, ChessPieceName, Fen, Orientation, ChessGame };
