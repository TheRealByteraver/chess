import { ChessGameInfo } from 'src/types/chess';
import getDefaultGame from './getDefaultGame';

const getNewGame = (): ChessGameInfo => {
  return {
    ...getDefaultGame(),
    playerColor: Math.random() >= 0.5 ? 'white' : 'black',
  };
};

export default getNewGame;
