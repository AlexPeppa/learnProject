import { ApiRequestStatus, RickMortyStorePath } from "src/store/rickMorty/constants";
import { CharactersInEpisodesState, Nope } from "../../models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCharactersInEpisodes } from "./actions";
import { Character } from "../../../characters";

const charactersInEpisodesState: CharactersInEpisodesState = {
  charactersInEpisodes: {},
  loadingStatusCharactersInEpisodes: ApiRequestStatus.PENDING,
  errorText: "",
};

export const charactersInEpisodes = createSlice({
  name: RickMortyStorePath.CHARACTERINEPISODE,
  initialState: charactersInEpisodesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getCharactersInEpisodes.fulfilled,
      (state, action: PayloadAction<Record<number, Character>>) => {
        state.charactersInEpisodes = action.payload;
        state.loadingStatusCharactersInEpisodes = ApiRequestStatus.FULFILLED;
      }
    );
    builder.addCase(getCharactersInEpisodes.pending, (state) => {
      state.loadingStatusCharactersInEpisodes = ApiRequestStatus.PENDING;
    });
    builder.addCase(getCharactersInEpisodes.rejected, (state, action: PayloadAction<Nope>) => {
      state.loadingStatusCharactersInEpisodes = ApiRequestStatus.REJECTED;
      state.errorText = action.payload;
    });
  },
});

export const charactersInEpisodesReducer = charactersInEpisodes.reducer;
