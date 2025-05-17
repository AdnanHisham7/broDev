import React, { useState, useRef, useEffect } from "react";
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
import EditPostModalDemo, { EditPostModal } from "./EditPostModal";

interface PostProps {
  images: string[];
  likes: number;
  commentsCount: number;
  comments?: any[];
  description: string;
  showLikeCount: boolean;
  commentsEnabled: boolean;
  tags: string[];
  currentUserId?: string;
  onLikePost?: () => void;
  onAddComment?: (comment: string) => void;
  onLikeComment?: (commentId: string) => void;
  onUpdatePost?: (updatedPost: {
    description: string;
    showLikeCount: boolean;
    commentsEnabled: boolean;
    tags: string[];
  }) => void;
}

const OwnPost: React.FC<PostProps> = ({
  images,
  likes,
  commentsCount,
  comments = [],
  description,
  showLikeCount,
  commentsEnabled,
  tags,
  currentUserId,
  onLikePost,
  onAddComment,
  onLikeComment,
  onUpdatePost,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [editForm, setEditForm] = useState({
    description: "",
    showLikeCount: false,
    commentsEnabled: false,
    tags: [],
  });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleLikePost = () => {
    setIsLiked(!isLiked);
    if (onLikePost) onLikePost();
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

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const truncatedDescription =
    description.length > 150 ? description.slice(0, 150) + "..." : description;

  const [postData, setPostData] = useState({
    category: "Technology",
    description: "Your post description",
    tags: ["tag1", "tag2"],
    hideLikes: false,
    pinPost: false,
  });

  const handleSavePost = (updatedData:any) => { 
    // Update your state or make API call with updatedData
    console.log("Updated post data:", updatedData);
    setIsEditModalOpen(false);
  };

  return (
    <div
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      onClick={() => setIsModalOpen(true)}
    >
      {/* Post Image with Hover Overlay */}
      <div className="relative w-full h-48 overflow-hidden group">
        <img
          src={images[0]}
          alt="Post"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="flex items-center text-gray-200 gap-2 hover:text-white">
            <FontAwesomeIcon icon={faHeart} />
            {showLikeCount ? <span>{likes}</span> : null}
          </button>
          <button className="flex items-center text-gray-200 gap-2 hover:text-white">
            <FontAwesomeIcon icon={faComment} />
            <span>{commentsCount}</span>
          </button>
        </div>
      </div>

      {/* Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div
            className="bg-customGray text-white max-w-4xl w-full rounded-lg flex relative h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            {isLoading && (
              <>
                <div className="w-1/2 relative overflow-hidden h-full animate-pulse">
                  <div className="w-full h-full bg-gray-700 rounded-lg" />
                </div>
                <div className="w-1/2 flex flex-col px-6 space-y-4">
                  <div className="h-4 bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-700 rounded w-1/2" />
                  <div className="h-4 bg-gray-700 rounded w-2/3" />
                  <hr className="border-t border-gray-600 my-4" />
                  <div className="space-y-3">
                    {Array(3)
                      .fill(0)
                      .map((_, idx) => (
                        <div
                          key={idx}
                          className="h-4 bg-gray-700 rounded w-full"
                        />
                      ))}
                  </div>
                </div>
              </>
            )}

            {!isLoading && (
              <>
                <div className="w-1/2 relative overflow-hidden h-full">
                  <button
                    className="absolute top-3 right-3 z-10 text-gray-400 hover:text-white bg-black bg-opacity-50 p-2 rounded-full"
                    onClick={handleMenuToggle}
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>

                  {isMenuOpen && (
                    <div
                      ref={menuRef}
                      className="absolute right-3 z-20 top-12 w-40 text-sm bg-gray-700 text-gray-200 rounded-lg shadow-lg transition-opacity duration-200"
                    >
                      <ul>
                        <li
                          className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                          onClick={() => {
                            setEditForm({
                              description,
                              showLikeCount,
                              commentsEnabled,
                              tags,
                            });
                            setIsModalOpen(false);
                            setIsEditModalOpen(true);
                          }}
                        >
                          Edit Post
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                          Delete Post
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                          Archive Post
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                          Share
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                          Report
                        </li>
                      </ul>
                    </div>
                  )}

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

                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-sm px-3 py-2 rounded-lg flex space-x-4">
                    <button
                      className={`flex items-center ${
                        isLiked ? "text-red-500" : "text-gray-200"
                      }`}
                      onClick={handleLikePost}
                    >
                      <FontAwesomeIcon icon={faHeart} className="mr-1" />
                      {showLikeCount ? likes + (isLiked ? 1 : 0) : null}
                    </button>
                    <span className="flex items-center">
                      <FontAwesomeIcon
                        icon={faComment}
                        className="mr-1 text-blue-500"
                      />
                      {commentsCount}
                    </span>
                  </div>

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

                <div className="w-1/2 flex flex-col px-6 overflow-y-auto py-8">
                  <p className="mb-4">
                    {isExpanded ? description : truncatedDescription}
                  </p>

                  {description.length > 150 && (
                    <button
                      className="text-blue-400 hover:text-blue-300 text-sm self-start mb-4"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}

                  <hr className="border-t border-[#b4b4b4] opacity-30 my-2" />

                  {commentsEnabled && (
                    <PostComments
                      comments={comments}
                      onAddComment={
                        onAddComment ||
                        ((comment) => console.log("Add comment:", comment))
                      }
                      onLikeComment={
                        onLikeComment ||
                        ((commentId) => console.log("Like comment:", commentId))
                      }
                      currentUserId={currentUserId || "default-user-id"}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditPostModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSavePost}
          initialData={postData}
        />
      )}
    </div>
  );
};

export default OwnPost;
