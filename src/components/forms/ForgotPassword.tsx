import React, { useState } from "react";
import InputField from "../ui/InputField";
import forgotLockIcon from '../images/forgot_lock.svg'
import Button from "../ui/Button";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    console.log("Sending password reset request for", email);
    // Add your forgot password logic here (e.g., API call)
  };

  return (
    <div className="max-w-md w-full mx-auto bg-customBg text-white p-6 rounded-lg shadow-lg text-center">
      {/* Icon */}
      <img
        src={forgotLockIcon}
        alt="Mail Icon"
        className="mx-auto w-28 h-28 mb-3"
      />

      {/* Header */}
      <h2 className="text-2xl font-semibold mb-2">Forgot Your Password?</h2>
      <p className="text-sm text-gray-400 mb-8">
        We have sent a 6-digit confirmation email to your email. Please enter
        the code in the box below to verify your email.
      </p>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleForgotPassword();
        }}
        className="space-y-4"
      >
        <InputField
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
        />

        {/* Submit Button */}
        <Button
          label="Send Request"
          onClick={handleForgotPassword}
          type="submit"
          variant="primary"
          className="w-full"
        />
      </form>

      {/* Footer Link */}
      <p className="text-sm font-semibold mt-4 text-center">
        <a
          href="/login"
          className="text-gray-400 hover:text-gray-200 transition-colors duration-300"
        >
          {"←"} Return to Sign In
        </a>
      </p>
    </div>
  );
};

export default ForgotPassword;
