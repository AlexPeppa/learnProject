import { charactersReducer, paginationReducer } from "./rickMorty/childs/characters/reducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { charactersSelectors, paginationSelector } from "./rickMorty/childs/characters/selectors";

export const selectors = {
  ...charactersSelectors,
  ...paginationSelector,
};

export const store = configureStore({
  reducer: {
    rickMorty: combineReducers({
      charactersReducer,
      paginationReducer,
    }),
  },
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
