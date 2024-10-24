import React, { useState } from 'react';
import LoginPage from './LoginPage'; // Import LoginPage

const LoginButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="p-2 px-4 border border-red-500 text-pink-500 rounded-full"
      >
        Login
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            {/* Render the LoginPage and pass closeModal prop */}
            <LoginPage closeModal={toggleModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
