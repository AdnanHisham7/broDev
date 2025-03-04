import { Outlet } from "react-router-dom";
import NavBar from "../ui/NavBar";
import SideBar from "../ui/SideBar";
import { useState, useEffect } from "react";
import { users } from "../../data";

const Layout: React.FC = () => {
  // Search-related state
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
      const timer = setTimeout(() => {
        const filtered = users.filter((user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setFilteredUsers([]);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Sticky Navbar */}
        <header className="sticky top-0 bg-customBg z-10">
          <NavBar
            onSearch={setSearchQuery}
            searchResults={filteredUsers}
            isLoading={isLoading}
          />
        </header>

        {/* Sidebar and Main Content Layout */}
        <div className="flex">
          <aside className="w-64 sticky top-0 h-full">
            <SideBar />
          </aside>

          {/* Dynamic Page Content */}
          <main className="flex-1 pt-8 ps-12 pr-2">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;

//! FULL SCREEN LAYOUT
// const Layout: React.FC = () => {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [filteredUsers, setFilteredUsers] = useState<{ username: string; profileImage: string; domain: string; following: boolean }[]>([]);

//     useEffect(() => {
//       if (searchQuery) {
//         setIsLoading(true);
//         const timer = setTimeout(() => {
//           const filtered = users.filter((user) =>
//             user.username.toLowerCase().includes(searchQuery.toLowerCase())
//           );
//           setFilteredUsers(filtered);
//           setIsLoading(false);
//         }, 500);
//         return () => clearTimeout(timer);
//       } else {
//         setFilteredUsers([]);
//       }
//     }, [searchQuery]);

//     return (
//       <div className="min-h-screen bg-customBg">
//         {/* NavBar */}
//         <header className="sticky top-0 z-10 bg-customBg">
//           <NavBar onSearch={setSearchQuery} searchResults={filteredUsers} isLoading={isLoading} />
//         </header>

//         {/* Layout Structure */}
//         <div className="flex">
//           {/* Sidebar */}
//           <aside className="w-64 sticky top-0">
//             <SideBar />
//           </aside>

//           {/* Main Content (Switching Component Here) */}
//           <main className="flex-1 p-6 overflow-y-auto hide-scrollbar h-[calc(100vh-4rem)]">
//             <Outlet /> {/* This will load HomePage or ProfilePage dynamically */}
//           </main>
//         </div>
//       </div>
//     );
//   };
