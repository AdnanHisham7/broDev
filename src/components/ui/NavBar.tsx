import React, { useState, useEffect, useRef } from "react";
import BrandLogo from "../images/send_mail_envelope.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faFire,
  faBell,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import UploadPostForm1 from "../forms/UploadPostForm1";
import UploadPostForm2 from "../forms/UploadPostForm2";
import UploadPostForm3 from "../forms/UploadPostForm3";
import SearchCard from "./SearchCard";
import UploadPostStepper from "./UploadPostStepper";

interface NavBarProps {
  onSearch: (query: string) => void;
  searchResults: { username: string; profileImage: string; domain:string; following:boolean; }[];
  isLoading: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ onSearch, searchResults, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [showModal, setShowModal] = useState(false); // For fade-in/out effect
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setShowModal(true), 10);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  return (
    <>
      <nav className="bg-transparent rounded-b-xl border border-gray-800 text-white flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-2">
          <img
            src={BrandLogo}
            alt="Brand Logo"
            className="h-8 w-8 rounded-md"
          />
          <h1 className="text-xl font-bold">Hakuna</h1>
        </div>

        <div className="hidden md:flex items-center bg-customGray rounded-2xl px-4 py-2 space-x-2 w-1/3">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-white focus:outline-none w-full text-sm"
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow click on dropdown items
          />
          <button className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>

        {/* Search Results Dropdown */}
        {isFocused && (
          <div className="absolute top-16 left-0 right-32 mx-auto w-1/3 bg-customGray rounded-lg shadow-lg z-[9999]">
            {isLoading ? (
              <div className="p-4 text-center text-sm text-gray-300">Loading...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((user, index) => (
                <SearchCard
                  key={index}
                  username={user.username}
                  profileImage={user.profileImage}
                  domain={user.domain}
                  following={user.following}
                />
              ))
            ) : (
              <div className="p-4 text-sm text-center text-gray-300">
                No results found
              </div>
            )}
          </div>
        )}

        <div className="flex items-center space-x-3 md:space-x-6 text-xl">
          <Button
            label="New Post"
            variant="primary"
            className="text-sm px-4 py-2 rounded-md"
            onClick={handleOpenModal}
          />
          <div className="flex items-center space-x-1 bg-gray-800 px-2 py-1 rounded-md">
            <FontAwesomeIcon icon={faFire} />
            <span className="text-lg">5</span>
          </div>
          <button className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faBell} />
          </button>
          <button className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faCog} />
          </button>
          <a href="/profile/JohnDoe" className="w-8 h-8 rounded-full bg-gray-500"></a>
        </div>
      </nav>

      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
            showModal ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            ref={modalRef}
            className={`w-full max-w-xl ${
              showModal ? "scale-100" : "scale-95"
            } `}
          >
            {/* <button
              onClick={handleCloseModal}
              className="absolute top-0 right-20 text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button> */}
            <UploadPostStepper onComplete={handleCloseModal} />
          </div>
        </div>
      )}

    </>
  );
};

export default NavBar;
