import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getEpisodes } from "./actions";

import { ApiRequestStatus, RickMortyStorePath, Visibility } from "src/store/rickMorty/constants";
import { Episode, EpisodesState, Nope } from "../../models";

const episodesState: EpisodesState = {
  episodes: [],
  loadingStatusEpisodes: ApiRequestStatus.Pending,
  errorText: "",
};

export const episodes = createSlice({
  name: RickMortyStorePath.Episodes,
  initialState: episodesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEpisodes.fulfilled, (state, action: PayloadAction<Episode[]>) => {
      state.episodes = action.payload;
      state.loadingStatusEpisodes = ApiRequestStatus.Fulfilled;
    });
    builder.addCase(getEpisodes.pending, (state) => {
      state.loadingStatusEpisodes = ApiRequestStatus.Pending;
    });
    builder.addCase(getEpisodes.rejected, (state, action: PayloadAction<Nope>) => {
      state.errorText = action.payload;
      state.loadingStatusEpisodes = ApiRequestStatus.Rejected;
    });
  },
});

export const episodeReducer = episodes.reducer;
