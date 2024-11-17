import { BoardMarkerType, ChessGameInfo } from '@/src/types/chess';
import getFenGame from './getFenGame';
import { BOARDDEFAULT, FENSTART } from '../constants';

const getNewGame = (): ChessGameInfo => {
  return {
    game: getFenGame(FENSTART),
    // playerColor: Math.random() >= 0.5 ? 'white' : 'black';
    playerColor: 'white',
    boardMarkers: Array(64).fill(BOARDDEFAULT) as BoardMarkerType,
  };
};

export default getNewGame;
