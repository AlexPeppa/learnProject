import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { rickMortyReducer } from "./rickMorty/reducer";
import { RickMortySelectors } from "./rickMorty/selectors";

export const selectors = {
  ...RickMortySelectors,
};

export const store = configureStore({
  reducer: combineReducers({
    rickMorty: rickMortyReducer,
  }),
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
