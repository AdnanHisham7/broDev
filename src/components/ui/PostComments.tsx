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

interface PostCommentsProps {
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
          className="pl-5 text-gray-500 text-xs hover:underline"
        >
          Show more
        </button>
      )}
      {isExpanded && visibleCount > 3 && (
        <button
          onClick={handleShowLess}
          className="pl-5 text-gray-500 text-xs hover:underline"
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
        </div>

        {comment.nestedComments.length > 0 && (
          <div className="mt-4 border-l border-gray-800">
            <NestedComments comments={comment.nestedComments} />
          </div>
        )}
      </div>
    </div>
  </div>
);

const PostComments: React.FC<PostCommentsProps> = ({ comments }) => (
  <div className="w-full mx-auto shadow-md rounded-t-3xl overflow-hidden relative h-[80vh] flex flex-col">
    {/* Comments List */}
    <div
      className="overflow-y-auto flex-grow pb-20 flex flex-col"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {comments.length === 0 ? (
        // Properly center "No comments yet"
        <div className="flex-grow flex flex-col items-center justify-center h-full">
          <FontAwesomeIcon
            icon={faComments}
            className="text-gray-500 text-4xl mb-4"
          />
          <p className="text-gray-500 text-sm">No comments yet</p>
        </div>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </div>

    {/* Input Field Container - Stays Fixed at Bottom */}
    <div className="absolute bottom-0 left-0 w-full bg-customGray py-3 flex items-center px-4 space-x-3">
      <FontAwesomeIcon
        icon={faSmile}
        className="text-gray-400 cursor-pointer"
      />
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-grow px-4 py-2 rounded-lg border border-gray-700 bg-black text-sm text-white focus:ring-1 focus:ring-gray-600 focus:outline-none"
      />
      <FontAwesomeIcon
        icon={faPaperPlane}
        className="text-blue-500 cursor-pointer"
      />
    </div>
  </div>
);



export default PostComments;