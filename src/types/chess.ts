import { PIECES, SQUAREMARKERS } from '../utils/constants';
import { ArrayOf64 } from './generic';

type ChessPieceType = (typeof PIECES)[number];

type SquareMarkerType = (typeof SQUAREMARKERS)[number];

type Orientation = 'whiteOnBottom' | 'blackOnBottom';

type PlayerColor = 'white' | 'black';

type GameState =
  | 'begin'
  | 'waitingForUser'
  | 'thinking'
  | 'checkmate'
  | 'stalemate'
  | 'draw';

// attention: square 0 is A8, square 63 is H1
type ChessGame = {
  board: ArrayOf64<ChessPieceType>;
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
  boardMarkers: ArrayOf64<SquareMarkerType>;
  selectedSquare?: number;
};

export type {
  Orientation,
  PlayerColor,
  ChessGame,
  ChessGameInfo,
  GameState,
  SquareMarkerType,
  ChessPieceType,
};
