const FENSTART = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const EMPTY = 0;
const PAWN = 1;
const ROOK = 2;
const KNIGHT = 3;
const BISHOP = 4;
const QUEEN = 5;
const KING = 6;
const BLACK = 8;

const WHITEPAWN = PAWN;
const WHITEROOK = ROOK;
const WHITEKNIGHT = KNIGHT;
const WHITEBISHOP = BISHOP;
const WHITEQUEEN = QUEEN;
const WHITEKING = KING;
const BLACKPAWN = PAWN | BLACK;
const BLACKROOK = ROOK | BLACK;
const BLACKKNIGHT = KNIGHT | BLACK;
const BLACKBISHOP = BISHOP | BLACK;
const BLACKQUEEN = QUEEN | BLACK;
const BLACKKING = KING | BLACK;

const CHESSPIECENAMES = {
  [EMPTY]: '',
  [WHITEPAWN]: 'white pawn',
  [WHITEROOK]: 'white rook',
  [WHITEKNIGHT]: 'white knight',
  [WHITEBISHOP]: 'white bishop',
  [WHITEQUEEN]: 'white queen',
  [WHITEKING]: 'white king',
  [BLACKPAWN]: 'black pawn',
  [BLACKROOK]: 'black rook',
  [BLACKKNIGHT]: 'black knight',
  [BLACKBISHOP]: 'black bishop',
  [BLACKQUEEN]: 'black queen',
  [BLACKKING]: 'black king',
};

export {
  FENSTART,
  CHESSPIECENAMES,
  BLACK,
  EMPTY,
  PAWN,
  ROOK,
  KNIGHT,
  BISHOP,
  QUEEN,
  KING,
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
};
