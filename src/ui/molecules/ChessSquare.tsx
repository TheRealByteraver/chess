// svg's taken from https://commons.wikimedia.org/wiki/Template:SVG_chess_pieces
import whitePawn from '@/src/media/chessPieces/whitePawn.svg';
import whiteKnight from '@/src/media/chessPieces/whiteKnight.svg';
import whiteBishop from '@/src/media/chessPieces/whiteBishop.svg';
import whiteRook from '@/src/media/chessPieces/whiteRook.svg';
import whiteQueen from '@/src/media/chessPieces/whiteQueen.svg';
import whiteKing from '@/src/media/chessPieces/whiteKing.svg';
import blackPawn from '@/src/media/chessPieces/blackPawn.svg';
import blackKnight from '@/src/media/chessPieces/blackKnight.svg';
import blackBishop from '@/src/media/chessPieces/blackBishop.svg';
import blackRook from '@/src/media/chessPieces/blackRook.svg';
import blackQueen from '@/src/media/chessPieces/blackQueen.svg';
import blackKing from '@/src/media/chessPieces/blackKing.svg';

import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { CHESSPIECES, EMPTY } from '@/src/utils/constants';

type Props = {
  piece: number;
  squareColor: string;
};

const ChessSquare = ({ piece, squareColor }: Props): JSX.Element => {
  // VARS
  const {
    BLACKBISHOP,
    BLACKKING,
    BLACKKNIGHT,
    BLACKPAWN,
    BLACKQUEEN,
    BLACKROOK,
    WHITEBISHOP,
    WHITEKING,
    WHITEKNIGHT,
    WHITEPAWN,
    WHITEQUEEN,
    WHITEROOK,
  } = CHESSPIECES;

  const pieces: Record<number, { image: StaticImport; name: string }> = {
    [WHITEPAWN]: { image: whitePawn, name: 'white pawn' },
    [WHITEKNIGHT]: { image: whiteKnight, name: 'white knight' },
    [WHITEBISHOP]: { image: whiteBishop, name: 'white bishop' },
    [WHITEROOK]: { image: whiteRook, name: 'white rook' },
    [WHITEQUEEN]: { image: whiteQueen, name: 'white queen' },
    [WHITEKING]: { image: whiteKing, name: 'white king' },
    [BLACKPAWN]: { image: blackPawn, name: 'black pawn' },
    [BLACKKNIGHT]: { image: blackKnight, name: 'black knight' },
    [BLACKBISHOP]: { image: blackBishop, name: 'black bishop' },
    [BLACKROOK]: { image: blackRook, name: 'black rook' },
    [BLACKQUEEN]: { image: blackQueen, name: 'black queen' },
    [BLACKKING]: { image: blackKing, name: 'black king' },
  };

  return (
    <div className={`${squareColor} relative w-20 h-20`}>
      {piece !== EMPTY && (
        <Image
          src={pieces[piece].image}
          alt={pieces[piece].name}
          fill
          priority
        />
      )}
    </div>
  );
};

export default ChessSquare;
