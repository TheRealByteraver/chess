import { ArrayOf64 } from './generic';
import { PIECES, PROMOTIONPIECES, SQUAREMARKERS } from '../utils/constants';

type ChessPieceType = (typeof PIECES)[number];

type SquareMarkerType = (typeof SQUAREMARKERS)[number];

type PromotionPiece = (typeof PROMOTIONPIECES)[number];

type Orientation = 'whiteOnBottom' | 'blackOnBottom';

type PlayerColor = 'white' | 'black';

type GameState = 'begin' | 'waitingForUser' | 'thinking' | 'checkmate' | 'stalemate' | 'draw';

type ChessBoardType = ArrayOf64<ChessPieceType>;
type BoardMarkerType = ArrayOf64<SquareMarkerType>;

// attention: square 0 is A8, square 63 is H1
type ChessGame = {
  board: ChessBoardType;
  activeColor: PlayerColor;
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

type ChessGameInfo = {
  game: ChessGame;
  playerColor: PlayerColor;
  boardMarkers: BoardMarkerType;
  selectedSquare?: number;
};

type MoveType = {
  square: number;
  target: number;
};

export type {
  Orientation,
  PlayerColor,
  ChessBoardType,
  BoardMarkerType,
  ChessGame,
  ChessGameInfo,
  GameState,
  SquareMarkerType,
  PromotionPiece,
  ChessPieceType,
  MoveType,
};
