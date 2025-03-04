import React, { useState } from "react";
import Button from "../ui/Button";


interface UploadPostForm1Props {
  images: File[];
  onImageUpload: (files: File[]) => void;
  onImageRemove: (index: number) => void;
}

const UploadPostForm1: React.FC<UploadPostForm1Props> = ({ 
  images, 
  onImageUpload, 
  onImageRemove 
}) => {
  const MAX_IMAGES = 3;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const remainingSlots = MAX_IMAGES - images.length;
      
      if (remainingSlots <= 0) {
        alert(`Maximum ${MAX_IMAGES} images allowed`);
        return;
      }

      const newFiles = files.slice(0, remainingSlots);
      onImageUpload(newFiles);

      if (files.length > remainingSlots) {
        alert(`Only ${remainingSlots} more images can be added`);
      }
    }
  };


  return (
    <div className="px-8 pb-8 pt-6">
      <div className="mb-8">
        <label className="block text-gray-400 mb-4 text-center text-lg">
          Upload Your Photos
        </label>
        <div className="relative text-center">
          <label
            htmlFor="fileInput"
            className="cursor-pointer inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Select from Computer
          </label>
          <input
            id="fileInput"
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>
      <div className="text-gray-400 text-sm text-center mb-4">
        {images.length}/{MAX_IMAGES} images uploaded
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square group">
            <img
              src={URL.createObjectURL(image)}
              alt="Upload preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={() => onImageRemove(index)}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>

  );
};

export default UploadPostForm1;
