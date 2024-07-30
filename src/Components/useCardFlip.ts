import { useState, useEffect } from 'react';

export const useCardFlip = (deck: string[]) => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [match, setMatch] = useState<boolean>(false);

  const flipCard = (index: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index)) {
      setFlippedCards(prevFlippedCards => [...prevFlippedCards, index]);
    }
  };

  const unflipCards = () => {
    setFlippedCards([]);
  };

  const checkMatch = () => {
    if (deck[flippedCards[0]] === deck[flippedCards[1]]) {
      setMatch(true);
    } else {
      setTimeout(unflipCards, 1000);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }, [flippedCards]);

  return { flippedCards, flipCard, match, unflipCards };
};


