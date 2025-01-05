import { BoardMarkerType, ChessGameInfo } from 'src/types/chess';

import { getAllAvailableMoves } from '../chess';
import getEmptyBoardMarkersWithLastMove from './getEmptyBoardMarkersWithLastMove';
import { POSSIBLEMOVE, SELECTEDPIECE } from '../constants';

const getBoardMarkersTargets = (gameInfo: ChessGameInfo, square: number): BoardMarkerType => {
  // find the moves of the selected piece and keep potential target squares
  const allMoves = getAllAvailableMoves(gameInfo.game);
  const moves = allMoves.filter((move) => move.square === square).map((move) => move.target);
  const newBoardMarkers = getEmptyBoardMarkersWithLastMove(gameInfo.boardMarkers);
  newBoardMarkers[square] |= SELECTEDPIECE;
  moves.forEach((move) => (newBoardMarkers[move] |= POSSIBLEMOVE));
  return newBoardMarkers;
};

export default getBoardMarkersTargets;
