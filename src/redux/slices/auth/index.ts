import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type authState = {
  username: string | null;
  token: string | null;
  avatar: string | null;
};

export const authInitialState = {
  username: null,
  avatar: null,
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
    setAvatar: (state, { payload: { avatar } }: PayloadAction<{ avatar: string }>) => {
      state.avatar = avatar;
    },
    unSetCredentials: () => {
      authInitialState;
    },
  },
});

export const { unSetCredentials, setAvatar, setCredentials } = authSlice.actions;
