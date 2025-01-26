import { PlayerColor, PromotionPiece } from 'src/types/chess';
import { Modal } from '../atoms';
import ChessSquare from './ChessSquare';
import { BISHOP, BLACK, KNIGHT, QUEEN, ROOK } from 'src/utils/constants';

type Props = {
  activeColor: PlayerColor;
  isOpen: boolean;
  promotionDialogClickHandler: (piece: number) => void;
};

const PromotionModal = (props: Props): JSX.Element => {
  // PROPS
  const { isOpen, promotionDialogClickHandler, activeColor } = props;

  // VARS
  const colorMask = activeColor === 'white' ? 0 : BLACK;
  const promotionPieces: PromotionPiece[] = [QUEEN, ROOK, BISHOP, KNIGHT].map(
    (piece) => piece | colorMask,
  );

  return (
    <Modal isOpen={isOpen}>
      <div className="flex flex-col gap-4">
        {promotionPieces.map((piece) => (
          <ChessSquare
            key={piece}
            piece={piece}
            onClick={() => promotionDialogClickHandler(piece)}
          />
        ))}
      </div>
    </Modal>
  );
};

export default PromotionModal;
