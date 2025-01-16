import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  PointElement,
  LineElement,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  useGetAllEmailsQuery,
  useGetPendingApplicationsQuery,
  useGetAllStudentsQuery,
} from "../../services/AgentAPIService";
import logo from "../../assets/Logo.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const AgentDashboard = () => {
  const [progress, setProgress] = useState(0);
  const {
    data: emails = [],
    isLoading: emailsLoading,
    isError: emailsError,
  } = useGetAllEmailsQuery();
  const {
    data: pendingApplications = [],
    isLoading: applicationsLoading,
    isError: applicationsError,
  } = useGetPendingApplicationsQuery();
  const {
    data: students = [],
    isLoading: studentsLoading,
    isError: studentsError,
  } = useGetAllStudentsQuery();

  const isLoading = emailsLoading || applicationsLoading || studentsLoading;

  useEffect(() => {
    let interval;
    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 10;
          return next <= 100 ? next : 100;
        });
      }, 200);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const overviewData = [
    {
      title: "Total Applicants",
      count: students?.length || 0,
      change: "0%",
      comparison: "vs previous 28 days",
      trend: "up",
    },
    {
      title: "Pending Applications",
      count: pendingApplications?.length || 0,
      change: "0%",
      comparison: "vs previous 28 days",
      trend: "up",
    },
    {
      title: "Approved Applications",
      count: 0,
      change: "%",
      comparison: "vs previous 28 days",
      trend: "neutral",
    },
    {
      title: "Applications Sent to Providers",
      count: 0,
      change: "%",
      comparison: "vs previous 28 days",
      trend: "neutral",
    },
  ];

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
    ],
    datasets: [
      {
        label: "Number of Applicants",
        data: [10, 15, 25, 30, 20, 25, 40, 35, 50, 45, 10],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto py-16 px-4">
      {isLoading ? (
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
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Incoming Emails Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Incoming Emails</h2>
              <div className="bg-white rounded-lg shadow-inner p-4 divide-y divide-gray-200">
                {emailsLoading && <p>Loading emails...</p>}
                {emailsError && <p>Error loading emails!</p>}
                {emails?.length > 0
                  ? emails.slice(0, 4).map((email, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-3"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">
                            {email.sender}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {email.subject}
                          </p>
                        </div>
                        <p className="text-gray-500 text-sm">{email.date}</p>
                      </div>
                    ))
                  : !emailsLoading &&
                    !emailsError && (
                      <p className="text-gray-500 text-center">
                        No emails available.
                      </p>
                    )}
              </div>
            </div>

            {/* Pending Applications Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Pending Applications
              </h2>
              <div className="bg-white rounded-lg shadow-inner p-4 divide-y divide-gray-200">
                {applicationsLoading && <p>Loading applications...</p>}
                {applicationsError && <p>Error loading applications!</p>}
                {pendingApplications?.length > 0
                  ? pendingApplications.slice(0, 4).map((application, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-3"
                      >
                        <a href={`/overview/application`}>
                          <p className="font-semibold text-gray-800 hover:text-blue-500">
                            {application.fullName}
                          </p>
                        </a>
                        <p className="text-gray-500 text-sm">
                          {application.usiNumber}
                        </p>
                      </div>
                    ))
                  : !applicationsLoading &&
                    !applicationsError && (
                      <p className="text-gray-500 text-center">
                        No pending applications available.
                      </p>
                    )}
              </div>
            </div>
          </div>

          {/* Top Section with Chart and Summary Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 mt-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Number of Applicants by Month
              </h2>
              <Line data={chartData} />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {studentsLoading ? (
                <p>Loading overview data...</p>
              ) : studentsError ? (
                <p>Error loading student data!</p>
              ) : (
                overviewData.map((item, idx) => (
                  <OverviewCard
                    key={idx}
                    title={item.title}
                    count={item.count}
                    change={item.change}
                    comparison={item.comparison}
                    trend={item.trend}
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const OverviewCard = ({ title, count, change, comparison, trend }) => (
  <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
    <div className="flex flex-col items-start">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mb-2">{count}</p>
      <p
        className={`text-sm ${
          trend === "up"
            ? "text-green-500"
            : trend === "down"
            ? "text-red-500"
            : trend === "neutral"
            ? "text-gray-500"
            : ""
        } font-semibold mb-1`}
      >
        {change}
      </p>
      <p className="text-xs text-gray-500">{comparison}</p>
    </div>
    <div className="flex items-center">
      <div
        className={`w-full h-1 rounded-full ${
          trend === "up"
            ? "bg-green-300"
            : trend === "down"
            ? "bg-red-300"
            : trend === "neutral"
            ? "bg-gray-300"
            : ""
        }`}
      ></div>
    </div>
  </div>
);

export default AgentDashboard;
