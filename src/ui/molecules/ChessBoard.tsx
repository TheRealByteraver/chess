import { ReactNode } from 'react';

import { getBgColor } from 'src/utils/chess';

type Props = {
  children?: ReactNode;
};

const ChessBoard = (props: Props): JSX.Element => {
  // PROPS
  const { children } = props;

  return (
    <div className="relative">
      <div className="grid grid-cols-8 grid-rows-8">
        {Array.from({ length: 64 }, (_, squareNr) => {
          const color = getBgColor(squareNr);
          const cssColor = color === 'white' ? 'bg-[#ffcf9f]' : 'bg-[#d28c45]';
          return <div key={`square-${squareNr}`} className={`aspect-square ${cssColor}`} />;
        })}
      </div>

      {children}
    </div>
  );
};

export default ChessBoard;
