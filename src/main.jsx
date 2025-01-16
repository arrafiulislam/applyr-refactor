import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./auth/login/Login.jsx";
import Signup from "./auth/register/SignupStudent.jsx";
import Home from "./layout/Home.jsx";
import Main from "./layout/Main.jsx";
import OverviewLayout from "./layout/OverviewLayout.jsx";
import Overview from "./pages/Student/Overview.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import SignUpCard from "./components/signupCard/SignUpCard.jsx";
import AgenId, { AccessDenied } from "./pages/Agent/AgentId.jsx";
import { IdentificationDocuments } from "./pages/Student/DocumentsRegister.jsx";
import SuccessCard from "./components/successCard/SuccessCard.jsx";
import SignupStudent from "./auth/register/SignupStudent.jsx";
import AgentSignUp from "./auth/register/AgentSignUp.jsx";
import AgentLayout from "./layout/AgentLayout.jsx";
import AgentDashboard from "./pages/Agent/AgentDashboard.jsx";
import routes from "./routes";
import ResumeRegister from "./pages/Student/ResumeRegister.jsx";
import EducationCertReg from "./pages/Student/EducationCertReg.jsx";

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Main />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.login,
        element: <Login />,
      },
      {
        path: routes.signupStudent,
        element: <SignupStudent />,
      },
      {
        path: routes.signupAgent,
        element: <AgentSignUp />,
      },
      {
        path: routes.signupSelection,
        element: <SignUpCard />,
      },

      {
        path: routes.connectWithAgent,
        element: <AgenId />,
      },
      {
        path: routes.accessDenied,
        element: <AccessDenied />,
      },
      {
        path: routes.uploadIdentification,
        element: <IdentificationDocuments />,
      },

      {
        path: routes.uploadResumeRegister,
        element: <ResumeRegister></ResumeRegister>,
      },
      {
        path: routes.uploadCertificatesRegister,
        element: <EducationCertReg />,
      },
      {
        path: routes.successCard,
        element: <SuccessCard />,
      },
    ],
  },
  // Student part
  {
    path: routes.student,
    element: <OverviewLayout />,
    children: [
      {
        path: routes.studentDashboard,
        element: <Overview />,
      },
    ],
  },
  //agent
  {
    path: routes.agentLayout,
    element: <AgentLayout />,
    children: [
      {
        path: routes.agentDashboard,
        element: <AgentDashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
