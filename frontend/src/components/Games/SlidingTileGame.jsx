import React, { useState, useEffect } from 'react';

const Tile = ({ value, onClick, isEmpty }) => {
  return (
    <div
      className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center 
        ${isEmpty ? 'bg-transparent border-2 border-dashed border-gray-400 cursor-default' : 
        'bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-700'} 
        text-lg sm:text-xl lg:text-2xl rounded-md transition duration-300 ease-in-out`}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

const SlidingTileGame = () => {
  const [tiles, setTiles] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(8); // Last tile is empty at the start
  const [level, setLevel] = useState(1);

  const levels = {
    1: { type: 'letters', elements: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''] },
    2: { type: 'numbers', elements: ['1', '2', '3', '4', '5', '6', '7', '8', ''] },
    3: { type: 'letters', elements: ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', ''] },
    4: { type: 'numbers', elements: ['9', '10', '11', '12', '13', '14', '15', '16', ''] }
  };

  useEffect(() => {
    setupLevel(level);
  }, [level]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const setupLevel = (lvl) => {
    const levelData = levels[lvl];
    const shuffledTiles = shuffleArray([...levelData.elements]);
    const emptyIdx = shuffledTiles.indexOf('');
    setTiles(shuffledTiles);
    setEmptyIndex(emptyIdx);
  };

  const canMove = (tileIndex) => {
    const adjacentIndices = [
      emptyIndex - 1, // left
      emptyIndex + 1, // right
      emptyIndex - 3, // above
      emptyIndex + 3 // below
    ];
    return adjacentIndices.includes(tileIndex);
  };

  const handleTileClick = (index) => {
    if (canMove(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      setEmptyIndex(index);
      checkWin(newTiles);
    }
  };

  const checkWin = (currentTiles) => {
    const correctTiles = levels[level].elements;
    if (JSON.stringify(currentTiles) === JSON.stringify(correctTiles)) {
      setTimeout(() => {
        alert('Puzzle solved! Moving to the next level.');
        if (level < 4) setLevel(level + 1);
        else alert('You have completed all levels!');
      }, 300);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-5">Sliding Tile Puzzle</h1>
      <div className="grid grid-cols-3 grid-rows-3 gap-2 lg:gap-3">
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            value={tile}
            onClick={() => handleTileClick(index)}
            isEmpty={tile === ''}
          />
        ))}
      </div>
    </div>
  );
};

export default SlidingTileGame;