// svg's taken from https://commons.wikimedia.org/wiki/Template:SVG_chess_pieces
import whitePawn from './whitePawn.svg';
import whiteKnight from './whiteKnight.svg';
import whiteBishop from './whiteBishop.svg';
import whiteRook from './whiteRook.svg';
import whiteQueen from './whiteQueen.svg';
import whiteKing from './whiteKing.svg';
import blackPawn from './blackPawn.svg';
import blackKnight from './blackKnight.svg';
import blackBishop from './blackBishop.svg';
import blackRook from './blackRook.svg';
import blackQueen from './blackQueen.svg';
import blackKing from './blackKing.svg';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import {
  BLACKBISHOP,
  BLACKKING,
  BLACKKNIGHT,
  BLACKPAWN,
  BLACKQUEEN,
  BLACKROOK,
  CHESSPIECENAMES,
  WHITEBISHOP,
  WHITEKING,
  WHITEKNIGHT,
  WHITEPAWN,
  WHITEQUEEN,
  WHITEROOK,
} from 'src/utils/constants';

// VARS
const SVGPieces: Record<number, { image: StaticImport; name: string }> = {
  [WHITEPAWN]: { image: whitePawn, name: CHESSPIECENAMES[WHITEPAWN] },
  [WHITEKNIGHT]: { image: whiteKnight, name: CHESSPIECENAMES[WHITEKNIGHT] },
  [WHITEBISHOP]: { image: whiteBishop, name: CHESSPIECENAMES[WHITEBISHOP] },
  [WHITEROOK]: { image: whiteRook, name: CHESSPIECENAMES[WHITEROOK] },
  [WHITEQUEEN]: { image: whiteQueen, name: CHESSPIECENAMES[WHITEQUEEN] },
  [WHITEKING]: { image: whiteKing, name: CHESSPIECENAMES[WHITEKING] },
  [BLACKPAWN]: { image: blackPawn, name: CHESSPIECENAMES[BLACKPAWN] },
  [BLACKKNIGHT]: { image: blackKnight, name: CHESSPIECENAMES[BLACKKNIGHT] },
  [BLACKBISHOP]: { image: blackBishop, name: CHESSPIECENAMES[BLACKBISHOP] },
  [BLACKROOK]: { image: blackRook, name: CHESSPIECENAMES[BLACKROOK] },
  [BLACKQUEEN]: { image: blackQueen, name: CHESSPIECENAMES[BLACKQUEEN] },
  [BLACKKING]: { image: blackKing, name: CHESSPIECENAMES[BLACKKING] },
};

export default SVGPieces;
