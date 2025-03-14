import React, { useEffect, useLayoutEffect, useState } from "react";
import NavBar from "../ui/NavBar";
import SideBar from "../ui/SideBar";
import UserProfile from "../ui/UserProfileCard";
import OwnPost from "../ui/OwnPost";
import { users } from "../../data";
import { useParams } from "react-router-dom";
import { testProfiles, postsData } from "../../data";

interface Post {
  images: string[];
  likes: number;
  commentsCount: number;
  comments: Object[];
  description: string;
}

const ProfilePage: React.FC = () => {
  const { username } = useParams();
  const userProfileData = testProfiles[username as keyof typeof testProfiles];

  if (!userProfileData) {
    return <h2 className="text-center text-red-500">Profile not found</h2>;
  }

  const ownPosts = postsData.filter((post) => post.username === username);
  // const savedPosts = postsData.filter((post) => post.isSaved); // Example logic
  const savedPosts = [];
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Posts");

  // Simulate loading delay
  useLayoutEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Skeleton Loader Component
  const PostSkeleton = () => (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-700" />
      <div className="p-4">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );

  return (
    <>
      {/* User Profile Section */}
      <div className="flex flex-col items-center gap-10 py-6">
        <UserProfile {...userProfileData} />
      </div>

      {/* Tabs and Content */}
      <div className="max-w-6xl mx-auto w-full">
        {/* Tabs remain same */}
        <div className="flex border-b border-gray-800">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "Posts"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("Posts")}
          >
            Posts
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "Saved"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("Saved")}
          >
            Saved
          </button>
        </div>

        {/* Content Area */}
        <div className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(4)
                .fill(0)
                .map((_, idx) => (
                  <PostSkeleton key={idx} />
                ))}
            </div>
          ) : (
            <>
              {/* Posts Tab */}
              {activeTab === "Posts" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {ownPosts.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <div className="text-gray-400 text-lg">No posts yet</div>
                    </div>
                  ) : (
                    ownPosts.map((post, index) => (
                      <OwnPost key={index} {...post} />
                    ))
                  )}
                </div>
              )}

              {/* Saved Tab */}
              {activeTab === "Saved" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {savedPosts.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <div className="text-gray-400 text-lg">
                        No saved posts yet
                      </div>
                    </div>
                  ) : (
                    ownPosts.map((post, index) => (
                      <OwnPost key={index} {...post} />
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
