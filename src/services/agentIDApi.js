import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const agentIDApi = createApi({
  reducerPath: 'agentIDApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/student', 
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    submitAgentId: builder.mutation({
      query: (agentIdData) => ({
        url: `/update/agent/${agentIdData}`, 
        method: 'PUT', 
      }),
    }),
  }),
});

export const { useSubmitAgentIdMutation } = agentIDApi;
