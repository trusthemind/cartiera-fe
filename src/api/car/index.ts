import { ResponceMessage } from "@/src/constants/types";
import { api } from "..";
import { ExICar, ICar } from "./cars.types";

const carsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createCar: build.query<ResponceMessage, FormData>({
      query: (formData) => ({
        url: "cars/create",
        method: "POST",
        body: formData,
      }),
      providesTags: ["Cars"],
    }),
    getAllCars: build.query<{ data: ExICar[] }, void>({
      query: () => ({
        url: "cars/all",
        method: "GET",
      }),
      providesTags: ["Cars"],
    }),
    getMyCars: build.query<{ data: ExICar[] }, void>({
      query: () => ({
        url: "cars/my",
        method: "GET",
      }),
      providesTags: ["Cars"],
    }),
  }),
  overrideExisting: true,
});

export const { useLazyCreateCarQuery, useGetAllCarsQuery, useGetMyCarsQuery } = carsApi;
