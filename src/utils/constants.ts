const chessEndgames: string[] = [
  '8/8/8/8/8/8/6K1/k7 w - - 0 1', // Simple King and Pawn vs. King
  '8/8/8/8/3k4/8/4K3/8 w - - 0 1', // Opposition practice
  '8/8/8/8/3P4/8/3K4/3k4 w - - 0 1', // Pawn promotion race
  '8/8/8/8/8/3K4/4P3/3k4 w - - 0 1', // Lucena position
  '8/8/8/8/3k4/4P3/3K4/8 w - - 0 1', // Philidor position
  '8/8/5K2/8/8/8/4k1P1/8 w - - 0 1', // King and Pawn promotion
  '8/8/8/2k5/8/2K5/3P4/8 w - - 0 1', // Queen vs. Pawn
  '8/8/8/8/4k3/8/4P3/3K4 w - - 0 1', // Rook pawn vs. King
  '8/8/8/8/8/3Q4/8/k7 w - - 0 1', // Queen and King checkmate
  '8/8/8/4k3/8/4P3/4K3/8 w - - 0 1', // Triangulation technique
];

const chessMiddlegames: string[] = [
  'r1bq1rk1/ppp1bppp/2nppn2/8/2BPP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 10', // Balanced position from a classical game.
  'r2q1rk1/ppp2ppp/2n2n2/3b4/3P4/2NB1N2/PPPQ1PPP/R3R1K1 b - - 0 15', // Typical middlegame with tension in the center.
  'r1b2rk1/pp3ppp/2n1pn2/2bq4/4P3/1NN1BP2/PPP1Q1PP/R4RK1 w - - 0 12', // Middlegame with knights and bishops controlling the center.
  'r2q1rk1/1pp1bppp/2n1pn2/p7/2PP4/2NBPN2/PP2BPPP/R2Q1RK1 b - - 0 11', // Developing pieces and a pawn push in the center.
  'r1bq1rk1/ppp1ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9', // A flexible pawn structure and open lines.
  'r1bq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 10', // Another balanced middlegame position.
  'r1bqk2r/pppp1ppp/2n2n2/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 6', // A classic middlegame with center control.
  'r1bqkbnr/pppppppp/2n5/8/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 3', // A developing position with early e4 play.
  'r2q1rk1/pp2ppbp/2npbnp1/4P3/2P5/2NBBN2/PP3PPP/R2Q1RK1 w - - 0 10', // A position with open diagonals and dynamic potential.
  'rnbq1rk1/pp2ppbp/3p1np1/8/2PNP3/2N1BP2/PP3P1P/R2Q1RK1 b - - 0 9', // Another middlegame with an emphasis on central control.
];

// const FENSTART = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const FENSTART = chessMiddlegames[6];

const EMPTY = 0;
const PAWN = 1;
const ROOK = 2;
const KNIGHT = 3;
const BISHOP = 4;
const QUEEN = 5;
const KING = 6;
const BLACK = 8;

const PIECEMASK = 7;

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

const PIECES = [
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
] as const;

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

const BOARDDEFAULT = 0;
const LASTMOVESTART = 1;
const LASTMOVEEND = 2;
const SELECTEDPIECE = 3;
const POSSIBLEMOVE = 4;

const SQUAREMARKERS = [
  BOARDDEFAULT,
  LASTMOVESTART,
  LASTMOVEEND,
  SELECTEDPIECE,
  POSSIBLEMOVE,
] as const;

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
  PIECEMASK,
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
  PIECES,
  BOARDDEFAULT,
  LASTMOVESTART,
  LASTMOVEEND,
  SELECTEDPIECE,
  POSSIBLEMOVE,
  SQUAREMARKERS,
};
