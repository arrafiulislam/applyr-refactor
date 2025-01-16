import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSubmitAgentIdMutation } from "../../services/agentIDApi";
import routes from "../../routes";
import { getToken } from "../../services/LocalStorageService";
import logo from "../../assets/logo.png";

export default function AgentId() {
  const [id, setId] = useState(Array(7).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [submitId, { isLoading, error }] = useSubmitAgentIdMutation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const token = getToken();
    if (!token && location?.state?.from !== routes.signupStudent) {
      navigate(routes.accessDenied);
    }
  }, [location, navigate]);

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

  const handleKeyDown = (e) => {
    if (
      !/^[a-zA-Z0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputRefs.current.indexOf(e.target);
      if (index > 0) {
        setId((prevId) => [
          ...prevId.slice(0, index - 1),
          "",
          ...prevId.slice(index),
        ]);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      setId((prevId) => [
        ...prevId.slice(0, index),
        target.value,
        ...prevId.slice(index + 1),
      ]);
      if (index < id.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!/^[a-zA-Z0-9]{7}$/.test(text)) {
      return;
    }
    const chars = text.split("");
    setId(chars);
  };

  const handleNextClick = async () => {
    const agentIdData = id.join("");
    console.log("Agent ID Entered:", agentIdData);

    try {
      const result = await submitId(agentIdData).unwrap();

      if (result.error) {
        const statusCode = result.error.status;
        console.error("Error Status Code:", statusCode);

        const message =
          result.error.data?.message ||
          "Agent ID submission failed. Please try again.";
        alert(`Error ${statusCode || ""}: ${message}`);
      } else {
        const statusCode = result.meta?.response?.status || 200;
        console.log("Response Status Code:", statusCode);

        if (statusCode === 200 || statusCode === 201) {
          navigate(routes.uploadIdentification);
        } else {
          alert(`Unexpected error occurred (Status Code: ${statusCode})`);
        }
      }
    } catch (err) {
      console.error("Agent ID Submission Error:", err);
      alert("An error occurred while submitting the Agent ID");
    }
  };

  return (
    <section className="bg-white py-10  min-h-screen flex flex-col items-center justify-center">
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
        <div className="container">
          <p className="mb-4 text-lg text-body-color text-semibold text-center">
            Enter Your Agent ID here.
          </p>
          <div>
            <form id="id-form" className="flex gap-4 justify-center mb-4">
              {id.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  onFocus={handleFocus}
                  onPaste={handlePaste}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="shadow-xs flex w-[80px] h-[80px] items-center rounded-lg border border-stroke bg-white p-2 text-center text-4xl font-medium text-gray-5 outline-none sm:text-5xl "
                />
              ))}
            </form>
            <div className="flex justify-center mt-8">
              <button
                className="rounded-lg bg-blue-600 px-7 py-2 text-base font-medium text-white hover:bg-primary"
                onClick={handleNextClick}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">You can't access this page</h1>
    </div>
  );
}
