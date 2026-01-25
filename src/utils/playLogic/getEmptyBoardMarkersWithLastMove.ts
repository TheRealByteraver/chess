import { BoardMarkerType } from 'src/types/chess';

import { LASTMOVEMASK } from '../constants';

const getEmptyBoardMarkersWithLastMove = (boardMarkers: BoardMarkerType): BoardMarkerType =>
  boardMarkers.map((marker) => marker & LASTMOVEMASK) as BoardMarkerType;

export default getEmptyBoardMarkersWithLastMove;
