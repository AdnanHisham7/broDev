import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faBullhorn,
  faChartBar,
  faBell,
  faUser,
  faInfoCircle,
  faSignOutAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

const SideBar: React.FC = () => {
  return (
    <div className="w-64 pb-16 h-screen bg-customBg border-r border-gray-800 text-white flex flex-col justify-between sticky top-0">
      {/* Top Section */}
      <div className="flex flex-col">
        <h2 className="text-sm font-bold ml-4 pt-4 sidebar-text">General</h2>
        <nav>
          <ul className="space-y-2 px-4 pt-4">
            <li className="flex items-center gap-3 py-2 px-2 lg:px-3 rounded-lg hover:bg-gray-700 cursor-pointer">
              <FontAwesomeIcon icon={faHome} />
              <span className="sidebar-text">Home</span>
            </li>
            <li className="flex items-center gap-3 py-2 px-2 lg:px-3 rounded-lg hover:bg-gray-700 cursor-pointer">
              <FontAwesomeIcon icon={faSearch} />
              <span className="sidebar-text">Explore</span>
            </li>
            <li className="flex items-center gap-3 py-2 px-2 lg:px-3 rounded-lg hover:bg-gray-700 cursor-pointer relative">
              <FontAwesomeIcon icon={faBullhorn} />
              <span className="sidebar-text">Announcements</span>
              {/* <span className="absolute right-4 bg-yellow-700 text-xs rounded-full px-2 py-0.5">2</span> */}
            </li>
            <li className="flex items-center gap-3 py-2 px-2 lg:px-3 rounded-lg hover:bg-gray-700 cursor-pointer">
              <FontAwesomeIcon icon={faChartBar} />
              <span className="sidebar-text">Rankings</span>
            </li>
            <li className="flex items-center gap-3 py-2 px-2 lg:px-3 rounded-lg hover:bg-gray-700 cursor-pointer relative">
              <FontAwesomeIcon icon={faBell} />
              <span className="sidebar-text">Notifications</span>
              {/* <span className="absolute right-4 bg-blue-600 text-xs rounded-full px-2 py-0.5">4</span> */}
            </li>
            <li className="flex items-center gap-3 py-2 px-2 lg:px-3 rounded-lg hover:bg-gray-700 cursor-pointer">
              <FontAwesomeIcon icon={faUser} />
              <span className="sidebar-text">Profile</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col border-t border-gray-700 mt-4 py-4 px-4">
        <h2 className="text-sm font-bold mb-2 sidebar-text">Others</h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-700 cursor-pointer">
            <FontAwesomeIcon icon={faExclamationCircle} />
            <span className="sidebar-text">Report a problem</span>
          </li>
          <li className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-700 cursor-pointer">
            <FontAwesomeIcon icon={faInfoCircle} />
            <span className="sidebar-text">About</span>
          </li>
          <li className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-700 cursor-pointer">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="sidebar-text">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
