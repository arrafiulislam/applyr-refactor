import React, { useState } from "react";
import logo from "../../../assets/Logo.png";

const EmployeeProfileWithTabs = () => {
  const profileData = {
    fullName: "John Doe",
    userName: "johndoe123",
    email: "johndoe@example.com",
    dateOfBirth: "1990-01-15",
    gender: "Male",
    phoneNumber: "+1234567890",
  };

  const [activeTab, setActiveTab] = useState("applications");
  const [filter, setFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

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
    {
      fullName: "Alice Johnson",
      emailAddress: "alicej@example.com",
      phoneNumber: "555-666-7777",
      usiNumber: "USI67890",
      gender: "Female",
    },
    {
      fullName: "Alice Johnson",
      emailAddress: "alicej@example.com",
      phoneNumber: "555-666-7777",
      usiNumber: "USI67890",
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
      date: "14 January 2025",
      items: [
        {
          description: 'User searched Facebook "onik"',
          time: "14 January 2025 11:01",
        },
        {
          description: 'User searched Facebook "anik"',
          time: "14 January 2025 11:00",
        },
        {
          description: 'User visited on Facebook "Jannatul Adan Mahi"',
          time: "14 January 2025 07:55",
        },
      ],
    },
    {
      date: "13 January 2025",
      items: [
        {
          description: 'User visited on Facebook "Md Faruk Ahmed"',
          time: "13 January 2025 10:25",
        },
        {
          description: 'User searched Facebook "Fahmida Sumi"',
          time: "13 January 2025 10:20",
        },
      ],
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
        (student.fullName &&
          student.fullName.toLowerCase().includes(lowerFilter)) ||
        (student.emailAddress &&
          student.emailAddress.toLowerCase().includes(lowerFilter)) ||
        (student.phoneNumber &&
          student.phoneNumber.toLowerCase().includes(lowerFilter)) ||
        (student.usiNumber &&
          student.usiNumber.toLowerCase().includes(lowerFilter))
      );
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.fullName.localeCompare(b.fullName);
      } else {
        return b.fullName.localeCompare(a.fullName);
      }
    });

  const filteredActivities = activities
    .map((activity) => {
      const filteredItems = activity.items.filter((item) => {
        const matchesFilter = filter
          ? item.description.toLowerCase().includes(filter.toLowerCase())
          : true;
        const matchesDateFilter = dateFilter
          ? new Date(item.time).toISOString().split("T")[0] === dateFilter
          : true;
        return matchesFilter && matchesDateFilter;
      });
      return { ...activity, items: filteredItems };
    })
    .filter((activity) => activity.items.length > 0);

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold mb-6">Employee Profile</h1>
        <div className="flex flex-wrap gap-16">
          <div className="text-lg">
            <p className="font-semibold">Full Name</p>
            <p>{profileData.fullName}</p>
          </div>
          <div className="text-lg">
            <p className="font-semibold">User Name</p>
            <p>{profileData.userName}</p>
          </div>
          <div className="text-lg">
            <p className="font-semibold">Email</p>
            <p>{profileData.email}</p>
          </div>
          <div className="text-lg">
            <p className="font-semibold">Date of Birth</p>
            <p>{profileData.dateOfBirth}</p>
          </div>
          <div className="text-lg">
            <p className="font-semibold">Gender</p>
            <p>{profileData.gender}</p>
          </div>
          <div className="text-lg">
            <p className="font-semibold">Phone Number</p>
            <p>{profileData.phoneNumber}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-8 border-b pb-2 mt-16 mb-4">
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
            activeTab === "activities"
              ? "text-blue-500 border-b-4 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("activities")}
        >
          Activities
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

      {activeTab === "activities" && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by Description"
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-1/2"
            />
            <input
              type="date"
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          {filteredActivities.map((activity) => (
            <div key={activity.date} className="mb-6">
              <h2 className="text-lg font-semibold mb-2">{activity.date}</h2>
              {activity.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div className="text-sm text-gray-700">
                    {item.description}
                  </div>
                  <div className="text-sm text-gray-500">{item.time}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {activeTab === "applications" && (
        <div className="flex gap-4 mt-8 items-center">
          <div className="w-3/4">
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

          <div className="w-1/4 space-y-4 mt-8">
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
        </div>
      )}

      {activeTab === "leads" && <div>Leads Content Here</div>}
    </div>
  );
};

export default EmployeeProfileWithTabs;
