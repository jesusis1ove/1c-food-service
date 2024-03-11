import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backend } from "../../backend";
import { logOut, setCredentials } from "./authorizationSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: backend,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    headers.set("Content-type", `application/json`);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      // headers.set("Content-type", `application/json`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");

    const refreshResult = await baseQuery(
      "/accounts/token/",
      api,
      extraOptions,
    );
    console.log(refreshResult);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;

      //store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
