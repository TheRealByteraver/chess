import { NextResponse } from 'next/server';

import { PlayerColor } from 'src/types/chess';

export function GET(): NextResponse<{ playerColor: PlayerColor }> {
  const playerColor = Math.random() >= 0.5 ? 'white' : 'black';
  return NextResponse.json({ playerColor });
}
