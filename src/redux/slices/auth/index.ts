import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type authState = {
  username: string | null;
  token: string | null;
};

export const authInitialState = {
  username: null,
  token: null,
} as authState;

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setCredentials: (state, { payload: { username, token } }: PayloadAction<authState>) => {
      state.token = token;
      state.username = username;
    },
    unSetCredentials: () => {
      authInitialState;
    },
  },
});

export const { unSetCredentials, setCredentials } = authSlice.actions;
