import { ChessGame, Orientation } from '@/src/types/chess';
import Row from './ChessRow';

type Props = {
  interactive?: boolean;
  board: ChessGame['board'];
  orientation: Orientation;
  size?: 'icon' | 'normal';
  onClick?: (square: number) => void;
};

const ChessBoard = (props: Props): JSX.Element => {
  // PROPS
  const {
    size = 'normal',
    interactive = true,
    board,
    orientation,
    onClick,
  } = props;

  // METHODS
  const Rows = ({
    size,
    mirrored,
  }: {
    size: 'icon' | 'normal';
    mirrored: boolean;
  }): JSX.Element => {
    const rows: JSX.Element[] = [];
    for (let rowIndex = 0; rowIndex < 8; rowIndex++)
      rows.push(
        <Row
          interactive={interactive}
          key={rowIndex}
          size={size}
          board={board}
          rowNumber={rowIndex}
          mirrored={mirrored}
          onClick={onClick}
        />
      );

    return (
      <div className={`flex ${mirrored ? 'flex-col-reverse' : 'flex-col'}`}>
        {...rows}
      </div>
    );
  };

  // VARS
  const mirrored = orientation === 'blackOnBottom';

  return <Rows size={size} mirrored={mirrored} />;
};

export default ChessBoard;
