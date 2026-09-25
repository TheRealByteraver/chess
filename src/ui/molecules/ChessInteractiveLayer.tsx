import { Orientation } from 'src/types/chess';

type Props = {
  orientation: Orientation;
  onClick: (square: number) => void;
};

const ChessInteractiveLayer = (props: Props): JSX.Element => {
  // PROPS
  const { orientation, onClick } = props;

  return (
    <div className="absolute top-0 left-0 w-full">
      <div className="grid grid-cols-8 grid-rows-8">
        {Array.from({ length: 64 }, (_, i) => {
          const mirrored = orientation === 'blackOnBottom';
          const squareNr = mirrored ? 63 - i : i;
          const hoverCss = 'hover:bg-yellow-400 hover:bg-opacity-80';
          return (
            <div
              key={`interactive-square-${squareNr}`}
              className={`aspect-square ${hoverCss}`}
              onClick={() => onClick(squareNr)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChessInteractiveLayer;
