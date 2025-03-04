import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import Tags from "./Tags"; // Import the Tags component
import defaultProfileIcon from "../images/user_icon.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import LikeCommentButton from "./LikeCommentButton"; // Import the new component

interface PostProps {
  id: number; // Add ID prop
  onClickComment?: (postId: number) => void;
  onClickLike?: (postId: number, newIsLiked: boolean) => void;
  userProfile?: string;
  username: string;
  domain: string;
  tags: { [key: string]: string }; // Tags as {tagName: colorCode}
  images: string[];
  likes: number;
  isLiked?: boolean;
  comments: number;
  description: string;
}

const Post: React.FC<PostProps> = ({
  id,
  onClickComment,
  onClickLike,
  userProfile,
  username,
  domain,
  tags,
  images,
  likes,
  comments,
  isLiked,
  description,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false); // State to track description expansion

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

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
    setFadeOut(true); // Trigger fade-out effect
    setTimeout(() => {
      setIsMenuOpen(false); // Close menu after fade-out duration
      setFadeOut(false); // Reset fade-out state
    }, 200); // Match the duration of the fade-out CSS animation
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

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextImage, // Swipe left to go to the next image
    onSwipedRight: handlePrevImage, // Swipe right to go to the previous image
    preventScrollOnSwipe: true, // Prevent scrolling while swiping
    trackTouch: true, // Enable touch tracking
    trackMouse: true, // Allow swipe handling via mouse (useful for testing)
  });

  return (
    <div className="max-w-lg mx-10 rounded-lg border border-gray-800 px-5 shadow-lg overflow-hidden">
      {/* Top Section: Profile and Tags */}
      <div className="flex items-center justify-between py-4">
        {/* Profile Section */}
        <div className="flex items-center">
          {/* <div className="w-12 h-12 bg-gray-800 rounded-full flex justify-center items-center text-white font-bold">
            U
          </div> */}
          <img
            src={
              userProfile && userProfile.trim() !== ""
                ? userProfile
                : defaultProfileIcon
            }
            alt={`Profile Icon`}
            className="w-12 h-12 rounded-2xl bg-gray-700"
          />
          <div className="ml-3">
            <div className="flex">
              <a href="/profile/JohnDoe">
                <p className="text-white font-semibold">{username}</p>
              </a>
              {/* Tags Section */}
              <div className="ml-3 text-xs">
                <Tags tags={tags} /> {/* Move the Tags component here */}
              </div>
            </div>
            <p className="text-gray-400 text-xs">{domain}</p>
          </div>
        </div>

        {/* Menu Icon */}
        <div className="relative">
          <button
            className="text-gray-400 text-xl ml-2 mr-2"
            onClick={handleMenuToggle}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className={`absolute z-20 right-0 mt-2 w-36 text-sm  bg-gray-900 text-gray-300 rounded-lg shadow-lg transition-opacity duration-200 ${
                fadeOut ? "opacity-0" : "opacity-100"
              }`}
            >
              <ul>
                <li className="px-4 py-2 hover:rounded-lg hover:bg-gray-800 cursor-pointer">
                  Edit Post
                </li>
                <li className="px-4 py-2 hover:rounded-lg hover:bg-gray-800 cursor-pointer">
                  Delete Post
                </li>
                <li className="px-4 py-2 hover:rounded-lg hover:bg-gray-800 cursor-pointer">
                  Share
                </li>
                <li className="px-4 py-2 hover:rounded-lg hover:bg-gray-800 cursor-pointer">
                  Report
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Image Section with Sliding Animation */}
      <div
        className="relative w-full h-full overflow-hidden"
        {...swipeHandlers}
      >
        <div className="absolute top-4 right-4 z-[1] bg-black bg-opacity-60 font-extralight text-gray-100 text-xxs px-2 py-1 rounded-full">
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
              className="w-full h-full object-cover"
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

      {/* Likes, Comments, and Save Icon */}
      <div className="flex items-center justify-between py-4 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <LikeCommentButton
            type="like"
            isLiked={isLiked}
            count={likes}
            onClick={() => {
              console.log(id, !isLiked);
              onClickLike?.(id, !isLiked);
            }}
          />{" "}
          {/* Like Button */}
          <LikeCommentButton
            type="comment"
            count={comments}
            onClick={() => onClickComment?.(id)}
          />{" "}
          {/* Comment Button */}
        </div>
        <button className="text-gray-400 hover:text-white text-xl">
          <FontAwesomeIcon icon={faBookmark} />
        </button>
      </div>

      {/* Description */}
      <div className="pt-2 pb-4">
        <p className="text-sm text-gray-400">
          {isExpanded ? description : truncatedDescription}
          {description.length > 150 && (
            <button
              onClick={handleShowMore}
              className={`text-xs text-gray-200 ${isExpanded ? "ml-3" : ""}`}
            >
              {isExpanded ? `Show Less` : "Show More"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default Post;
