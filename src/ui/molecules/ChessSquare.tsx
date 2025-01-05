import Image from 'next/image';

import SVGPieces from 'src/media/chessPieces/SVGPieces';
import { EMPTY } from 'src/utils/constants';

type Props = {
  piece: number;
  onClick?: () => void;
};

const ChessSquare = (props: Props): JSX.Element => {
  // PROPS
  const { piece, onClick } = props;

  return (
    <div className="w-20 h-20 bg-[#d28c45] relative" onClick={onClick}>
      <div className="absolute top-0 left-0 w-20 h-20 hover:bg-yellow-400 hover:bg-opacity-80">
        {piece !== EMPTY && <Image src={SVGPieces[piece].image} alt={SVGPieces[piece].name} fill />}
      </div>
    </div>
  );
};

export default ChessSquare;
