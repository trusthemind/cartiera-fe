import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type authState = {
  username: string | null;
  token: string | null;
};

const initialState = {
  username: null,
  token: null,
} as authState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload: { username, token } }: PayloadAction<any>) => {
      state.token = token;
      state.username = username;
    },
    unSetCredentials: () => {
      initialState;
    },
  },
});

export const { unSetCredentials, setCredentials } = authSlice.actions;
