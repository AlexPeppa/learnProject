import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getEpisodes } from "./actions";

import { ApiRequestStatus, RickMortyStorePath } from "src/store/rickMorty/constants";
import { Episode, EpisodesState, Nope } from "../../models";

const episodesState: EpisodesState = {
  episodes: [],
  loadingStatusEpisodes: ApiRequestStatus.PENDING,
  errorText: "",
};

export const episodes = createSlice({
  name: RickMortyStorePath.EPISODES,
  initialState: episodesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEpisodes.fulfilled, (state, action: PayloadAction<Episode[]>) => {
      state.episodes = action.payload;
      state.loadingStatusEpisodes = ApiRequestStatus.FULFILLED;
    });
    builder.addCase(getEpisodes.pending, (state) => {
      state.loadingStatusEpisodes = ApiRequestStatus.PENDING;
    });
    builder.addCase(getEpisodes.rejected, (state, action: PayloadAction<Nope>) => {
      state.errorText = action.payload;
      state.loadingStatusEpisodes = ApiRequestStatus.REJECTED;
    });
  },
});

export const episodeReducer = episodes.reducer;
