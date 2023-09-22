import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getEpisodes } from "./actions";
import { Episode, EpisodesState } from "../models";
import { ApiRequestStatus, RickMortyStorePath, Visibility } from "src/store/rickMorty/constants";

const episodesState: EpisodesState = {
  episodes: [],
  loadingStatusEpisodes: ApiRequestStatus.Pending,
  errorText: "",
  visibilityEpisodes: Visibility.Hidden,
};

export const episodes = createSlice({
  name: RickMortyStorePath.Episodes,
  initialState: episodesState,
  reducers: {
    setVisible(state) {
      state.visibilityEpisodes = Visibility.Visible;
    },
    setHidden(state) {
      state.visibilityEpisodes = Visibility.Hidden;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEpisodes.fulfilled, (state, action: PayloadAction<Episode[]>) => {
      state.episodes = action.payload;
      state.loadingStatusEpisodes = ApiRequestStatus.Fulfilled;
    });
    builder.addCase(getEpisodes.pending, (state) => {
      state.loadingStatusEpisodes = ApiRequestStatus.Pending;
    });
    builder.addCase(getEpisodes.rejected, (state, action: PayloadAction<any>) => {
      state.errorText = action.payload;
      state.loadingStatusEpisodes = ApiRequestStatus.Rejected;
    });
  },
});

export const episodeReducer = episodes.reducer;
export const episodesVisible = episodes.actions.setVisible;
export const episodesHidden = episodes.actions.setHidden;
