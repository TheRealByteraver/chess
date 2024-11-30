import ChessSquare from './ChessSquare';
import { EMPTY } from '@/src/utils/constants';
import { getBgColor } from '@/src/utils/chess';

type Props = {
  size?: 'icon' | 'normal';
};

const ChessEmptyBoard = (props: Props): JSX.Element => {
  // PROPS
  const { size = 'normal' } = props;

  // METHODS
  const Board = (): JSX.Element => {
    const rows = [];
    let squareIndex = 0;
    for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
      const squares = [];
      for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
        squares.push(
          <ChessSquare
            interactive={false}
            key={rowIndex * 8 + columnIndex}
            size={size}
            piece={EMPTY}
            squareColor={getBgColor(squareIndex)}
          />
        );
        squareIndex++;
      }
      rows.push(<div className="flex flex-row">{...squares}</div>);
    }
    return <>{...rows}</>;
  };

  return <Board />;
};

export default ChessEmptyBoard;
