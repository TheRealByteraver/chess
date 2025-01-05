'use client';

import { ChessGameInfo, GameState, PromotionPiece } from 'src/types/chess';
import { Button, Container, Header1, Modal } from 'src/ui/atoms';
import { ChessBoard, ChessSquare } from 'src/ui/molecules';
import {
  getAllAvailableMoves,
  getNewGame,
  getNrOfPieces,
  isInCheck,
  makeMove,
} from 'src/utils/chess';
import {
  BISHOP,
  BLACK,
  BLACKBISHOP,
  BLACKKNIGHT,
  BLACKPAWN,
  BLACKQUEEN,
  BLACKROOK,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
} from 'src/utils/constants';

import { getUpdatedGameOnPlayerAction } from 'src/utils/playLogic';
import { useEffect, useState } from 'react';

const Chess = (): JSX.Element => {
  // STATE
  const [gameState, setGameState] = useState<GameState>('begin');
  const [gameInfo, setGameInfo] = useState<ChessGameInfo>(getNewGame());
  const [promotionSquare, setPromotionSquare] = useState<number | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // EFFECTS
  // make bot move
  useEffect(() => {
    if (gameState !== 'thinking') return;
    const allMoves = getAllAvailableMoves(gameInfo.game);
    if (allMoves.length > 0) {
      const move = allMoves[Math.floor(Math.random() * allMoves.length)];
      const newGameInfo = makeMove(gameInfo, move);

      // Pawn promotion logic
      const pawnCheck = gameInfo.game.activeColor === 'white' ? PAWN : BLACKPAWN;
      if (newGameInfo.game.board[move.target] === pawnCheck) {
        const finalRow = gameInfo.game.activeColor === 'white' ? 0 : 7;
        if (move.target >> 3 === finalRow) {
          const promotionPiece: PromotionPiece[] =
            gameInfo.game.activeColor === 'white'
              ? [QUEEN, ROOK, BISHOP, KNIGHT]
              : [BLACKQUEEN, BLACKROOK, BLACKBISHOP, BLACKKNIGHT];
          newGameInfo.game.board[move.target] = promotionPiece[Math.floor(Math.random() * 4)];
        }
      }
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
    if (newGameInfo.game.activeColor !== gameInfo.game.activeColor) {
      // Pawn promotion logic
      const pawnCheck = gameInfo.game.activeColor === 'white' ? PAWN : BLACKPAWN;
      if (newGameInfo.game.board[square] === pawnCheck) {
        const finalRow = gameInfo.game.activeColor === 'white' ? 0 : 7;
        if (square >> 3 === finalRow) {
          setPromotionSquare(square);
          setIsModalOpen(true);
          return;
        }
      }
      setGameState('thinking');
    }
    // update the board markers
    setGameInfo(newGameInfo);
  };

  const handlePromotionDialogClick = (piece: PromotionPiece) => {
    if (promotionSquare === undefined) {
      setIsModalOpen(false);
      return;
    }
    const newGameInfo = getUpdatedGameOnPlayerAction(gameInfo, promotionSquare);
    newGameInfo.game.board[promotionSquare] = piece;
    setGameInfo(newGameInfo);
    setGameState('thinking');
    setIsModalOpen(false);
  };

  // VARS
  const orientation = gameInfo.playerColor === 'white' ? 'whiteOnBottom' : 'blackOnBottom';
  const colorMask = gameInfo.game.activeColor === 'white' ? 0 : BLACK;
  const promotionPieces: PromotionPiece[] = [QUEEN, ROOK, BISHOP, KNIGHT].map(
    (piece) => piece | colorMask,
  );

  return (
    <Container hCenter vCenter>
      <Modal isOpen={isModalOpen}>
        <div className="flex flex-col gap-4">
          {promotionPieces.map((piece) => (
            <ChessSquare
              key={piece}
              interactive={true}
              size="normal"
              piece={piece}
              squareColor={'white'}
              onClick={() => handlePromotionDialogClick(piece)}
            />
          ))}
        </div>
      </Modal>
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
