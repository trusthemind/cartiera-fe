import { api } from "..";
import { ResponceMessage } from "@/src/constants/types";
import { IUser } from "../auth/auth.types";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadAvatar: build.query<ResponceMessage, FormData>({
      query: (FormData) => ({
        url: "/users/avatar/update",
        method: "PUT",
        body: FormData,
      }),
      providesTags: [],
    }),
    getUserInfo: build.query<IUser, void>({
      query: () => ({
        url: "/users/info",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLazyUploadAvatarQuery, useGetUserInfoQuery } = usersApi;
