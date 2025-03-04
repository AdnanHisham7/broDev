import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faEllipsis,
  faPaperPlane,
  faPaperclip,
  faSmile,
  faTimes,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as outlineHeart,
  faComment,
  faComments,
} from "@fortawesome/free-regular-svg-icons";
import { formatNumber } from "./LikeCommentButton";

export interface Comment {
  id: number;
  username: string;
  userProfile: string;
  comment: string;
  likesCount: number;
  isLiked: boolean;
  isOwner: boolean;
  nestedCommentsCount: number;
  nestedComments: Comment[]; // Ensure nested comments follow the same structure
}

interface CommentsPadProps {
  comments: Comment[];
  onClose?: () => void;
  onAddComment: (newCommentText: string, parentCommentId?: number) => void;
}

interface CommentProps {
  comment: Comment;
  onReplyClick?: (commentId: number, username: string) => void;
}

const NestedComments: React.FC<{
  comments: Comment[];
  onReplyClick?: (commentId: number, username: string) => void;
}> = ({ comments }) => {
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
          className="pl-5 text-gray-500 text-xxs hover:underline"
        >
          Show more
        </button>
      )}
      {isExpanded && visibleCount > 3 && (
        <button
          onClick={handleShowLess}
          className="pl-5 text-gray-500 text-xxs hover:underline"
        >
          Show less
        </button>
      )}
    </>
  );
};

const CommentItem: React.FC<CommentProps> = ({ comment, onReplyClick }) => (
  <div className="px-4 py-3 bg-customGray">
    <div className="flex items-start">
      <img
        src={comment.userProfile}
        alt="User profile"
        className="w-9 h-9 rounded-full mr-4"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xs text-white">
            {comment.username}
            {comment.isOwner && (
              <>
                <span className="bg-gray-600 ml-2 text-xxs font-normal text-white px-2 rounded-xl">
                  Author
                </span>
              </>
            )}
          </h3>
        </div>
        <p className="text-gray-100 text-xs mt-1">{comment.comment}</p>
        <div className="flex items-center text-gray-500 text-xxs mt-2 space-x-4">
          <span>
            <FontAwesomeIcon
              icon={comment.isLiked ? solidHeart : outlineHeart}
              className={comment.isLiked ? "text-red-500" : ""}
            />{" "}
            {formatNumber(comment.likesCount)}
          </span>

          {comment.nestedCommentsCount !== 0 && (
            <>
              <span>
                <FontAwesomeIcon icon={faComments} />{" "}
                {formatNumber(comment.nestedCommentsCount)}
              </span>
              <span
                onClick={() => onReplyClick?.(comment.id, comment.username)}
                className="cursor-pointer"
              >
                <FontAwesomeIcon icon={faComment} /> Reply
              </span>
            </>
          )}

          <FontAwesomeIcon icon={faEllipsis} />
          {/* {comment.isOwner && <></>} */}
        </div>

        {comment.nestedComments.length > 0 && (
          <div className="mt-4 border-l border-gray-800">
            <NestedComments
              comments={comment.nestedComments}
              onReplyClick={onReplyClick} // Pass the prop down
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

const CommentsPad: React.FC<CommentsPadProps> = ({
  comments,
  onClose,
  onAddComment,
}) => {
  const [showSkeleton, setShowSkeleton] = React.useState(true);
  const [inputMessage, setInputMessage] = React.useState("");
  const [isSendingComment, setIsSendingComment] = React.useState(false);
  const commentsContainerRef = React.useRef<HTMLDivElement>(null);
  const [replyingTo, setReplyingTo] = React.useState<{
    id: number;
    username: string;
  } | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (replyingTo) {
      setInputMessage(`@${replyingTo.username} `);
      inputRef.current?.focus();
    }
  }, [replyingTo]);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendComment = () => {
    if (isSendingComment || !inputMessage.trim()) return;
    setIsSendingComment(true);
    const message = inputMessage.trim();
    const parentCommentId = replyingTo?.id;
    setTimeout(() => {
      onAddComment(message, parentCommentId);
      setInputMessage("");
      setReplyingTo(null);
      setIsSendingComment(false);

      // Scroll to top after adding the comment
      if (commentsContainerRef.current) {
        commentsContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 1000); // Simulate API delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-customGray border border-gray-800 shadow-md rounded-t-3xl overflow-hidden relative">
      {/* Top Bar Skeleton */}
      {showSkeleton ? (
        <div className="relative bg-customGray p-4 flex items-center animate-pulse">
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-2 bg-gray-700 rounded-full" />
        </div>
      ) : (
        <div className="relative bg-customGray p-4 flex items-center">
          <span className="absolute top-5 left-1/2 transform -translate-x-1/2 border-t-4 border-gray-100 w-28" />
          <span className="absolute top-5 -right-20 w-28">
            <FontAwesomeIcon
              icon={faTimes}
              onClick={onClose}
              className="text-gray-500 text-lg cursor-pointer ml-auto"
            />
          </span>
        </div>
      )}

      {/* Comments Area */}
      <div
        ref={commentsContainerRef}
        className="overflow-y-scroll h-[80vh] pb-12"
        style={{ scrollbarWidth: "none" }}
      >
        {showSkeleton ? (
          <div className="animate-pulse space-y-4 p-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-9 h-9 bg-gray-700 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-700 rounded w-1/3" />
                  <div className="h-3 bg-gray-700 rounded w-2/3" />
                  <div className="h-3 bg-gray-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <FontAwesomeIcon
              icon={faComments}
              className="text-gray-500 text-4xl mb-4"
            />
            <p className="text-gray-500 text-sm">No comments yet</p>
          </div>
        ) : (
          <>
            {isSendingComment && (
              <div className="flex justify-center p-2">
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="fa-spin text-white text-lg"
                />
              </div>
            )}
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReplyClick={(id, username) => setReplyingTo({ id, username })}
              />
            ))}
          </>
        )}
      </div>

      {/* Input Area */}
      {showSkeleton ? (
        <div className="absolute bottom-0 left-0 right-0 bg-light px-4 pt-2 pb-3 flex items-center space-x-3 animate-pulse">
          <div className="w-6 h-6 bg-gray-700 rounded-full" />
          <div className="flex-grow h-10 bg-gray-700 rounded-full" />
          <div className="w-10 h-10 bg-gray-700 rounded-full" />
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 right-0 bg-midGray px-4 pt-2 pb-3 flex items-center space-x-3">
          <FontAwesomeIcon
            icon={faSmile}
            className="text-gray-400 cursor-pointer"
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            disabled={isSendingComment}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow px-4 py-2 rounded-full border border-gray-700 text-xs text-white focus:ring-1 focus:ring-gray-600 focus:outline-none"
          />

          <div
            className={`border border-gray-800 rounded-full ${
              isSendingComment
                ? "bg-blue-900 "
                : "bg-blue-800 hover:bg-blue-900"
            }`}
          >
            <FontAwesomeIcon
              icon={isSendingComment ? faSpinner : faPaperPlane}
              className={`text-white cursor-pointer w-10  px-1 py-2 ${
                isSendingComment ? "cursor-not-allowed fa-spin" : ""
              }`}
              onClick={handleSendComment}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsPad;
