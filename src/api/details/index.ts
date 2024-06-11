import { ResponceMessage } from "@/src/constants/types";
import { api } from "..";
import { IDetails } from "./details.types";
import { IEngine } from "../engines/engines.types";

const detailsApi = api.injectEndpoints({
  endpoints: (build) => ({
    postDetails: build.query<ResponceMessage, FormData>({
      query: (formData) => ({
        url: "details/create",
        method: "POST",
        body: formData,
      }),
      providesTags: ["Details", "Cars"],
    }),
    getDetails: build.query<IDetails[], void>({
      query: () => ({
        url: "details/all",
        method: "get",
      }),
      providesTags: ["Details", "Cars"],
    }),
  }),
  overrideExisting: true,
});

export const { useLazyPostDetailsQuery, useGetDetailsQuery } = detailsApi;
