import React, { useState } from "react";

const EmployeeActivity = () => {
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredActivities = activities.filter((activity) => {
    return (
      activity.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.change.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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
            <button className="text-blue-600 hover:underline">&lt;</button>
            <button className="text-blue-600 hover:underline">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeActivity;
