import React, { useState } from "react";
import logo from "../../../assets/Logo.png";
import userImg from "../../../assets/profile/dp.png";
import starIcon from "../../../assets/profile/star.png";
import showIcon from "../../../assets/profile/ShowG_blue.png";
import threeDots from "../../../assets/profile/3dots.png";
import arrowDown from "../../../assets/profile/arrow-down-01.png";
import smallMenuIcon from "../../../assets/profile/menu-03.png";
import timeZoneIcon from "../../../assets/profile/navigation-02.png";
import locationIcon from "../../../assets/profile/location-remove-01.png";
import emailIcon from "../../../assets/profile/mail-02.png";
import phoneIcon from "../../../assets/profile/call.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

const EmployeeProfileWithTabs = () => {
  const [activeTab, setActiveTab] = useState("applications");
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const staticStudents = [
    {
      fullName: "John Doe",
      emailAddress: "johndoe@example.com",
      phoneNumber: "123-456-7890",
      usiNumber: "USI12345",
      gender: "Male",
    },
    {
      fullName: "Jane Smith",
      emailAddress: "janesmith@example.com",
      phoneNumber: "987-654-3210",
      usiNumber: "USI54321",
      gender: "Female",
    },
    {
      fullName: "Alice Johnson",
      emailAddress: "alicej@example.com",
      phoneNumber: "555-666-7777",
      usiNumber: "USI67890",
      gender: "Female",
    },
  ];

  const activities = [
    {
      date: "09/16/2019, 06:27PM",
      account: "South Edibe",
      user: "Jesse Roy",
      change: "Downloaded: name_of_file.pdf",
      action: "UNDO",
    },
    {
      date: "09/16/2019, 06:27PM",
      account: "East Sanie",
      user: "Mayme Marsh",
      change: "Downloaded: name_of_file.pdf",
      action: "UNDO",
    },
    {
      date: "09/16/2019, 06:27PM",
      account: "Dabneyestad",
      user: "Hubert Jennings",
      change: "Downloaded: name_of_file.pdf",
      action: "UNDO",
    },
  ];

  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const filteredStudents = staticStudents
    .filter((student) => {
      if (!filter) return true;
      const lowerFilter = filter.toLowerCase();
      return (
        student.fullName.toLowerCase().includes(lowerFilter) ||
        student.emailAddress.toLowerCase().includes(lowerFilter) ||
        student.phoneNumber.toLowerCase().includes(lowerFilter) ||
        student.usiNumber.toLowerCase().includes(lowerFilter)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.fullName.localeCompare(b.fullName);
      } else {
        return b.fullName.localeCompare(a.fullName);
      }
    });

  const filteredActivities = activities.filter((activity) => {
    return (
      activity.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.change.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col gap-12 p-6 md:flex-row">
      <div className="flex-1 space-y-6">
        <div className="flex w-full justify-between space-y-4 mt-8 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-bold">Total Applications</h3>
            <p className="text-2xl text-blue-600 font-semibold">300</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-bold">Completed Applications</h3>
            <p className="text-2xl text-blue-600 font-semibold">200</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-bold">Pending Applications</h3>
            <p className="text-2xl text-blue-600 font-semibold">100</p>
          </div>
        </div>
        <div className="flex justify-start space-x-8 border-b pb-2 mt-16 mb-4">
          <button
            className={`text-lg font-semibold pb-2 ${
              activeTab === "applications"
                ? "text-blue-500 border-b-4 border-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("applications")}
          >
            Applications
          </button>
          <button
            className={`text-lg font-semibold pb-2 ${
              activeTab === "Activity"
                ? "text-blue-500 border-b-4 border-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Activity")}
          >
            Activity
          </button>
          <button
            className={`text-lg font-semibold pb-2 ${
              activeTab === "leads"
                ? "text-blue-500 border-b-4 border-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("leads")}
          >
            Leads
          </button>
        </div>

        {activeTab === "applications" && (
          <div className="flex gap-4 mt-8 items-center">
            <div className="w-full">
              <div className="flex justify-between items-center mb-4 space-x-2">
                <input
                  type="text"
                  placeholder="Search by Name, Email, Phone, or USI Number"
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-1/2"
                />
                <button
                  onClick={handleSortChange}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Sort by Name ({sortOrder === "asc" ? "A-Z" : "Z-A"})
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        USI Number
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                        >
                          There are no students connected with your account.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student, idx) => (
                        <tr key={idx} className="hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {student.fullName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.emailAddress}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.phoneNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.usiNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.gender}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Activity" && (
          <div className=" min-h-screen">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-semibold mb-4">Activity Log</h1>
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  placeholder="Search activity..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-1/3"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  + Add Filter
                </button>
              </div>
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">
                      Date and Time
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">
                      Account
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">
                      User
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">
                      Change
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.map((activity, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-3 text-sm text-gray-800">
                        {activity.date}
                      </td>
                      <td className="px-6 py-3 text-sm text-blue-600 underline">
                        {activity.account}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-800">
                        {activity.user}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-800">
                        {activity.change}
                      </td>
                      <td className="px-6 py-3 text-sm text-blue-600 cursor-pointer hover:underline">
                        {activity.action}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-600">Rows per page:</div>
                <select className="border border-gray-300 rounded-lg p-2 text-sm">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <div className="text-sm text-gray-600">
                  1 - {filteredActivities.length} of {activities.length}
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:underline">
                    &lt;
                  </button>
                  <button className="text-blue-600 hover:underline">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "leads" && <div>Leads Content Here</div>}
      </div>

      {/* Profile Section */}
      <div className="h-3/5 w-full mt-8 space-y-4 rounded-lg bg-white p-4 shadow-md md:w-2/5">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
          <img src={threeDots} alt="Options" />
        </div>
        <hr className="border-gray-200" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={userImg} alt="User" className="rounded-full" />
            <div>
              <h3 className="text-lg font-bold">Sam Roy</h3>
              <p className="text-sm text-gray-500">Sales</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center gap-2">
            <img src={arrowDown} alt="Arrow Down" />
            <h4 className="text-base font-semibold text-gray-800">
              About this Contact
            </h4>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <img src={smallMenuIcon} alt="Menu" />
            <p className="text-base text-gray-600">Remarks</p>
          </div>
          <button className="text-base font-semibold text-blue-600 hover:underline">
            + Add
          </button>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-base font-semibold text-gray-800">Details</h4>
          <div className="space-y-2 pt-2 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={timeZoneIcon} alt="Timezone" />
                <p className="text-base text-gray-500">Created At</p>
              </div>
              <p className="text-base font-medium text-gray-800">
                28th Feb,2024
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={locationIcon} alt="Location" />
                <p className="text-base text-gray-500">Location</p>
              </div>
              <p className="text-base font-medium text-gray-800">
                Sydney, Australlia
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={emailIcon} alt="Work Email" />
                <p className="text-base text-gray-500">Work Email</p>
              </div>
              <a
                href="mailto:samroy@gmail.com"
                className="text-base font-medium text-blue-600 underline"
              >
                samroy@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={phoneIcon} alt="Phone" />
                <p className="text-base text-gray-500">Phone</p>
              </div>
              <p className="text-base font-medium text-gray-800">
                (+91) 871 661 9812
              </p>
            </div>
          </div>
        </div>

        <button className="mt-4 text-sm font-medium flex w-full items-center justify-center gap-2 rounded-lg border border-blue-600 px-6 py-3 text-blue-600 hover:bg-blue-50">
          <FontAwesomeIcon
            icon={faBan}
            size="lg"
            style={{ color: "#2563EB" }}
          />
          Suspend Access
        </button>
      </div>
    </div>
  );
};

export default EmployeeProfileWithTabs;
