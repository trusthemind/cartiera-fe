import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  credentials: "same-origin",
  prepareHeaders(headers, { getState, endpoint }) {
    headers.set("User-Agent", navigator.userAgent);
    const key = (getState() as RootState).auth.token;

    if (endpoint === "login" || endpoint === "registration") {
      return headers;
    }

    if (key) {
      headers.set("Authorization", key.toString());
    }

    return headers;
  },
});

// API setup
export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Auth", "Details", "Cars", "Engines", "Payments", "PaymentMethod"],

  refetchOnFocus: true, // Adjust based on your application's requirements
  refetchOnReconnect: true, // Adjust based on your application's requirements
  refetchOnMountOrArgChange: true, // Adjust based on your application's requirements
  endpoints: () => ({}), // Define your endpoints here
});

// Injecting endpoints if needed (this can be removed if not dynamically injecting endpoints)
api.injectEndpoints({ endpoints: () => ({}) });

export default api;