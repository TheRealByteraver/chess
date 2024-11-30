'use client';

import { BoardMarkerType, ChessGameInfo, GameState } from '@/src/types/chess';
import { Button, Container, Header1 } from '@/src/ui/atoms';
import { ChessBoard } from '@/src/ui/molecules';
import { getAllAvailableMoves, getIsValidSelection, getNewGame, makeMove } from '@/src/utils/chess';
import { BOARDDEFAULT, POSSIBLEMOVE, SELECTEDPIECE } from '@/src/utils/constants';
import { useEffect, useState } from 'react';

const Chess = (): JSX.Element => {
  // STATE
  const [gameState, setGameState] = useState<GameState>('begin');
  const [gameInfo, setGameInfo] = useState<ChessGameInfo>(getNewGame());

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
    setGameState(newGame.playerColor === newGame.game.activeColor ? 'waitingForUser' : 'thinking');
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
