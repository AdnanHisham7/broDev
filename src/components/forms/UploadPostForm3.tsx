import React, { useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";

interface UploadPostForm3Props {
  category: string;
  description: string;
  tags: string[];
  hideLikes: boolean;
  pinPost: boolean;
  ratio: string;
  croppedImages: string[];
  onCategoryChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
  onTagsChange: (val: string[]) => void;
  onHideLikesChange: (val: boolean) => void;
  onPinPostChange: (val: boolean) => void;
}

const UploadPostForm3: React.FC<UploadPostForm3Props> = ({
  category,
  description,
  tags,
  hideLikes,
  pinPost,
  ratio,
  croppedImages,
  onCategoryChange,
  onDescriptionChange,
  onTagsChange,
  onHideLikesChange,
  onPinPostChange,
}) => {
  const [tagInput, setTagInput] = useState("");
  const [duplicateTagError, setDuplicateTagError] = useState(false);

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedTag = tagInput.trim().replace(/,$/, "");

      if (trimmedTag) {
        if (tags.includes(trimmedTag)) {
          setDuplicateTagError(true);
        } else {
          onTagsChange([...tags, trimmedTag]); // Update parent state with new tag
          setDuplicateTagError(false);
        }
        setTagInput("");
      }
    }
  };

  const handleTagRemove = (tag: string) => {
    onTagsChange(tags.filter((t) => t !== tag)); // Update parent state after removal
    setDuplicateTagError(false);
  };

  const handleFormSubmit = () => {
    console.log({
      category,
      description,
      tags,
      hideLikes,
      pinPost,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {croppedImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Preview ${idx + 1}`}
            className="w-full object-cover rounded-lg"
            style={{
              aspectRatio: ratio.replace(":", " / "),
            }}
          />
        ))}
      </div>

      <div className="space-y-4">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-3 bg-transparent border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option className="bg-lightGray" disabled value="">
            Select Category
          </option>
          <option className="bg-lightGray" value="Technology">
            Technology
          </option>
          <option className="bg-lightGray" value="Lifestyle">
            Lifestyle
          </option>
          <option className="bg-lightGray" value="Hobbies">
            Hobbies
          </option>
        </select>

        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Write a description..."
          className="w-full px-3 py-3 bg-transparent border border-gray-800 rounded-md text-white placeholder:text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 h-28"
          maxLength={200}
        />

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
            className="w-full px-3 py-2 bg-transparent border border-gray-800 rounded-md text-white placeholder:text-sm placeholder-gray-500 focus:outline-none  focus:ring-1 focus:ring-gray-500"
          />
          {duplicateTagError && (
            <p className="mt-1 text-sm text-customRed">
              Duplicate tags are not allowed. Please try another tag.
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={hideLikes}
              onChange={(e) => onHideLikesChange(e.target.checked)}
              className="w-5 h-5 text-blue-600"
            />
            <span className="text-gray-300">Hide Likes</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={pinPost}
              onChange={(e) => onPinPostChange(e.target.checked)}
              className="w-5 h-5 text-blue-600"
            />
            <span className="text-gray-300">Pin Post</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UploadPostForm3;
