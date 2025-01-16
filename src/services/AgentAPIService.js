import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AgentAPIService = createApi({
  reducerPath: 'AgentAPIService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/agent',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPendingApplications: builder.query({
      query: () => '/students/pending',
    }),
    getAllEmails: builder.query({
      query: () => '/emails/all',
    }),
    getAllStudents: builder.query({
      query: () => '/students/all',
    }),
    getProfile: builder.query({
      query: () => '/profile',
    }),
    // New queries for single student and their documents
    getSingleStudent: builder.query({
      query: (username) => `/student/${username}`,
    }),
    getStudentDocuments: builder.query({
      query: (username) => `/students/documents/${username}`,
    }),
  }),
});

export const { 
  useGetPendingApplicationsQuery, 
  useGetAllEmailsQuery, 
  useGetAllStudentsQuery, 
  useGetProfileQuery,
  useGetSingleStudentQuery,
  useGetStudentDocumentsQuery
} = AgentAPIService;
