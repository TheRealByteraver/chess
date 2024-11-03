// FEN notation: https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
// const fenStart = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
// fen running = rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2

import { ChessGame, Orientation } from '@/src/types/chess';
import Row from './ChessRow';

type Props = { board: ChessGame['board']; orientation: Orientation };

const ChessBoard = (props: Props): JSX.Element => {
  // PROPS
  const { board, orientation } = props;

  // METHODS
  const Rows = ({ mirrored }: { mirrored: boolean }): JSX.Element => {
    const rows: JSX.Element[] = [];
    for (let rowIndex = 0; rowIndex < 8; rowIndex++)
      rows.push(
        <Row
          key={rowIndex}
          board={board}
          rowNumber={rowIndex}
          mirrored={mirrored}
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

  return <Rows mirrored={mirrored} />;
};

export default ChessBoard;
