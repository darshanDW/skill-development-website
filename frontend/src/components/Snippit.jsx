import React from 'react';
import snippit from '../assets/snippit.png'
const Snippit = () => {
  return (
    <div className="flex flex-col m-auto md:flex-row items-center justify-between bg-white p-6 md:p-12">
      {/* Text Section */}
      <div className="md:w-1/2 space-y-4 text-left pl-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          What's wrong with punitive worksheet?
        </h1>
        <p className="text-lg text-gray-600">
          Punitive worksheets disincentivize learning, lack immediate feedback, and promote massed practice. They're also time-consuming to grade and stressful to maintain. There has to be a better way to reinforce learning. Solving this problem became our obsession.
        </p>
      </div>

      {/* Video/Image Section */}
      <div className="relative mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <img src={snippit} alt="Video preview" className="rounded-md h-64 w-96 outline outline-gray-100 object-crop " />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-white rounded-full p-4 shadow-lg">
            <svg
              className="w-10 h-10 text-gray-800"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.75 5.75l10.5 6-10.5 6v-12z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Snippit;
