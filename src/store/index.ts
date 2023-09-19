import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { charactersSelectors } from "./rickMorty/childs/characters/selectors";
import { rickMortyReducer } from "./rickMorty/reducer";

export const selectors = {
  ...charactersSelectors,
};

export const store = configureStore({
  reducer: combineReducers({
    rickMorty: rickMortyReducer,
  }),
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
