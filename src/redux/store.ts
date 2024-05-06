import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { api } from "../api";

//! persist checker for store

const store = configureStore({
  reducer: { [authSlice.name]: authSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([api.middleware]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>