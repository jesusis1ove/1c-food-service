import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backend } from "../../backend";

export const menuAPI = createApi({
  reducerPath: "getMenu",
  baseQuery: fetchBaseQuery({ baseUrl: `${backend}/` }),
  endpoints: (build) => ({
    fetchMenu: build.query({
      query: ({ date }) => ({
        url: `menu/${date === null || date === undefined ? "" : `?date=${date}`}`,
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }),
    }),
  }),
});
export const { useFetchMenuQuery } = menuAPI;
