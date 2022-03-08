import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import bankReducer from "./banks";
import notificationReducer from "./notifications";
import accountReducer from "./account";
import paymentsReducer from "./payments";

const rootReducer = combineReducers({
  banks: bankReducer,
  userAccount: accountReducer,
  notifications: notificationReducer,
  payments: paymentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "try-brash",
  version: 1,
  storage,
  blacklist: ["notifications", "userAccount"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});
