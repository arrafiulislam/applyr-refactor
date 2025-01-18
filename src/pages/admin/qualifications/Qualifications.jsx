import React, { useState } from "react";
import logo from "../../../assets/Logo.png";

const Qualifications = () => {
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Static qualifications data
  const qualifications = [
    {
      id: "Q1",
      name: "Software Engineering",
      minimumPrice: "$5000",
      totalApplications: 120,
    },
    {
      id: "Q2",
      name: "Business Management",
      minimumPrice: "$4000",
      totalApplications: 95,
    },
    {
      id: "Q3",
      name: "Cybersecurity",
      minimumPrice: "$6000",
      totalApplications: 80,
    },
  ];

  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Filter and sort logic for qualifications
  const filteredQualifications = qualifications
    .filter((qualification) => {
      if (!filter) return true;
      const lowerFilter = filter.toLowerCase();
      return (
        qualification.name.toLowerCase().includes(lowerFilter) ||
        qualification.id.toLowerCase().includes(lowerFilter)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Qualifications Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Qualifications</h2>
        <div className="flex justify-between items-center mb-4 space-x-2">
          <input
            type="text"
            placeholder="Search by ID or Name"
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
                  ID
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Minimum Price
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Applications
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQualifications.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                  >
                    No qualifications found.
                  </td>
                </tr>
              ) : (
                filteredQualifications.map((qualification, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {qualification.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {qualification.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {qualification.minimumPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {qualification.totalApplications}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Qualifications;
