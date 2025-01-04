import React, { useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";

interface UploadPostForm3Props {
  images: string[];
  handleBack: () => void;
  // Receive images as a prop
}

const UploadPostForm3: React.FC<UploadPostForm3Props> = ({
  images,
  handleBack,
}) => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [duplicateTagError, setDuplicateTagError] = useState(false);
  const [hideLikes, setHideLikes] = useState(false);
  const [pinPost, setPinPost] = useState(false);

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedTag = tagInput.trim().replace(/,$/, "");

      if (trimmedTag) {
        if (tags.includes(trimmedTag)) {
          setDuplicateTagError(true);
        } else {
          setTags([...tags, trimmedTag]);
          setDuplicateTagError(false);
        }
        setTagInput("");
      }
    }
  };

  const handleTagRemove = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    setDuplicateTagError(false);
  };

  const handleFormSubmit = () => {
    console.log({
      category,
      description,
      tags,
      images,
      hideLikes,
      pinPost,
    });
  };

  return (
    <div className="px-8 pb-8 pt-6 bg-customBg border border-gray-800 rounded-md shadow-md min-w-[600px] max-w-3xl">
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
        {/* <button
          onClick={()=>{}}
          type="button"
          className="text-sm text-blue-500 ml-3"
        >
          Next
        </button> */}
      </div>

      {/* Display the images */}
      <div className="mb-10">
        <label className="block text-gray-400 mb-2">Selected Images</label>
        <div className="flex gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Cropped Image ${index + 1}`}
              className="w-32 h-32 object-cover"
            />
          ))}
        </div>
      </div>

      {/* Category Dropdown */}
      <InputField
        type="select"
        label="Category"
        placeholder="Select Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={["Select Category", "Technology", "Lifestyle", "Hobbies"]}
        className="mb-4"
      />

      {/* Description Field */}
      <InputField
        type="text"
        label="Description"
        placeholder="Enter the description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4"
        subtext="Make sure that the description does not exceed 200 characters"
      />

      {/* Multiple Image Upload */}

      {/* Tags Input */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Tags</label>
        <div className="flex items-center flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-800 text-gray-400 rounded-full px-3 py-1 text-sm"
            >
              {tag}
              <button
                onClick={() => handleTagRemove(tag)}
                className="ml-2 text-gray-500 hover:text-gray-300"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={tagInput}
          placeholder="Type and press Enter or Comma to add tags"
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInputKeyPress}
          className="w-full px-3 py-2 bg-transparent border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
        {duplicateTagError && (
          <p className="mt-1 text-sm text-customRed">
            Duplicate tags are not allowed. Please try another tag.
          </p>
        )}
      </div>

      {/* Toggle Options */}
      <div className="flex items-center justify-between mb-4">
        {/* Hide Likes Toggle */}
        <div>
          <label className="flex items-center text-gray-400">
            <div className="relative inline-block w-10 h-6">
              <input
                type="checkbox"
                checked={hideLikes}
                onChange={(e) => setHideLikes(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-gray-700 rounded-full peer-checked:bg-customPrimary transition-colors duration-200"></div>
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-4 transform transition-transform duration-200"></div>
            </div>
            <span className="ml-3">Hide Likes Count</span>
          </label>
        </div>

        {/* Pin Post Toggle */}
        <div>
          <label className="flex items-center text-gray-400">
            <div className="relative inline-block w-10 h-6">
              <input
                type="checkbox"
                checked={pinPost}
                onChange={(e) => setPinPost(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-gray-700 rounded-full peer-checked:bg-customPrimary transition-colors duration-200"></div>
              <div className="absolute top-0.5 left-0.5 w-5 h-5  bg-white rounded-full shadow-md peer-checked:translate-x-4 transform transition-transform duration-200"></div>
            </div>
            <span className="ml-3">Pin Post</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        label="Publish"
        onClick={handleFormSubmit}
        type="button"
        variant="primary"
        className="w-full"
      />
    </div>
  );
};

export default UploadPostForm3;
