import React from 'react';
import home from '../assets/home.png';

const AssignmentBuilder = () => {
  return (
    <div className="flex bg-[#FFFBF0] rounded-lg flex-col md:flex-row mt-16 justify-between items-center p-4 sm:p-6 md:p-12">
      {/* Text Section */}
      <div className="w-full md:w-1/2 space-y-4 text-left px-4 md:px-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
          Build Better with BIGBUDDIES.
        </h1>
        <p className="text-md sm:text-lg text-gray-600">
          Implementing best pedagogical practices can be nearly impossible. We make it easy.
        </p>
        <button className="bg-pink-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-md sm:text-lg hover:bg-pink-600 transition">
          Getting Started
        </button>
      </div>

      {/* Image and Icons Section */}
      <div className="bg-yellow-200 rounded-full relative mt-8 md:mt-0 w-full md:w-1/2 flex justify-center">
        <img src={home} alt="Girl writing" className="w-[80%] sm:w-[70%] max-w-xs md:max-w-sm" />

        {/* Icons positioned around the image */}
        <div className="absolute -top-4 left-10 sm:left-20 bg-blue-200 p-2 sm:p-3 rounded-full">
          <span className="text-xl sm:text-2xl">✏️</span>
        </div>
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 bg-purple-200 p-1.5 sm:p-2 rounded-full">
          <span className="text-xl sm:text-2xl">📄</span>
        </div>
        <div className="absolute top-12 sm:top-16 right-4 bg-pink-200 p-1.5 sm:p-2 rounded-full">
          <span className="text-xl sm:text-2xl">📖</span>
        </div>
      </div>
    </div>
  );
};

export default AssignmentBuilder;
