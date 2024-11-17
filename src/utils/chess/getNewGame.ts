import { ChessGameInfo, SquareMarkerType } from '@/src/types/chess';
import getFenGame from './getFenGame';
import { BOARDDEFAULT, FENSTART } from '../constants';
import { ArrayOf64 } from '@/src/types/generic';

const getNewGame = (): ChessGameInfo => {
  return {
    game: getFenGame(FENSTART),
    // playerColor: Math.random() >= 0.5 ? 'white' : 'black';
    playerColor: 'white',
    boardMarkers: Array(64).fill(BOARDDEFAULT) as ArrayOf64<SquareMarkerType>,
  };
};

export default getNewGame;
