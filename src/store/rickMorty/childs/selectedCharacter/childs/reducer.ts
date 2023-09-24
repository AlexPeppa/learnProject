import { Character } from "src/store/rickMorty/childs/characters/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RickMortyStorePath } from "src/store/rickMorty/constants";
import { SelectedCharacterState } from "../models";

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
};

export const selectedCharacter = createSlice({
  name: RickMortyStorePath.SelectedCharacter,
  initialState: selectedCharacterState,
  reducers: {
    selectCharacter(state, action: PayloadAction<Character>) {
      state.character = action.payload;
    },
  },
});

export const selectedCharacterReducer = selectedCharacter.reducer;
export const selectCharacterAction = selectedCharacter.actions.selectCharacter;
