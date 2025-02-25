import React, { useState, useRef, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faChevronLeft,
  faHeart,
  faComment,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import PostComments from "./PostComments";

interface PostProps {
  images: string[];
  likes: number;
  commentsCount: number;
  comments?: any;
  description: string;
}

const OwnPost: React.FC<PostProps> = ({
  images,
  likes,
  commentsCount,
  comments,
  description,
}) => {
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("");

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const truncatedDescription =
    description.length > 150 ? description.slice(0, 150) + "..." : description;

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
    <div
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      onClick={() => setIsModalOpen(true)}
    >
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
            className={`absolute right-1 z-20 top-10 w-40 text-sm bg-gray-700 text-gray-200 rounded-lg shadow-lg transition-opacity duration-200 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <ul>
              <li className="px-4 py-2 hover:rounded-lg hover:bg-gray-600 cursor-pointer">
                Edit Post
              </li>
              <li className="px-4 py-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer">
                Delete Post
              </li>
              <li className="px-4 py-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer">
                Share
              </li>
              <li className="px-4 py-2 hover:bg-gray-600 hover:rounded-lg cursor-pointer">
                Report
              </li>
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
            <span>{commentsCount}</span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div
            className="bg-customGray text-white max-w-4xl w-full p-6 rounded-lg flex relative h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            {/* Left: Image Slider with Smooth Transitions */}
            {/* Left: Image Slider with Smooth Transitions */}
            <div className="w-1/2 relative overflow-hidden h-full">
              {/* Image Container */}
              <div
                className="flex transition-transform duration-300 ease-in-out h-full"
                style={{
                  transform: `translateX(-${currentImageIndex * 100}%)`,
                }}
              >
                {images.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0 h-full">
                    <img
                      src={image}
                      alt="Post"
                      className="w-full h-full object-contain rounded-lg bg-black"
                    />
                  </div>
                ))}
              </div>

              {/* Overlay for Likes & Comments (Placed Outside the Sliding Container) */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-sm px-3 py-2 rounded-lg flex space-x-4">
                <span className="flex items-center">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="mr-1 text-red-500"
                  />
                  {likes}
                </span>
                <span className="flex items-center">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="mr-1 text-blue-500"
                  />
                  {commentsCount}
                </span>
              </div>

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    onClick={handlePrevImage}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    onClick={handleNextImage}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </>
              )}
            </div>

            {/* Right: Post Details with Scrollable Content */}
            <div className="w-1/2 flex flex-col px-6 overflow-y-auto">
              {/* Description */}
              <p className="mb-4">
                {isExpanded ? description : truncatedDescription}
              </p>

              {/* Show More/Less Button */}
              {description.length > 150 && (
                <button
                  className="text-blue-400 hover:text-blue-300 text-sm self-start mb-4"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}

              {/* Horizontal Line Separator */}
              <hr className="border-t border-[#b4b4b4] opacity-30 my-2" />




              {/* Comments Section */}
              
              <PostComments comments={comments} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnPost;
