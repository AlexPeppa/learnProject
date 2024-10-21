import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rickMortyReducer } from './rickMorty/reducer';
import { RickMortySelectors } from './rickMorty/selectors';
import { errorReducer, errorSelectors } from './error';

export const selectors = {
  ...RickMortySelectors,
  ...errorSelectors,
};

export const store = configureStore({
  reducer: combineReducers({
    rickMorty: rickMortyReducer,
    error: errorReducer,
  }),
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;
