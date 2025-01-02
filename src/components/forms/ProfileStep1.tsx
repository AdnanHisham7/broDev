import React, { useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ProfileStep1: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [batch, setBatch] = useState<string>("");

  const handleNext = () => {
    console.log("Step 1 Data:", { firstName, lastName, domain, batch });
    // Add logic to navigate to the next step
  };

  return (
    <div className="max-w-md lg:min-w-96 mx-auto bg-customBg text-white p-6 rounded-lg border border-gray-800">
      {/* Step Indicator */}
      <div className="flex flex-col gap-3 items-center mb-6 ">
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 flex items-center justify-center bg-white text-black font-semibold rounded-full">
            1
          </div>
          <div className="h-px w-10 bg-gray-500"></div>
          <div className="w-16 h-16 flex items-center justify-center bg-gray-500 text-white font-semibold rounded-full">
            2
          </div>
          <div className="h-px w-10 bg-gray-500"></div>
          <div className="w-16 h-16 flex items-center justify-center bg-gray-500 text-white font-semibold rounded-full">
            3
          </div>
        </div>
        <p className="text-sm text-gray-400">Step 1 out of 3</p>
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
          label="First Name"
          placeholder="Your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <InputField
          type="text"
          label="Last Name"
          placeholder="Your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <InputField
          type="select"
          label="Domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          options={["Choose Domain","MERN stack", "MEAN stack", "Full-stack"]}
        />

        <InputField
          type="text"
          label="Batch"
          placeholder="Your batch"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          {/* Back Button */}
          <Button
            label="Back"
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
            onClick={() => console.log("Next Step")} // Replace with your forward navigation logic
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileStep1;
