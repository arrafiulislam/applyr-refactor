const routes = {
  home: "/",
  login: "/signin",
  signupStudent: "/signup/student",
  signupAgent: "/signup/agent",
  signupSelection: "/signup",
  connectWithAgent: "/connect",
  uploadIdentification: "/upload/100points",
  uploadResumeRegister: "/upload/resumeregister",
  uploadCertificatesRegister: "/upload/certificateuploadreg",
  uploadResume: "/upload/resume",
  resume: "/resume",
  successCard: "/successcard",
  accessDenied: "/access-denied",
  notificationPage: "/notifications",

  student: "/student",
  studentDashboard: "/student/dashboard",
  studentSettings: "/student/settings",
  studentDocuments: "/student/documents",
  studentApplication: "/student/application",
  studentDocumentUpload: "/student/document/upload",

  agentLayout: "/agent",
  agentDashboard: "/agent/dashboard",
  agentMessages: "/agent/messages",
  agentApplications: "/agent/applications",
  agentSingleApplication: "/agent/sapplication",
  agentSendEmail: "/agent/send",
  agentProfile: "/agent/profile",
  agentComposeEmail: "/agent/compose",
  agentMessageDetails: "/agent/mdetails",
  agentAllStudents: "/agent/allstudents",
  agentSettings: "/agent/settings",
  agentAllProviders: "/agent/providers",
  agentEmailTemplate: "/agent/emailtemplates",

  admin: "/admin",
  adminDashboard: "/admin/dashboard",
  adminProfile: "/admin/profile",
  allCompanies: "/admin/companies",
  allAgents: "/admin/agents",
  allProviders: "/admin/providers",
  adminSettings: "/admin/settings",
  adminMarketTrends: "/admin/markettrends",
};

export default routes;