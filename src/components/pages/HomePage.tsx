import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import Post from "../ui/Post";
import { Toaster } from "sonner";
import { users, manageUsers, HomePagePostsData } from "../../data";
import CommentsPad, { Comment } from "../ui/CommentsPad";
// import { commentsData } from "../../data";
import AnimatedContent from "../ui/AnimatedContent";
import PlacementCard from "../ui/PlacementCard";

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Posts");
  const [visiblePosts, setVisiblePosts] = useState(10);
  const [isScrolling, setIsScrolling] = useState(false);

  const [showCommentsPad, setShowCommentsPad] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const [posts, setPosts] = useState(
    HomePagePostsData.map((post) => ({ ...post }))
  );

  const [postComments, setPostComments] = useState<{
    [postId: number]: Comment[];
  }>({});

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // sample current user, should rplace with redux user
  const currentUser = {
    username: "dsds",
    profileImage:
      "https://media.licdn.com/dms/image/v2/D5603AQF2M10x7txapA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719020690261?e=2147483647&v=beta&t=GqWl-2UFahRc_tV1f5wzBJE2qlBvr27_j5stMCVwWik",
  };

  // Initialize comments when a post is selected
  useEffect(() => {
    if (selectedPostId !== null && !postComments[selectedPostId]) {
      const initialComments =
        HomePagePostsData[selectedPostId]?.commentsData || [];
      setPostComments((prev) => ({
        ...prev,
        [selectedPostId]: initialComments,
      }));
    }
  }, [selectedPostId]);

  // Helper function to recursively add nested comments
  const addNestedComment = (
    comments: Comment[],
    parentId: number,
    newComment: Comment
  ): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          nestedComments: [newComment, ...comment.nestedComments],
          nestedCommentsCount: comment.nestedCommentsCount + 1,
        };
      } else if (comment.nestedComments.length > 0) {
        return {
          ...comment,
          nestedComments: addNestedComment(
            comment.nestedComments,
            parentId,
            newComment
          ),
        };
      }
      return comment;
    });
  };

  // Handle adding new comments
  const handleAddComment = (
    postId: number,
    newCommentText: string,
    parentCommentId?: number
  ) => {
    const post = HomePagePostsData[postId];
    const isOwner = post.username === currentUser.username;

    const newComment: Comment = {
      id: Date.now(),
      username: currentUser.username,
      userProfile: currentUser.profileImage,
      comment: newCommentText,
      likesCount: 0,
      isLiked: false,
      isOwner: isOwner,
      nestedCommentsCount: 0,
      nestedComments: [],
    };

    if (parentCommentId) {
      setPostComments((prev) => ({
        ...prev,
        [postId]: addNestedComment(
          prev[postId] || [],
          parentCommentId,
          newComment
        ),
      }));
    } else {
      setPostComments((prev) => ({
        ...prev,
        [postId]: [newComment, ...(prev[postId] || [])],
      }));
    }
  };

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

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 500 &&
        activeTab === "Posts" &&
        !isScrolling &&
        visiblePosts < HomePagePostsData.length
      ) {
        setIsScrolling(true);
        setVisiblePosts((prev) =>
          Math.min(prev + 10, HomePagePostsData.length)
        );
        setTimeout(() => setIsScrolling(false), 500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visiblePosts, isScrolling, activeTab]);

  // Reset visible posts when tab changes
  useEffect(() => {
    setVisiblePosts(10);
  }, [activeTab]);

  const handleLike = (postId: number, newIsLiked: boolean) => {
    console.log("hi there", postId, newIsLiked, posts);
    setPosts(
      posts.map((post) =>
        post.id == postId
          ? {
              ...post,
              isLiked: newIsLiked,
              likes: newIsLiked ? post.likes + 1 : post.likes - 1,
            }
          : post
      )
    );
  };

  return (
    <>
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

      <Toaster richColors position="bottom-right"></Toaster>

      {/* Content based on active tab */}
      {/* Main Container */}
      <div className="relative flex gap-4">
        {/* Left Side: Main Content */}
        <div className="flex-1">
          <div className="flex flex-col gap-10">
            {activeTab === "Posts" &&
              posts.slice(0, visiblePosts).map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  onClickComment={(postId) => {
                    setSelectedPostId(postId);
                    setShowCommentsPad(true);
                  }}
                  onClickLike={handleLike}
                  username={post.username}
                  domain={post.domain}
                  tags={post.tags}
                  images={post.images}
                  likes={post.likes}
                  comments={post.comments}
                  description={post.description}
                  isLiked={post.isLiked}
                />
              ))}
            {activeTab === "Placements" && <p>Placements content goes here.</p>}
            {activeTab === "Events" && <p>Events content goes here.</p>}
          </div>
        </div>

        {/* Right Side: Sticky Placement Card */}
        <div className="hidden lg:flex flex-col w-64 shadow-lg h-[80vh] top-20 ">
          <PlacementCard
            technologies={[
              { name: "MerStack", count: 200, percentage: 20 },
              { name: "Flutter", count: 250, percentage: 60 },
              { name: "Python", count: 200, percentage: 20 },
              { name: "Python", count: 200, percentage: 20 },
              { name: "Python", count: 200, percentage: 20 },
              { name: "Python", count: 200, percentage: 20 },
              { name: "Python", count: 200, percentage: 20 },
              { name: "Python", count: 200, percentage: 20 },
              { name: "Python", count: 200, percentage: 20 },
              { name: "Python", count: 200, percentage: 20 },
              { name: "Python", count: 200, percentage: 20 },
              { name: "Python", count: 200, percentage: 20 },
            ]}
            totalPlacements={1918}
            onShowMore={() => {}}
          ></PlacementCard>
        </div>

        {/* For Small Screens: Bottom Drawer */}
        {showCommentsPad && ( //lg-hidden
          // <div className="fixed bottom-0 left-0 w-full max-h-[85vh] z-20 overflow-hidden">
          <div className="fixed bottom-0 left-0 w-full z-20">
            <AnimatedContent
              distance={150}
              direction="vertical"
              reverse={false}
              config={{ tension: 80, friction: 15 }}
              initialOpacity={0.9}
              animateOpacity
              scale={1}
              threshold={0.1}
            >
              <CommentsPad
                comments={postComments[selectedPostId!] || []}
                onClose={() => setShowCommentsPad(false)}
                onAddComment={(newCommentText, parentCommentId) =>
                  handleAddComment(
                    selectedPostId!,
                    newCommentText,
                    parentCommentId
                  )
                }
              />
            </AnimatedContent>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
