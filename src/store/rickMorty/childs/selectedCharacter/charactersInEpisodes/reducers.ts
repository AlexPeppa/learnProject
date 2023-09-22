import { ApiRequestStatus, RickMortyStorePath, Visibility } from "src/store/rickMorty/constants";
import { CharactersInEpisodesState } from "../models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCharactersInEpisodes } from "./actions";
import { Character } from "../../characters";

const charactersInEpisodesState: CharactersInEpisodesState = {
  charactersInEpisodes: [],
  loadingStatusCharactersInEpisodes: ApiRequestStatus.Pending,
  errorText: "",
  visibilityCharactersInEpisodes: Visibility.Hidden,
};

export const charactersInEpisodes = createSlice({
  name: RickMortyStorePath.CharactersInEpisode,
  initialState: charactersInEpisodesState,
  reducers: {
    setVisible(state) {
      state.visibilityCharactersInEpisodes = Visibility.Visible;
    },
    setHidden(state) {
      state.visibilityCharactersInEpisodes = Visibility.Hidden;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCharactersInEpisodes.fulfilled,
      (state, action: PayloadAction<Character[]>) => {
        state.charactersInEpisodes = action.payload;
        state.loadingStatusCharactersInEpisodes = ApiRequestStatus.Fulfilled;
      }
    );
    builder.addCase(getCharactersInEpisodes.pending, (state) => {
      state.loadingStatusCharactersInEpisodes = ApiRequestStatus.Pending;
    });
    builder.addCase(getCharactersInEpisodes.rejected, (state, action: PayloadAction<any>) => {
      state.errorText = action.payload;
      state.loadingStatusCharactersInEpisodes = ApiRequestStatus.Rejected;
    });
  },
});

export const charactersInEpisodesReducer = charactersInEpisodes.reducer;
export const charactersInEpisodesVisible = charactersInEpisodes.actions.setVisible;
export const charactersInEpisodesHidden = charactersInEpisodes.actions.setHidden;
