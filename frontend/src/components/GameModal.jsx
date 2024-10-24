import React from 'react';
import Sudoku from "../components/Games/Sudoku";
import SlidingTileGame from "../components/Games/SlidingTileGame";
import TicTacToe from "../components/Games/TicTacToe";
function GameModal({ selectedGame, closeModal }) {
  if (!selectedGame) return null;
  console.log(selectedGame);
  
  const renderGame = () => {
    console.log(selectedGame.type)
    if (selectedGame.type === 'iframe') {
      return (
        <iframe
          src={selectedGame.url}
          width="100%"
          height="500px"  // Ensure height is sufficient
          className="rounded border border-gray-300"
          title={selectedGame.name}
          style={{ minHeight: '400px' }}  // Optional, to ensure it always shows
          allowFullScreen
        ></iframe>
      );
    } else if (selectedGame.type === 'component') {
      switch (selectedGame.component) {
        case 'Sudoku':
          return <Sudoku />;
        case 'SlidingTileGame':
          return <SlidingTileGame />;
        case 'TicTacToe':
          return <TicTacToe />;
        default:
          return null;
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{selectedGame.name}</h2>
          <button onClick={closeModal} className="text-red-500 text-xl">&times;</button>
        </div>
        <p className="mb-4">{selectedGame.description}</p>
        <div className="game-content">
          {renderGame()}
        </div>
      </div>
    </div>
  );
}

export default GameModal;
