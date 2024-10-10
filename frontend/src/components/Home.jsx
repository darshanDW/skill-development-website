import React from 'react';
import AssignmentBuilder from '../components/AssignmentBuilder';
import ReviewCard from './ReviewCard';
import Snippit from '../components/Snippit';
import sampleImage from '../assets/sampleImage.png';
import Slideshow from './Slideshow';

function Home() {

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
    <div className="px-4 sm:px-2  lg:px-24 mx-auto">
      {/* Assignment Builder Section */}
      <AssignmentBuilder />

      {/* Slideshow Section */}
      <Slideshow />

      {/* Snippet Section */}
      <Snippit />

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
