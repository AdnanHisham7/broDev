import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
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
  faDashboard,
  faUsers,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";

const SideBar: React.FC = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  // Menu configurations
  const generalMenu = [
    { to: "/home", icon: faHome, text: "Home" },
    { to: "/explore", icon: faSearch, text: "Explore" },
    { to: "/announcements", icon: faBullhorn, text: "Announcements" },
    { to: "/dashboard", icon: faDashboard, text: "Dashboard" },
    { to: "/rankings", icon: faChartBar, text: "Rankings" },
    { to: "/notifications", icon: faBell, text: "Notifications" },
    { to: "/profile/JohnDoe", icon: faUser, text: "Profile" },
  ];

  const dashboardMenu = [
    { to: "/home", icon: faHome, text: "Home" },
    { to: "/users", icon: faUsers, text: "Users" },
    { to: "/faculties", icon: faUniversity, text: "Faculties" },
  ];

  return (
    <div className="w-64 fixed bg-customBg border rounded-xl border-gray-800 text-white flex flex-col justify-between top-24">
      {/* Top Section */}
      <div className="flex flex-col">
        <h2 className="text-sm font-bold ml-4 pt-4 sidebar-text">General</h2>
        <nav>
          <AnimatePresence mode="wait">
            <motion.ul
              key={isDashboard ? "dashboard" : "general"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-2 px-4 pt-4"
            >
              {(isDashboard ? dashboardMenu : generalMenu).map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center justify-center md:justify-start gap-3 py-2 px-2 lg:px-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200 ${
                        isActive ? "bg-gray-700" : ""
                      }`
                    }
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <span className="sidebar-text">{item.text}</span>
                  </NavLink>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </nav>
      </div>

      {/* Bottom Section - Remains Unchanged */}
      <div className="flex flex-col border-t border-gray-800 mt-10 py-4 px-4">
        <h2 className="text-sm font-bold mb-2 sidebar-text">Others</h2>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/report-problem"
              className={({ isActive }) =>
                `flex items-center justify-center md:justify-start gap-3 py-2 px-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FontAwesomeIcon icon={faExclamationCircle} />
              <span className="sidebar-text">Report a problem</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center justify-center md:justify-start gap-3 py-2 px-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              <span className="sidebar-text">About</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                `flex items-center justify-center md:justify-start gap-3 py-2 px-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="sidebar-text">Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;