import { ChessGameInfo } from 'src/types/chess';
import { getIsValidSelection, makeMove } from '../chess';
import getBoardMarkersTargets from './getBoardMarkersTargets';
import getEmptyBoardMarkersWithLastMove from './getEmptyBoardMarkersWithLastMove';
import getIsValidMove from './getIsValidMove';

const getUpdatedGameOnPlayerAction = (gameInfo: ChessGameInfo, square: number): ChessGameInfo => {
  // The player selected a square, check if it has one of his pieces
  if (gameInfo.selectedSquare === undefined) {
    const isValidSelection = getIsValidSelection(gameInfo.game.board, square, gameInfo.playerColor);
    // player clicked an empty square or opponent's piece
    if (!isValidSelection) return { ...gameInfo };

    // mark the square as selected and show the possible moves
    const boardMarkers = getBoardMarkersTargets(gameInfo, square);
    return {
      ...gameInfo,
      selectedSquare: square,
      boardMarkers,
    };
  }

  // if the player clicked the same square, undo the selection
  if (gameInfo.selectedSquare === square) {
    const boardMarkers = getEmptyBoardMarkersWithLastMove(gameInfo.boardMarkers);
    return {
      ...gameInfo,
      selectedSquare: undefined,
      boardMarkers,
    };
  }

  // The player selected a second square, make the move if it's valid
  const playerMove = {
    square: gameInfo.selectedSquare,
    target: square,
  };
  const isValidMove = getIsValidMove(gameInfo.game, playerMove);
  if (isValidMove) return makeMove(gameInfo, playerMove);

  // not a valid move, check if player selected another piece
  const isValidSelection = getIsValidSelection(gameInfo.game.board, square, gameInfo.playerColor);

  // player clicked an empty square or opponent's piece, undo the selection
  if (!isValidSelection) {
    const boardMarkers = getEmptyBoardMarkersWithLastMove(gameInfo.boardMarkers);
    return {
      ...gameInfo,
      selectedSquare: undefined,
      boardMarkers,
    };
  }

  // Player selected another piece, update the selection:
  // mark the square as selected and show the possible moves
  const boardMarkers = getBoardMarkersTargets(gameInfo, square);
  return {
    ...gameInfo,
    selectedSquare: square,
    boardMarkers,
  };
};

export default getUpdatedGameOnPlayerAction;
