import React, { useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faUser,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

const ProfileStep2: React.FC = () => {
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
        variant="sticky"
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
          <div className="w-16 h-16 flex items-center justify-center bg-white text-black font-semibold rounded-full">
            2
          </div>
          <div className="h-px w-10 bg-gray-500"></div>
          <div className="w-16 h-16 flex items-center justify-center bg-gray-500 text-white font-semibold rounded-full">
            3
          </div>
        </div>
        <p className="text-sm text-gray-400">Step 2 out of 3</p>
      </div>

      {/* Profile Image Upload */}
      <div className="flex justify-center gap-4 items-center mb-8">
        <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center">
          <FontAwesomeIcon icon={faUser} className="text-white text-xl" />
        </div>
        <Button
          label="Choose Profile"
          variant="sticky"
          className="text-xs text-gray-400 hover:text-white"
          onClick={() => console.log("Profile Picture Upload")}
          />
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
          type="date"
          label="D.O.B"
          placeholder="Your date of birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <InputField
          type="select"
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          options={["Choose Gender", "Male", "Female", "Other"]}
          />

        <InputField
          type="select"
          label="Skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          options={["Choose Skill", "MERN stack", "MEAN stack", "Full-stack"]}
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
            label="Next"
            type="submit"
            variant="primary"
            className="w-1/3 mt-5"
            iconRight={<FontAwesomeIcon icon={faArrowRight} />}
            onClick={handleNext} // Replace with your forward navigation logic
            />
        </div>
      </form>

      
    </div>
    </>
  );
};

export default ProfileStep2;
