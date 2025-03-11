import React from "react";

interface Follower {
  id: number;
  username: string;
  domain: string;
  profileImage?: string;
  backgroundInfo?: string;
  isFollowing: boolean;
}

interface FollowerListItemProps {
  follower: Follower;
  toggleFollow: (id: number) => void;
}

const defaultProfileIcon = "path/to/default/image.png"; // Replace with actual path

const FollowerListItem: React.FC<FollowerListItemProps> = ({ follower, toggleFollow }) => {
  const { id, username, domain, profileImage, backgroundInfo, isFollowing } = follower;

  return (
    <div className="flex items-center py-3 px-4 hover:bg-midGray rounded-lg cursor-pointer transition-colors duration-200">
      <img
        src={profileImage || defaultProfileIcon}
        alt={username}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="ml-4 flex flex-col flex-grow">
        <p className="text-sm font-semibold text-gray-200">{username}</p>
        <p className="text-xs text-gray-500">{domain}</p>
        {backgroundInfo && <p className="text-xs text-gray-500">{backgroundInfo}</p>}
      </div>
      <button
        className={`px-4 py-2 rounded-full text-sm font-semibold ${
          isFollowing ? "bg-lightGray text-gray-200" : "bg-blue-500 text-white"
        }`}
        onClick={() => toggleFollow(id)}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default FollowerListItem;
