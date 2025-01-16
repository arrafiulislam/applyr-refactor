import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useRegisterUserMutation } from "../../services/userAuthApi";
import { storeToken } from "../../services/LocalStorageService";
import routes from "../../routes";

const SignupStudent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    emailAddress: "",
    phoneNumber: "",
    usiNumber: "",
    dateOfBirth: "",
    residentialAddress: "",
    registerInfo: {
      username: "",
      password: "",
      confirmPassword: "",
      role: "STUDENT",
    },
  });

  const [error, setError] = useState({ status: false, msg: "", type: "" });
  const [progress, setProgress] = useState(0);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 10;
          return next <= 100 ? next : 100;
        });
      }, 200);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const capitalizeFullName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") {
      setFormData({ ...formData, fullName: capitalizeFullName(value) });
    } else if (name in formData.registerInfo) {
      setFormData({
        ...formData,
        registerInfo: { ...formData.registerInfo, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      fullName,
      gender,
      emailAddress,
      phoneNumber,
      usiNumber,
      dateOfBirth,
      residentialAddress,
      registerInfo: { username, password, confirmPassword },
    } = formData;

    if (
      fullName &&
      gender &&
      emailAddress &&
      phoneNumber &&
      usiNumber &&
      dateOfBirth &&
      residentialAddress &&
      username &&
      password &&
      confirmPassword
    ) {
      if (!emailRegex.test(emailAddress)) {
        setError({ status: true, msg: "Invalid email format.", type: "error" });
        return;
      }

      if (!passwordRegex.test(password)) {
        setError({
          status: true,
          msg: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one digit, and one special character.",
          type: "error",
        });
        return;
      }

      if (password !== confirmPassword) {
        setError({
          status: true,
          msg: "Passwords do not match",
          type: "error",
        });
        return;
      }

      try {
        const result = await registerUser(formData);

        if (result?.error) {
          const statusCode = result.error?.status;
          const message =
            result.error?.data?.message ||
            "Registration failed. Please try again.";
          setError({
            status: true,
            msg: `Error ${statusCode || ""}: ${message}`,
            type: "error",
          });
        } else if (result?.data) {
          const token = result.data?.token;
          if (token) {
            storeToken(token);
            navigate(routes.connectWithAgent);
          } else {
            setError({
              status: true,
              msg: "Token not found in response.",
              type: "error",
            });
          }
        }
      } catch (err) {
        setError({
          status: true,
          msg: "An unexpected error occurred.",
          type: "error",
        });
      }
    } else {
      setError({ status: true, msg: "All fields are required", type: "error" });
    }
  };

  const closeModal = () => {
    setError({ status: false, msg: "", type: "" });
  };

  return (
    <div className="h-auto sm:h-[91vh] items-center flex justify-center px-5 lg:px-0">
      {isLoading ? (
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
                <img src={logo} alt="Logo" className="mb-2" />
                <p className="text-[14px] text-gray-500">
                  Enter your details to create your account
                </p>
              </div>
              <div className="w-full flex-1 mt-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 sm:gap-6 mb-2">
                    <div className="flex flex-col">
                      <label className="text-base font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        className="w-full px-5 py-2 rounded-lg border border-stroke bg-transparent placeholder-gray-500 text-base"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full name"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-base font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        className="w-full px-5 py-2 rounded-lg border border-stroke bg-transparent placeholder-gray-500 text-base"
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        placeholder="Email address"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mb-2">
                    <label className="text-base font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      className="w-full px-5 py-2 rounded-lg border border-stroke bg-transparent placeholder-gray-500 text-base"
                      type="text"
                      name="username"
                      value={formData.registerInfo.username}
                      onChange={handleChange}
                      placeholder="Username"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 sm:gap-6 mb-2">
                    <div className="flex flex-col">
                      <label className="text-base font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        className="w-full px-5 py-2 rounded-lg border border-stroke bg-transparent placeholder-gray-500 text-base"
                        type="password"
                        name="password"
                        value={formData.registerInfo.password}
                        onChange={handleChange}
                        placeholder="Password"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-base font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <input
                        className="w-full px-5 py-2 rounded-lg border border-stroke bg-transparent placeholder-gray-500 text-base"
                        type="password"
                        name="confirmPassword"
                        value={formData.registerInfo.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 sm:gap-6 mb-2">
                    <div className="flex flex-col">
                      <label className="text-base font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        className="w-full px-5 py-2 rounded-lg border border-stroke bg-transparent placeholder-gray-500 text-base"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone number"
                      />
                    </div>
                    <div className="flex items-center justify-start gap-4">
                      <label className="text-base font-medium text-gray-700 mb-2">
                        Gender:
                      </label>
                      <label className="flex items-center gap-2 text-base">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          onChange={handleChange}
                        />{" "}
                        Male
                      </label>
                      <label className="flex items-center gap-2 text-base">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          onChange={handleChange}
                        />{" "}
                        Female
                      </label>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 sm:gap-6 mb-2">
                    <div className="flex flex-col">
                      <label className="text-base font-medium text-gray-700 mb-2">
                        USI Number
                      </label>
                      <input
                        className="w-full px-5 py-2 rounded-lg border border-stroke bg-transparent placeholder-gray-500 text-base"
                        type="text"
                        name="usiNumber"
                        value={formData.usiNumber}
                        onChange={handleChange}
                        placeholder="USI number"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-base font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        className="w-full px-5 py-2 rounded-lg border border-stroke bg-transparent placeholder-gray-500 text-base"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mb-2">
                    <label className="text-base font-medium text-gray-700 mb-2">
                      Residential Address
                    </label>
                    <input
                      className="w-full px-5 py-2 rounded-lg border border-stroke bg-transparent placeholder-gray-500 text-base"
                      type="text"
                      name="residentialAddress"
                      value={formData.residentialAddress}
                      onChange={handleChange}
                      placeholder="Residential address"
                    />
                  </div>

                  <button
                    className="mt-4 bg-blue-600 text-sm px-5 py-2 text-white rounded-md w-full"
                    type="submit"
                    disabled={isLoading}
                  >
                    Sign Up
                  </button>
                </form>

                {/* Error Message Modal */}
                {error.status && (
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
                        className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-72 sm:w-full"
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
                                {error.msg}
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

                <p className="text-sm text-gray-600 text-center mt-6">
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-500 hover:underline">
                    Sign in here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupStudent;
