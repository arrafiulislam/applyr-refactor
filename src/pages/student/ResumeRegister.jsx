import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Modal from "../../components/modal/Modal.jsx";
import buttonImg from "../../assets/file.png";
import logo from "../../assets/Logo.png";
import routes from "../../routes.jsx";
import { useUploadDocumentsMutation } from "../../services/studentApiService.js";

const ResumeRegister = () => {
  return (
    <DocumentsRegister
      headerTitle="Resume and References"
      nextPage={routes.uploadCertificatesRegister}
      isFinalPage={false}
    />
  );
};

const DocumentsRegister = ({ headerTitle, nextPage, isFinalPage }) => {
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectTypeModalOpen, setIsSelectTypeModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [uploadDocuments, { isLoading: isUploading }] =
    useUploadDocumentsMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/access-denied");
    } else {
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
      file: file,
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
        formData.append(`documentRequests[${index}].ruleSet`, "");
        formData.append(`documentRequests[${index}].issues`, "");
      });

      await uploadDocuments(formData).unwrap();
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

  const closeSelectTypeModal = () => {
    setIsSelectTypeModalOpen(false);
  };
  const handleUploadClick = () => {
    if (!selectedType) {
      setIsSelectTypeModalOpen(true);
      return;
    }
    fileInputRef.current.click();
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

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
          <label className="block text-sm font-medium text-gray-700 ">
            Document Type
          </label>
          <select
            className="p-2 border border-gray-300 rounded-md "
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select a document type</option>
            <option value="RESUME">Resume</option>
            <option value="CV">CV</option>
            <option value="REFERENCES">References</option>
          </select>
          <div
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
            onClick={handleUploadClick}
            onDrop={handleFileChange}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-sm text-gray-500">
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

          <button
            onClick={openCamera}
            className="rounded-lg bg-blue-600 px-8 py-2.5 text-base font-medium text-white hover:text-primary "
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

      <div className="flex justify-between gap-6 mt-6">
        <button
          onClick={() => navigate(routes.studentProfile)}
          className="inline-flex items-center px-4 py-2 text-base font-medium text-gray-700 border border-gray-300 rounded-lg "
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
          disabled={isUploading}
          className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Next"}
        </button>
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <p className="text-center">Upload complete! You can proceed now.</p>
      </Modal>
      {/* Modal to prompt user to select a document type */}
      <Modal
        isOpen={isSelectTypeModalOpen}
        onClose={closeSelectTypeModal}
        message="Please select a document type before proceeding."
      />

      {isCameraOpen && (
        <div className="flex flex-col items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            width="100%"
            videoConstraints={{
              facingMode: "environment",
            }}
          />
          <div className="flex justify-center mt-4">
            <button
              onClick={capturePhoto}
              className="px-6 py-2 text-white bg-blue-600 rounded-lg"
            >
              Capture Photo
            </button>
            <button
              onClick={closeCamera}
              className="ml-4 px-6 py-2 text-white bg-gray-600 rounded-lg"
            >
              Close Camera
            </button>
          </div>
        </div>
      )}
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

export default ResumeRegister;
