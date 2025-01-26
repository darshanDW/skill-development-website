import React, { useState } from 'react';
import AssignmentBuilder from '../components/AssignmentBuilder';
import ReviewCard from './ReviewCard';
import Snippit from '../components/Snippit';
import sampleImage from '../assets/sampleImage.png';
import Slideshow from './Slideshow';
import Bot from './chat_bot/Bot';

function Home() {
  const [isBotOpen, setIsBotOpen] = useState(false);

  const toggleBot = () => {
    setIsBotOpen(!isBotOpen);
  };

  const reviews = [
    {
      header: "Mastery-based reviews to guide student study sessions",
      description: "Our review walks students through your material in a manner proven to optimize knowledge retention, and identify & bridge gaps to personalize their learning experience.",
      color: "bg-yellow-100",
      image: sampleImage,
      isImageOnLeft: false,
    },
    {
      header: "Mastery-based reviews to guide student study sessions",
      description: "Our review walks students through your material in a manner proven to optimize knowledge retention, and identify & bridge gaps to personalize their learning experience.",
      color: "bg-pink-100",
      image: sampleImage,
      isImageOnLeft: true,
    },
    {
      header: "Mastery-based reviews to guide student study sessions",
      description: "Our review walks students through your material in a manner proven to optimize knowledge retention, and identify & bridge gaps to personalize their learning experience.",
      color: "bg-purple-100",
      image: sampleImage,
      isImageOnLeft: false,
    },
    {
      header: "Mastery-based reviews to guide student study sessions",
      description: "Our review walks students through your material in a manner proven to optimize knowledge retention, and identify & bridge gaps to personalize their learning experience.",
      color: "bg-red-100",
      image: sampleImage,
      isImageOnLeft: true,
    },
  ];

  return (
    <div className="relative overflow-hidden px-4 sm:px-2 lg:px-24 mx-auto animate-zoomIn">
       {/* {bot functionality} */}
      <div className={`fixed top-6 right-4 z-50 ${isBotOpen ? 'w-80 h-80' : 'w-20 h-12'} bg-transparent rounded-md shadow-lg flex-col items-center justify-center transition-all duration-300`}>

        <button onClick={toggleBot} className="w-full h-12 flex items-center justify-center bg-blue-500 text-white rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 16.5a2.5 2.5 0 01-2.5 2.5H6l-4 4V5.5A2.5 2.5 0 014.5 3h15A2.5 2.5 0 0122 5.5v11z" />
        </svg>
        <p>chat{` <`} </p>
        </button>
        {isBotOpen && (
            <Bot />
        )}
      </div>


      {/* Background Stars or Flowers */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-0 w-16 h-16 bg-pink-400 rounded-full animate-spiral"></div>
        <div className="absolute top-20 left-20 w-10 h-10 bg-yellow-300 rounded-full animate-spiral"></div>
        <div className="absolute top-40 right-40 w-12 h-12 bg-blue-300 rounded-full animate-spiral"></div>
        <div className="absolute top-10 right-10 w-14 h-14 bg-purple-400 rounded-full animate-spiral"></div>
      </div>

      {/* Assignment Builder Section */}
      <AssignmentBuilder />

      {/* Slideshow Section */}
      <Slideshow />


      {/* Heading for Review Section */}
      <div className="text-3xl md:text-4xl font-bold text-center w-full md:w-[60%] mx-auto mt-8 md:mt-12 mb-12 leading-tight">
        Our Assignments are Designed Specifically to Optimize Learning...
      </div>

      {/* Review Cards Section */}
      <div className="flex flex-col w-full md:m-2">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            header={review.header}
            description={review.description}
            color={review.color}
            image={review.image}
            isImageOnLeft={review.isImageOnLeft}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
