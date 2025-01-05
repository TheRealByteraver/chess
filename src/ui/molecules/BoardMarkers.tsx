import { useMemo } from 'react';

import { BoardMarkerType, Orientation } from 'src/types/chess';
import { getBgColor } from 'src/utils/chess';
import { LASTMOVEEND, LASTMOVESTART, POSSIBLEMOVE, SELECTEDPIECE } from 'src/utils/constants';

type sizeType = 'icon' | 'normal';

type Props = {
  orientation: Orientation;
  markers: BoardMarkerType;
  size?: sizeType;
};

const BoardMarkers = (props: Props): JSX.Element => {
  // PROPS
  const { size = 'normal', markers, orientation } = props;

  // VARS
  const boardMarkers = useMemo(() => {
    const mirrored = orientation === 'blackOnBottom';
    const next = mirrored ? -1 : 1;
    let squareNr = mirrored ? 63 : 0;
    const sizeClass = size === 'icon' ? 'w-8 h-8' : 'w-20 h-20';

    const rows: JSX.Element[] = [];
    for (let j = 0; j < 8; j++) {
      const row: JSX.Element[] = [];
      for (let i = 0; i < 8; i++) {
        const squareColor = getBgColor(squareNr);
        let color: string = '';
        switch (markers[squareNr]) {
          case SELECTEDPIECE:
            color = 'bg-yellow-500';
            break;
          case POSSIBLEMOVE:
          case LASTMOVESTART + POSSIBLEMOVE:
          case LASTMOVEEND + POSSIBLEMOVE:
            color = squareColor === 'white' ? 'bg-[#c8d496]' : 'bg-[#a9a556]';
            break;
          case LASTMOVESTART:
          case LASTMOVEEND:
            color = squareColor === 'white' ? 'bg-[#fba188]' : 'bg-[#e67e5b]';
            break;
          default:
            color = 'bg-transparent';
            break;
        }

        row.push(<div className={`${sizeClass} ${color}`} key={`marker-square-${i}`} />);
        squareNr += next;
      }
      rows.push(
        <div className="flex flex-row" key={`marker-row-${j}`}>
          {row}
        </div>,
      );
    }
    return rows;
  }, [markers, orientation, size]);

  return <div className="relative">{boardMarkers}</div>;
};

export default BoardMarkers;
