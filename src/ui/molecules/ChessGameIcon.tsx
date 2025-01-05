import { useEffect, useState } from 'react';

import { getFenGame } from 'src/utils/chess';

import { ChessBoard, ChessPieces } from '.';

const ChessGameIcon = (): JSX.Element => {
  // STATE
  const [index, setIndex] = useState<number | null>(null);

  // VARS
  const famousChessOpenings = [
    'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1', // King's Pawn Opening (1. e4)
    'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1', // Sicilian Defense (1. e4 c5)
    'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1', // English Opening (1. c4)
    'rnbqkb1r/pppppppp/5n2/8/2P5/5P2/PP1P1P1P/RNBQKBNR b KQkq - 0 1', // Nimzo-Indian Defense
    'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1', // Queen's Pawn Opening (1. d4)
    'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1', // Queen's Gambit (1. d4 d5 2. c4)
    // Ruy-Lopez, Spanish Opening (1. e4 e5 2. Nf3 Nc6 3. Bb5)
    'r1bqkb1r/pppppppp/2n2n2/8/1P6/8/P1PPP1PP/RNBQKBNR b KQkq - 0 1',
    'rnbqkb1r/pppppppp/5n2/4P3/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1', // Caro-Kann Defense (1. e4 c6)
    'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1', // Indian Defense (1. d4 Nf6)
    'rnbqkb1r/pppppppp/5n2/4P3/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1', // King's Indian Defense (1. d4 Nf6 2. c4 g6)
  ];

  // EFFECTS
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * famousChessOpenings.length);
    setIndex(randomIndex);
  }, [famousChessOpenings.length]);

  const game = index === null ? undefined : getFenGame(famousChessOpenings[index]);

  return (
    <ChessBoard size="icon">
      {game && <ChessPieces board={game.board} orientation="whiteOnBottom" size="icon" />}
    </ChessBoard>
  );
};

export default ChessGameIcon;
