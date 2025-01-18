import React, { useState, useEffect } from "react";
import logo from "../../../assets/Logo.png";

const AllStudentsScreen = () => {
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Static students data
  const students = [
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

  useEffect(() => {
    // Simulate a loading process
    let interval;
    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 10 : 100));
      }, 200);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Simulated 2-second loading time
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Filter and sort logic
  const filteredStudents = students
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

  return (
    <div className="container mx-auto py-8 px-4">
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
  );
};

export default AllStudentsScreen;
