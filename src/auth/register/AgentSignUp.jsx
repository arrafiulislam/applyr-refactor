import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import {
  useRegisterAgentMutation,
  useGetCompaniesQuery,
} from "../../services/userAuthApi";
import routes from "../../routes";
import { storeToken } from "../../services/LocalStorageService";

const AgentSignUp = () => {
  const navigate = useNavigate();
  const [registerAgent, { isLoading, isError, error }] =
    useRegisterAgentMutation();

  const {
    data: companies,
    isLoading: isCompaniesLoading,
    error: companiesError,
  } = useGetCompaniesQuery();

  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorModal, setErrorModal] = useState({ status: false, msg: "" });

  // Form fields
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const today = new Date();
  const maxDate = new Date(today.setFullYear(today.getFullYear() - 17))
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    let interval;
    if (isLoading || isCompaniesLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 10;
          return next <= 100 ? next : 100;
        });
      }, 100);
    } else {
      clearInterval(interval);
    }
    console.log(companies);
    return () => clearInterval(interval);
  }, [isLoading, isCompaniesLoading]);

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&#])[A-Za-z\d@$!%?&#]{8,}$/;

  const capitalizeFullName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = companies.filter((company) =>
      company.name.toLowerCase().startsWith(value.toLowerCase())
    );

    setFilteredCompanies(filtered);
    setSelectedCompany(value);
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setSearchTerm(company);
    setFilteredCompanies([]);
    setShowDropdown(false);
  };

  const handleFocus = () => {
    setShowDropdown(true);
    setFilteredCompanies(companies);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !fullName ||
      !emailAddress ||
      !username ||
      !password ||
      !confirmPassword ||
      !dateOfBirth ||
      !gender ||
      !phoneNumber ||
      !selectedCompany
    ) {
      setErrorModal({ status: true, msg: "Please fill out all fields." });
      return;
    }

    if (!emailRegex.test(emailAddress)) {
      setErrorModal({ status: true, msg: "Invalid email format." });
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorModal({
        status: true,
        msg: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one digit, and one special character.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrorModal({ status: true, msg: "Passwords do not match." });
      return;
    }

    const payload = {
      fullName: capitalizeFullName(fullName),
      gender: gender,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      companyName: selectedCompany,
      registerInfo: {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        role: "AGENT",
      },
    };

    try {
      const result = await registerAgent(payload).unwrap();
      const token = result.token;
      if (token) {
        storeToken(token);
      }
      navigate(routes.agentDashboard);
    } catch (err) {
      setErrorModal({
        status: true,
        msg: error?.data?.message || "Registration failed. Please try again.",
      });
    }
  };

  const closeModal = () => {
    setErrorModal({ status: false, msg: "" });
  };

  return (
    <div className="h-auto sm:h-[91vh] items-center flex justify-center px-5 lg:px-0">
      {isLoading || isCompaniesLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
          <div className="text-center">
            <img
              src={logo}
              alt="Loading Logo"
              className="mx-auto mb-4 w-48 h-auto"
            />
            <div className="relative w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 h-full bg-blue-600 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl w-full bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-4/5 xl:w-4/5 p-8 sm:p-12">
            <div className="flex flex-col items-center">
              <div className="text-center w-60 max-w-full px-4 mb-4">
                <img src={logo} alt="" className="mb-2" />
                <p className="text-[14px] text-gray-500">
                  Enter your details to create your account
                </p>
              </div>
              <div className="w-full flex-1 mt-6">
                <div className="mx-auto max-w-4xl flex flex-col gap-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 sm:gap-6 mb-2">
                      <div className="flex flex-col">
                        <label className="text-base font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          className="w-full px-5 py-2 rounded-lg font-medium border border-stroke bg-transparent placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white"
                          type="text"
                          placeholder="Full name"
                          value={fullName}
                          onChange={(e) =>
                            setFullName(capitalizeFullName(e.target.value))
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-base font-medium text-gray-700 mb-2 mt-2 sm:mt-0">
                          Email Address
                        </label>
                        <input
                          className="w-full px-5 py-2 rounded-lg font-medium border border-stroke bg-transparent placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white"
                          type="email"
                          placeholder="Email address"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-2">
                      <label className="text-base font-medium text-gray-700 mb-2">
                        Username
                      </label>
                      <input
                        className="w-full px-5 py-2 rounded-lg font-medium border border-stroke bg-transparent placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col mb-2 relative">
                      <label className="text-base font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        className="w-full px-5 py-2 rounded-lg font-medium border border-stroke bg-transparent placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Search or enter company name"
                        value={searchTerm}
                        onChange={handleSearch}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      {showDropdown && filteredCompanies.length > 0 && (
                        <ul className="absolute top-full left-0 z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full shadow-md max-h-40 overflow-auto">
                          {filteredCompanies.map((company) => (
                            <li
                              key={company.name}
                              className="text-base px-4 py-2 cursor-pointer hover:bg-blue-100"
                              onClick={() => handleCompanySelect(company.name)}
                            >
                              {company.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 sm:gap-6 mb-2 ">
                      <div className="flex flex-col">
                        <label className="text-base font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <input
                          className="w-full px-5 py-2 rounded-lg font-medium border border-stroke bg-transparent placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-base font-medium text-gray-700 mb-2 sm:mt-0 mt-2">
                          Confirm Password
                        </label>
                        <input
                          className="w-full px-5 py-2 rounded-lg font-medium border border-stroke bg-transparent placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white"
                          type="password"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 sm:gap-6 mb-2">
                      <div className="flex flex-col">
                        <label className="text-base font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          className="w-full px-5 py-2 rounded-lg font-medium border border-stroke bg-transparent placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white"
                          type="date"
                          placeholder="Select date of birth"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          max={maxDate} // Set the maximum allowable date
                        />
                      </div>
                      <div className="flex items-center justify-start gap-4">
                        <label className="text-base font-medium text-gray-700 mb-2 sm:mt-0 mt-2">
                          Gender:
                        </label>
                        <label className="flex items-center gap-2 text-base">
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={gender === "Male"}
                            onChange={(e) => setGender(e.target.value)}
                          />{" "}
                          Male
                        </label>
                        <label className="flex items-center gap-2 text-base">
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={gender === "Female"}
                            onChange={(e) => setGender(e.target.value)}
                          />{" "}
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-base font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        className="w-full px-5 py-2 rounded-lg font-medium border border-stroke bg-transparent placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="tel"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>

                    {errorModal.status && (
                      <div
                        className="fixed z-10 inset-0 overflow-y-auto"
                        id="my-modal"
                      >
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                          >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                          </div>
                          <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                          >
                            &#8203;
                          </span>
                          <div
                            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-96 sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                          >
                            <div>
                              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                <svg
                                  className="h-6 w-6 text-red-600"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                              <div className="mt-3 text-center sm:mt-5">
                                <h3
                                  className="text-lg leading-6 font-medium text-gray-900"
                                  id="modal-headline"
                                >
                                  Error
                                </h3>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    {errorModal.msg}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                              <button
                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                                onClick={closeModal}
                              >
                                OK
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      className="mt-4 bg-blue-600 text-sm px-5 py-2 text-white rounded-md w-full"
                      type="submit"
                      disabled={isLoading}
                    >
                      Sign Up
                    </button>
                  </form>
                  <p className="text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <a href="/signin">
                      <span className="text-blue-700 font-semibold">
                        Sign in
                      </span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentSignUp;
