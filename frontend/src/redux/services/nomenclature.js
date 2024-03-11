import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backend } from "../../backend";

export const nomenclatureAPI = createApi({
  reducerPath: "getNomenclature",
  baseQuery: fetchBaseQuery({
    baseUrl: `${backend}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchNomenclature: build.query({
      query: () => ({
        url: "nomenclature/",
      }),
    }),
  }),
});
export const { useFetchNomenclatureQuery } = nomenclatureAPI;
