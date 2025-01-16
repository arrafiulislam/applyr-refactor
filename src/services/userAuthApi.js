import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: 'v1/auth/student/register',
        method: 'POST',
        body: user,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: 'v1/auth/login',
        method: 'POST',
        body: user,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    sendPasswordResetEmail: builder.mutation({
      query: (email) => ({
        url: 'auth/reset-password-email',
        method: 'POST',
        body: { email },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    registerAgent: builder.mutation({
      query: (agentData) => ({
        url: 'v1/auth/agent/register',
        method: 'POST',
        body: agentData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    getCompanies: builder.query({
      query: () => ({
        url: 'v1/auth/agent/companies',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useSendPasswordResetEmailMutation,
  useRegisterAgentMutation,
  useGetCompaniesQuery, // Exported here
} = userAuthApi;
