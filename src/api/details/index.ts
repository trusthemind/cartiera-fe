import { ResponceMessage } from "@/src/constants/types";
import { api } from "..";
import { IDetails } from "./details.types";

const detailsApi = api.injectEndpoints({
  endpoints: (build) => ({
    postDetails: build.query<ResponceMessage, IDetails>({
      query: ({ name, condition, price }) => ({
        url: "details/create",
        method: "POST",
        body: {
          name,
          condition,
          price,
        },
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
