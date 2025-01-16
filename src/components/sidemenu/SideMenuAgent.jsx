import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFile,
  faUsers,
  faComment,
  faGear,
  faRightFromBracket,
  faBuildingColumns,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../services/LocalStorageService";
import dp from "../../assets/images.jfif";
import { useGetProfileQuery } from "../../services/AgentAPIService";

const SideMenuAgent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const token = getToken();
  const { data: userData, isLoading, isError } = useGetProfileQuery(token);

  const handleLogout = () => {
    removeToken("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col w-64 h-[calc(100vh-90px)] bg-[#F6FAFD] border-r">
      <div className="flex-grow flex flex-col ml-6">
        <nav className="mt-12">
          <NavLink
            to="/agent/dashboard"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faHouse} size="xl" />
            <span className="ml-4 text-sm font-medium">Home</span>
          </NavLink>

          <NavLink
            to="/agent/messages"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faComment} size="xl" />
            <span className="ml-4 text-sm font-medium">Messages</span>
          </NavLink>

          <NavLink
            to="/agent/applications"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faFile} size="xl" />
            <span className="ml-4 text-sm font-medium">Applications</span>
          </NavLink>

          <NavLink
            to="/agent/allstudents"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faUsers} size="xl" />
            <span className="ml-4 text-sm font-medium">All Students</span>
          </NavLink>

          <NavLink
            to="/agent/providers"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faBuildingColumns} size="xl" />
            <span className="ml-4 text-sm font-medium">All Providers</span>
          </NavLink>
          <NavLink
            to="/agent/emailtemplates"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faEnvelope} size="xl" />
            <span className="ml-4 text-sm font-medium">Email Templates</span>
          </NavLink>

          <p className="mt-12 flex items-center justify-center h-16 border-b"></p>

          <NavLink
            to="/agent/settings"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faGear} size="xl" />
            <span className="ml-4 text-sm font-medium">Settings</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900 w-full"
          >
            <FontAwesomeIcon icon={faRightFromBracket} size="xl" />
            <span className="ml-4 text-sm font-medium">Log out</span>
          </button>
        </nav>
      </div>

      {/* Profile Card */}
      <div className="p-3 border-t md:block hidden">
        {isLoading ? (
          <div className="text-gray-600">Loading...</div>
        ) : isError ? (
          <div className="text-red-600">Error loading user data</div>
        ) : (
          <div className="flex items-center">
            <img
              src={userData?.profilePicture || dp}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">
                {userData?.fullName || "Guest User"}
              </p>
              <p className="text-xs text-gray-500">
                {userData?.email || "guest@example.com"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideMenuAgent;
