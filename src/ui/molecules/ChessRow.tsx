import getBgColor from '@/src/utils/chess/getBgColor';
import ChessSquare from './ChessSquare';
import { ChessGame } from '@/src/types/chess';

type Props = {
  interactive: boolean;
  board: ChessGame['board'];
  size: 'icon' | 'normal';
  rowNumber: number;
  mirrored: boolean;
  onClick?: (square: number) => void;
};

const Row = (props: Props): JSX.Element => {
  // PROPS
  const { interactive, board, size, rowNumber, mirrored, onClick } = props;

  // VARS
  const squareNr = rowNumber * 8;

  const squares: JSX.Element[] = [];
  for (let index = squareNr; index < squareNr + 8; index++) {
    squares.push(
      <ChessSquare
        key={index}
        interactive={interactive}
        size={size}
        piece={board[index]}
        squareColor={getBgColor(index)}
        onClick={onClick ? () => onClick(index) : undefined}
      />
    );
  }

  return (
    <div className={`flex ${mirrored ? 'flex-row-reverse' : 'flex-row'}`}>
      {...squares}
    </div>
  );
};

export default Row;
