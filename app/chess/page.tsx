import ChessBoard from '@/src/ui/molecules/ChessBoard';
import getFenGame from '@/src/utils/chess/getFenGame';

const Chess = (): JSX.Element => {
  const fenStart = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';

  const chessGame = getFenGame(fen);

  return (
    <div className="relative">
      <h1>hello, chess page</h1>
      <div className="inline-block border-8 border-teal-500">
        {chessGame && (
          <ChessBoard board={chessGame.board} orientation="whiteOnBottom" />
        )}
      </div>
    </div>
  );
};

export default Chess;
