// FEN spec: https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation#cite_note-pgn_spec-1
// FEN start pos: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

import { ChessBoardType, ChessGame } from 'src/types/chess';
import {
  BLACKBISHOP,
  BLACKKING,
  BLACKKNIGHT,
  BLACKPAWN,
  BLACKQUEEN,
  BLACKROOK,
  EMPTY,
  WHITEBISHOP,
  WHITEKING,
  WHITEKNIGHT,
  WHITEPAWN,
  WHITEQUEEN,
  WHITEROOK,
} from '../constants';

type FenChessPiece = 'P' | 'N' | 'B' | 'R' | 'Q' | 'K' | 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

const getFenGame = (fen: string): ChessGame => {
  const fenMap: Record<FenChessPiece, number> = {
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
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
  };

  const BOARDSECTION = 0;
  const ACTIVECOLORSECTION = 1;
  const CASTLINGSECTION = 2;
  const ENPASSANTSECTION = 3;
  const HALFMOVECLOCKSECTION = 4;
  const FULLMOVENUMBERSECTION = 5;

  const fenSections = fen.split(' ');
  // if (fenSections.length !== 6) return undefined;

  const fenRows = fenSections[BOARDSECTION].split('/') ?? [];
  // if (fenRows.length !== 8) return undefined;

  const board = Array(64).fill(EMPTY) as ChessBoardType;

  fenRows.forEach((fenRow, rowIndex) => {
    let columnIndex = 0;
    for (let i = 0; i < fenRow.length; i++) {
      const char = fenRow[i];
      const skip = Number(char);
      if (skip >= 1 && skip <= 8) {
        columnIndex += skip;
      } else {
        const piece = fenMap[char as FenChessPiece];
        // if (!piece) return undefined;
        board[rowIndex * 8 + columnIndex] = piece;
        columnIndex++;
      }
    }
  });

  const activeColor = fenSections[ACTIVECOLORSECTION] === 'w' ? 'white' : 'black';

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
    // if (enPassantInfo.length !== 2) return undefined;
    const column = enPassantInfo[0];
    const row = Number(enPassantInfo[1]);
    enPassant = (8 - row) * 8 + enPassantMap[column];
  }

  const halfMoveClock = Number(fenSections[HALFMOVECLOCKSECTION]);
  const fullMoveNumber = Number(fenSections[FULLMOVENUMBERSECTION]);
  // if (isNaN(halfMoveClock) || isNaN(fullMoveNumber)) return undefined;

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
