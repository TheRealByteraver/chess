// FEN notation: https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
// const fenStart = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
// fen running = rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2

import { ChessGame, ChessPiece, Orientation } from '@/src/types/chess';
import ChessSquare from './ChessSquare';
import { CHESSPIECES, EMPTY } from '@/src/utils/constants';
import getFenGame from '@/src/utils/chess/getFenGame';
import getBgColor from '@/src/utils/chess/getBgColor';

type Props = { board: ChessGame['board']; orientation: Orientation };

const ChessBoard = (props: Props): JSX.Element => {
  // PROPS
  const { board, orientation } = props;

  // VARS
  const mirrored = orientation === 'blackOnBottom';

  // METHODS
  const getHtmlBoard = (board: ChessGame['board']): JSX.Element => {
    let squareNr = 0;
    const rows: JSX.Element[] = [];
    for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
      const row: JSX.Element[] = [];
      for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
        row.push(
          <ChessSquare
            key={squareNr}
            piece={board[squareNr]}
            squareColor={getBgColor(squareNr)}
          />
        );
        squareNr++;
      }

      rows.push(
        <div
          key={squareNr - 8}
          className={`flex ${mirrored ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {...row}
        </div>
      );
    }
    return (
      <div className={`flex ${mirrored ? 'flex-col-reverse' : 'flex-col'}`}>
        {...rows}
      </div>
    );
  };

  return getHtmlBoard(board);
};

export default ChessBoard;
