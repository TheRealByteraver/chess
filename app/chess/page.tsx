'use client';

import {
  BoardMarkerType,
  ChessBoardType,
  ChessGameInfo,
  GameState,
  MoveType,
} from '@/src/types/chess';
import { Button, Container, Header1 } from '@/src/ui/atoms';
import { ChessBoard } from '@/src/ui/molecules';
import { getAllAvailableMoves, getIsValidSelection, getNewGame } from '@/src/utils/chess';
import {
  BOARDDEFAULT,
  EMPTY,
  KING,
  LASTMOVEEND,
  LASTMOVESTART,
  PAWN,
  PIECEMASK,
  POSSIBLEMOVE,
  ROOK,
  SELECTEDPIECE,
} from '@/src/utils/constants';
import { useEffect, useState } from 'react';

const Chess = (): JSX.Element => {
  // STATE
  const [gameState, setGameState] = useState<GameState>('begin');
  const [gameInfo, setGameInfo] = useState<ChessGameInfo>(getNewGame());

  // METHODS
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

  // EFFECTS
  useEffect(() => {
    if (gameState !== 'thinking') return;
    // make bot move
    const allMoves = getAllAvailableMoves(gameInfo.game);

    if (allMoves.length === 0) {
      setGameState('checkmate'); // note: could be draw as well
      return;
    }

    const move = allMoves[Math.floor(Math.random() * allMoves.length)];
    const newGameInfo = makeMove(gameInfo, move);
    setGameInfo(newGameInfo);

    setGameState('waitingForUser');
  }, [gameState]);

  // METHODS
  const startGameHandler = () => {
    const newGame = getNewGame();
    setGameInfo(newGame);
    setGameState(newGame.playerColor === 'white' ? 'waitingForUser' : 'thinking');
  };

  const playerMoveHandler = (square: number) => {
    if (gameState !== 'waitingForUser') return;
    if (gameInfo.selectedSquare === undefined) {
      const isValidSelection = getIsValidSelection(
        gameInfo.game.board,
        square,
        gameInfo.playerColor,
      );
      // player clicked an empty square, opponent's piece, or piece that can't move
      if (!isValidSelection) return;

      // find the moves of the selected piece and keep potential target squares
      const allMoves = getAllAvailableMoves(gameInfo.game);
      const moves = allMoves.filter((move) => move.square === square).map((move) => move.target);

      // mark the square as selected and show the possible moves
      if (moves.length > 0) {
        setGameInfo((prev) => {
          const newBoardMarkers: BoardMarkerType = [...prev.boardMarkers];
          newBoardMarkers[square] = SELECTEDPIECE;
          moves.forEach((move) => (newBoardMarkers[move] = POSSIBLEMOVE));
          return {
            ...prev,
            selectedSquare: square,
            boardMarkers: newBoardMarkers,
          };
        });
      }
    } else {
      const allMoves = getAllAvailableMoves(gameInfo.game);
      const moves = allMoves
        .filter((move) => move.square === gameInfo.selectedSquare)
        .map((move) => move.target);

      if (moves.includes(square)) {
        // player made a valid move
        const newGameInfo = makeMove(gameInfo, { square: gameInfo.selectedSquare, target: square });
        setGameInfo(newGameInfo);
        setGameState('thinking');
      } else {
        // undo selection
        setGameInfo((prev) => {
          const newBoardMarkers = Array(64).fill(BOARDDEFAULT) as BoardMarkerType;
          return {
            ...prev,
            selectedSquare: undefined,
            boardMarkers: newBoardMarkers,
          };
        });
      }
    }
  };

  // VARS
  const orientation = gameInfo.playerColor === 'white' ? 'whiteOnBottom' : 'blackOnBottom';

  return (
    <Container hCenter vCenter>
      <Header1 text="Welcome to the chess bot!" />
      {gameState === 'begin' ? (
        <Button className="mb-6" onClick={startGameHandler}>
          Start a new Game
        </Button>
      ) : (
        <p className="mb-6">Game state: {gameState}</p>
      )}

      <div className="inline-block border-8 border-[#d28c45]">
        <ChessBoard
          interactive={gameState === 'waitingForUser'}
          board={gameInfo.game.board}
          boardMarkers={gameInfo.boardMarkers}
          orientation={orientation}
          onClick={playerMoveHandler}
        />
      </div>
    </Container>
  );
};

export default Chess;
