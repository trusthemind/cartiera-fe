import { ResponceMessage } from "@/src/constants/types";
import { api } from "..";
import { EditEngine, ExIEngine, IEngine } from "./engines.types";
import Cookies from "js-cookie";

const enginesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getByBrandEnignes: build.query<{ data: IEngine[] }, string | void>({
      query: (brand) => ({
        url: "/engine",
        method: "GET",
        params: { brand },
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
    updateEngine: build.query<ResponceMessage | ExIEngine, EditEngine>({
      query: ({ ID, name, fuel, cilinders, consumption, brand }) => ({
        url: `/engine/update/${ID}`,
        method: "PUT",
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
  useLazyUpdateEngineQuery,
} = enginesApi;
