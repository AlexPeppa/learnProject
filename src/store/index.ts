import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    rickMorty: combineReducers({}),
  },
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
