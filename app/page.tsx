'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { GameType } from 'src/types/generic';
import { Button, Container, Header1 } from 'src/ui/atoms';
import { ChessGameIcon } from 'src/ui/molecules';

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
