import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backend } from "../../backend";

export const metersAPI = createApi({
  reducerPath: "getAllMeters",
  baseQuery: fetchBaseQuery({ baseUrl: `${backend}/` }),
  endpoints: (build) => ({
    fetchAllMeters: build.query({
      query: () => ({
        url: "meters/",
        headers: {
          Authorization: "Bearer",
          "Content-type": "application/json",
        },
      }),
    }),

    fetchMeterById: build.query({
      query: (uuid) => ({
        url: `meters/${uuid}`,
      }),
    }),
  }),
});
export const { useFetchAllMetersQuery, useFetchMeterByIdQuery } = metersAPI;
