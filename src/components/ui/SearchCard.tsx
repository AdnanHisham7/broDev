import React from "react";
import { useNavigate } from "react-router-dom";
import defaultProfileIcon from '../images/user_icon.svg'

interface CardProps {
  username: string;
  profileImage: string;
  domain?: string;
  following?: boolean;
}

const SearchCard: React.FC<CardProps> = ({
  username,
  profileImage,
  domain,
  following,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex bg-customGray items-center py-3 px-4 hover:bg-lightGray rounded-lg cursor-pointer transition-colors duration-200"
      onClick={() => navigate(`/profile/${username}`)}
    >
      <img
        src={
          profileImage && profileImage.trim() !== ""
            ? profileImage
            : defaultProfileIcon
        }
        alt={username}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="ml-4 flex flex-col">
        <p
          className={`text-sm font-semibold text-gray-200 ${
            !domain ? "text-center" : ""
          }`}
        >
          {username}
        </p>
        {domain && (
          <p className="text-xs text-gray-500 flex items-center">
            {domain} {following && <span className="mx-1">•</span>}{" "}
            {following && "Following"}
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchCard;
