import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import reportIcon from "./assets/report_icon.svg";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import ButtonShowcase from "./components/ui/ButtonShowCase";
import SignupForm from "./components/forms/SignupForm";
import InputField from "./components/ui/InputField";
import CheckMailOtp from "./components/forms/CheckMailOtp";
import ForgotPassword from "./components/forms/ForgotPassword";
import { Route, Routes, useNavigate } from "react-router-dom";
import Button from "./components/ui/Button";
import postImage from "./components/images/welcome_Icon.png";
import HomePage from "./components/pages/HomePage";
import UploadPostForm from "./components/forms/UploadPostForm1";

import "./App.css";
import LoginForm from "./components/forms/LoginForm";
import ForgotPasswordOtp from "./components/forms/forgotPasswordOtp";
import ProfileStep1 from "./components/forms/ProfileStep1";
import ProfileStep2 from "./components/forms/ProfileStep2";
import ProfileStep3 from "./components/forms/ProfileStep3";
import LoginPage from "./components/pages/Login";
import SignupPage from "./components/pages/Signup";
import Post from "./components/ui/Post";
import SideBar from "./components/ui/SideBar";
import NavBar from "./components/ui/NavBar";
import UserProfileCard from "./components/ui/UserProfileCard";
import OwnPost from "./components/ui/OwnPost";
import ProfilePage from "./components/pages/ProfilePage";
import CommentsPad from "./components/ui/CommentsPad";
import { commentsData } from "./data";

