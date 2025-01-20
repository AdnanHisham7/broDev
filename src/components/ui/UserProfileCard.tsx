import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import LeetCodeStats from "./LeetcodeStats";
import defaultProfileIcon from "../images/user_icon.svg";
import Tags from "./Tags"; // Import the Tags component
import firstRankCrown from "../images/firstRankCrown.svg";
import secondRankCrown from "../images/secondRankCrown.svg";

interface UserProfileProps {
  username: string;
  domain: string;
  tags: { [key: string]: string };
  userProfile: string;
  batch: string;
  githubLink: string;
  linkedlnLink: string;
  email: string;
  bio: string;
  rank?: number;
  leetcodeUsername: string;
  skillsArray: string[];
}

const UserProfile: React.FC<UserProfileProps> = ({
  username,
  domain,
  tags,
  userProfile,
  batch,
  githubLink,
  linkedlnLink,
  email,
  bio,
  rank,
  leetcodeUsername,
  skillsArray,
}) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to track description expansion

  const truncatedBio = bio.length > 150 ? bio.slice(0, 150) + "..." : bio;

  const handleShowMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="border-b border-gray-800 text-white pb-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Section (User Info, Profile, Bio) */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            {/* Profile Image and Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={
                    userProfile && userProfile.trim() !== ""
                      ? userProfile
                      : defaultProfileIcon
                  }
                  alt={`user ranking at ${rank}`}
                  className="w-36 h-36 rounded-3xl bg-gray-700"
                />
                {rank === 1 && (
                  <img
                    src={firstRankCrown}
                    alt="First Rank Crown"
                    className="absolute -top-14 -left-12 w-32 h-32"
                  />
                )}
                {rank === 2 && (
                  <img
                    src={secondRankCrown}
                    alt="Second Rank Crown"
                    className="absolute -top-14 -left-12 w-32 h-32"
                  />
                )}
              </div>
              <div>
                <div className="flex">
                  <h1 className="text-2xl font-bold mb-2">{username}</h1>
                  <div className="ml-3 text-xxs">
                    <Tags tags={tags} />
                  </div>
                </div>
                <p className="text-sm text-gray-400">{batch}</p>
                <p className="text-sm text-gray-400">{domain}</p>
              </div>
            </div>
            <div className="ml-4">
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer"
              />
            </div>
          </div>
          <div className="mt-4 text-gray-300 text-sm lg:min-w-[700px]">
            <p>
              {isExpanded ? bio : truncatedBio}
              {bio.length > 150 && (
                <button
                  onClick={handleShowMore}
                  className={`text-xs text-gray-500 ${
                    isExpanded ? "ml-3" : ""
                  }`}
                >
                  {isExpanded ? `Show Less` : "Show More"}
                </button>
              )}
            </p>
          </div>
          <div className="mt-4 flex gap-4 text-sm flex-wrap">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-customGray px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faGithub} />
              GitHub
            </a>
            <a
              href={linkedlnLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-customGray px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faLinkedin} />
              LinkedIn
            </a>
            <a
              href={`mailto:${email}`}
              className="bg-customGray px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              Mail Me
            </a>
          </div>
        </div>

        {/* Skills and Stats Section */}
        <div className="lg:flex gap-6 lg:items-start lg:justify-between hidden">
          {/* Stats */}
          <div className="lg:w-1/2 flex-grow-0">
            <LeetCodeStats leetcodeUsername={leetcodeUsername} />
          </div>
          <div className="lg:w-1/2 lg:min-w-[140px] flex-grow-0 max-w-full text-start border p-4 rounded-xl border-gray-800 pb-8">
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <ul className="list-disc list-inside text-xs text-gray-300">
              {skillsArray.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* Skills */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
