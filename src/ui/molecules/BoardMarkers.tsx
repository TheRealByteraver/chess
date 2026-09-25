import { BoardMarkerType, Orientation } from 'src/types/chess';
import { getBgColor } from 'src/utils/chess';
import { LASTMOVEEND, LASTMOVESTART, POSSIBLEMOVE, SELECTEDPIECE } from 'src/utils/constants';

type Props = {
  orientation: Orientation;
  markers: BoardMarkerType;
};

const BoardMarkers = (props: Props): JSX.Element => {
  // PROPS
  const { markers, orientation } = props;

  // METHODS
  const getCssColor = (squareNr: number) => {
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
    return color;
  };

  return (
    <div className="absolute top-0 left-0 w-full">
      <div className="grid grid-cols-8 grid-rows-8">
        {Array.from({ length: 64 }, (_, i) => {
          const mirrored = orientation === 'blackOnBottom';
          const squareNr = mirrored ? 63 - i : i;
          const cssColor = getCssColor(squareNr);
          return <div key={`marker-square-${squareNr}`} className={`aspect-square ${cssColor}`} />;
        })}
      </div>
    </div>
  );
};

export default BoardMarkers;
