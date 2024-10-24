import React, { useState, useEffect } from 'react';
import img from "../assets/sampleImage.png"
const images = [
  {
    src: img,
    alt: 'Slide 1',
  },
  {
    src: img,
    alt: 'Slide 2',
  },
  {
    src: img,
    alt: 'Slide 3',
  },
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 seconds for each slide

    return () => clearInterval(timer); // Clear timer on component unmount
  }, []);

  return (
    <div className="relative w-full max-w-6xl mt-10 mx-auto overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-[400px] my-auto object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? images.length - 1 : prevIndex - 1
            )
          }
          className="bg-white bg-opacity-70 text-black p-2 rounded-full hover:bg-opacity-100"
        >
          ◀
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === images.length - 1 ? 0 : prevIndex + 1
            )
          }
          className="bg-white bg-opacity-70 text-black p-2 rounded-full hover:bg-opacity-100"
        >
          ▶
        </button>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`block w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
