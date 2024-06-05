import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { api } from "../api";
import { authSlice } from "./slices/auth";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "auth",
  storage,
  whiteList:["token"]
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

// setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
