import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Demo with integrated form to show the complete solution
export default function EditPostModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  
  // Sample data for demonstration
  const sampleData = {
    category: "Technology",
    description: "This is a sample post about technology.",
    tags: ["tech", "coding", "react"],
    hideLikes: true,
    pinPost: false,
  };
  
  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
      >
        Open Edit Modal
      </button>
      
      {isModalOpen && (
        <EditPostModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(data) => {
            console.log("Saved data:", data);
            setIsModalOpen(false);
          }}
          initialData={sampleData}
        />
      )}
    </div>
  );
}

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: {
    category: string;
    description: string;
    tags: string[];
    hideLikes: boolean;
    pinPost: boolean;
  };
}

export const EditPostModal: React.FC<EditPostModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData = {
    category: "",
    description: "",
    tags: [],
    hideLikes: false,
    pinPost: false,
  }
}) => {
  const [formData, setFormData] = useState({
    category: initialData.category,
    description: initialData.description,
    tags: initialData.tags,
    hideLikes: initialData.hideLikes,
    pinPost: initialData.pinPost
  });
  
  const [tagInput, setTagInput] = useState("");
  const [duplicateTagError, setDuplicateTagError] = useState(false);

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedTag = tagInput.trim().replace(/,$/, "");

      if (trimmedTag) {
        if (formData.tags.includes(trimmedTag)) {
          setDuplicateTagError(true);
        } else {
          setFormData({
            ...formData,
            tags: [...formData.tags, trimmedTag]
          });
          setDuplicateTagError(false);
        }
        setTagInput("");
      }
    }
  };

  const handleTagRemove = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag)
    });
    setDuplicateTagError(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-customGray text-white w-full max-w-lg p-6 rounded-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold">Edit Post</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-3 bg-transparent border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            >
              <option className="bg-gray-800" disabled value="">
                Select Category
              </option>
              <option className="bg-gray-800" value="Technology">
                Technology
              </option>
              <option className="bg-gray-800" value="Lifestyle">
                Lifestyle
              </option>
              <option className="bg-gray-800" value="Hobbies">
                Hobbies
              </option>
            </select>

            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Write a description..."
              className="w-full px-3 py-3 bg-transparent border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 h-28"
              maxLength={200}
            />

            {/* Tags Input */}
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Tags</label>
              <div className="flex items-center flex-wrap gap-2 mb-2">
                {formData.tags?.map((tag, index) => (
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
                <p className="mt-1 text-sm text-red-500">
                  Duplicate tags are not allowed. Please try another tag.
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.hideLikes}
                  onChange={(e) => setFormData({ ...formData, hideLikes: e.target.checked })}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-gray-300">Hide Likes</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.pinPost}
                  onChange={(e) => setFormData({ ...formData, pinPost: e.target.checked })}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-gray-300">Pin Post</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
