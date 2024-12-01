'use client';

import { ChessGameInfo, GameState } from '@/src/types/chess';
import { Button, Container, Header1 } from '@/src/ui/atoms';
import { ChessBoard } from '@/src/ui/molecules';
import {
  getAllAvailableMoves,
  getNewGame,
  getNrOfPieces,
  isInCheck,
  makeMove,
} from '@/src/utils/chess';

import { getUpdatedGameOnPlayerAction } from '@/src/utils/playLogic';
import { useEffect, useState } from 'react';

const Chess = (): JSX.Element => {
  // STATE
  const [gameState, setGameState] = useState<GameState>('begin');
  const [gameInfo, setGameInfo] = useState<ChessGameInfo>(getNewGame());

  // EFFECTS
  // make bot move
  useEffect(() => {
    if (gameState !== 'thinking') return;
    const allMoves = getAllAvailableMoves(gameInfo.game);
    if (allMoves.length > 0) {
      const move = allMoves[Math.floor(Math.random() * allMoves.length)];
      const newGameInfo = makeMove(gameInfo, move);
      setGameInfo(newGameInfo);
      setGameState('waitingForUser');
    }
  }, [gameState, gameInfo, gameInfo.game]);

  // if there are only two kings left, it's a draw
  useEffect(() => {
    if (getNrOfPieces(gameInfo.game.board) === 2) setGameState('draw');
  }, [gameInfo.game.board]);

  // check for checkmate or stalemate
  useEffect(() => {
    const allMoves = getAllAvailableMoves(gameInfo.game);
    if (allMoves.length === 0) {
      if (isInCheck(gameInfo.game, { square: 0, target: 0 })) setGameState('checkmate');
      else setGameState('stalemate');
    }
  }, [gameInfo.game]);

  // METHODS
  const startGameHandler = () => {
    const newGame = getNewGame();
    setGameInfo(newGame);
    setGameState(newGame.playerColor === newGame.game.activeColor ? 'waitingForUser' : 'thinking');
  };

  const playerClickHandler = (square: number) => {
    if (gameState !== 'waitingForUser') return;
    const newGameInfo = getUpdatedGameOnPlayerAction(gameInfo, square);
    // switch game state if the player made a move
    if (newGameInfo.game.activeColor !== gameInfo.game.activeColor) setGameState('thinking');

    // update the board markers
    setGameInfo(newGameInfo);
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
          onClick={playerClickHandler}
        />
      </div>
    </Container>
  );
};

export default Chess;
