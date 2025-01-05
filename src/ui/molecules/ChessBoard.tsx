import { ReactNode, useMemo } from 'react';

import { getBgColor } from 'src/utils/chess';

type sizeType = 'icon' | 'normal';

type Props = {
  size?: sizeType;
  children?: ReactNode;
};

const ChessBoard = (props: Props): JSX.Element => {
  // PROPS
  const { size = 'normal', children } = props;

  // VARS
  const gameBoard = useMemo(() => {
    let squareNr = 0;
    const sizeClass = size === 'icon' ? 'w-8 h-8' : 'w-20 h-20';

    const rows: JSX.Element[] = [];
    for (let j = 0; j < 8; j++) {
      const row: JSX.Element[] = [];
      for (let i = 0; i < 8; i++) {
        const color = getBgColor(squareNr);
        const squareColor = color === 'white' ? 'bg-[#ffcf9f]' : 'bg-[#d28c45]';
        row.push(<div className={`${sizeClass} ${squareColor}`} key={`square-${i}`} />);
        squareNr++;
      }
      rows.push(
        <div className="flex flex-row" key={`row-${j}`}>
          {row}
        </div>,
      );
    }
    return rows;
  }, [size]);

  return (
    <div className="relative">
      {gameBoard}
      <div className="absolute top-0 left-0">{children}</div>
    </div>
  );
};

export default ChessBoard;
