// FEN notation: https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
// const fenStart = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
// fen running = rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2

import { ChessGame, Orientation } from '@/src/types/chess';
import Row from './ChessRow';
import getClassName from '@/src/utils/general/classNames';

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
