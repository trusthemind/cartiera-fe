import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { api } from "../api";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

//! persist checker for store


const authConfig = {
  key:"auth",
  storage,
  whiteList:["token"].
}

const  persitedAuth = persistReducer(authConfig,authSlice.reducer)

const store = configureStore({
  reducer: { [authSlice.name]: authSlice.reducer, auth: persitedAuth },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([api.middleware]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>