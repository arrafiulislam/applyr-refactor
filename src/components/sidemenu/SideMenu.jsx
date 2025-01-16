import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faFile,
  faBook,
  faComment,
  faGear,
  faRightFromBracket,
  faFileUpload,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../services/LocalStorageService";
import dp from "../../assets/images.jfif";
import routes from "../../routes";
import { useGetLoggedUserQuery } from "../../services/profileInfoApi";

const SideMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const token = getToken();
  const { data: userData, isLoading, isError } = useGetLoggedUserQuery(token);

  const handleLogout = () => {
    removeToken("token");
    navigate("/");
  };

  return (
    <div
      className={`flex flex-col h-[calc(100vh-90px)] bg-[#F6FAFD] border-r ${
        isMobileMenuOpen ? "w-32" : "w-16"
      } md:w-64 transition-all duration-300`}
    >
      <div className="md:hidden p-4">
        <button
          className="text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
      </div>

      <div className="flex-grow flex items-center flex-col md:ml-0">
        <nav className="mt-4">
          <NavLink
            to={routes.studentDashboard}
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faHouse} size="xl" />
            <span
              className={`ml-4 text-sm font-medium ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              Home
            </span>
          </NavLink>

          <NavLink
            to={routes.studentApplication}
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faFile} size="xl" />
            <span
              className={`ml-4 text-sm font-medium ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              Application
            </span>
          </NavLink>

          <NavLink
            to={routes.studentDocuments}
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faBook} size="xl" />
            <span
              className={`ml-4 text-sm font-medium ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              Documents
            </span>
          </NavLink>

          <NavLink
            to={routes.studentDocumentUpload}
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faFileUpload} size="xl" />
            <span
              className={`ml-4 text-sm font-medium ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              Upload Files
            </span>
          </NavLink>

          <p className="mt-12 flex items-center justify-center h-16 border-b"></p>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faComment} size="xl" />
            <span
              className={`ml-4 text-sm font-medium ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              Contact Support
            </span>
          </NavLink>

          <NavLink
            to={routes.studentSettings}
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-gray-900 bg-gray-200"
                : "flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }
          >
            <FontAwesomeIcon icon={faGear} size="xl" />
            <span
              className={`ml-4 text-sm font-medium ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              Settings
            </span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center p-3 text-gray-600 hover:bg-gray-200 hover:text-gray-900 w-full"
          >
            <FontAwesomeIcon icon={faRightFromBracket} size="xl" />
            <span
              className={`ml-4 text-sm font-medium ${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block`}
            >
              Log out
            </span>
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
                {userData?.emailAddress || "guest@example.com"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideMenu;
