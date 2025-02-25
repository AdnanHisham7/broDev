import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faEllipsisVertical,
  faEnvelope,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import LeetCodeStats from "./LeetcodeStats";
import defaultProfileIcon from "../images/user_icon.svg";
import Tags from "./Tags";
import firstRankCrown from "../images/firstRankCrown.svg";
import secondRankCrown from "../images/secondRankCrown.svg";
import { motion, AnimatePresence } from "framer-motion";

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
  postCount?:number;
  followersCount?:number;
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
  postCount,
  followersCount,
  leetcodeUsername,
  skillsArray,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [newUserProfile, setNewUserProfile] = useState("");
  const [activeSection, setActiveSection] = useState<
    "basicInfo" | "socialLinks" | "passwordForm" | null
  >("basicInfo");

  const toggleSection = (
    section: "basicInfo" | "socialLinks" | "passwordForm"
  ) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const truncatedBio = bio.length > 150 ? bio.slice(0, 150) + "..." : bio;

  const handleShowMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleOptionsClick = () => {
    setShowOptions((prev) => !prev);
  };

  const handleEditProfileClick = () => {
    setShowEditProfile(true);
    setActiveSection("basicInfo")
    console.log('hey te', activeSection)
    setIsClosing(true)
    setShowOptions(false);
  };

  const handleCloseEditProfile = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowEditProfile(false);
      setIsClosing(false);
    }, 300);
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
                className="w-24 h-24 rounded-3xl bg-gray-700"
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
              {/* <p className="text-sm text-gray-400">{batch}</p>
              <p className="text-sm text-gray-400">{domain}</p> */}
              {/* Add Followers and Post Count Here */}
              <div className="flex gap-4 mt-2">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">{postCount}</span> Posts
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">{followersCount}</span> Followers
                </p>
              </div>
            </div>
          </div>
          <div className="ml-4 relative">
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer"
              onClick={handleOptionsClick}
            />
            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={handleEditProfileClick}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                  >
                    Edit Profile
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left">
                    Logout
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left">
                    Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 text-gray-00 text-sm lg:min-w-[70px]">
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
      </div>
    </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-customGray rounded-xl p-8 w-full max-w-2xl shadow-lg flex flex-col md:flex-row gap-6 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseEditProfile}
              className="absolute top-3 right-3 text-gray-300 text-2xl hover:text-white transition"
            >
              &times;
            </button>

            {/* Left Section: Profile Image */}
            <div className="flex flex-col items-center md:w-1/3">
              <label className="cursor-pointer relative">
                {newUserProfile ? (
                  <img
                    src={newUserProfile}
                    className="w-28 h-28 rounded-full object-cover border-2 border-midGray shadow-sm"
                    alt="Profile"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gray-600 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className="text-8xl text-gray-50"
                    />
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setNewUserProfile(event.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              <p className="text-xxs font-thin text-gray-300 mt-5 px-4">
                <span className="font-medium">Important:</span> Only images
                (JPEG, PNG) are allowed. The maximum file size should be 2MB.
              </p>
            </div>

            {/* Right Section: Profile Forms */}
            <div className="md:w-2/3">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Profile Settings
              </h2>

              {/* Profile Form */}
              <div className="space-">
                {/* Basic Information Accordion */}
                <button
                  onClick={() => toggleSection("basicInfo")}
                  className="w-full text-left text-gray-200 font-semibold text-sm flex items-center justify-between p-3 rounded-md hover:bg-midGray transition-all duration-300"
                >
                  Basic Information
                  <FontAwesomeIcon
                    icon={activeSection === "basicInfo" ? faChevronUp : faChevronDown}
                    className="text-gray-400 transition-transform duration-300"
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    activeSection === "basicInfo"
                      ? "max-h-[500px] opacity-100 py-3 px-3"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <form className="p-4 border rounded-lg border-midGray">
                    <div className="mb-4">
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        defaultValue={username}
                        className="w-full text-sm p-2 border border-midGray rounded-lg bg-lightGray text-white"
                        placeholder="Username"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                        Domain
                      </label>
                      <input
                        type="text"
                        defaultValue={domain}
                        className="w-full text-sm p-2 border border-midGray rounded-lg bg-lightGray text-white"
                        placeholder="Domain"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                        Batch
                      </label>
                      <input
                        type="text"
                        defaultValue={batch}
                        className="w-full text-sm p-2 border border-midGray rounded-lg bg-lightGray text-white"
                        placeholder="Batch"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        defaultValue={bio}
                        className="w-full text-sm p-2 border border-midGray rounded-lg bg-lightGray text-white hide-scrollbar"
                        placeholder="Bio"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-1/2 bg-gray-200 text-sm text-customBg font-semibold p-2 rounded-lg transition-all"
                    >
                      Save
                    </button>
                  </form>
                </div>

                {/* Social Media Links Accordion */}
                <button
                  onClick={() => toggleSection("socialLinks")}
                  className="w-full text-left text-gray-200 font-semibold text-sm flex items-center justify-between p-3 rounded-md hover:bg-midGray transition-all duration-300"
                >
                  Social Media Links
                  <FontAwesomeIcon
                    icon={activeSection === "socialLinks" ? faChevronUp : faChevronDown}
                    className="text-gray-400 transition-transform duration-300"
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    activeSection === "socialLinks"
                      ? "max-h-[500px] opacity-100 py-3 px-3"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <form className="p-4 border rounded-lg border-midGray">
                    <div className="mb-4">
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                        GitHub Link
                      </label>
                      <input
                        type="text"
                        defaultValue={githubLink}
                        className="w-full text-sm p-2 border border-midGray rounded-lg bg-lightGray text-white"
                        placeholder="GitHub Link"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                        LinkedIn Link
                      </label>
                      <input
                        type="text"
                        defaultValue={linkedlnLink}
                        className="w-full text-sm p-2 border border-midGray rounded-lg bg-lightGray text-white"
                        placeholder="LinkedIn Link"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={email}
                        className="w-full text-sm p-2 border border-midGray rounded-lg bg-lightGray text-white"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                        LeetCode Username
                      </label>
                      <input
                        type="text"
                        defaultValue={leetcodeUsername}
                        className="w-full text-sm p-2 border border-midGray rounded-lg bg-lightGray text-white"
                        placeholder="LeetCode Username"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-1/2 bg-gray-200 text-sm text-customBg font-semibold p-2 rounded-lg transition-all"
                    >
                      Save
                    </button>
                  </form>
                </div>

                {/* Change Password Section */}
                {/* <button
                  onClick={() => toggleSection("passwordForm")}
                  className="w-full text-left text-gray-200 font-semibold text-sm flex items-center justify-between p-3 rounded-md hover:bg-midGray transition-all duration-300"
                >
                  Reset Password
                  <FontAwesomeIcon
                    icon={activeSection === "passwordForm" ? faChevronUp : faChevronDown}
                    className="text-gray-400 transition-transform duration-300"
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    activeSection === "passwordForm"
                      ? "max-h-[500px] opacity-100 py-3 px-3"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <form className="p-4 border rounded-lg border-midGray">
                    <div className="mb-4">
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full text-sm p-2 border border-midGray rounded-lg bg-lightGray text-white"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full text-sm p-2 border border-midGray rounded-lg bg-lightGray text-white"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full text-sm p-2 border border-midGray rounded-lg bg-lightGray text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-1/2 bg-gray-200 text-sm text-customBg font-semibold p-2 rounded-lg transition-all"
                    >
                      Save Changes
                    </button>
                  </form>
                </div> */}


              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
