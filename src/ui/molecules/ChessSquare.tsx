// taken from https://commons.wikimedia.org/wiki/Template:SVG_chess_pieces
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
import { ChessPiece } from '@/src/types/chess';

const fen = {
  P: { image: whitePawn, alt: 'white pawn' },
  N: { image: whiteKnight, alt: 'white knight' },
  B: { image: whiteBishop, alt: 'white bishop' },
  R: { image: whiteRook, alt: 'white rook' },
  Q: { image: whiteQueen, alt: 'white queen' },
  K: { image: whiteKing, alt: 'white king' },
  p: { image: blackPawn, alt: 'black pawn' },
  n: { image: blackKnight, alt: 'black knight' },
  b: { image: blackBishop, alt: 'black bishop' },
  r: { image: blackRook, alt: 'black rook' },
  q: { image: blackQueen, alt: 'black queen' },
  k: { image: blackKing, alt: 'black king' },
};

type Props = { piece?: ChessPiece; squareColor: 'black' | 'white' };

const ChessSquare = (props: Props): JSX.Element => {
  // PROPS
  const { piece, squareColor } = props;

  // VARS
  const bgColor = squareColor === 'black' ? 'bg-[#d28c45]' : 'bg-[#ffcf9f]';
  // bg-[#1da1f2]
  return (
    <div className={`${bgColor} relative w-24 h-24`}>
      {piece && (
        <Image src={fen[piece].image} alt={fen[piece].alt} fill priority />
      )}
    </div>
  );
};

export default ChessSquare;
