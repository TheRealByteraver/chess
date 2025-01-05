import { BoardMarkerType, ChessBoardType, ChessGameInfo, MoveType } from 'src/types/chess';
import {
  BOARDDEFAULT,
  EMPTY,
  KING,
  LASTMOVEEND,
  LASTMOVESTART,
  PAWN,
  PIECEMASK,
  ROOK,
} from '../constants';

const makeMove = (gameInfo: ChessGameInfo, move: MoveType): ChessGameInfo => {
  // create empty boardMarkers object
  const newBoardMarkers = Array(64).fill(BOARDDEFAULT) as BoardMarkerType;
  const { square, target } = move;
  const { activeColor } = gameInfo.game;
  const opponentColor = gameInfo.game.activeColor === 'white' ? 'black' : 'white';

  // mark the move on the board if it was a move made by the bot
  if (gameInfo.playerColor !== activeColor) {
    newBoardMarkers[square] = LASTMOVESTART;
    newBoardMarkers[target] = LASTMOVEEND;
  }

  // create new board with the moved piece
  const newBoard: ChessBoardType = [...gameInfo.game.board];

  const pieceType = newBoard[square] & PIECEMASK;
  const capturedPieceType = newBoard[target] & PIECEMASK;

  // move the piece to the new position
  newBoard[target] = newBoard[square];
  newBoard[square] = EMPTY;

  // en passant logic
  let enPassant: number | undefined = undefined;
  if (pieceType === PAWN) {
    // check if the move was a double pawn move
    const diff = target - square;
    if (Math.abs(diff) === 16) {
      enPassant = target + (diff > 0 ? -8 : 8);
    }
    // check if we have an en passant capture
    if (gameInfo.game.enPassant === target) {
      newBoard[target + (activeColor === 'white' ? 8 : -8)] = EMPTY;
    }
  }

  // castling logic
  let castling = {
    white: { ...gameInfo.game.castling.white },
    black: { ...gameInfo.game.castling.black },
  };
  if (pieceType === KING) {
    // king moved, disable castling
    castling[activeColor].kingSide = false;
    castling[activeColor].queenSide = false;

    // move the rook if it was a castling move
    const delta = target - square;
    if (Math.abs(delta) === 2) {
      // this is a castling move
      if (delta > 0) {
        // king side castling
        newBoard[target - 1] = newBoard[target + 1];
        newBoard[target + 1] = EMPTY;
      } else {
        // queen side castling
        newBoard[target + 1] = newBoard[target - 2];
        newBoard[target - 2] = EMPTY;
      }
    }
  }

  // rook moved, disable castling on that side
  if (pieceType === ROOK) {
    if (square === 0 || square === 56) {
      castling[activeColor].queenSide = false;
    } else if (square === 7 || square === 63) {
      castling[activeColor].kingSide = false;
    }
  }

  // captured a rook, disable castling for the opponent
  if (capturedPieceType === ROOK) {
    if (target === 0 || target === 56) {
      castling[opponentColor].queenSide = false;
    } else if (target === 7 || target === 63) {
      castling[opponentColor].kingSide = false;
    }
  }
  // end of castling logic

  // construct a new gameInfo object and return it
  return {
    game: {
      board: newBoard,
      activeColor: opponentColor,
      castling,
      enPassant,
      halfMoveClock: gameInfo.game.halfMoveClock + 1,
      fullMoveNumber:
        gameInfo.game.activeColor === 'black'
          ? gameInfo.game.fullMoveNumber + 1
          : gameInfo.game.fullMoveNumber,
    },
    playerColor: gameInfo.playerColor,
    boardMarkers: newBoardMarkers,
    selectedSquare: undefined,
  };
};

export default makeMove;
