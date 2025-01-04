import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface UploadPostForm2Props {
  images: string[]; // Define the type of images as an array of strings
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void; // Define the type for the handleImageUpload function
  onNext: (croppedImages: string[]) => void; // Function to handle the next button click and pass cropped images
}

const UploadPostForm2: React.FC<{
  images: string[];
  handleBack: () => void;
  onNext: (croppedImages: string[]) => void; // Pass onNext prop from parent
}> = ({ images, handleBack, onNext }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageRatio, setImageRatio] = useState("4:5");

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      Math.min(prevIndex + 1, images.length - 1)
    );
  };

  const handleRatioChange = (ratio: string) => {
    setImageRatio(ratio);
  };

  const handleNext = () => {
    // Capture cropped images (for example, you might crop the images on the front-end or keep the original ones for now)
    const croppedImages = images; // Here, assuming the images are already cropped or selected
    onNext(croppedImages); // Send the cropped images to the next step
  };


  return (
    <div className="px-8 pb-8 pt-6 bg-customBg border border-gray-800 rounded-md shadow-md min-w-[900px] max-w-3xl">
      <div className="flex items-center justify-end mb-10">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          className="text-sm text-gray-500"
        >
          Back
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          type="button"
          className="text-sm text-blue-500 ml-3"
        >
          Next
        </button>

        
      </div>

      <div className="flex justify-center">
        {/* Left Section: Image Preview with Sliding Animation */}
        <div className="relative flex-1 h-full overflow-hidden">
          {/* Image Counter */}
          <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-60 font-extralight text-gray-100 text-xxs px-2 py-1 rounded-full">
            {currentImageIndex + 1}/{images.length}
          </div>

          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentImageIndex * 100}%)`, // Move the images based on the index
            }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className={`w-full h-full object-cover ${
                  imageRatio === "4:5"
                    ? "aspect-[4/5]"
                    : imageRatio === "1:1"
                    ? "aspect-square"
                    : "aspect-[16/9]"
                }`}
              />
            ))}
          </div>

          {/* Left Arrow Button */}
          {currentImageIndex > 0 && (
            <button
              onClick={handlePrevImage}
              className="absolute text-xs left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}

          {/* Right Arrow Button */}
          {currentImageIndex < images.length - 1 && (
            <button
              onClick={handleNextImage}
              className="absolute text-xs right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>

        {/* Right Section: Ratio Buttons */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4">
          <p className="text-gray-400 text-sm mb-4">Select Image Ratio</p>
          {["4:5", "1:1", "16:9"].map((ratio) => (
            <button
              key={ratio}
              onClick={() => handleRatioChange(ratio)}
              className={`px-4 py-2 rounded-md ${
                imageRatio === ratio
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition-colors duration-200`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadPostForm2;
