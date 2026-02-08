import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { Character } from '@rickMorty/childs/characters';
import { arrayToMap } from '../../../../../../utils/createHashMapFromArray';
import { getCharacterInEpisode } from './utils/getCharacterInEpisodeData';

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
      return arrayToMap(charactersInEpisode, 'id');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
