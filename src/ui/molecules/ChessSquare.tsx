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
import {
  BLACKBISHOP,
  BLACKKING,
  BLACKKNIGHT,
  BLACKPAWN,
  BLACKQUEEN,
  BLACKROOK,
  CHESSPIECENAMES,
  EMPTY,
  WHITEBISHOP,
  WHITEKING,
  WHITEKNIGHT,
  WHITEPAWN,
  WHITEQUEEN,
  WHITEROOK,
} from '@/src/utils/constants';
import getClassName from '@/src/utils/general/classNames';

type Props = {
  interactive: boolean;
  piece: number;
  squareColor: string;
  size: 'icon' | 'normal';
  onClick?: () => void;
};

const ChessSquare = (props: Props): JSX.Element => {
  // PROPS
  const { interactive, size, piece, squareColor, onClick } = props;

  const pieces: Record<number, StaticImport> = {
    [WHITEPAWN]: whitePawn,
    [WHITEKNIGHT]: whiteKnight,
    [WHITEBISHOP]: whiteBishop,
    [WHITEROOK]: whiteRook,
    [WHITEQUEEN]: whiteQueen,
    [WHITEKING]: whiteKing,
    [BLACKPAWN]: blackPawn,
    [BLACKKNIGHT]: blackKnight,
    [BLACKBISHOP]: blackBishop,
    [BLACKROOK]: blackRook,
    [BLACKQUEEN]: blackQueen,
    [BLACKKING]: blackKing,
  };

  const sizeCss = size === 'icon' ? 'w-8 h-8' : 'w-20 h-20';
  const hoverCss = getClassName([
    'absolute top-0 left-0',
    sizeCss,
    interactive ? 'hover:bg-yellow-400 hover:bg-opacity-80' : '',
  ]);
  const classes = getClassName([sizeCss, squareColor, 'relative']);

  return (
    <div className={classes} onClick={onClick}>
      <div className={hoverCss}>
        {piece !== EMPTY && (
          <Image src={pieces[piece]} alt={CHESSPIECENAMES[piece]} fill />
        )}
      </div>
    </div>
  );
};

export default ChessSquare;
