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
    className={`card ${isFlipped ? 'flipped' : ''} ${isMatch ? 'match' : ''}`}
      onClick={onFlip}
      style={cardStyle}
      role="button"
      tabIndex={0}
      onKeyPress={event => { if (event.key === 'Enter') onFlip(); }}
    >
      {isFlipped ? suggestion : 'Click to flip'}
    </div>
  );
};

export default Card;
