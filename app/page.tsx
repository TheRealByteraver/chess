'use client';

import { GameType } from '@/src/types/chess';
import { Button, Container, Header1 } from '@/src/ui/atoms';
import { ChessGameIcon } from '@/src/ui/molecules';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Home = (): JSX.Element => {
  // ROUTER
  const router = useRouter();

  // STATE
  const [gameType, setGameType] = useState<GameType>('none');

  useEffect(() => {
    if (gameType === 'chess') router.push('/chess');
  }, [gameType, router]);

  return (
    <Container hCenter vCenter>
      <Header1 text="Play a game" />
      <Button style="none" onClick={() => setGameType('chess')}>
        <ChessGameIcon />
      </Button>
    </Container>
  );
};

export default Home;
