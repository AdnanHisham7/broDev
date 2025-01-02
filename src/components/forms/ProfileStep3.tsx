import React, { useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faUser,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const ProfileStep3: React.FC = () => {
  const [dob, setDob] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [skills, setSkills] = useState<string>("");

  const handleNext = () => {
    console.log("Step 2 Data:", { dob, gender, skills });
    // Add logic to navigate to the next step
  };

  return (
    <>
      {/* Skip Button */}
      <div className="flex justify-end mb-4">
        <Button
          label="Skip"
          variant="secondary"
          className="text-xs text-gray-400 hover:text-white"
          onClick={() => console.log("Skip Step")}
        />
      </div>
      <div className="max-w-md lg:min-w-96 mx-auto bg-customBg text-white p-6 rounded-lg border border-gray-800">
        {/* Skip Button */}

        {/* Step Indicator */}
        <div className="flex flex-col gap-3 items-center mb-6 ">
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 flex items-center justify-center bg-customGreen text-white font-semibold rounded-full">
            <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className="h-px w-10 bg-customGreen"></div>
            <div className="w-16 h-16 flex items-center justify-center bg-customGreen text-white font-semibold rounded-full">
            <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className="h-px w-10 bg-customGreen"></div>
            <div className="w-16 h-16 flex items-center justify-center bg-white text-black font-semibold rounded-full">
              3
            </div>
          </div>
          <p className="text-sm text-gray-400">Step 3 out of 3</p>
        </div>

        {/* Form Fields */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          className="space-y-4"
        >
          <InputField
            type="text"
            label="Linkedln Profile URL"
            placeholder="Enter an available username"
          />

          <InputField
            type="text"
            label="GitHub Profile URL"
            placeholder="Enter an available username"
          />

          <InputField
            type="text"
            label="Leetcode email"
            placeholder="Enter an available username"
          />


          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            {/* Back Button */}
            <Button
              label="Prev"
              iconLeft={<FontAwesomeIcon icon={faArrowLeft} />}
              variant="outlined"
              className="w-1/3 mt-5"
              onClick={() => console.log("Go Back")} // Replace with your back navigation logic
            />

            {/* Next Button */}
            <Button
              label="Finish"
              type="submit"
              variant="primary"
              className="w-1/3 mt-5"
              onClick={handleNext} // Replace with your forward navigation logic
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileStep3;