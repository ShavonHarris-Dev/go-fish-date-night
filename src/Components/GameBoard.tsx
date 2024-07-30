import React, { useState, useEffect } from 'react';
import Card from './Card';
import { useCardFlip } from './useCardFlip';

const suggestions = ['Camping', 'Movie Night', 'Cooking Together', 'Hiking', 'Picnic in the Park', 'Visit a Museum', 'Beach Day', 'Bike Ride', 'Game Night', 'Wine Tasting', 'Dance Class', 'DIY Project'];
const deck = [...suggestions, ...suggestions];

// Fisher-Yates (aka Knuth) Shuffle
function shuffle(array: string[]) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const GameBoard: React.FC = () => {
  const [shuffledDeck, setShuffledDeck] = useState<string[]>([]);
  const { flippedCards, flipCard, match, unflipCards } = useCardFlip(shuffledDeck);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<'Player 1' | 'Player 2'>('Player 1');
  const [turns, setTurns] = useState<number>(0);

  useEffect(() => {
    setShuffledDeck(shuffle(deck));
  }, []);

  const handleFlip = (index: number) => {
    if (currentPlayer === 'Player 1') {
      flipCard(index);
      setCurrentPlayer('Player 2');
    } else if (currentPlayer === 'Player 2') {
      flipCard(index);
      setCurrentPlayer('Player 1');
    }
  };

  const handleAccept = () => {
    if (match) {
      setGameOver(true);
    }
  };

  const handleDeny = () => {
    if (match) {
      unflipCards();
      alert('Continue finding matches');
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(6, 1fr)' }}>
      <h2>Current Player: {currentPlayer}</h2>
      {shuffledDeck.map((suggestion, index) => (
        <Card
          key={index}
          suggestion={suggestion}
          onFlip={() => handleFlip(index)}
          isFlipped={flippedCards.includes(index)}
        />
      ))}
      {match && (
        <div>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleDeny}>Deny</button>
        </div>
      )}
      {gameOver && <div>Game Over. Enjoy your date!</div>}
    </div>
  );
};

export default GameBoard;

