import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProviderApiService = createApi({
  reducerPath: "ProviderApiService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/agent",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProviderDetails: builder.query({
      query: (token) => {
        return {
          url: "/providers/all",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    addProvider: builder.mutation({
      query: (provider) => ({
        url: "/providers/add",
        method: "POST",
        body: provider,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useAddProviderMutation, useGetProviderDetailsQuery } =
  ProviderApiService;
