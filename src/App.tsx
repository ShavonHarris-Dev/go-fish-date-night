import React from 'react';
import Card from './Components/Card';
import GameBoard from './Components/GameBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card  suggestion="Ceramics Class" onFlip={() => {}} isFlipped={true} />  
        <GameBoard />
      </header>
    </div>
  );
}

export default App;
