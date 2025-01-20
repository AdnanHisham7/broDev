import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faEllipsis,
  faPaperPlane,
  faPaperclip,
  faSmile,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as outlineHeart,
  faComment,
  faComments,
} from "@fortawesome/free-regular-svg-icons";
import { formatNumber } from "./LikeCommentButton";

interface Comment {
  id: number;
  username: string;
  userProfile: string;
  comment: string;
  isLiked?: boolean;
  likesCount: number;
  isOwner: boolean;
  nestedCommentsCount: number;
  nestedComments: Comment[];
}

interface CommentsPadProps {
  comments: Comment[];
}

interface CommentProps {
  comment: Comment;
}

const NestedComments: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  const [visibleCount, setVisibleCount] = React.useState(2);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleShowMore = () => {
    if (!isExpanded) {
      setVisibleCount((prev) => prev + 3);
    }
  };

  const handleShowLess = () => {
    setVisibleCount(3);
    setIsExpanded(false);
  };

  React.useEffect(() => {
    if (visibleCount >= comments.length) {
      setIsExpanded(true);
    }
  }, [visibleCount, comments.length]);

  return (
    <>
      {comments.slice(0, visibleCount).map((nestedComment) => (
        <CommentItem key={nestedComment.id} comment={nestedComment} />
      ))}
      {visibleCount < comments.length && (
        <button
          onClick={handleShowMore}
          className="pl-5 text-gray-500 text-sm hover:underline"
        >
          Show more
        </button>
      )}
      {isExpanded && visibleCount > 3 && (
        <button
          onClick={handleShowLess}
          className="pl-5 text-gray-500 text-sm hover:underline"
        >
          Show less
        </button>
      )}
    </>
  );
};

const CommentItem: React.FC<CommentProps> = ({ comment }) => (
  <div className="px-4 py-3 bg-customGray">
    <div className="flex items-start">
      <img
        src={comment.userProfile}
        alt="User profile"
        className="w-9 h-9 rounded-full mr-4"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-white">
            {comment.username}
            {comment.isOwner && (
              <>
                <span className="bg-gray-600 ml-2 text-xs font-normal text-white px-2 rounded-xl">
                  Author
                </span>
              </>
            )}
          </h3>
        </div>
        <p className="text-gray-100 text-sm mt-1">{comment.comment}</p>
        <div className="flex items-center text-gray-500 text-xs mt-2 space-x-4">
          <span>
            <FontAwesomeIcon
              icon={comment.isLiked ? solidHeart : outlineHeart}
              className={comment.isLiked ? "text-red-500" : ""}
            />{" "}
            {formatNumber(comment.likesCount)}
          </span>

          {comment.nestedCommentsCount !== 0 && (
            <span>
              <FontAwesomeIcon icon={faComments} />{" "}
              {formatNumber(comment.nestedCommentsCount)}
            </span>
          )}

          <span>
            <FontAwesomeIcon icon={faComment} /> Reply
          </span>
          <FontAwesomeIcon icon={faEllipsis} />
          {/* {comment.isOwner && <></>} */}
        </div>

        {comment.nestedComments.length > 0 && (
          <div className="mt-4 pl-8 border-l border-gray-800">
            <NestedComments comments={comment.nestedComments} />
          </div>
        )}
      </div>
    </div>
  </div>
);

const CommentsPad: React.FC<CommentsPadProps> = ({ comments }) => (
  <div className="max-w-3xl mx-auto border border-gray-800 shadow-md rounded-t-3xl overflow-hidden relative">
    {/* Top bar with line and close icon */}
    <div className="relative bg-customGray p-4 flex items-center">
      <span className="absolute top-5 left-1/2 transform -translate-x-1/2 border-t-4 border-gray-100 w-28"></span>
      <span className="absolute top-5 -right-16 w-28">
        <FontAwesomeIcon
          icon={faTimes}
          className="text-gray-500 text-xl cursor-pointer ml-auto"
          title="Close"
        />
      </span>
    </div>

    <div
      className="overflow-y-scroll h-[80vh] pb-16"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>

    <div className="absolute bottom-0 left-0 right-0 bg-gray-950 p-4 flex items-center space-x-3">
      <FontAwesomeIcon
        icon={faSmile}
        className="text-gray-400 cursor-pointer"
      />
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-grow px-4 py-2 rounded-full border border-gray-700 bg-gray-900 text-sm text-white focus:ring-1 focus:ring-gray-600 focus:outline-none"
      />
      <FontAwesomeIcon
        icon={faPaperPlane}
        className="text-blue-500 cursor-pointer"
      />
    </div>
  </div>
);

export default CommentsPad;
