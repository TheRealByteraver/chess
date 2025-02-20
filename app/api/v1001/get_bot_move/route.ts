// docs: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
import { NextRequest } from 'next/server';
import { ChessGame } from 'src/types/chess';
import getBotMove from './_utils/getBotMove';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const game = searchParams.get('game');

  if (game === null) {
    return new Response('Missing game parameter', {
      status: 400,
    });
  }

  const chessGame: ChessGame = JSON.parse(game);

  const botMove = getBotMove(chessGame);

  return Response.json(botMove);
}
