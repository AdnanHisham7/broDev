import React from "react";
import LoginForm from "../forms/LoginForm"; // Assuming the LoginForm component is in the same directory
import welcomeIcon from "../images/avatar_1.webp";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-5/12 bg-blue-50 flex-col justify-center items-center px-10">
        {/* Welcome Header */}
        <h1 className="text-3xl font-bold  text-black mb-4">Heyy, Welcome Back!</h1>
        <p className="text-gray-400 text-sm text-center">
          Your Perfect Platform for Collaboration
        </p>
        {/* Add the 3D character image */}
        <img
          src={welcomeIcon}
          alt="Welcome Illustration"
          className="mt-6 max-w-full w-72 h-auto"
        />
      </div>

      {/* Right Section */}
      <div className="w-10/12 flex items-center justify-center p-8 bg-">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