function App() {
  const navigate = useNavigate();
  // <Route path="/button-showcase" element={<ButtonShowcase />} />
  const userProfileData = {
    username: "John Doe",
    domain: "Web Development",
    tags: {
      tagExample: "ff5722",
      debugger: "3b82f6",
    },
    userProfile: "",
    batch: "2025",
    githubLink: "https://github.com/johndoe",
    linkedlnLink: "https://linkedin.com/in/johndoe",
    email: "john.doe@example.com",
    bio: "Passionate developer with experience in building scalable web applications.Passionate developer with experience in building scalable web applications.Passionate developer with experience in building scalable web applications.Passionate developer with experience in building scalable web applications.Passionate developer with experience in building scalable web applications.Passionate developer with experience in building scalable web applications.Passionate developer with experience in building scalable web applications.Passionate developer with experience in building scalable web applications.",
    rank: 6,
    postCount:10,
    followersCount:256,
    leetcodeUsername: "ItsSadhik",
    skillsArray: ["JavaSc", "React", "Node.js", "TypeScript"],
  };

  const postsData = [
    {
      images: [
        "https://th.bing.com/th/id/OIP.U8JB9b-gG9zf8MH3r6idbgHaE8?rs=1&pid=ImgDetMain","https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/01/the-bad-batch-tech.jpg","https://th.bing.com/th/id/OIP.U8JB9b-gG9zf8MH3r6idbgHaE8?rs=1&pid=ImgDetMain"
      ],
      likes: 120,
      commentsCount: 30,
      comments: [],
      description: "This is my latest project showcase!",
    },
    {
      images: [
        "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/01/the-bad-batch-tech.jpg",
      ],
      likes: 80,
      commentsCount: 15,
      comments:commentsData,
      description: "Exploring new technologies every day!",
    },
    {
      images: [
        "https://th.bing.com/th/id/OIP.KwCCuz0alNOKhgf_4shI7AHaFF?w=640&h=440&rs=1&pid=ImgDetMain",
      ],
      likes: 80,
      commentsCount: 15,
      comments: [],
      description: "Exploring new technologies every day!",
    },
    {
      images: [
        "https://th.bing.com/th/id/OIP.NKv4YX7bul61AY8Ye_YYlwHaNK?rs=1&pid=ImgDetMain",
      ],
      likes: 80,
      commentsCount: 15,
      comments:commentsData,

      description: "Exploring new technologies every day!",
    },
    {
      images: [""],
      likes: 80,
      commentsCount: 15,
      comments:commentsData,
      description: "Exploring new technologies every day!",
    },
  ];

  

  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex justify-center py-80">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="primary"
                    label="Buttons"
                    onClick={() => navigate("/buttons")}
                  ></Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outlined"
                    label="Sign Up Form"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/signUp")}
                  ></Button>
                  <Button
                    variant="outlined"
                    label="CheckMailOtp Form"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/checkMailOtp")}
                  ></Button>
                  <Button
                    variant="outlined"
                    label="Login Form"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/login")}
                  ></Button>
                  <Button
                    variant="outlined"
                    label="ForgotPassword Form"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/forgotPassword")}
                  ></Button>
                  <Button
                    variant="outlined"
                    label="ForgotPasswordOtp Form"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/forgotPasswordOtp")}
                  ></Button>
                  <Button
                    variant="outlined"
                    label="ProfileStep1 Form"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/profileStep1")}
                  ></Button>
                  <Button
                    variant="outlined"
                    label="ProfileStep2 Form"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/profileStep2")}
                  ></Button>
                  <Button
                    variant="outlined"
                    label="ProfileStep3 Form"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/profileStep3")}
                  ></Button>
                  <Button
                    variant="outlined-success"
                    label="Login Page"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/loginPage")}
                  ></Button>
                  <Button
                    variant="outlined-success"
                    label="Sidebar"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/sidebar")}
                  ></Button>
                  <Button
                    variant="outlined-success"
                    label="Navbar"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/navbar")}
                  ></Button>
                  <Button
                    variant="success"
                    label="Home"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/home")}
                  ></Button>
                  <Button
                    variant="success"
                    label="uploadPostForm"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/uploadPostForm")}
                  ></Button>
                  <Button
                    variant="outlined-success"
                    label="UserProfileCard"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/userProfileCard")}
                  ></Button>
                  <Button
                    variant="outlined-success"
                    label="OwnPost"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/ownPost")}
                  ></Button>

                  <Button
                    variant="success"
                    label="Profile page"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/profile")}
                  ></Button>

                  <Button
                    variant="outlined-danger"
                    label="Comments Pad"
                    iconLeft={
                      <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                    }
                    onClick={() => navigate("/commentsPad")}
                  ></Button>
                </div>
              </div>
            </>
          }
        />

        <Route path="/buttons" element={<ButtonShowcase />} />
        <Route path="/signUp" element={<SignupPage></SignupPage>} />
        <Route path="/checkMailOtp" element={<CheckMailOtp></CheckMailOtp>} />
        <Route path="/sidebar" element={<SideBar></SideBar>} />
        <Route path="/home" element={<HomePage></HomePage>} />
        <Route
          path="/commentsPad"
          element={
            <>
              <div className="min-h-screen bg-customBg p-4">
                <h1 className="text-2xl font-bold mb-6">Comments </h1>
                <CommentsPad comments={commentsData} />
              </div>
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <ProfilePage
              userProfileData={userProfileData}
              ownPosts={postsData}
            ></ProfilePage>
          }
        />
        <Route path="/navbar" element={<NavBar></NavBar>} />

        <Route
          path="/userProfileCard"
          element={
            <>
              <UserProfileCard
                username="Sadhikul Vahad"
                domain="MERN Stack"
                rank={2}
                tags={{
                  tagExample: "ff5722", // Orange
                  debugger: "3b82f6", // Blue
                }}
                userProfile="https://th.bing.com/th/id/OIP.rSrx3v6uQT3_WRR_eDAhHAAAAA?rs=1&pid=ImgDetMain" // Replace with the user's profile image URL
                batch="BCK 198"
                githubLink="https://github.com/yourprofile"
                linkedlnLink="https://linkedin.com/in/yourprofile"
                email="your-email@example.com"
                bio="Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed.Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed.Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed.Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed.Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed.Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed.Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed.Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed."
                leetcodeUsername="ItsSadhik"
                skillsArray={[
                  "Software Skills",
                  "Python Django",
                  "Websockets",
                  "Software Skills",
                ]}
              />
            </>
          }
        />

        {/* <Route path="/uploadPostForm" element={<UploadPostForm></UploadPostForm>} /> */}
        <Route
          path="/forgotPassword"
          element={
            <>
              <Post
                userProfile="https://th.bing.com/th/id/OIP.rSrx3v6uQT3_WRR_eDAhHAAAAA?rs=1&pid=ImgDetMain"
                username="user_name"
                domain="Mern Stack Developer"
                tags={{
                  tagExample: "7F0303",
                  Linkedln: "16037F",
                }}
                isLiked={true}
                images={[
                  "https://th.bing.com/th/id/R.5969dd2ca999fb68dfe6d292cafc1c84?rik=TCyiF%2f3rRqo0Nw&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2014%2f07%2fLandscape-wallpapers-40.jpg&ehk=CMy18Uy0M72454Y8iWPLx3sH%2fL%2bd9vD4Ne4RSWxtHzI%3d&risl=&pid=ImgRaw&r=0",
                  "https://th.bing.com/th/id/R.2c57158421e70052a5cd37e63505472a?rik=rZ1a9SDg8etiJQ&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2014%2f07%2fLandscape-wallpapers-20.jpg&ehk=efYckqX6isJQS4qYHcoS%2bSi9PByYf0bj3Xg9h%2fwwTyc%3d&risl=&pid=ImgRaw&r=0",
                  "https://wonderfulengineering.com/wp-content/uploads/2014/07/Landscape-wallpapers-34.jpg",

                  // "https://th.bing.com/th/id/R.b5f1b9ff9e51326b98712b3987a9d317?rik=UtS26DUJIKhqMA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f7%2f0%2f5%2f674229.jpg&ehk=%2bHsg3VpxgbB6MmSqfC%2bcyUHdOnQjTgZ3UbdiGWLoalw%3d&risl=&pid=ImgRaw&r=0",
                  // "https://wallpapercave.com/wp/wp2890892.jpg",
                  // "https://wallpaperaccess.com/full/3304781.jpg"
                ]}
                likes={100}
                comments={2100}
                description="🚀 Explore the latest in technology, innovation, and trends shapin the future. From groundbreaking advancements to practical applications, our insights keep you informed Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed"
              />
            </>
          }
        />

        <Route
          path="/ownPost"
          element={
            <>
              <OwnPost
                images={[
                  "https://th.bing.com/th/id/R.5969dd2ca999fb68dfe6d292cafc1c84?rik=TCyiF%2f3rRqo0Nw&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2014%2f07%2fLandscape-wallpapers-40.jpg&ehk=CMy18Uy0M72454Y8iWPLx3sH%2fL%2bd9vD4Ne4RSWxtHzI%3d&risl=&pid=ImgRaw&r=0",
                  "https://th.bing.com/th/id/R.2c57158421e70052a5cd37e63505472a?rik=rZ1a9SDg8etiJQ&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2014%2f07%2fLandscape-wallpapers-20.jpg&ehk=efYckqX6isJQS4qYHcoS%2bSi9PByYf0bj3Xg9h%2fwwTyc%3d&risl=&pid=ImgRaw&r=0",
                  "https://wonderfulengineering.com/wp-content/uploads/2014/07/Landscape-wallpapers-34.jpg",
                ]}
                likes={100}
                commentsCount={2100}
                description="🚀 Explore the latest in technology, innovation, and trends shapin the future. From groundbreaking advancements to practical applications, our insights keep you informed Explore the latest in technology, innovation, and trends shaping the future. From groundbreaking advancements to practical applications, our insights keep you informed"
              />
            </>
          }
        />
        <Route path="/login" element={<LoginPage></LoginPage>} />
        <Route
          path="/forgotPasswordOtp"
          element={<ForgotPasswordOtp></ForgotPasswordOtp>}
        />
        <Route path="/profileStep1" element={<ProfileStep1></ProfileStep1>} />
        <Route path="/profileStep2" element={<ProfileStep2></ProfileStep2>} />
        <Route path="/profileStep3" element={<ProfileStep3></ProfileStep3>} />
        <Route path="/loginPage" element={<LoginPage></LoginPage>} />
      </Routes>
    </>
  );
}

export default App;
