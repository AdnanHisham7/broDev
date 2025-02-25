import React, { useState } from "react";
import NavBar from "../ui/NavBar";
import SideBar from "../ui/SideBar";
import Button from "../ui/Button";
import Post from "../ui/Post";
// import Post and CommentsPad if needed
import { commentsData } from "../../data";

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Posts");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen">
      {/* Container to center the layout and add horizontal padding */}
      <div className="max-w-7xl mx-auto px-4">
        {/* NavBar is sticky at the top */}
        <header className="sticky top-0 z-10 bg-customBg">
          <NavBar />
        </header>

        {/* Flex container for sidebar and main content */}
        <div className="flex">
          {/* Sidebar remains sticky and is not part of the scrolling area */}
          <aside className="w-64 sticky top-0">
            <SideBar />
          </aside>

          {/* Main Content: Only this section scrolls vertically */}
          <main className="flex-1 p-6 overflow-y-auto hide-scrollbar h-[calc(100vh-4rem)]">
            {/* Tabs for switching between "Posts", "Placements", "Events" */}
            <div className="flex flex-wrap gap-2 mb-8 text-xs sm:flex-nowrap">
              <Button
                label="Posts"
                variant={activeTab === "Posts" ? "primary" : "sticky"}
                onClick={() => handleTabChange("Posts")}
              />
              <Button
                label="Placements"
                variant={activeTab === "Placements" ? "primary" : "sticky"}
                onClick={() => handleTabChange("Placements")}
              />
              <Button
                label="Events"
                variant={activeTab === "Events" ? "primary" : "sticky"}
                onClick={() => handleTabChange("Events")}
              />
            </div>

            {/* Content based on active tab */}
            <div className="flex flex-col gap-10">
              {activeTab === "Posts" && (
                <>
                  <Post
                    username="user_name"
                    domain="Mern Stack Developer"
                    tags={{
                      tagExample: "7F0303",
                      hry: "160",
                    }}
                    images={[
                      "https://th.bing.com/th/id/R.5969dd2ca999fb68dfe6d292cafc1c84?rik=TCyiF%2f3rRqo0Nw&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2014%2f07%2fLandscape-wallpapers-40.jpg&ehk=CMy18Uy0M72454Y8iWPLx3sH%2fL%2bd9vD4Ne4RSWxtHzI%3d&risl=&pid=ImgRaw&r=0",
                      "https://th.bing.com/th/id/R.2c57158421e70052a5cd37e63505472a?rik=rZ1a9SDg8etiJQ&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2014%2f07%2fLandscape-wallpapers-20.jpg&ehk=efYckqX6isJQS4qYHcoS%2bSi9PByYf0bj3Xg9h%2fwwTyc%3d&risl=&pid=ImgRaw&r=0",
                      "https://wonderfulengineering.com/wp-content/uploads/2014/07/Landscape-wallpapers-34.jpg",
                    ]}
                    likes={100}
                    comments={2100}
                    description="🚀 Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed"
                  />
                  <Post
                    username="user_name"
                    domain="Mern Stack Developer"
                    tags={{
                      tagExample: "7F0303",
                      Linkedln: "16037F",
                    }}
                    images={[
                      "https://th.bing.com/th/id/R.5969dd2ca999fb68dfe6d292cafc1c84?rik=TCyiF%2f3rRqo0Nw&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2014%2f07%2fLandscape-wallpapers-40.jpg&ehk=CMy18Uy0M72454Y8iWPLx3sH%2fL%2bd9vD4Ne4RSWxtHzI%3d&risl=&pid=ImgRaw&r=0",
                      "https://th.bing.com/th/id/R.2c57158421e70052a5cd37e63505472a?rik=rZ1a9SDg8etiJQ&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2014%2f07%2fLandscape-wallpapers-20.jpg&ehk=efYckqX6isJQS4qYHcoS%2bSi9PByYf0bj3Xg9h%2fwwTyc%3d&risl=&pid=ImgRaw&r=0",
                      "https://wonderfulengineering.com/wp-content/uploads/2014/07/Landscape-wallpapers-34.jpg",
                    ]}
                    likes={100}
                    comments={2100}
                    description="🚀 Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed"
                  />
                  <Post
                    username="user_name"
                    domain="Mern Stack Developer"
                    tags={{
                      tagExample: "7F0303",
                      "Linkedln Contest winner": "16037F",
                    }}
                    images={[
                      "https://th.bing.com/th/id/R.5969dd2ca999fb68dfe6d292cafc1c84?rik=TCyiF%2f3rRqo0Nw&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2014%2f07%2fLandscape-wallpapers-40.jpg&ehk=CMy18Uy0M72454Y8iWPLx3sH%2fL%2bd9vD4Ne4RSWxtHzI%3d&risl=&pid=ImgRaw&r=0",
                      "https://th.bing.com/th/id/R.2c57158421e70052a5cd37e63505472a?rik=rZ1a9SDg8etiJQ&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2014%2f07%2fLandscape-wallpapers-20.jpg&ehk=efYckqX6isJQS4qYHcoS%2bSi9PByYf0bj3Xg9h%2fwwTyc%3d&risl=&pid=ImgRaw&r=0",
                      "https://wonderfulengineering.com/wp-content/uploads/2014/07/Landscape-wallpapers-34.jpg",
                    ]}
                    likes={100}
                    comments={2100}
                    description="🚀 Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed"
                  />
                </>
              )}
              {activeTab === "Placements" && (
                <p>Placements content goes here.</p>
              )}
              {activeTab === "Events" && <p>Events content goes here.</p>}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
