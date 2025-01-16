import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal.jsx";
import buttonImg from "../../assets/file.png";
import logo from "../../assets/Logo.png";
import routes from "../../routes.jsx";
import {
  useGetDocumentTypesQuery,
  useUploadDocumentsMutation,
} from "../../services/studentApiService.js";
import Webcam from "react-webcam";

const IdentificationDocuments = () => {
  return (
    <DocumentsRegister
      headerTitle="Identification Documents"
      nextPage={routes.uploadResumeRegister}
      useDocumentTypes={true}
    />
  );
};

const DocumentsRegister = ({
  headerTitle,
  nextPage,
  isFinalPage,
  useDocumentTypes,
}) => {
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInstructionModalOpen, setIsInstructionModalOpen] = useState(false);
  const [isSelectTypeModalOpen, setIsSelectTypeModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  // Fetch document types if required
  const {
    data: documentTypesData,
    error,
    isLoading: docTypesLoading,
  } = useGetDocumentTypesQuery(null, {
    skip: !useDocumentTypes,
  });

  const [uploadDocuments, { isLoading: isUploading }] =
    useUploadDocumentsMutation();
  const openInstructionModal = () => {
    setIsInstructionModalOpen(true);
  };

  const closeInstructionModal = () => {
    setIsInstructionModalOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/access-denied");
    } else {
      // Simulate loading delay
      setTimeout(() => setIsLoading(false), 1500);
    }
  }, [navigate]);

  useEffect(() => {
    let interval;
    if (isLoading || isUploading || docTypesLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 10 : 100));
      }, 200);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isLoading, isUploading, docTypesLoading]);

  const handleFileChange = (e) => {
    e.preventDefault();
    if (!selectedType) {
      setIsSelectTypeModalOpen(true);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const uploadedFiles = e.dataTransfer
      ? Array.from(e.dataTransfer.files)
      : Array.from(e.target.files);

    const newFiles = uploadedFiles.map((file) => ({
      date: new Date().toLocaleDateString(),
      document: file.name,
      type: selectedType,
      file: file, // Keep the file object for uploading
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleNext = async () => {
    if (files.length === 0) {
      // No files to upload, proceed to next page
      if (isFinalPage) {
        setIsModalOpen(true);
      } else {
        navigate(nextPage);
      }
      return;
    }

    try {
      const formData = new FormData();

      files.forEach((fileObj, index) => {
        // Append file and other fields
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
        formData.append(`documentRequests[${index}].ruleSet`, "");
        formData.append(`documentRequests[${index}].issues`, "");
      });

      await uploadDocuments(formData).unwrap();

      // Handle success
      if (isFinalPage) {
        setIsModalOpen(true);
      } else {
        navigate(nextPage);
      }
    } catch (error) {
      console.error("An error occurred while uploading files:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (isFinalPage) {
      navigate("/successcard");
    }
  };

  if (isLoading || isUploading || docTypesLoading) {
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

  const closeSelectTypeModal = () => setIsSelectTypeModalOpen(false);

  const handleUploadClick = () => {
    if (!selectedType) {
      setIsSelectTypeModalOpen(true);
      return;
    }
    fileInputRef.current.click();
  };

  const handleRemoveFile = (index) =>
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

  const openCamera = () => {
    if (!selectedType) {
      setIsSelectTypeModalOpen(true);
      return;
    }
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
        type: selectedType,
        file: file,
      };

      setFiles((prevFiles) => [...prevFiles, newFile]);
      setIsCameraOpen(false);
    }
  };

  const closeCamera = () => setIsCameraOpen(false);

  return (
    <div className="w-full px-8 mt-10">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl p-16 font-semibold">{headerTitle}</p>
        <button
          onClick={openInstructionModal}
          className="rounded-lg bg-blue-600 px-8 py-2.5 text-base font-medium text-white hover:text-primary "
        >
          Instructions
        </button>
      </div>

      <div className="flex justify-around gap-12">
        <div className="flex flex-col w-1/2 space-y-6">
          <label className="block text-sm font-medium text-gray-700 ">
            Document Type
          </label>
          <select
            className="p-2 border border-gray-300 rounded-md "
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select a document type</option>
            {useDocumentTypes ? (
              isLoading ? (
                <option>Loading...</option>
              ) : error ? (
                <option>Error loading document types</option>
              ) : (
                documentTypesData.map((docType) => (
                  <option key={docType.id} value={docType.type}>
                    {docType.name}
                  </option>
                ))
              )
            ) : (
              <>
                <option value="National ID Card">National ID Card</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
              </>
            )}
          </select>
          <div
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
            onClick={handleUploadClick}
            onDrop={handleFileChange}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 "
                aria-hidden="true"
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
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 ">
                PDF, SVG, PNG, JPG, or GIF (MAX. 800x400px)
              </p>
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

          {/* Cam Scanner Button */}
          <button
            onClick={openCamera}
            className="rounded-lg bg-blue-600 px-8 py-2.5 text-base font-medium text-white hover:text-primary"
          >
            Use Camscanner
          </button>
        </div>

        <div className="border-l-2 border-gray-300  flex flex-col w-2/6 pl-8 space-y-6">
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

      {/* Camera Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-md">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={{
                facingMode: "environment",
              }}
              className="w-full h-auto"
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={closeCamera}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={capturePhoto}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Capture
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end mt-32 pr-80 space-x-4">
        <button
          onClick={() => navigate(nextPage)}
          className="rounded-lg bg-gray-300 px-8 py-2.5 text-base font-medium text-black hover:text-primary "
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          disabled={isUploading}
          className={`rounded-lg bg-blue-600 px-8 py-2.5 text-base font-medium text-white hover:text-primary  ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isFinalPage ? "Submit" : "Next"}
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        message="Successfully submitted all documents!"
      />

      <Modal
        isOpen={isInstructionModalOpen}
        onClose={closeInstructionModal}
        message={
          <div>
            {/* Instructions content */}
            <p>
              <strong>You must supply at least ONE Primary document</strong>
            </p>
            <p>
              Foreign documents must be accompanied by an official translation.
            </p>
            <br />
            {/* Primary Documents Table */}

            <br />
            <p className="font-bold">Total points provided (minimum 100)</p>
          </div>
        }
      />

      {/* Modal to prompt user to select a document type */}
      <Modal
        isOpen={isSelectTypeModalOpen}
        onClose={closeSelectTypeModal}
        message="Please select a document type before proceeding."
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

export { IdentificationDocuments };
