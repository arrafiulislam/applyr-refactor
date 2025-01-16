import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useLoginUserMutation } from "../../services/userAuthApi";
import routes from "../../routes";
import { storeToken } from "../../services/LocalStorageService";
import { jwtDecode } from "jwt-decode";

import logoImage from "../../assets/Logo.png";

const Login = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [progress, setProgress] = useState(0);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const actualData = {
      username: data.get("username"),
      password: data.get("password"),
    };

    if (actualData.username && actualData.password) {
      try {
        const result = await loginUser(actualData);

        if (result?.error) {
          const statusCode = result.error?.status;
          const message =
            result.error?.data?.message || "Login failed. Please try again.";
          setError({
            status: true,
            msg: `Error ${statusCode || ""}: ${message}`,
            type: "error",
          });
        } else if (result?.data) {
          const token = result.data?.token;
          storeToken(token);

          const decodedToken = jwtDecode(token);
          const roles = decodedToken.roles || [];

          if (roles.includes("ROLE_AGENT")) {
            navigate(routes.agentDashboard);
          } else if (roles.includes("ROLE_STUDENT")) {
            navigate(routes.studentDashboard);
          } else {
            navigate(routes.defaultDashboard);
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
    <section className="relative z-10 bg-gray-1 py-20 dark:bg-dark lg:py-[120px]">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-dark-1 z-50">
          <div className="text-center">
            <img
              src={logoImage}
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
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
                <div className="mb-10 text-center md:mb-16">
                  <a href="/#" className="mx-auto inline-block max-w-[160px]">
                    <img src={logo} alt="Logo" />
                  </a>
                </div>
                <form id="login-form" onSubmit={handleSubmit}>
                  <InputBox
                    type="text"
                    name="username"
                    placeholder="Username"
                  />
                  <InputBox
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  {error.status && (
                    <p
                      className={`text-${
                        error.type === "error" ? "red" : "green"
                      }-500`}
                    >
                      {error.msg}
                    </p>
                  )}
                  <div className="mb-10">
                    <input
                      type="submit"
                      value="Sign In"
                      className="w-full cursor-pointer rounded-md border border-primary bg-blue-600 px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
                      disabled={isLoading}
                    />
                  </div>
                </form>
                <a
                  href="/#"
                  className="mb-2 inline-block text-base text-dark hover:text-blue-600 hover:underline dark:text-white"
                >
                  Forgot Password?
                </a>
                <p className="text-base text-body-color dark:text-dark-6">
                  <span className="pr-0.5">Not a member yet? </span>
                  <a
                    href={routes.signupSelection}
                    className="text-blue-600 hover:underline"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message Modal */}
      {error.status && (
        <div className="fixed z-10 inset-0 overflow-y-auto" id="my-modal">
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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
                    <p className="text-sm text-gray-500">{error.msg}</p>
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
    </section>
  );
};

const InputBox = ({ type, placeholder, name }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
      />
    </div>
  );
};

export default Login;
