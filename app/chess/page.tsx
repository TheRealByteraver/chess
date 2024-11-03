import ChessBoard from '@/src/ui/molecules/ChessBoard';
import ChessSquare from '@/src/ui/molecules/ChessSquare';

const Chess = (): JSX.Element => {
  const fenStart = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R';

  return (
    <div className="">
      <h1>hello, chess page</h1>
      <div className="border-8 border-teal-500 flex flex-row">
        {/* <ChessSquare piece="k" squareColor="black" />
        <ChessSquare piece="Q" squareColor="white" /> */}
        <ChessBoard fen={fen} orientation="whiteOnBottom" />
      </div>
    </div>
  );
};

export default Chess;
