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

  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none">
      <div className="grid grid-cols-8 grid-rows-8">
        {Array.from({ length: 64 }, (_, i) => {
          const mirrored = orientation === 'blackOnBottom';
          const squareNr = mirrored ? 63 - i : i;
          const piece = board[squareNr];
          return (
            <div key={`piece-${squareNr}`} className={`aspect-square relative`}>
              <div className={`absolute top-0 left-0 w-full h-full`}>
                {piece !== EMPTY && (
                  <Image src={SVGPieces[piece].image} alt={SVGPieces[piece].name} fill />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChessPieces;
