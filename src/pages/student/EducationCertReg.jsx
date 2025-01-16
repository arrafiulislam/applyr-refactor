import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal.jsx";
import buttonImg from "../../assets/file.png";
import logo from "../../assets/Logo.png";
import routes from "../../routes.jsx";
import { useUploadDocumentsMutation } from "../../services/studentApiService.js";
import Webcam from "react-webcam";

const EducationCertReg = () => {
  return (
    <DocumentsRegister
      headerTitle="Education and Certificates"
      nextPage={routes.successCard}
      isFinalPage={false}
      useDocumentTypes={false}
    />
  );
};

const DocumentsRegister = ({ headerTitle, nextPage, isFinalPage }) => {
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [uploadDocuments] = useUploadDocumentsMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/access-denied");
    } else {
      // Simulate data loading for demonstration purposes
      setTimeout(() => setIsLoading(false), 1500);
    }
  }, [navigate]);

  useEffect(() => {
    let interval;
    if (isLoading || isUploading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 10 : 100));
      }, 200);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isLoading, isUploading]);

  const handleFileChange = (e) => {
    e.preventDefault();
    const uploadedFiles = e.target.files;
    const newFiles = Array.from(uploadedFiles).map((file) => ({
      date: new Date().toLocaleDateString(),
      document: file.name,
      type: "CERTIFICATE",
      file,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleNext = async () => {
    if (files.length === 0) {
      if (isFinalPage) {
        setIsModalOpen(true);
      } else {
        navigate(nextPage);
      }
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      files.forEach((fileObj, index) => {
        formData.append(`documentRequests[${index}].file`, fileObj.file);
        formData.append(
          `documentRequests[${index}].documentType`,
          fileObj.type
        );
        formData.append(
          `documentRequests[${index}].category`,
          "HUNDRED_POINTS"
        );
        formData.append(`documentRequests[${index}].status`, "PENDING");
      });

      await uploadDocuments(formData).unwrap();
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error during upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const byteString = atob(imageSrc.split(",")[1]);
      const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], `camera_capture_${Date.now()}.png`, {
        type: mimeString,
      });
      const newFile = {
        date: new Date().toLocaleDateString(),
        document: file.name,
        type: "CERTIFICATE",
        file,
      };
      setFiles((prevFiles) => [...prevFiles, newFile]);
      setIsCameraOpen(false);
    }
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  if (isLoading || isUploading) {
    return (
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
    );
  }

  return (
    <div className="w-full px-8 mt-10">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl p-16 font-semibold">{headerTitle}</p>
      </div>

      <div className="flex justify-around gap-12">
        <div className="flex flex-col w-1/2 space-y-6">
          <label className="block text-sm font-medium text-gray-700">
            Document Type
          </label>
          <select
            className="p-2 border border-gray-300 rounded-md"
            value="CERTIFICATE"
            disabled
          >
            <option value="CERTIFICATE">Certificate</option>
          </select>

          <div
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            onClick={handleUploadClick}
            onDrop={handleFileChange}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">PDF, PNG, JPG</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>

          <button
            onClick={openCamera}
            className="rounded-lg bg-blue-600 px-8 py-2.5 text-base font-medium text-white hover:bg-blue-700"
          >
            Use Camscanner
          </button>
        </div>

        <div className="border-l-2 border-gray-300 flex flex-col w-2/6 pl-8 space-y-6">
          <div>
            <p className="text-2xl font-semibold">Uploaded Documents</p>
            <div className="mt-6 space-y-4">
              {files.map((file, index) => (
                <DocumentButton
                  key={index}
                  title={file.document}
                  date={file.date}
                  type={file.type}
                  onRemove={() => handleRemoveFile(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate("/previousPage")}
          className="rounded-lg border border-gray-300 px-8 py-2.5 text-base font-medium text-gray-700"
        >
          Back
        </button>
        <button
          onClick={() => navigate(nextPage)}
          className="rounded-lg bg-gray-300 px-8 py-2.5 text-base font-medium text-black hover:text-primary "
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className="rounded-lg bg-blue-600 px-8 py-2.5 text-base font-medium text-white hover:bg-blue-700"
        >
          Next
        </button>
      </div>

      {isCameraOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg space-y-6">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              videoConstraints={{
                facingMode: "environment",
              }}
            />
            <div className="flex justify-between">
              <button
                onClick={closeCamera}
                className="rounded-lg bg-red-500 px-6 py-2 text-base font-medium text-white"
              >
                Cancel
              </button>
              <button
                onClick={capturePhoto}
                className="rounded-lg bg-blue-600 px-6 py-2 text-base font-medium text-white"
              >
                Capture
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => navigate(nextPage)}
        confirmText="Continue"
        message="Your documents have been successfully uploaded."
      />
    </div>
  );
};

const DocumentButton = ({ title, date, type, onRemove }) => (
  <div className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-300 mb-4 w-full hover:shadow-md transition-transform transform hover:scale-105">
    <img src={buttonImg} alt="Document" className="w-14 h-14 mr-4" />
    <div className="h-full w-px bg-gray-300 mr-4"></div>
    <div className="flex flex-col text-left flex-grow">
      <p className="font-semibold text-gray-700">{title}</p>
      <p className="text-gray-500 text-sm">
        {date} ({type})
      </p>
    </div>
    <button
      onClick={onRemove}
      className="text-red-500 hover:text-red-700 focus:outline-none ml-4"
    >
      Remove
    </button>
  </div>
);

export default EducationCertReg;
