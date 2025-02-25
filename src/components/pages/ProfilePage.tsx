import React, { useState } from "react";
import NavBar from "../ui/NavBar";
import SideBar from "../ui/SideBar";
import UserProfile from "../ui/UserProfileCard";
import OwnPost from "../ui/OwnPost";

// Define the types for props
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
  commentsCount: number;
  comments: Object[];
  description: string;
}

interface ProfilePageProps {
  userProfileData: UserProfileData;
  ownPosts: Post[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userProfileData, ownPosts }) => {
  return (
    <div className="min-h-screen">
      {/* Container to center content and add padding */}
      <div className="max-w-7xl mx-auto px-4">
        {/* NavBar (Sticky at the Top) */}
        <header className="sticky top-0 bg-customBg">
          <NavBar />
        </header>

        {/* Flex container for sidebar and main content */}
        <div className="flex">
          {/* Sidebar remains sticky */}
          <aside className="w-64 sticky top-0 h-screen">
            <SideBar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto hide-scrollbar h-[calc(100vh-4rem)]">
            {/* User Profile Section */}
            <div className="flex flex-col items-center gap-10 py-6">
              <UserProfile {...userProfileData} />
            </div>

            {/* User Posts Section */}
            <div className="max-w-6xl mx-auto w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ownPosts.map((post, index) => (
                  <OwnPost key={index} {...post} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
