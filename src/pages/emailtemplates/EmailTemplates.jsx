import React, { useState } from "react";

const EmailTemplates = () => {
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Sample hardcoded data for email templates
  const templates = [
    { name: "Welcome Email", createdAt: "2025-01-01" },
    { name: "Password Reset", createdAt: "2025-01-05" },
    { name: "Monthly Newsletter", createdAt: "2025-01-10" },
  ];

  // Filter and sort logic
  const filteredTemplates = templates
    .filter((template) => {
      if (!filter) return true;
      return template.name.toLowerCase().includes(filter.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleEdit = (name) => {
    alert(`Edit template: ${name}`);
  };

  const handleDelete = (name) => {
    alert(`Delete template: ${name}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search Templates"
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
                Created At
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTemplates.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                >
                  No templates found.
                </td>
              </tr>
            ) : (
              filteredTemplates.map((template, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {template.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {template.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 cursor-pointer">
                    <button
                      onClick={() => handleEdit(template.name)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 cursor-pointer">
                    <button
                      onClick={() => handleDelete(template.name)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
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

export default EmailTemplates;
