import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ProfileInfoApi = createApi({
  reducerPath: 'ProfileInfoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/student' }), 
  endpoints: (builder) => ({
    getLoggedUser: builder.query({
      query: (token) => {
        return {
          url: '/profile', 
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        };
      },
    }),
    getDocumentsInfo: builder.query({
      query: (token) => {
        return {
          url: '/documents', 
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        };
      },
    }),
  }),
});

export const {
  useGetLoggedUserQuery,
 useGetDocumentsInfoQuery
} = ProfileInfoApi;