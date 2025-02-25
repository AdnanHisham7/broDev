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
    <div className="w-64 h- bg-customBg border-r border-gray-800 text-white flex flex-col justify-between sticky top-0">

      {/* Top Section */}
      <div className="flex flex-col">
        <h2 className="text-sm font-bold ml-4 pt-4 sidebar-text">General</h2>
        <nav>
          <ul className="space-y-2 px-4 pt-4">
            <li>
              <a
                href="/home"
                className="flex items-center gap-3 py-2 px-2 lg:px-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faHome} />
                <span className="sidebar-text">Home</span>
              </a>
            </li>
            <li>
              <a
                href="/explore"
                className="flex items-center gap-3 py-2 px-2 lg:px-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faSearch} />
                <span className="sidebar-text">Explore</span>
              </a>
            </li>
            <li>
              <a
                href="/announcements"
                className="flex items-center gap-3 py-2 px-2 lg:px-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200 relative"
              >
                <FontAwesomeIcon icon={faBullhorn} />
                <span className="sidebar-text">Announcements</span>
              </a>
            </li>
            <li>
              <a
                href="/rankings"
                className="flex items-center gap-3 py-2 px-2 lg:px-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faChartBar} />
                <span className="sidebar-text">Rankings</span>
              </a>
            </li>
            <li>
              <a
                href="/notifications"
                className="flex items-center gap-3 py-2 px-2 lg:px-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200 relative"
              >
                <FontAwesomeIcon icon={faBell} />
                <span className="sidebar-text">Notifications</span>
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="flex items-center gap-3 py-2 px-2 lg:px-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faUser} />
                <span className="sidebar-text">Profile</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col border-t border-gray-700 mt-4 py-4 px-4">
        <h2 className="text-sm font-bold mb-2 sidebar-text">Others</h2>
        <ul className="space-y-2">
          <li>
            <a
              href="/report-problem"
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faExclamationCircle} />
              <span className="sidebar-text">Report a problem</span>
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              <span className="sidebar-text">About</span>
            </a>
          </li>
          <li>
            <a
              href="/logout"
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="sidebar-text">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
