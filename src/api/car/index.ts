import { ResponceMessage } from "@/src/constants/types";
import { api } from "..";
import { ExICar, ICar, Vin } from "./cars.types";

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
    getAllCars: build.query<{ data: ExICar[] }, string | void>({
      query: (brand) => ({
        url: "cars/all",
        method: "GET",
        params: { brand },
      }),
      providesTags: ["Cars"],
    }),
    deleteCarbyID: build.query<ResponceMessage, number>({
      query: (id) => ({
        url: `cars/delete/${id}`,
        method: "DELETE",
      }),
      providesTags: ["Cars"],
    }),
    updateCarByID: build.query<ResponceMessage, Partial<ExICar>>({
      query: ({ ID, ...body }) => ({
        url: `cars/update/${ID}`,
        method: "PUT",
        body,
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
    getVerifyVinCode: build.query<Vin, { vin_code: string }>({
      query: ({ vin_code }) => ({
        url: "vincode/check",
        method: "POST",
        body: { vin_code },
      }),
      providesTags: ["Cars"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyCreateCarQuery,
  useGetAllCarsQuery,
  useLazyGetAllCarsQuery,
  useLazyDeleteCarbyIDQuery,
  useLazyUpdateCarByIDQuery,
  useGetMyCarsQuery,
  useLazyGetVerifyVinCodeQuery,
} = carsApi;
