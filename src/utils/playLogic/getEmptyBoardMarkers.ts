import { BoardMarkerType } from '@/src/types/chess';
import { BOARDDEFAULT } from '../constants';

const getEmptyBoardMarkers = (): BoardMarkerType => Array(64).fill(BOARDDEFAULT) as BoardMarkerType;

export default getEmptyBoardMarkers;
