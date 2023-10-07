import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCharactersInEpisodes = createAsyncThunk(
  "getCharactersInEpisode",
  async (charactersInEpisodesLinks: string[], thunkAPI) => {
    try {
      const charactersInEpisode = await Promise.all(
        charactersInEpisodesLinks.map((charactersInEpisodesResponses) =>
          axios.get(charactersInEpisodesResponses)
        )
      ).then((charactersInEpisodesResponse) =>
        charactersInEpisodesResponse.map((characters) => characters.data)
      );
      const hashMap = charactersInEpisode.reduce((characters, selectCharacter) => {
        characters[selectCharacter.id] = selectCharacter;
        return characters;
      }, {});
      return hashMap;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
