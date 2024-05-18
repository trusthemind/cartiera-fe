import { api } from "..";
import { LoginReq, RegisterReq, Token } from "./auth.types";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.query<Token, LoginReq>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
      providesTags: ["Auth"],
      //   invalidatesTags: ["Auth"],
    }),
    registration: build.query<Token, RegisterReq>({
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
