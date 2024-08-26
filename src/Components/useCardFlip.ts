import { useState, useEffect } from 'react';
// useState is a hook that allows you to have state variables in functional components
//useEffects is a hook that allows you to perform side effects in functional components


// useCardFlip is a custom hook that manages the state of the cards in the game
// It takes in a deck of cards and returns an object with the following properties: flippedCards, flipCard, match, unflipCards
export const useCardFlip = (deck: string[]) => {
  //flippedCards is an array that holds the indices of the flipped cards
  //setFlippedCards is a function that updates the flippedCards array
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  //match is a boolean that indicates whether the flipped cards match
  //setMatch is a function that updates the match variable
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flippedCards]);

  return { flippedCards, flipCard, match, unflipCards };
};


