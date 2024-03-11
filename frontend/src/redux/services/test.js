import { apiSlice } from "../slices/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/accounts/token/",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
