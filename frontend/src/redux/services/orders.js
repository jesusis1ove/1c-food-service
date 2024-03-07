import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backend } from "../../backend";
export const ordersAPI = createApi({
  reducerPath: "getOrders",
  baseQuery: fetchBaseQuery({ baseUrl: `${backend}/` }),
  endpoints: (build) => ({
    fetchOrders: build.query({
      query: () => ({
        url: "orders/",
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }),
    }),
    createOrder: build.mutation({
      query: (order) => ({
        url: "orders/",
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
        body: order,
      }),
    }),
  }),
});
export const { useFetchOrdersQuery, useCreateOrderMutation } = ordersAPI;
