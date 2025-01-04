import React, { useState } from "react";

interface InputFieldProps {
  type: "text" | "password" | "email" | "number" | "date" | "otp" | "select";
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  disabled?: boolean;
  className?: string;
  subtext?: string;
  subtextStatus?: "normal" | "success" | "danger";
  otpLength?: number; // For OTP type, specify the number of digits
  otpValues?: string[]; // Array to store OTP values
  onOtpChange?: (otp: string[]) => void; // Callback for OTP changes
  options?: string[]; // For select type, specify options
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  label,
  placeholder = "",
  value = "",
  onChange,
  disabled = false,
  className = "",
  subtext = "",
  subtextStatus = "normal",
  otpLength = 6,
  otpValues = [],
  onOtpChange = () => {},
  options = [], // New prop for select options
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getSubtextClass = () => {
    switch (subtextStatus) {
      case "success":
        return "text-start ps-2 text-customGreen";
      case "danger":
        return "text-start ps-2 text-customRed";
      default:
        return "text-start ps-2 text-gray-400";
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otpValues];
      newOtp[index] = value;
      onOtpChange(newOtp);

      // Automatically focus the next field
      if (value && index < otpLength - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    }
  };

  if (type === "otp") {
    return (
      <div className={`relative w-full ${className}`}>
        {/* Label */}
        <label className="block text-gray-400 mb-2">{label}</label>

        {/* OTP Fields */}
        <div className="flex justify-between">
          {Array.from({ length: otpLength }, (_, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={otpValues[index] || ""}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={disabled}
              className="w-12 h-12 text-lg text-center bg-transparent border border-gray-800 rounded-md focus:ring-1 focus:ring-gray-500 focus:outline-none"
            />
          ))}
        </div>

        {/* Subtext */}
        {subtext && (
          <p className={`mt-1 text-sm ${getSubtextClass()}`}>{subtext}</p>
        )}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className={`relative w-full ${className}`}>
        {/* Label */}
        <label className="absolute left-3 transform -translate-y-1/2 transition-all text-sm text-gray-500 bg-customBg">
          {label}
        </label>

        {/* Select Dropdown */}
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full ps-3 pe-3 pt-4 pb-3 bg-transparent border border-gray-800 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          {options.map((option, index) => (
            <option
              key={index}
              value={option} // Placeholder has an empty value
              disabled={index === 0} // Disable the placeholder option
              className={`${
                index === 0 ? "text-gray-400" : "text-white"
              } bg-gray-900`}
            >
              {option}
            </option>
          ))}
        </select>

        {/* Subtext */}
        {subtext && (
          <p className={`mt-1 text-sm ${getSubtextClass()}`}>{subtext}</p>
        )}
      </div>
    );
  }

  if (type === "date") {
    return (
      <div className={`relative w-full ${className}`}>
        {/* Label */}
        <label
          className={`absolute left-3 transform -translate-y-1/2 transition-all text-gray-500 top-0 text-sm bg-customBg"
        }`}
        >
          {label}
        </label>

        {/* Input Field */}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className="w-full ps-3 pe-3 pt-5 pb-2 bg-transparent border border-gray-800 rounded-md text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500"
        />

        {/* Subtext */}
        {subtext && (
          <p className={`mt-1 text-sm ${getSubtextClass()}`}>{subtext}</p>
        )}
      </div>
    );
  }

  const inputId = `input-${label?.replace(/\s+/g, "-").toLowerCase()}`; // Generate a unique ID for the input

  // Default input field for non-OTP and non-select types
  return (
    <div className={`relative w-full ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`absolute left-3 transform -translate-y-1/2 transition-all text-gray-500 ${
            isFocused || value
              ? "top-0 text-sm text-gray-300 bg-customBg"
              : subtext
              ? "top-1/3 text-base"
              : "top-1/2 text-base"
          }`}
        >
          {label}
        </label>
      )}

      {/* Input Field */}
      <input
        id={inputId}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        className="w-full ps-3 pe-3 pt-5 pb-2 bg-transparent border border-gray-800 rounded-md text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500"
      />

      {/* Subtext */}
      {subtext && (
        <p className={`mt-1 text-sm ${getSubtextClass()}`}>{subtext}</p>
      )}
    </div>
  );
};

export default InputField;
