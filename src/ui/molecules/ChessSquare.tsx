import Image from 'next/image';

import {
  BOARDDEFAULT,
  EMPTY,
  LASTMOVEEND,
  LASTMOVEMASK,
  LASTMOVESTART,
  POSSIBLEMOVE,
  SELECTEDPIECE,
} from '@/src/utils/constants';
import getClassName from '@/src/utils/general/classNames';
import SVGPieces from '@/src/media/chessPieces/SVGPieces';
import { PlayerColor, SquareMarkerType } from '@/src/types/chess';

type Props = {
  interactive: boolean;
  piece: number;
  marker?: SquareMarkerType;
  squareColor: PlayerColor;
  size: 'icon' | 'normal';
  onClick?: () => void;
};

const ChessSquare = (props: Props): JSX.Element => {
  // PROPS
  const { interactive, size, piece, marker = BOARDDEFAULT, squareColor, onClick } = props;

  // METHODS
  const getBackgroundColor = (marker: SquareMarkerType): string => {
    if (marker === SELECTEDPIECE) return 'bg-yellow-500';
    if (marker & POSSIBLEMOVE) {
      if (squareColor === 'white') return 'bg-[#c8d496]';
      else return 'bg-[#a9a556]';
    }
    if ([LASTMOVESTART, LASTMOVEEND].includes(marker & LASTMOVEMASK)) {
      if (squareColor === 'white') return 'bg-[#fba188]';
      else return 'bg-[#e67e5b]';
    }

    if (squareColor === 'white') return 'bg-[#ffcf9f]';
    else return 'bg-[#d28c45]';
  };

  // VARS
  const sizeCss = size === 'icon' ? 'w-8 h-8' : 'w-20 h-20';
  const backgroundColor = getBackgroundColor(marker);
  const hoverCss = getClassName([
    'absolute top-0 left-0',
    sizeCss,
    interactive ? 'hover:bg-yellow-400 hover:bg-opacity-80' : '',
  ]);
  const className = getClassName([sizeCss, backgroundColor, 'relative']);

  return (
    <div className={className} onClick={onClick}>
      <div className={hoverCss}>
        {piece !== EMPTY && <Image src={SVGPieces[piece].image} alt={SVGPieces[piece].name} fill />}
      </div>
    </div>
  );
};

export default ChessSquare;
