import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { Character } from 'store/rickMorty/childs/characters';
import { getCharacterInEpisode } from './utils/getCharacterInEpisodeData';
import { createCharacterInEpisodeHashMap } from './utils/createCharacterInEpisodeHashMap';

export const getCharactersInEpisodes = createAsyncThunk(
  'getCharactersInEpisode',
  async (charactersInEpisodesLinks: string[], thunkAPI) => {
    try {
      const charactersInEpisode = await Promise.all(
        charactersInEpisodesLinks.map((charactersInEpisodesResponses) =>
          axios.get(charactersInEpisodesResponses),
        ),
      ).then((charactersInEpisodesResponse: AxiosResponse<Character>[]) =>
        getCharacterInEpisode(charactersInEpisodesResponse),
      );
      return createCharacterInEpisodeHashMap(charactersInEpisode);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
