import React from "react";
import SignupForm from "../forms/SignupForm";
import welcomeIcon from "../images/avatar_3.png";

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-6/12 bg-blue-50 flex-col justify-center items-center px-10">
        {/* Welcome Header */}
        <h1 className="text-3xl font-bold text-black mb-4">Get Started for Free</h1>
        <p className="text-gray-400 text-sm text-center">
          Your Perfect Platform for Collaboration
        </p>
        {/* Add the 3D character image */}
        <img
          src={welcomeIcon}
          alt="Welcome Illustration"
          className="mt-6 max-w-full w-96 h-auto"
        />
      </div>

      {/* Right Section */}
      <div className="w-full flex items-center justify-center p-8 bg-">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
