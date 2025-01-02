import React, { useState } from "react";
import InputField from "../ui/InputField"; // Assuming InputField is in the same directory
import Button from "../ui/Button"; // Assuming Button is in the same directory

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("Signing up with", { username, email, password });
    // Add your signup logic here (e.g., API call)
  };

  return (
    <div className="max-w-md w-full lg:min-w-96 mx-auto bg-customBg text-white p-6 rounded-lg shadow-lg ">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-1 text-start">Create your account</h2>
      <p className="text-sm text-gray-400 mb-10 text-start">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Sign In
        </a>
      </p>

      {/* Input Fields */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
        className="space-y-4"
      >
        {/* Username Field */}
        <InputField
          type="text"
          label="Username"
          placeholder="Enter an available username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Email Field */}
        <InputField
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Field */}
        <InputField
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            
            label="Register"
            onClick={handleSignup}
            type="submit"
            variant="primary"
            className="w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
