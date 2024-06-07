import { ResponceMessage } from "@/src/constants/types";
import { api } from "..";
import { ExIEngine, IEngine } from "./engines.types";
import Cookies from "js-cookie";

const enginesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getByBrandEnignes: build.query<{ data: IEngine[] }, { brand?: string }>({
      query: ({ brand }) => ({
        url: "/engine" + (brand ? `?brand=${brand}` : ""),
        method: "GET",
      }),
      providesTags: ["Engines", "Cars"],
    }),
    postEngine: build.query<ResponceMessage | ExIEngine, IEngine>({
      query: ({ name, fuel, cilinders, consumption, brand }) => ({
        url: "/engine/create",
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
    deleteEngineByID: build.query<ResponceMessage, number>({
      query: (id) => ({
        url: `/engine/delete/${id}`,
        method: "DELETE",
      }),
      providesTags: ["Engines", "Cars"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetByBrandEnignesQuery,
  useLazyDeleteEngineByIDQuery,
  useLazyGetByBrandEnignesQuery,
  useLazyPostEngineQuery,
} = enginesApi;
