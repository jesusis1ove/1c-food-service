import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backend } from "../../backend";
export const accountsAPI = createApi({
  reducerPath: "getAccounts",
  baseQuery: fetchBaseQuery({ baseUrl: `${backend}/` }),
  endpoints: (build) => ({
    fetchAccounts: build.query({
      query: () => ({
        url: "accounts/",
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }),
    }),
    createAccount: build.mutation({
      query: (credentials) => ({
        url: "accounts/token/",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: { ...credentials },
      }),
    }),
  }),
});
export const { useFetchAccountsQuery, useCreateAccountMutation } = accountsAPI;
