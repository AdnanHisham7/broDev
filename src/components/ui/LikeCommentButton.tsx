// LikeCommentButton.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";

interface LikeCommentButtonProps {
  type: "like" | "comment";
  count: number;
}

const formatNumber = (num: number) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  }
  return num.toString();
};

const LikeCommentButton: React.FC<LikeCommentButtonProps> = ({ type, count }) => {
  return (
    <button className="text-gray-400 bg-customGray rounded-md p-1 px-3 text-sm hover:text-white transition-colors duration-300">
      <FontAwesomeIcon icon={type === "like" ? faHeart : faComment} /> {formatNumber(count)}
    </button>
  );
};

export default LikeCommentButton;
