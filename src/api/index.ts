import {
  createApi,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
  type BaseQueryFn,
} from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  credentials: "same-origin",
  prepareHeaders(headers, { getState, endpoint }) {
    headers.set("User-Agent", navigator.userAgent);
    console.log(headers,"headers")
    if (endpoint === "login") {
      return headers;
    }
    if (endpoint === "registration") {
      return headers;
    }
    const key ="Asdasd";
    if (key) {
      headers.set("Authorization", key.toString() ?? "");
    }
    return headers;
  },
});

const baseQueryWithResult: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithResult,
  tagTypes: ["Auth", "Details", "Cars", "Engines", "Payments", "PaymentMethod"],

  refetchOnFocus: true,
  endpoints: () => ({}),
});

api.injectEndpoints({ endpoints: () => ({}) });
