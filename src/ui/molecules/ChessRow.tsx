import getBgColor from '@/src/utils/chess/getBgColor';
import ChessSquare from './ChessSquare';
import { ChessGame } from '@/src/types/chess';

type Props = {
  board: ChessGame['board'];
  rowNumber: number;
  mirrored: boolean;
};

const Row = (props: Props): JSX.Element => {
  // PROPS
  const { board, rowNumber, mirrored } = props;

  // VARS
  const squareNr = rowNumber * 8;

  const squares: JSX.Element[] = [];
  for (let index = squareNr; index < squareNr + 8; index++) {
    squares.push(
      <ChessSquare
        key={index}
        piece={board[index]}
        squareColor={getBgColor(index)}
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
