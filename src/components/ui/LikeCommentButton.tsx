// LikeCommentButton.tsx
import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as outlineHeart,
  faComment,
} from "@fortawesome/free-regular-svg-icons";

interface LikeCommentButtonProps {
  type: "like" | "comment";
  count: number;
  isLiked?: boolean;
  className?: string;
  onClick?: () => void; // Fix type to be a function without parameters
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

const LikeCommentButton: React.FC<LikeCommentButtonProps> = ({
  type,
  count,
  isLiked = false,
  className,
  onClick,
}) => {
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (type === "like" && iconRef.current) {
      // Trigger animation on like state change
      iconRef.current.classList.add("animate-pop");
      const timer = setTimeout(() => {
        iconRef.current?.classList.remove("animate-pop");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLiked, type]);

  return (
    <button
      onClick={() => onClick?.()} // Add onClick handler here
      className={`${className} text-gray-400 bg-customGray rounded-md p-1 px-3 text-sm hover:text-white transition-colors duration-300`}
    >
      <span ref={iconRef} className="inline-block transition-transform">
        <FontAwesomeIcon
          icon={
            type === "like" ? (isLiked ? solidHeart : outlineHeart) : faComment
          }
          className={`${type === "like" && isLiked ? "text-red-500" : ""}`}
        />
      </span>{" "}
      {formatNumber(count)}
    </button>
  );
};

export default LikeCommentButton;
