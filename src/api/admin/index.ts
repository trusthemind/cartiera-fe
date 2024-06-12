import { ResponceMessage } from "@/src/constants/types";
import { api } from "..";
import { IUser } from "../auth/auth.types";

const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<{ data: IUser[] }, void>({
      query: () => ({
        url: "admin/users",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    createUser: build.mutation<ResponceMessage, IUser>({
      query: (newUser) => ({
        url: "/admin/new-user",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Auth"],
    }),
    deleteUser: build.mutation<ResponceMessage, number>({
      query: (ID) => ({
        url: `/admin/delete/${ID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Auth"],
    }),
    updateUser: build.mutation<ResponceMessage, IUser>({
      query: (user) => ({
        url: `/admin/users/update/${user.ID}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = adminApi;
