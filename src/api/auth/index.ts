import { api } from "..";
import { LoginReq, RegisterReq } from "./auth.types";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.query<any, LoginReq>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
      providesTags: ["Auth"],
      //   invalidatesTags: ["Auth"],
    }),
    registration: build.query<any, RegisterReq>({
      query: ({ name, email, password }) => ({
        url: "/auth/registration",
        method: "POST",
        body: { name, email, password },
      }),
      //   invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: true,
});

export const { useLazyLoginQuery, useLazyRegistrationQuery } = authApi;
