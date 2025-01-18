import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Import useLocation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchool,
  faBuildingColumns,
  faUserGraduate,
  faBell,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/Logo.png";
import dp from "../../assets/images.jfif";
import routes from "../../routes";
import { jwtDecode } from "jwt-decode";
import { getToken, removeToken } from "../../services/LocalStorageService";
import { useGetProfileQuery } from "../../services/AgentAPIService";
import { useGetLoggedUserQuery } from "../../services/profileInfoApi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileLink, setProfileLink] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [expandedNotification, setExpandedNotification] = useState(null);
  const [fullName, setFullName] = useState("");
  const { data: agentProfileData, isLoading, error } = useGetProfileQuery();

  const notifications = [
    {
      title: "New Message Received",
      description:
        "You have received a new message from the Admin. Check your inbox for more details.",
      createdAt: new Date("2025-01-10T10:15:00"),
      seen: true,
    },
    {
      title: "Profile Approved",
      description:
        "Your profile has been reviewed and approved successfully. You can now access additional features.",
      createdAt: new Date("2025-01-09T14:30:00"),
      seen: true,
    },
    {
      title: "Task Reminder",
      description:
        "Reminder: Please complete your pending task by the end of the week.",
      createdAt: new Date("2025-01-08T08:00:00"),
      seen: false,
    },
    {
      title: "System Update Scheduled",
      description:
        "System maintenance is scheduled for January 15th, 2025, from 2:00 AM to 4:00 AM. Please save your work.",
      createdAt: new Date("2025-01-07T16:45:00"),
      seen: true,
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const token = getToken();
  const isAgentIdPage = location.pathname === "/agenid";

  const {
    data: userDataResponse,
    isLoading: userLoading,
    isError: userError,
  } = useGetLoggedUserQuery(token);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      const roles = decodedToken.roles || [];

      if (roles.includes("ROLE_AGENT")) {
        setProfileLink("/agent/profile");
        if (agentProfileData && agentProfileData.fullName) {
          setFullName(agentProfileData.fullName);
        }
      } else if (roles.includes("ROLE_STUDENT")) {
        setProfileLink("/student/application");
        if (userDataResponse && userDataResponse.fullName) {
          setFullName(userDataResponse.fullName);
        }
      }

      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [agentProfileData, userDataResponse]);

  const toggleNotifications = () => {
    const allSeen = notifications.every((notification) => notification.seen);
    if (allSeen) {
      navigate("/notifications");
    } else {
      setNotificationsOpen(!notificationsOpen);
    }
  };

  const handleExpandToggle = (index) => {
    setExpandedNotification(expandedNotification === index ? null : index);
  };
  const handleLogout = () => {
    removeToken("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header>
      <div className="bg-white  relative z-50">
        <div className={`${isLoggedIn ? "" : "container"} mx-auto`}>
          <div className="relative sm:-mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4">
              <a
                href="#"
                className={`block w-full py-5 ${isLoggedIn ? "pl-0" : ""}`}
              >
                <img
                  src={logo}
                  alt="Logo"
                  className={`${isLoggedIn ? "w-40 ml-8" : ""}`}
                />
              </a>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={() => setOpen(!open)}
                  id="navbarToggler"
                  className={`${
                    open && "navbarTogglerActive"
                  } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
                >
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-black "></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-black "></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-black "></span>
                </button>

                {!isLoggedIn && !isAgentIdPage && (
                  <nav
                    id="navbarCollapse"
                    className={`absolute right-4 top-full w-full max-w-[300px] rounded-lg bg-white px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none  ${
                      !open && "hidden"
                    }`}
                  ></nav>
                )}
              </div>
              <div className="hidden justify-end gap-3 pr-16 sm:flex lg:pr-0">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/signin"
                      className="rounded-lg bg-blue-600 px-5 py-2.5 text-base font-medium text-white hover:bg-primary "
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <div className="bg-blue-2 py-4">
                    <div className="container">
                      <div className="flex items-center justify-center">
                        <div className="relative mr-4">
                          <button
                            onClick={toggleNotifications}
                            className="focus:outline-none"
                          >
                            <FontAwesomeIcon
                              icon={faBell}
                              className="text-2xl"
                            />
                            {notifications.some(
                              (notification) => !notification.seen
                            ) && (
                              <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                {
                                  notifications.filter(
                                    (notification) => !notification.seen
                                  ).length
                                }
                              </span>
                            )}
                          </button>
                          {notificationsOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2">
                              {notifications.map((notification, index) => (
                                <div
                                  key={index}
                                  className="p-2 border-b last:border-b-0"
                                >
                                  <div className="flex justify-between items-center">
                                    <p className="font-medium">
                                      {notification.title}
                                    </p>
                                    <button
                                      onClick={() => handleExpandToggle(index)}
                                      className="text-gray-500 hover:text-black"
                                    >
                                      {expandedNotification === index
                                        ? "▲"
                                        : "▼"}
                                    </button>
                                  </div>
                                  {expandedNotification === index && (
                                    <div>
                                      <p className="text-sm text-gray-600">
                                        {notification.description}
                                      </p>
                                      <p className="text-xs text-gray-400">
                                        {notification.createdAt.toLocaleString()}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              ))}
                              <button
                                onClick={() => navigate("/notifications")}
                                className="mt-2 w-full text-sm text-center text-blue-600 hover:underline"
                              >
                                See all notifications
                              </button>
                            </div>
                          )}
                        </div>
                        {/* Profile Dropdown */}
                        <div className="relative inline-block">
                          <button
                            ref={trigger}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center text-left mr-6"
                          >
                            <div className="relative mr-4 h-[42px] w-[42px] rounded-full">
                              <img
                                src={dp}
                                alt="avatar"
                                className="h-full w-full rounded-full object-cover object-center"
                              />
                              <span className="absolute -right-0.5 -top-0.5 block h-[14px] w-[14px] rounded-full border-[2.3px] border-white bg-[#219653] "></span>
                            </div>
                            <span className="text-base font-medium text-dark ">
                              {fullName}
                            </span>

                            <span className="pl-[10px] text-dark duration-100 ">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`fill-current ${
                                  dropdownOpen ? "-scale-y-100" : ""
                                }`}
                              >
                                <path
                                  d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4062 5.65625 17.6875 5.9375C17.9688 6.21875 17.9688 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1562 10.1875 14.25 10 14.25Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </button>

                          <div
                            ref={dropdown}
                            className={`absolute right-0 mt-3 w-[250px] rounded-md border border-gray-200 bg-white py-3 px-4 shadow-card  ${
                              dropdownOpen ? "block" : "hidden"
                            }`}
                          >
                            <Link
                              to={profileLink}
                              className="flex items-center gap-3 py-2.5 text-sm font-medium text-dark transition duration-300 hover:text-blue-600  "
                            >
                              <FontAwesomeIcon icon={faUserGraduate} />
                              My Profile
                            </Link>

                            <Link
                              to="/agent/settings"
                              className="flex items-center gap-3 py-2.5 text-sm font-medium text-dark transition duration-300 hover:text-blue-600"
                            >
                              <FontAwesomeIcon icon={faGear} />
                              Settings
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-3 py-2.5 text-sm font-medium text-red-600 transition duration-300 hover:text-red-500"
                            >
                              Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
