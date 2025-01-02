import React, { useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import sendMailIcon from "../images/send_mail.svg";

const ForgotPasswordOtp: React.FC = () => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleUpdatePassword = () => {
    const enteredOtp = otpValues.join("");
    console.log("Updating Password with OTP:", enteredOtp, password);
    // Add your password update and OTP verification logic here
  };

  return (
    <div className="max-w-md lg:min-w-96 mx-auto bg-customBg text-white p-6 rounded-lg">
      <img
        src={sendMailIcon}
        alt="Mail Icon"
        className="mx-auto w-32 h-32 mb-3"
      />
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-4">Request sent successfully!</h2>
      <p className="text-sm text-gray-400 mb-10">
        We have sent a 6-digit confirmation email to your email. Please enter
        the code in the box below to verify your email.
      </p>

      {/* Email Address Field */}
      <InputField
        type="email"
        label="Email Address"
        placeholder="Enter your email address"
        value="ofnasp549@gmail.com" // Replace with dynamic email if needed
        disabled
        className="mb-6"
      />

      {/* OTP Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdatePassword();
        }}
        className="space-y-4"
      >
        <InputField
          type="otp"
          otpLength={6}
          otpValues={otpValues}
          onOtpChange={setOtpValues}
        />

        {/* Password Fields */}
        <InputField
          type="password"
          label="Password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4"
        />
        <InputField
          type="password"
          label="Confirm Password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-4"
        />

        {/* Update Password Button */}
        <div className="pt-6">
          <Button
            label="Update Password"
            onClick={handleUpdatePassword}
            type="submit"
            variant="primary"
            className="w-full"
          />
        </div>
      </form>

      {/* Resend Code */}
      <p className="text-sm text-gray-400 mt-4 text-center">
        Didn’t receive a code?{" "}
        <a href="/forgotPasswordOtp" className="text-blue-500 hover:underline">
          Resend Code
        </a>
      </p>

      {/* Return to Sign In */}
      <p className="text-sm font-semibold mt-4 text-center">
        <a
          href="/login"
          className="text-gray-400 hover:text-gray-200 transition-colors duration-300"
        >
          {"←"} Return to Sign In{" "}
        </a>
      </p>
    </div>
  );
};

export default ForgotPasswordOtp;
