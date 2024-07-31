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
// eslint-disable-next-line react-hooks/exhaustive-deps
const GameBoard: React.FC = () => {
  const [shuffledDeck, setShuffledDeck] = useState<string[]>([]);
  const { flippedCards, flipCard, match, unflipCards } = useCardFlip(shuffledDeck);
  const [gameOver, setGameOver] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [currentPlayer, setCurrentPlayer] = useState<'Player 1' | 'Player 2'>('Player 1');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [turns, setTurns] = useState<number>(0);
 const [isAccepted, setIsAccepted] = useState(false);

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
    setIsAccepted(true);
  };

  const handleDeny = () => {
    if (match) {
      unflipCards();
      alert('Continue finding matches');
    }
  };



  return (
    <div className="game-board">
      <h2 className="current-player">Current Player: {currentPlayer}</h2>
      {shuffledDeck.map((suggestion, index) => (
        <Card
          key={index}
          suggestion={suggestion}
          onFlip={() => handleFlip(index)}
          isFlipped={flippedCards.includes(index)}
          isMatch={match && flippedCards.includes(index)} 
        />
      ))}
      {match && (
        <div className="match-buttons">
          <button className="accept-button"  onClick={handleAccept}>Accept</button>
          <button 
          className="deny-button" 
           onClick={handleDeny}
           disabled={isAccepted}
           >
            Deny
            </button>
        </div>
      )}
      {gameOver && <div className="game-over">Game Over. Enjoy your date!</div>}
    </div>
  );
};

export default GameBoard;

