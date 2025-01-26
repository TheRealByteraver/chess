'use client';

import { useEffect, useState } from 'react';

import { BoardMarkerType, ChessGameInfo, GameState, PromotionPiece } from 'src/types/chess';
import { Button, Container, Header1 } from 'src/ui/atoms';
import {
  BoardMarkers,
  ChessBoard,
  ChessInteractiveLayer,
  ChessPieces,
  PromotionModal,
} from 'src/ui/molecules';
import {
  getAllAvailableMoves,
  getDefaultGame,
  getNewGame,
  getNrOfPieces,
  isInCheck,
  makeMove,
} from 'src/utils/chess';
import getBotMove from 'src/utils/chess/getBotMove';
import {
  BISHOP,
  BLACKBISHOP,
  BLACKKNIGHT,
  BLACKPAWN,
  BLACKQUEEN,
  BLACKROOK,
  BOARDDEFAULT,
  KNIGHT,
  LASTMOVEEND,
  LASTMOVESTART,
  PAWN,
  QUEEN,
  ROOK,
} from 'src/utils/constants';
import { getUpdatedGameOnPlayerAction } from 'src/utils/playLogic';

const Chess = (): JSX.Element => {
  // STATE
  const [gameState, setGameState] = useState<GameState>('begin');
  const [gameInfo, setGameInfo] = useState<ChessGameInfo>(getDefaultGame());
  const [promotionSquare, setPromotionSquare] = useState<number | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // EFFECTS
  // force a redraw of the board when the game state changes
  useEffect(() => {
    if (gameState === 'redrawBoard') setGameState('thinking');
  }, [gameState]);

  // make bot move
  useEffect(() => {
    if (gameState !== 'thinking') return;
    const botMove = getBotMove(gameInfo.game);
    if (botMove) {
      const newGame = makeMove(gameInfo.game, botMove);

      // mark the move on the board if it was a move made by the bot
      const newBoardMarkers = Array(64).fill(BOARDDEFAULT) as BoardMarkerType;
      if (gameInfo.playerColor !== gameInfo.game.activeColor) {
        newBoardMarkers[botMove.square] = LASTMOVESTART;
        newBoardMarkers[botMove.target] = LASTMOVEEND;
      }

      // Pawn promotion logic
      const pawnCheck = gameInfo.game.activeColor === 'white' ? PAWN : BLACKPAWN;
      if (newGame.board[botMove.target] === pawnCheck) {
        const finalRow = gameInfo.game.activeColor === 'white' ? 0 : 7;
        if (botMove.target >> 3 === finalRow) {
          const promotionPiece: PromotionPiece[] =
            gameInfo.game.activeColor === 'white'
              ? [QUEEN, ROOK, BISHOP, KNIGHT]
              : [BLACKQUEEN, BLACKROOK, BLACKBISHOP, BLACKKNIGHT];
          newGame.board[botMove.target] = promotionPiece[Math.floor(Math.random() * 4)];
        }
      }
      setGameInfo({
        ...gameInfo,
        game: newGame,
        boardMarkers: newBoardMarkers,
        selectedSquare: undefined,
      });
      setGameState('waitingForUser');
    }
  }, [gameInfo, gameState]);

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
  const startGameHandler = (): void => {
    const newGame = getNewGame();
    setGameInfo(newGame);
    setGameState(
      newGame.playerColor === newGame.game.activeColor ? 'waitingForUser' : 'redrawBoard',
    );
  };

  const playerClickHandler = (square: number): void => {
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
      setGameState('redrawBoard');
    }
    // update the board markers
    setGameInfo(newGameInfo);
  };

  const promotionDialogClickHandler = (piece: PromotionPiece): void => {
    if (promotionSquare === undefined) {
      setIsModalOpen(false);
      return;
    }
    const newGameInfo = getUpdatedGameOnPlayerAction(gameInfo, promotionSquare);
    newGameInfo.game.board[promotionSquare] = piece;
    setGameInfo(newGameInfo);
    setGameState('redrawBoard');
    setIsModalOpen(false);
  };

  // VARS
  const orientation = gameInfo?.playerColor === 'white' ? 'whiteOnBottom' : 'blackOnBottom';

  return (
    <Container hCenter vCenter>
      <PromotionModal
        isOpen={isModalOpen}
        activeColor={gameInfo?.game.activeColor}
        promotionDialogClickHandler={promotionDialogClickHandler}
      />
      <Header1 text="Welcome to the chess bot!" />
      {['begin', 'checkmate', 'stalemate', 'draw'].includes(gameState) && (
        <Button className="mb-6" onClick={startGameHandler}>
          Start a new Game
        </Button>
      )}
      <p className="mb-6">Game state: {gameState}</p>

      <div className="inline-block border-8 border-[#d28c45]">
        <ChessBoard>
          <BoardMarkers markers={gameInfo.boardMarkers} orientation={orientation} />
          {gameState === 'waitingForUser' && (
            <ChessInteractiveLayer onClick={playerClickHandler} orientation={orientation} />
          )}
          <ChessPieces board={gameInfo.game.board} orientation={orientation} />
        </ChessBoard>
      </div>
    </Container>
  );
};

export default Chess;
