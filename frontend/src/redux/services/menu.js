import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backend } from "../../backend";

export const menuAPI = createApi({
  reducerPath: "getMenu",
  baseQuery: fetchBaseQuery({
    baseUrl: `${backend}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log(token)
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchMenu: build.query({
      query: ({ date }) => ({
        url: `menu/${date === null || date === undefined ? "" : `?date=${date}`}`,
      }),
    }),
  }),
});
export const { useFetchMenuQuery } = menuAPI;
