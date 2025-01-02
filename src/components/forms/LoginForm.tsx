import React, { useState } from "react";
import InputField from "../ui/InputField"; // Assuming InputField is in the same directory
import Button from "../ui/Button"; // Assuming Button is in the same directory

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with", { email, password });
    // Add your login logic here (e.g., API call)
  };

  return (
    <div className="max-w-md w-full lg:min-w-96 mx-auto bg-transparent text-white p-6 rounded-lg shadow-lg">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-1 text-start">Sign in to my account</h2>
      <p className="text-sm text-gray-400 mb-8 text-start">
        Didn’t have an account?{" "}
        <a href="/signup" className="text-blue-500 hover:underline">
          Register
        </a>
      </p>

      {/* Input Fields */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="space-y-4"
      >
        {/* Email Field */}
        <InputField
          type="email"
          label="Email Address or Username"
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

        {/* Forgot Password Link */}
        <div className="text-right">
          <a
            href="/forgotPassword"
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-300"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            label="Sign In"
            onClick={handleLogin}
            type="submit"
            variant="primary"
            className="w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
