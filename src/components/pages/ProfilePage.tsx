import React, { useEffect, useState } from "react";
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

  //search cards
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<
    {
      username: string;
      profileImage: string;
      domain: string;
      following: boolean;
    }[]
  >([]);
  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      // Simulate a delay for loading
      const timer = setTimeout(() => {
        const filtered = users.filter((user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
        setIsLoading(false);
      }, 500); // 500ms delay
      return () => clearTimeout(timer);
    } else {
      setFilteredUsers([]);
    }
  }, [searchQuery]);

  return (
    // <div className="min-h-screen">
    //   {/* Container to center content and add padding */}
    //   <div className="max-w-7xl mx-auto px-4">
    //     {/* NavBar (Sticky at the Top) */}
    //     <header className="sticky top-0 bg-customBg">
    //     <NavBar
    //         onSearch={setSearchQuery}
    //         searchResults={filteredUsers}
    //         isLoading={isLoading}
    //       />
    //     </header>

    //     {/* Flex container for sidebar and main content */}
    //     <div className="flex">
    //       {/* Sidebar remains sticky */}
    //       <aside className="w-64 sticky top-0 h-screen">
    //         <SideBar />
    //       </aside>

    //       {/* Main Content */}
    //       <main className="flex-1 p-6 overflow-y-auto hide-scrollbar h-[calc(100vh-4rem)]">
              <>
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
              </>
    //       </main>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProfilePage;
