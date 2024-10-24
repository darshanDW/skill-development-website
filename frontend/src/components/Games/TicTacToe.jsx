import React, { useState } from 'react';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [currentValue, setCurrentValue] = useState('X');
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState('Game is ON');

    const writeValue = (index) => {
        if (board[index] !== '' || gameOver) {
            alert('Don\'t Click on Clicked Block...');
            return;
        }

        const newBoard = [...board];
        newBoard[index] = currentValue;
        setBoard(newBoard);

        if (checkWinner(newBoard, currentValue)) {
            setMessage(`Winner is: ${currentValue}`);
            setGameOver(true);
            setTimeout(resetGame, 3000);
        } else if (newBoard.every(block => block !== '')) {
            setMessage('Match Draw...');
            setGameOver(true);
            setTimeout(resetGame, 3000);
        } else {
            setCurrentValue(currentValue === 'X' ? '0' : 'X');
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(''));
        setCurrentValue('X');
        setGameOver(false);
        setMessage('Game is ON');
    };

    const checkWinner = (newBoard, curVal) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winPatterns.some(pattern => 
            pattern.every(index => newBoard[index] === curVal)
        );
    };

    return (
        <div className="flex rounded-lg flex-col items-center w-full p-6 bg-white border-2 border-red-500 rounded-lg shadow-lg mx-auto mt-6">
            <div className="bg-indigo-100 border-2 border-indigo-500 rounded-lg text-lg font-bold text-indigo-900 p-3 mb-4">
                {message}
            </div>
            <button 
                onClick={resetGame} 
                className="mb-4 h-12 w-full bg-indigo-500 border-2 border-indigo-700 text-white rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-indigo-600"
            >
                Reset
            </button>
            <div className="grid grid-cols-3 gap-12">
                {board.map((blockValue, index) => (
                    <div
                        key={index}
                        onClick={() => writeValue(index)}
                        className="flex items-center gap-8 justify-center h-24 w-24 border-2 border-indigo-700 text-4xl font-bold text-indigo-900 bg-indigo-50 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-indigo-200"
                    >
                        {blockValue}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicTacToe;
