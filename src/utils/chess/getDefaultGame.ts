import { ChessGameInfo } from 'src/types/chess';

import { FENSTART } from '../constants';
import { getEmptyBoardMarkers } from '../playLogic';
import getFenGame from './getFenGame';

const getDefaultGame = (): ChessGameInfo => ({
  game: getFenGame(FENSTART),
  playerColor: 'white',
  boardMarkers: getEmptyBoardMarkers(),
});

export default getDefaultGame;
