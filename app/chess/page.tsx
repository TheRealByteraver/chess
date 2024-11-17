'use client';

import { ChessGameInfo, GameState, SquareMarkerType } from '@/src/types/chess';
import { ArrayOf64 } from '@/src/types/generic';
import { Button, Container, Header1 } from '@/src/ui/atoms';
import { ChessBoard } from '@/src/ui/molecules';
import {
  getAvailableMoves,
  getIsValidSelection,
  getNewGame,
} from '@/src/utils/chess';
import {
  BOARDDEFAULT,
  CHESSPIECENAMES,
  POSSIBLEMOVE,
  SELECTEDPIECE,
} from '@/src/utils/constants';
import { useState } from 'react';

const Chess = (): JSX.Element => {
  // STATE
  // const [gameState, setGameState] = useState<GameState>('begin');
  const [gameState, setGameState] = useState<GameState>('waitingForUser'); // debug
  const [gameInfo, setGameInfo] = useState<ChessGameInfo>(getNewGame());

  // METHODS
  const startGameHandler = () => {
    const newGame = getNewGame();
    setGameInfo(newGame);
    setGameState(
      newGame.playerColor === 'white' ? 'waitingForUser' : 'thinking'
    );
  };

  const playerMoveHandler = (square: number) => {
    console.log(
      'square:',
      square,
      ':',
      CHESSPIECENAMES[gameInfo.game.board[square]]
    );
    if (gameState !== 'waitingForUser') return;
    if (!gameInfo.selectedSquare) {
      const isValidSelection = getIsValidSelection(
        gameInfo.game.board,
        square,
        gameInfo.playerColor
      );
      // player clicked an empty square, opponent's piece, or piece that can't move
      if (!isValidSelection) return;

      const moves = getAvailableMoves(gameInfo.game, square);
      // TODO: mark possible moves on the board
      console.log('moves:', moves);
      if (moves.length > 0) {
        setGameInfo((prev) => {
          const newBoardMarkers: ArrayOf64<SquareMarkerType> = [
            ...prev.boardMarkers,
          ];
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
      if (gameInfo.selectedSquare === square)
        setGameInfo((prev) => {
          const newBoardMarkers = Array(64).fill(
            BOARDDEFAULT
          ) as ArrayOf64<SquareMarkerType>;
          return {
            ...prev,
            selectedSquare: undefined,
            boardMarkers: newBoardMarkers,
          };
        });
      else {
        // TODO: check if target square is a valid move
      }
    }
  };

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
        {gameInfo.game && (
          <ChessBoard
            interactive={gameState === 'waitingForUser'}
            board={gameInfo.game.board}
            boardMarkers={gameInfo.boardMarkers}
            orientation="whiteOnBottom"
            onClick={playerMoveHandler}
          />
        )}
      </div>
    </Container>
  );
};

export default Chess;
