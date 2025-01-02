import React, { useState } from "react";
import InputField from "../ui/InputField";
import sendMailIcon from "../images/send_mail_envelope.png";
import Button from "../ui/Button";

const CheckMailOtp: React.FC = () => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));

  const handleVerify = () => {
    const enteredOtp = otpValues.join("");
    console.log("Verifying OTP:", enteredOtp);
    // Add your OTP verification logic here
  };

  return (
    <div className="max-w-md lg:min-w-96 mx-auto bg-customBg text-white p-6 rounded-lg">
      <img
        src={sendMailIcon}
        alt="Mail Icon"
        className="mx-auto w-36 h-36 mb-2"
      />
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-4">Please check your email!</h2>
      <p className="text-sm text-gray-400 mb-10">
        We have sent a 6-digit confirmation email to your email. Please enter
        the code in the box below to verify your email.
      </p>

      <InputField
        type="email"
        label="Email Address"
        placeholder="Enter your email address"
        value="ad.hishamkk@gmail.com"
        disabled
        className="mb-6"
      />

      {/* OTP Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleVerify();
        }}
        className="space-y-4"
      >
        <InputField
          type="otp"
          otpLength={6}
          otpValues={otpValues}
          onOtpChange={setOtpValues}
        />

        {/* Verify Button */}
        <div className="pt-6">
          <Button
            label="Verify"
            onClick={handleVerify}
            type="submit"
            variant="primary"
            className="w-full"
          />
        </div>
      </form>

      {/* Resend Code */}
      <p className="text-sm text-gray-400 mt-4 text-center">
        Didn’t receive a code?{" "}
        <a href="/checkMailOtp" className="text-blue-500 hover:underline">
          Resend code
        </a>
      </p>

      <p className="text-sm font-semibold mt-4 text-center">
        <a
          href="/signup"
          className="text-gray-400 hover:text-gray-200 transition-colors duration-300"
        >
          {"←"} Back to Sign Up{" "}
        </a>
      </p>
    </div>
  );
};

export default CheckMailOtp;
