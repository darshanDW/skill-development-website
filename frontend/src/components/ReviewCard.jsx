import React,{useEffect, useState} from 'react';

const ReviewCard = ({ header, description, color, image, isImageOnLeft }) => {

  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 480);
  };

  useEffect(() => {
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile); // Event listener for resizing

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className={`mx-auto lg:w-[95%] md:w-[90%] mt-10 p-6 sm:m-4 sm:p-4 lg:p-16 w-[90%]
      rounded-lg flex flex-col lg:flex-row justify-between items-center ${color || 'bg-yellow-100'}`}>
      {/* Image Section */}
      <div className={`w-full lg:w-[45%] mb-6 lg:mb-0 ${isMobile || isImageOnLeft ? 'order-1' : 'order-2'}`}>
        <img className="w-full rounded-lg" src={image} alt="Review example" />
      </div>

      {/* Text Section */}
      <div className={`text-left w-full lg:w-[50%] pl-0 lg:pl-4 ${isImageOnLeft ? 'order-2' : 'order-1'}`}>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">{header}</h2>
        <p className="text-md sm:text-lg mb-6">{description}</p>
        <div className="font-bold space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
          <button className="bg-black text-white py-2 px-4 rounded-full">
            Build a review
          </button>
          <button className="underline">
            View sample review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
