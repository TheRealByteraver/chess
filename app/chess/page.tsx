'use client';

import { ChessGame, GameState } from '@/src/types/chess';
import { Button, Container, Header1 } from '@/src/ui/atoms';
import ChessBoard from '@/src/ui/molecules/ChessBoard';
import getFenGame from '@/src/utils/chess/getFenGame';
import { CHESSPIECENAMES, FENSTART } from '@/src/utils/constants';
import { useState } from 'react';

const Chess = (): JSX.Element => {
  // STATE
  const [gameState, setGameState] = useState<GameState>('begin');
  const [game /*, updateGame */] = useState<ChessGame>(getFenGame(FENSTART));
  // const [selectedSquare, setSelectedSquare] = useState<number | null>(null);

  // METHODS
  const startGameHandler = () => {
    setGameState('waitingForUser');
  };

  const playerMoveHandler = (square: number) => {
    console.log('Player clicked square:', square);
    console.log('Selected square:', CHESSPIECENAMES[game.board[square]]);
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
        {game && (
          <ChessBoard
            board={game.board}
            orientation="blackOnBottom"
            onClick={playerMoveHandler}
          />
        )}
      </div>
    </Container>
  );
};

export default Chess;
