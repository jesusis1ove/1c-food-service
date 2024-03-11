import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backend } from "../../backend";

export const ordersAPI = createApi({
  reducerPath: "getOrders",
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
    fetchOrders: build.query({
      query: () => ({
        url: "orders/",
      }),
    }),
    createOrder: build.mutation({
      query: (order) => ({
        url: "orders/",
        method: "POST",
        body: order,
      }),
    }),
  }),
});
export const { useFetchOrdersQuery, useCreateOrderMutation } = ordersAPI;
