import React, { useState, useRef, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faChevronLeft,
  faHeart,
  faComment,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface PostProps {
  images: string[];
  likes: number;
  comments: number;
  description: string;
}

const OwnPost: React.FC<PostProps> = ({
  images,
  likes,
  comments,
  description,
}) => {
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const truncatedDescription =
    description.length > 150 ? description.slice(0, 150) + "..." : description;

  const handleShowMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleMenuToggle = () => {
    if (isMenuOpen) {
      closeMenuWithFade();
    } else {
      setIsMenuOpen(true);
    }
  };

  const closeMenuWithFade = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setFadeOut(false);
    }, 200);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenuWithFade();
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Menu Icon Above the Image */}
      <div className="relative">
        <button
          className="absolute z-10 top-3 right-3 text-gray-400 hover:text-white"
          onClick={handleMenuToggle}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
        {isMenuOpen && (
          <div
            ref={menuRef}
            className={`absolute right-0 z-20 mt-8 w-40 text-sm bg-gray-700 text-gray-200 rounded-lg shadow-lg transition-opacity duration-200 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <ul>
              <li className="px-4 py-2 hover:rounded-lg hover:bg-gray-600 cursor-pointer">Edit Post</li>
              <li className="px-4 py-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer">Delete Post</li>
              <li className="px-4 py-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer">Share</li>
              <li className="px-4 py-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer">Report</li>
            </ul>
          </div>
        )}
      </div>
  
      {/* Post Image with Hover Overlay */}
      <div className="relative w-full h-48 overflow-hidden group">
        <img
          src={images[0]}
          alt="Post"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="flex items-center text-gray-200 gap-2 hover:text-white">
            <FontAwesomeIcon icon={faHeart} />
            <span>{likes}</span>
          </button>
          <button className="flex items-center text-gray-200 gap-2 hover:text-white">
            <FontAwesomeIcon icon={faComment} />
            <span>{comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
  
  
};

export default OwnPost;
