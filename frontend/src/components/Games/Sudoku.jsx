import React, { useState, useEffect } from 'react';

const initialBoard = [
  [5, 3, '', '', 7, '', '', '', ''],
  [6, '', '', 1, 9, 5, '', '', ''],
  ['', 9, 8, '', '', '', '', 6, ''],
  [8, '', '', '', 6, '', '', '', 3],
  [4, '', '', 8, '', 3, '', '', 1],
  [7, '', '', '', 2, '', '', '', 6],
  ['', 6, '', '', '', '', 2, 8, ''],
  ['', '', '', 4, 1, 9, '', '', 5],
  ['', '', '', '', 8, '', '', 7, 9],
];

const Sudoku = () => {
  const [board, setBoard] = useState(JSON.parse(JSON.stringify(initialBoard)));

  const generateGrid = () => {
    return board.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <input
          key={`${rowIndex}-${colIndex}`}
          type="text"
          maxLength="1"
          className={`w-10 h-10 text-center text-lg p-2 rounded-md ${
            initialBoard[rowIndex][colIndex] !== ''
              ? 'bg-gray-200 font-bold'
              : 'bg-white border border-gray-400'
          } focus:outline-none focus:border-blue-500`}
          value={cell}
          onChange={(e) => updateBoard(e, rowIndex, colIndex)}
          disabled={initialBoard[rowIndex][colIndex] !== ''}
        />
      ))
    );
  };

  const updateBoard = (e, row, col) => {
    const value = e.target.value;
    const newBoard = [...board];
    if (isValidInput(value)) {
      newBoard[row][col] = value ? parseInt(value) : '';
    } else {
      e.target.value = ''; // Clear invalid input
    }
    setBoard(newBoard);
  };

  const isValidInput = (value) => /^[1-9]$/.test(value);

  const checkSolution = () => {
    if (isValidSudoku(board)) {
      alert('Congratulations! The solution is correct.');
    } else {
      alert('The solution is incorrect. Please try again.');
    }
  };

  const isValidSudoku = (board) => {
    return checkRows(board) && checkCols(board) && checkBoxes(board);
  };

  const checkRows = (board) => {
    return board.every((row) => checkUnique(row));
  };

  const checkCols = (board) => {
    for (let col = 0; col < 9; col++) {
      const column = board.map((row) => row[col]);
      if (!checkUnique(column)) return false;
    }
    return true;
  };

  const checkBoxes = (board) => {
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        const box = [];
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            box.push(board[i + row][j + col]);
          }
        }
        if (!checkUnique(box)) return false;
      }
    }
    return true;
  };

  const checkUnique = (array) => {
    const filtered = array.filter((num) => num !== '');
    return new Set(filtered).size === filtered.length;
  };

  const resetGame = () => {
    setBoard(JSON.parse(JSON.stringify(initialBoard)));
  };

  return (
    <div className="max-w-lg p-6 bg-white shadow-lg rounded-lg mx-auto">
      <h1 className="text-center text-3xl font-bold mb-4">Sudoku Game</h1>
      <div className="grid grid-cols-9 gap-1 mb-6">{generateGrid()}</div>
      <div className="text-center mt-4">
        <button
          onClick={checkSolution}
          className="px-4 py-2 text-lg rounded-md text-white bg-green-500 hover:bg-green-600 mr-4"
        >
          Check Solution
        </button>
        <button
          onClick={resetGame}
          className="px-4 py-2 text-lg rounded-md text-white bg-blue-500 hover:bg-blue-600"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Sudoku;