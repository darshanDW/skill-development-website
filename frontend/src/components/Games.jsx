import React, { useState } from 'react';
import GameModal from './GameModal';
import game1 from "../assets/game1.png";
import game2 from "../assets/game2.png";
import game3 from "../assets/game3.png";
import game4 from "../assets/game4.png";
import game5 from "../assets/game5.png";
import game6 from "../assets/game6.png";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
function Games() {
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        console.log('Token expired');
        navigate('/login');
      }
    } else {
      console.log('No token found');
      navigate('/login');
    }
  }, [navigate]);







  const games = [
    { name: 'Game 1', type: "iframe", description: 'Exciting puzzle game', image: game1, url: 'https://cdn.htmlgames.com/BalloonMaze/' },
    { name: 'Game 2', type: "iframe", description: 'Fun adventure game', image: game2, url: 'https://cdn.htmlgames.com/WaterSort/' }, // Add actual game URLs
    { name: 'Game 3', type: "iframe", description: 'Educational quiz game', image: game3, url: 'https://cdn.htmlgames.com/CubeBlock/' },
    { name: 'Game 4', type: "component", description: 'Sudoku', image: game4, component: 'Sudoku' },
    { name: 'Game 5', type: "component", description: 'Sliding Tile Game', image: game5, component: "SlidingTileGame" },
    { name: 'Game 6', type: "component", description: 'Tic Tac Toe', image: game6, component: "TicTacToe" }
  ];

  const closeModal = () => setSelectedGame(null);

  return (
    <div className="min-h-screen w-[95%] m-auto rounded-[20px] bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Explore Our Games</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 p-4"
          >
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{game.name}</h2>
              <p className="text-gray-600 mb-4">{game.description}</p>
              <button
                onClick={() => setSelectedGame(game)}
                className="mt-4 bg-lime-500 text-black font-bold px-6 py-2 rounded-lg shadow hover:bg-lime-600 transition"
              >
                Play Now
              </button>
            </div>
          </div>
        ))}

      </div>

      {selectedGame && (
        <GameModal selectedGame={selectedGame} closeModal={closeModal} />
      )}
    </div>
  );
}

export default Games;
