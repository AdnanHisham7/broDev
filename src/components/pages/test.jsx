// import React, { useState } from "react";
// import NavBar from "../ui/NavBar";
// import SideBar from "../ui/SideBar";
// import Post from "../ui/Post";
// import Button from "../ui/Button";

// import CommentsPad from "../ui/CommentsPad";
// import { commentsData } from "../../data";

// const HomePage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState("Posts"); // State to handle active tab

//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* NavBar (Horizontal Stretch) */}
//       <div className="sticky top-0 z-10">
//         <NavBar />
//       </div>

//       <div className="flex flex-1 overflow-hidden">
//         {/* SideBar (Vertical Stretch and Sticky) */}
//         <div className="sticky top-0 h-screen w-64">
//           <SideBar />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-6 overflow-y-auto">
//           {/* Tabs for switching between "Posts", "Placements", "Events" */}
//           <div className="flex flex-wrap mb-8 text-xs gap-2 sm:flex-nowrap">
//             <Button
//               label="Posts"
//               variant={`${activeTab === "Posts" ? "primary" : "sticky"}`}
//               onClick={() => handleTabChange("Posts")}
//             />
//             <Button
//               label="Placements"
//               variant={`${activeTab === "Placements" ? "primary" : "sticky"}`}
//               onClick={() => handleTabChange("Placements")}
//             />
//             <Button
//               label="Events"
//               variant={`${activeTab === "Events" ? "primary" : "sticky"}`}
//               onClick={() => handleTabChange("Events")}
//             />
//           </div>

//           {/* Content based on active tab */}
//           <div className="flex flex-col gap-10">
//             {activeTab === "Posts" && (
//               <>
//               </>
//             )}
//             {activeTab === "Placements" && <p>Placements content goes here.</p>}
//             {activeTab === "Events" && <p>Events content goes here.</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
