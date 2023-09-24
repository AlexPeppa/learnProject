import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEpisodes = createAsyncThunk(
  "getEpisodes",
  async (episodeLinks: string[], thunkAPI) => {
    try {
      const episode = await Promise.all(
        episodeLinks.map((episodeResponses) => axios.get(episodeResponses))
      ).then((episodeResponse) => episodeResponse.map((episode) => episode.data));
      return episode;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
