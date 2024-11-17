'use client';

import {
  ChessGameInfo,
  ChessPieceType,
  GameState,
  SquareMarkerType,
} from '@/src/types/chess';
import { ArrayOf64 } from '@/src/types/generic';
import { Button, Container, Header1 } from '@/src/ui/atoms';
import { ChessBoard } from '@/src/ui/molecules';
import {
  getAvailableMoves,
  getIsValidSelection,
  getNewGame,
  getPieceColor,
} from '@/src/utils/chess';
import {
  BOARDDEFAULT,
  EMPTY,
  POSSIBLEMOVE,
  SELECTEDPIECE,
} from '@/src/utils/constants';
import { useEffect, useState } from 'react';

const Chess = (): JSX.Element => {
  // STATE
  // const [gameState, setGameState] = useState<GameState>('begin');
  const [gameState, setGameState] = useState<GameState>('waitingForUser'); // debug
  const [gameInfo, setGameInfo] = useState<ChessGameInfo>(getNewGame());

  // EFFECTS
  useEffect(() => {
    if (gameState === 'thinking') {
      // make bot move
      const allMoves: { square: number; target: number }[] = [];

      for (let square = 0; square < 64; square++) {
        if (
          getPieceColor(gameInfo.game.board[square]) !==
          gameInfo.game.activeColor
        )
          continue;
        const moves = getAvailableMoves(gameInfo.game, square);
        if (moves.length === 0) continue;
        moves.forEach((target) => allMoves.push({ square, target }));
      }

      if (allMoves.length === 0) {
        console.log('checkmate');
        setGameState('checkmate');
        return;
      }

      const move = allMoves[Math.floor(Math.random() * allMoves.length)];

      setGameInfo((prev) => {
        const newBoardMarkers = Array(64).fill(
          BOARDDEFAULT
        ) as ArrayOf64<SquareMarkerType>;
        const newBoard: ArrayOf64<ChessPieceType> = [...prev.game.board];
        newBoard[move.target] = newBoard[move.square];
        newBoard[move.square] = EMPTY;
        return {
          ...prev,
          selectedSquare: undefined,
          game: {
            ...prev.game,
            activeColor: gameInfo.playerColor,
            board: newBoard,
          },
          boardMarkers: newBoardMarkers,
        };
      });

      console.log('nr of moves:', allMoves.length);

      setGameState('waitingForUser');
    }
  }, [gameState]);

  // METHODS
  const startGameHandler = () => {
    const newGame = getNewGame();
    setGameInfo(newGame);
    setGameState(
      newGame.playerColor === 'white' ? 'waitingForUser' : 'thinking'
    );
  };

  const playerMoveHandler = (square: number) => {
    if (gameState !== 'waitingForUser') return;
    if (gameInfo.selectedSquare === undefined) {
      console.log('no selected square');
      const isValidSelection = getIsValidSelection(
        gameInfo.game.board,
        square,
        gameInfo.playerColor
      );
      // player clicked an empty square, opponent's piece, or piece that can't move
      if (!isValidSelection) return;

      const moves = getAvailableMoves(gameInfo.game, square);
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
      const moves = getAvailableMoves(gameInfo.game, gameInfo.selectedSquare);
      console.log('moves:', moves);
      console.log('valid:', moves.includes(square));
      if (moves.includes(square)) {
        // player made a valid move
        const botColor = gameInfo.playerColor === 'white' ? 'black' : 'white';
        setGameInfo((prev) => {
          const newBoardMarkers = Array(64).fill(
            BOARDDEFAULT
          ) as ArrayOf64<SquareMarkerType>;
          const newBoard: ArrayOf64<ChessPieceType> = [...prev.game.board];
          newBoard[square] = newBoard[gameInfo.selectedSquare as number];
          newBoard[gameInfo.selectedSquare as number] = EMPTY;
          return {
            ...prev,
            selectedSquare: undefined,
            game: {
              ...prev.game,
              activeColor: botColor,
              board: newBoard,
            },
            boardMarkers: newBoardMarkers,
          };
        });
        setGameState('thinking');
      } else {
        // undo selection
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
        <ChessBoard
          interactive={gameState === 'waitingForUser'}
          board={gameInfo.game.board}
          boardMarkers={gameInfo.boardMarkers}
          orientation="whiteOnBottom"
          onClick={playerMoveHandler}
        />
      </div>
    </Container>
  );
};

export default Chess;
