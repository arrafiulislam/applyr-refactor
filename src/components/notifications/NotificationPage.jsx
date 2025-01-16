import React, { useState } from "react";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      title: "New Message Received",
      description:
        "You have received a new message from the Admin. Check your inbox for more details.",
      createdAt: new Date("2025-01-10T10:15:00"),
      seen: true,
    },
    {
      title: "Profile Approved",
      description:
        "Your profile has been reviewed and approved successfully. You can now access additional features.",
      createdAt: new Date("2025-01-09T14:30:00"),
      seen: true,
    },
    {
      title: "Task Reminder",
      description:
        "Reminder: Please complete your pending task by the end of the week.",
      createdAt: new Date("2025-01-08T08:00:00"),
      seen: false,
    },
    {
      title: "System Update Scheduled",
      description:
        "System maintenance is scheduled for January 15th, 2025, from 2:00 AM to 4:00 AM. Please save your work.",
      createdAt: new Date("2025-01-07T16:45:00"),
      seen: true,
    },
  ]);

  const formatDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      seen: true,
    }));
    setNotifications(updatedNotifications);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button
          onClick={markAllAsRead}
          className="text-blue-600 text-base hover:underline"
        >
          Mark all as read
        </button>
      </div>
      <div>
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`border p-4 rounded-md mb-4 ${
              !notification.seen ? "bg-blue-50" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <p className="font-medium">{notification.title}</p>
              {!notification.seen && (
                <span className="text-red-500 text-sm font-bold">•</span>
              )}
            </div>
            <p className="text-gray-600 text-sm mt-1">
              {notification.description}
            </p>
            <p className="text-gray-400 text-xs mt-2">
              {formatDateTime(notification.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
