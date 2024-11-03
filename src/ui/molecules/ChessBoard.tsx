// FEN notation: https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
// const fenStart = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

import { ChessPiece, Orientation } from '@/src/types/chess';
import ChessSquare from './ChessSquare';

type Props = { fen: string; orientation: Orientation };

const ChessBoard = (props: Props): JSX.Element => {
  // PROPS
  const { fen, orientation } = props;

  // METHODS
  const getBgColor = (squareNr: number) => {
    const rowNr = squareNr >> 3;
    const colNr = squareNr & 1;
    return ((rowNr + colNr) & 1) === 0 ? 'white' : 'black';
  };

  const getBoardRow = (fenSection: string, rowNr: number): JSX.Element => {
    let squareNr = rowNr * 8;
    const row: JSX.Element[] = [];
    for (let i = 0; i < fenSection.length; i++) {
      const char = fenSection[i];
      const skip = Number(char);
      if (!isNaN(skip) && skip >= 1 && skip <= 8) {
        for (let s = 0; s < skip; s++) {
          row.push(
            <ChessSquare key={squareNr} squareColor={getBgColor(squareNr)} />
          );
          squareNr++;
        }
      } else {
        row.push(
          <ChessSquare
            key={squareNr}
            piece={char as ChessPiece}
            squareColor={getBgColor(squareNr)}
          />
        );
        squareNr++;
      }
    }
    return <>{...row}</>;
  };

  // VARS
  const sections = fen.split(' ');
  const rows = sections[0]?.split('/') ?? [];
  const mirrored = orientation === 'blackOnBottom';

  return (
    <div className={`flex ${mirrored ? 'flex-col-reverse' : 'flex-col'}`}>
      {rows.map((row, index) => (
        <div
          key={index * 8}
          className={`flex ${mirrored ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {getBoardRow(row, index)}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
