import { ResponceMessage } from "@/src/constants/types";
import { api } from "..";
import { ExIEngine, IEngine } from "./engines.types";

const enginesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getByBrandEnignes: build.query<any[], { brand: string }>({
      query: ({ brand }) => ({
        url: "/auth/login",
        method: "GET",
        params: { brand },
      }),
      providesTags: ["Engines", "Cars"],
    }),
    postEngine: build.query<ResponceMessage | ExIEngine, IEngine>({
      query: ({ name, fuel, cilinders, consumption, brand }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          name,
          fuel,
          brand,
          consumption,
          cilinders,
        },
      }),
      providesTags: ["Engines", "Cars"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetByBrandEnignesQuery, useLazyGetByBrandEnignesQuery } = enginesApi;
