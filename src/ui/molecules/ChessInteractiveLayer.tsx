import { useMemo } from 'react';

import { Orientation } from 'src/types/chess';

type sizeType = 'icon' | 'normal';

type Props = {
  size?: sizeType;
  orientation: Orientation;
  onClick: (square: number) => void;
};

const ChessInteractiveLayer = (props: Props): JSX.Element => {
  // PROPS
  const { size = 'normal', orientation, onClick } = props;

  // VARS
  const interactiveSquares = useMemo(() => {
    const mirrored = orientation === 'blackOnBottom';
    const next = mirrored ? -1 : 1;
    let squareNr = mirrored ? 63 : 0;
    const sizeClass = size === 'icon' ? 'w-8 h-8' : 'w-20 h-20';

    const rows: JSX.Element[] = [];
    for (let j = 0; j < 8; j++) {
      const row: JSX.Element[] = [];
      for (let i = 0; i < 8; i++) {
        const index = squareNr;
        const hoverCss = 'hover:bg-yellow-400 hover:bg-opacity-80';
        row.push(
          <div
            className={`${sizeClass} ${hoverCss}`}
            key={`interactive-square-${i}`}
            onClick={() => onClick(index)}
          />,
        );
        squareNr += next;
      }
      rows.push(
        <div className="flex flex-row" key={`interactive-row-${j}`}>
          {row}
        </div>,
      );
    }
    return rows;
  }, [onClick, orientation, size]);

  return <div className="absolute top-0 left-0">{interactiveSquares}</div>;
};

export default ChessInteractiveLayer;
