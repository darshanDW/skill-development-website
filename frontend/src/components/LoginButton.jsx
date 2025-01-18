import React, { useEffect, useState, useContext } from 'react';
import LoginPage from './LoginPage'; // Import LoginPage
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '../App';

const LoginButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  console.log(isLoggedIn)
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        console.log('Token expired');
        setIsLoggedIn(false); // Token expired, show login button
      } else {
        setIsLoggedIn(true); // Valid token, hide login button
      }

    }
    else {
      setIsLoggedIn(false)
    }
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {/* Conditionally render the Login button based on isLoggedIn */}
      {!isLoggedIn && (
        <button
          onClick={toggleModal}
          className="p-2 px-4 border border-red-500 text-pink-500 rounded-full"
        >
          Login
        </button>
      )}
      {isLoggedIn && (
        <button
          className="p-2 px-4 border border-red-500 text-pink-500 rounded-full"
          onClick={() => {
            localStorage.removeItem('token');
            setIsLoggedIn(false) // Remove the token from localStorage
            window.location.reload(); // Reload the page to update the logged-in state
          }}
        >
          Logout
        </button>
      )}



      {/* Display the modal when login button is clicked */}
      {
        isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              {/* Render the LoginPage and pass closeModal prop */}
              <LoginPage closeModal={toggleModal} />
            </div>
          </div>
        )
      }
    </div >
  );
};

export default LoginButton;
