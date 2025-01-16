import React, { useEffect, useState } from "react";
import dp from "../../assets/images.jfif";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../services/LocalStorageService";
import {
  useGetLoggedUserQuery,
  useGetDocumentsInfoQuery,
} from "../../services/profileInfoApi";
import routes from "../../routes";
import logo from "../../assets/Logo.png";

const Overview = () => {
  const [userData, setUserData] = useState({
    emailAddress: "",
    name: "",
    address: "",
    usiNumber: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const token = getToken();
  const navigate = useNavigate();

  const {
    data: userDataResponse,
    isLoading: userLoading,
    isError: userError,
  } = useGetLoggedUserQuery(token);
  const {
    data: documentData,
    isLoading: documentLoading,
    isError: documentError,
  } = useGetDocumentsInfoQuery(token);

  useEffect(() => {
    let interval;
    if (userLoading || documentLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 10 : 100));
      }, 200);
    } else {
      clearInterval(interval);
      setIsLoading(false);
    }

    return () => clearInterval(interval);
  }, [userLoading, documentLoading]);

  useEffect(() => {
    if (userDataResponse) {
      setUserData({
        emailAddress: userDataResponse.emailAddress,
        name: userDataResponse.fullName,
        address: userDataResponse.residentialAddress,
        usiNumber: userDataResponse.usiNumber,
      });
    }
  }, [userDataResponse]);

  const documentSections = documentData
    ? mapDocumentDataToSections(documentData)
    : [];

  const handleSubmitApplication = () => {
    navigate(routes.studentApplication);
  };

  if (isLoading) {
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

  if (userError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-gray-800">404</h1>
          <p className="text-6xl text-gray-600 mt-2">Not Found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-0 md:py-16 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Documents Sections */}
        <div className="lg:col-span-2 grid grid-cols-1 gap-6 bg-gray-50">
          {documentSections.map((section, idx) => (
            <DocumentSection
              key={idx}
              title={section.title}
              documents={section.documents}
            />
          ))}
        </div>

        {/* User Information and Application Status */}
        <div className="p-6 rounded-lg shadow-sm flex flex-col justify-between max-h-80">
          <div>
            <div className="flex justify-between gap-6">
              <div className="mt-6 space-y-2">
                <p>
                  <span className="text-black-700 font-bold text-xl">
                    {userData.name}
                  </span>
                </p>
                {[
                  ["", userData.emailAddress],
                  ["", userData.address],
                  ["USI ", `USI-${userData.usiNumber}`],
                ].map(([label, value], idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-gray-700 text-xs">{value}</span>
                  </div>
                ))}
              </div>
              <img
                src={dp}
                alt="Profile"
                className="w-20 h-20 mt-12 md:w-28 md:h-28 rounded-full shadow-sm md:mt-8"
              />
            </div>
            <p className="mt-4 md:mt-12 flex items-center justify-center h-2 border-b"></p>
            <p className="text-lg font-semibold mb-4 mt-6">
              Application Status
            </p>
          </div>
          <p className="text-3xl md:text-5xl font-semibold text-zinc-400 text-center mt-12 md:mt-20">
            {userDataResponse.status}
          </p>

          {userDataResponse.status === "UNSUBMITTED" ? (
            <p className="text-xs font-normal text-zinc-400 text-center mt-8">
              Please provide all your essential documents and submit your
              application.
            </p>
          ) : (
            <p className="text-xs font-normal text-zinc-400 text-center mt-8"></p>
          )}

          <div className="mt-6 border-t pt-4">
            <div className="flex flex-col gap-4">
              {userDataResponse.status === "UNSUBMITTED" ? (
                <button
                  className="w-full bg-blue-500 text-white text-sm py-2 rounded-md hover:bg-blue-600"
                  onClick={handleSubmitApplication}
                >
                  Submit Application
                </button>
              ) : (
                <p className="text-center text-gray-500"></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDocumentDataToSections = (documentData) => {
  const sectionMapping = {
    PASSPORT: "Identification Documents",
    ID_CARD: "Identification Documents",
    CERTIFICATE: "Academic Documents",
    LICENSE: "Identification Documents",
    OTHER: "Other Documents",
    RESUME: "Resume and Reference Documents",
    CV: "Resume and Reference Documents",
    REFERENCES: "Resume and Reference Documents",
    CERTIFICATE_OF_IDENTITY: "Identification Documents",
    PHOTO_ID_CARD: "Identification Documents",
    FOREIGN_DOCUMENT: "Other Documents",
    FOREIGN_PASSPORT: "Identification Documents",
    INDIGENOUS_ORGANISATION_REFERENCE: "Other Documents",
    UTILITY_BILL: "Other Documents",
    RATING_AUTHORITY_NOTICE: "Other Documents",
    CITIZENSHIP_CERTIFICATE: "Identification Documents",
    FULL_BIRTH_CERTIFICATE: "Identification Documents",
    DRIVER_LICENSE: "Identification Documents",
    TERTIARY_STUDENT_ID_CARD: "Identification Documents",
    DEFENCE_ID_CARD: "Identification Documents",
    GOVERNMENT_EMPLOYEE_ID: "Identification Documents",
    DVA_CARD: "Identification Documents",
    CENTRELINK_CARD: "Identification Documents",
    MARRIAGE_CERTIFICATE: "Identification Documents",
    DECREE_NISI_ABSOLUTE: "Identification Documents",
    CHANGE_OF_NAME_CERTIFICATE: "Identification Documents",
    BANK_STATEMENT: "Financial Documents",
    LEASE_AGREEMENT: "Financial Documents",
    TAXATION_NOTICE: "Financial Documents",
    MORTGAGE_DOCUMENTS: "Financial Documents",
    BIRTH_CARD: "Identification Documents",
    AUSTRALIAN_PASSPORT: "Identification Documents",
    BIRTH_CERTIFICATE_EXTRACT: "Identification Documents",
    MEDICARE_CARD: "Identification Documents",
    CREDIT_OR_ACCOUNT_CARD: "Financial Documents",
    ALL: "All Documents",
  };

  const sections = {};

  documentData.forEach((doc) => {
    const sectionTitle = sectionMapping[doc.documentType] || "Other Documents";

    if (!sections[sectionTitle]) {
      sections[sectionTitle] = [];
    }

    sections[sectionTitle].push({
      name: doc.documentName,
      status: doc.status,
      uploadedDate: new Date(doc.updatedAt).toLocaleDateString(),
    });
  });

  return Object.keys(sections).map((sectionTitle) => ({
    title: sectionTitle,
    documents: sections[sectionTitle],
  }));
};

const DocumentSection = ({ title, documents }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="bg-white rounded-lg shadow-inner p-4 divide-y divide-gray-200">
      <div className="flex justify-between font-semibold text-sm text-gray-500 mb-4">
        <span className="w-1/3">Document Name</span>
        <span className="w-1/3 text-center">Status</span>
        <span className="w-1/3 text-right">Uploaded Date</span>
      </div>
      {documents.map((doc, idx) => (
        <div key={idx} className="py-3 flex justify-between items-center">
          <div className="w-1/3">
            <p className="font-normal text-black-600">{doc.name}</p>
          </div>
          <div className="w-1/3 flex justify-center">
            <p className={`text-sm ${getStatusColor(doc.status)}`}>
              {doc.status}
            </p>
          </div>
          <div className="w-1/3 text-right">
            <p className="text-gray-500 text-sm">{doc.uploadedDate}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const getStatusColor = (status) => {
  switch (status) {
    case "ACCEPTED":
      return "text-green-500";
    case "DECLINED":
      return "text-red-500";
    case "PENDING":
      return "text-yellow-500";
    default:
      return "text-gray-500";
  }
};

export default Overview;
