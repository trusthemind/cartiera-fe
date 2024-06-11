import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";
import { cookies } from "next/headers";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  credentials: "same-origin",
  prepareHeaders(headers, { getState, endpoint }) {
    headers.set("User-Agent", navigator.userAgent);
    const key = (getState() as RootState).auth.token;

    // if (key) {
    headers.set(
      "Authorization",
      `Bearer ${key}`
    );

    // }
    if (endpoint === "login" || endpoint === "registration") {
      return headers;
    }

    return headers;
  },
});

// API setup
export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Auth", "Details", "Cars", "Engines", "Payments", "PaymentMethod"],

  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});

api.injectEndpoints({ endpoints: () => ({}) });

export default api;
