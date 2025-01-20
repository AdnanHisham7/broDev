// LikeCommentButton.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as outlineHeart, faComment } from "@fortawesome/free-regular-svg-icons";

interface LikeCommentButtonProps {
  type: "like" | "comment";
  count: number;
  isLiked?: boolean;
  className?:string;
  onClick?:Function;
}

export const formatNumber = (num: number) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  }
  return num.toString();
};

const LikeCommentButton: React.FC<LikeCommentButtonProps> = ({ type, count, isLiked = false, className }) => {
  return (
    <button className={`${className} text-gray-400 bg-customGray rounded-md p-1 px-3 text-sm hover:text-white transition-colors duration-300`}>
      <FontAwesomeIcon
        icon={type === "like" ? (isLiked ? solidHeart : outlineHeart) : faComment}
        className={type === "like" && isLiked ? "text-red-500" : ""}
      />{" "}
      {formatNumber(count)}
    </button>
  );
};

export default LikeCommentButton;
