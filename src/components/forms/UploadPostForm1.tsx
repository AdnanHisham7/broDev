import React, { useState } from "react";
import Button from "../ui/Button";

const UploadPostForm1: React.FC<{
  images: File[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageRemove: (index: number) => void;
  onNext: () => void;
}> = ({ images, handleImageUpload, handleImageRemove, onNext }) => {

  return (
    <div className="px-8 pb-8 pt-6 bg-customBg border border-gray-800 rounded-md shadow-md min-w-[600px] max-w-3xl h-96">
      <div className="flex items-center justify-end mb-10">
        

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          className="text-sm text-blue-500"
        >
          Next
        </button>
      </div>

      {/* Multiple Image Upload */}
      <div className="mb-1">
        {/* <label className="block text-gray-400 mb-2">Upload Images</label> */}
        <div className="relative text-center">
          <label
            htmlFor="fileInput"
            className="cursor-pointer inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Choose Files to Upload
          </label>
          <input
            id="fileInput"
            type="file"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          {images.map((image, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-md"
              />
              <button
                onClick={() => handleImageRemove(index)}
                className="absolute top-1 right-1 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadPostForm1;
