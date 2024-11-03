// FEN spec: https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation#cite_note-pgn_spec-1
// FEN start pos: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

import { ChessGame, ChessPiece } from '@/src/types/chess';
import { CHESSPIECES, EMPTY } from '../constants';

const getFenGame = (fen: string): ChessGame | undefined => {
  const {
    WHITEPAWN,
    WHITEROOK,
    WHITEKNIGHT,
    WHITEBISHOP,
    WHITEQUEEN,
    WHITEKING,
    BLACKPAWN,
    BLACKROOK,
    BLACKKNIGHT,
    BLACKBISHOP,
    BLACKQUEEN,
    BLACKKING,
  } = CHESSPIECES;

  const fenMap: Record<ChessPiece, number> = {
    P: WHITEPAWN,
    N: WHITEKNIGHT,
    B: WHITEBISHOP,
    R: WHITEROOK,
    Q: WHITEQUEEN,
    K: WHITEKING,
    p: BLACKPAWN,
    n: BLACKKNIGHT,
    b: BLACKBISHOP,
    r: BLACKROOK,
    q: BLACKQUEEN,
    k: BLACKKING,
  };

  const enPassantMap: Record<string, number> = {
    h: 0,
    g: 8,
    f: 16,
    e: 24,
    d: 32,
    c: 40,
    b: 48,
    a: 56,
  };

  const BOARDSECTION = 0;
  const ACTIVECOLORSECTION = 1;
  const CASTLINGSECTION = 2;
  const ENPASSANTSECTION = 3;
  const HALFMOVECLOCKSECTION = 4;
  const FULLMOVENUMBERSECTION = 5;

  const fenSections = fen.split(' ');
  if (fenSections.length !== 6) return undefined;

  const fenRows = fenSections[BOARDSECTION].split('/') ?? [];
  if (fenRows.length !== 8) return undefined;

  const board: number[] = [];
  fenRows.forEach((fenRow) => {
    for (let i = 0; i < fenRow.length; i++) {
      const char = fenRow[i];
      const skip = Number(char);
      if (skip >= 1 && skip <= 8) {
        for (let s = 0; s < skip; s++) board.push(EMPTY);
      } else {
        const piece = fenMap[char as ChessPiece];
        if (!piece) return undefined;
        board.push(piece);
      }
    }
  });

  const activeColor =
    fenSections[ACTIVECOLORSECTION] === 'w' ? 'white' : 'black';

  const castlingInfo = fenSections[CASTLINGSECTION];
  const castling =
    castlingInfo === '-'
      ? {
          white: {
            kingSide: false,
            queenSide: false,
          },
          black: {
            kingSide: false,
            queenSide: false,
          },
        }
      : {
          white: {
            kingSide: castlingInfo.includes('K'),
            queenSide: castlingInfo.includes('Q'),
          },
          black: {
            kingSide: castlingInfo.includes('k'),
            queenSide: castlingInfo.includes('q'),
          },
        };

  const enPassantInfo = fenSections[ENPASSANTSECTION];
  let enPassant: number | undefined = undefined;

  if (enPassantInfo !== '-') {
    if (enPassantInfo.length !== 2) return undefined;
    const row = enPassantInfo[0];
    const column = enPassantInfo[1];
    enPassant = enPassantMap[row] + Number(column) - 1;
  }

  const halfMoveClock = Number(fenSections[HALFMOVECLOCKSECTION]);
  const fullMoveNumber = Number(fenSections[FULLMOVENUMBERSECTION]);
  if (isNaN(halfMoveClock) || isNaN(fullMoveNumber)) return undefined;

  return {
    board,
    activeColor,
    castling,
    enPassant,
    halfMoveClock,
    fullMoveNumber,
  };
};

export default getFenGame;
