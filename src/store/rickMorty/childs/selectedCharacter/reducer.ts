import { Character } from "src/store/rickMorty/childs/characters/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiRequestStatus, RickMortyStorePath } from "../../constants";
import { Episode, SelectedCharacterState } from "./models";
import { getEpisodes } from "./actions";

const selectedCharacterState: SelectedCharacterState = {
  character: {
    id: 0,
    name: "",
    status: false,
    species: "",
    type: "",
    gender: "",
    origin: {
      name: "",
    },
    location: {
      name: "",
    },
    image: "",
    episode: [],
  },
  episodes: [],
  loadingStatusEpisodes: ApiRequestStatus.Pending,
  errorText: "",
};

export const selectedCharacter = createSlice({
  name: RickMortyStorePath.SelectedCharacter,
  initialState: selectedCharacterState,
  reducers: {
    selectCharacter(state, action: PayloadAction<Character>) {
      state.character = action.payload;
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

export const selectedCharacterReducer = selectedCharacter.reducer;
export const selectCharacterAction = selectedCharacter.actions.selectCharacter;
