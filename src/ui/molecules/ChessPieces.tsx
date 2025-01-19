import { useMemo } from 'react';

import Image from 'next/image';

import SVGPieces from 'src/media/chessPieces/SVGPieces';
import { ChessGame, Orientation } from 'src/types/chess';
import { EMPTY } from 'src/utils/constants';

type sizeType = 'icon' | 'normal';

type Props = {
  orientation: Orientation;
  size?: sizeType;
  board: ChessGame['board'];
};

const ChessPieces = (props: Props): JSX.Element => {
  // PROPS
  const { size = 'normal', board, orientation } = props;

  // VARS
  const mirrored = orientation === 'blackOnBottom';
  const next = mirrored ? -1 : 1;
  let squareNr = mirrored ? 63 : 0;
  const sizeClass = size === 'icon' ? 'w-8 h-8' : 'w-20 h-20';

  const rows: JSX.Element[] = [];
  for (let j = 0; j < 8; j++) {
    const row: JSX.Element[] = [];
    for (let i = 0; i < 8; i++) {
      const piece = board[squareNr];
      row.push(
        <div className={`relative ${sizeClass}`} key={`piece-square-${i}`}>
          <span className="text-gray-900 font-semibold text-sm ml-1 -mt-1">{squareNr}</span>
          <div className={`absolute top-0 left-0 ${sizeClass}`}>
            {piece !== EMPTY && (
              <Image src={SVGPieces[piece].image} alt={SVGPieces[piece].name} fill />
            )}
          </div>
        </div>,
      );
      squareNr += next;
    }
    rows.push(
      <div className="flex flex-row" key={`piece-row-${j}`}>
        {row}
      </div>,
    );
  }

  return <div className="absolute top-0 left-0 pointer-events-none">{rows}</div>;
};

export default ChessPieces;
