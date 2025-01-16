// StudentAPIService.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const StudentAPIService = createApi({
  reducerPath: 'StudentAPIService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/', // TODO: base URI should come from environment variables
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Set the Bearer token in Authorization header
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDocumentTypes: builder.query({
      query: () => 'student/document/types',
    }),
    uploadDocuments: builder.mutation({
      query: (formData) => ({
        url: 'student/upload/documents',
        method: 'PUT',
        body: formData,
      }),
    }),
    submitApplication: builder.mutation({
      query: () => ({
        url: 'student/application/submit', // URL for the submit application endpoint
        method: 'PUT', // HTTP method is PUT
      }),
    }),
  }),
});

export const {
  useGetDocumentTypesQuery,
  useUploadDocumentsMutation,
  useSubmitApplicationMutation,
} = StudentAPIService;
