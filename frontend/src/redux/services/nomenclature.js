import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backend } from "../../backend";

export const nomenclatureAPI = createApi({
  reducerPath: "getNomenclature",
  baseQuery: fetchBaseQuery({ baseUrl: `${backend}/` }),
  endpoints: (build) => ({
    fetchNomenclature: build.query({
      query: () => ({
        url: "nomenclature/",
        headers: {
          Authorization: "Basic" + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }),
    }),
  }),
});
export const { useFetchNomenclatureQuery } = nomenclatureAPI;
