import { ChessGameInfo } from '@/src/types/chess';
import getFenGame from './getFenGame';
import { FENSTART } from '../constants';
import { getEmptyBoardMarkers } from '../playLogic';

const getNewGame = (): ChessGameInfo => {
  return {
    game: getFenGame(FENSTART),
    playerColor: Math.random() >= 0.5 ? 'white' : 'black',
    boardMarkers: getEmptyBoardMarkers(),
  };
};

export default getNewGame;
