import React, { useState } from "react";
import NavBar from "../ui/NavBar";
import SideBar from "../ui/SideBar";
import UserProfile from "../ui/UserProfileCard";
import OwnPost from "../ui/OwnPost";
// Define the types for props (move them to a shared type file if reused elsewhere)
interface UserProfileData {
  username: string;
  domain: string;
  tags: { [key: string]: string };
  userProfile: string;
  batch: string;
  githubLink: string;
  linkedlnLink: string;
  email: string;
  bio: string;
  rank: number;
  leetcodeUsername: string;
  skillsArray: string[];
}

interface Post {
  images: string[];
  likes: number;
  comments: number;
  description: string;
}

interface ProfilePageProps {
  userProfileData: UserProfileData;
  ownPosts: Post[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userProfileData, ownPosts }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* NavBar (Horizontal Stretch) */}
      <div className="sticky top-0 z-10">
        <NavBar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* SideBar (Vertical Stretch and Sticky) */}
        <div className="sticky top-0 h-screen w-64">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* User Profile Section */}
          <div className="flex flex-col items-center gap-10 py-6">
            <UserProfile {...userProfileData} />
          </div>

          {/* User Posts Section */}
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {ownPosts.map((post, index) => (
                <OwnPost key={index} {...post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
