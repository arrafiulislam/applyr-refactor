import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faUserGraduate,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import routes from "../../routes";

const SignUpCard = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleButtonClick = () => {
    if (selectedOption === "student") {
      navigate(routes.signupStudent);
    } else if (selectedOption === "agency") {
      navigate(routes.signupAgent);
    } else if (selectedOption === "education_provider") {
      navigate("/eduprovidersignup");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center py-10">
        <h2 className="text-3xl font-semibold">Join Our Community</h2>

        <div className="flex flex-col items-center md:flex-row justify-center sm:space-x-6 space-y-6 sm:space-y-0 mt-8">
          {/* Education Provider Option */}
          {/* <div
            onClick={() => handleOptionChange('education_provider')}
            className={`cursor-pointer border rounded-lg p-6 w-60 text-left transition-colors 
      ${selectedOption === 'education_provider' ? 'border-blue-700' : 'border-gray-300'}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl text-blue-600">
                <FontAwesomeIcon icon={faSchool} />
              </span>
              <input
                type="radio"
                name="userType"
                checked={selectedOption === 'education_provider'}
                onChange={() => handleOptionChange('education_provider')}
                className="form-radio h-5 w-5 text-blue-600"
              />
            </div>
            <p className="mt-4 text-lg font-medium">I’m an Education Provider, offering</p>
          </div> */}

          {/* Student Option */}
          <div
            onClick={() => handleOptionChange("student")}
            className={`cursor-pointer border rounded-lg p-6 w-60 text-left transition-colors 
      ${selectedOption === "student" ? "border-blue-700" : "border-gray-300"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl text-blue-600">
                <FontAwesomeIcon icon={faUserGraduate} />
              </span>
              <input
                type="radio"
                name="userType"
                checked={selectedOption === "student"}
                onChange={() => handleOptionChange("student")}
                className="form-radio h-5 w-5 text-blue-600"
              />
            </div>
            <p className="mt-4 text-lg font-medium">
              I’m a student, seeking guidance
            </p>
          </div>

          {/* Agent Option */}
          <div
            onClick={() => handleOptionChange("agency")}
            className={`cursor-pointer border rounded-lg p-6 w-60 text-left transition-colors 
      ${selectedOption === "agency" ? "border-blue-700" : "border-gray-300"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl text-blue-600">
                <FontAwesomeIcon icon={faBuildingColumns} />
              </span>
              <input
                type="radio"
                name="userType"
                checked={selectedOption === "agency"}
                onChange={() => handleOptionChange("agency")}
                className="form-radio h-5 w-5 text-blue-600"
              />
            </div>
            <p className="mt-4 text-lg font-medium">
              I’m an agent, offering assistance
            </p>
          </div>
        </div>

        <button
          onClick={handleButtonClick}
          disabled={!selectedOption}
          className={`mt-10 px-6 py-3 rounded-lg text-white text-lg 
            ${
              selectedOption
                ? "bg-blue-600  hover:bg-gray-800 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          {selectedOption === "student" && "Join as a Student"}
          {selectedOption === "agency" && "Apply as an Agent"}
          {selectedOption === "education_provider" &&
            "Apply as an Education Provider"}
          {!selectedOption && "Create Account"}
        </button>

        <div className="mt-5">
          <p>
            Already have an account?{" "}
            <a href="/signin" className="text-blue-600 hover:text-blue-800">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpCard;
