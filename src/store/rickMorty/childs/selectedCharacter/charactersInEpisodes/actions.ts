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

      return charactersInEpisode;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
