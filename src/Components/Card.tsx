import React from 'react';

interface CardProps {
  suggestion: string;
  onFlip: () => void;
  isFlipped: boolean;
  isMatch: boolean;
}

const Card: React.FC<CardProps> = ({ suggestion, onFlip, isFlipped, isMatch }) => {
  const cardStyle: React.CSSProperties = {
    cursor: 'pointer',
    border: '1px solid black',
    padding: '20px',
    margin: '10px',
    textAlign: 'center',
    height: '100px',
    width: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div
    //if isMatch is true, add the class 'match' to the card. This turns the card yellow.
    className={`card ${isMatch ? 'match' : ''}`}
    //when the card is clicked, call the onFlip function
      onClick={onFlip}
      style={cardStyle}
      role="button"
    >
      {/* if the card is flipped, display the suggestion. If not, display 'Click to flip' */}
      {isFlipped ? suggestion : 'Click to flip'}
    </div>
  );
};

export default Card;
