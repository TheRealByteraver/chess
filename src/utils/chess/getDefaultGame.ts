import { ChessGameInfo } from 'src/types/chess';
import getFenGame from './getFenGame';
import { FENSTART } from '../constants';
import { getEmptyBoardMarkers } from '../playLogic';

const getDefaultGame = (): ChessGameInfo => {
  return {
    game: getFenGame(FENSTART),
    playerColor: 'white',
    boardMarkers: getEmptyBoardMarkers(),
  };
};

export default getDefaultGame;
