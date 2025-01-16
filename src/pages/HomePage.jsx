import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/Logo.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] p-4 overflow-hidden">
      {/* <img src={logoImage} alt="Logo" className="w-96 h-auto mb-8" /> */}

      <h1 className="text-5xl font-normal text-center mb-8">
        Your Trusted Platform for Securing{" "}
        <span className="font-bold">Qualifications</span>
      </h1>

      <p className="text-base text-center text-gray-600 mb-8">
        Ensuring compliance with all relevant regulations to maintain highest
        standards of integrity and security
      </p>

      <button
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-700"
        onClick={() => navigate("/connect")}
      >
        Start Your Application
      </button>
    </div>
  );
};

export default HomePage;
