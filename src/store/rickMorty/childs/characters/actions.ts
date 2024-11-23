import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { arrayToMap } from './utils/createHashMapFromArray';
import { Character } from './models';

const constants = {
  BASE_URL: 'https://rickandmortyapi.com/api/character',
};

export const getAllCharacters = createAsyncThunk(
  'getCharacters',
  async ({ page, name }: { page: number; name: string }, thunkAPI) => {
    try {
      const response = await axios.get(constants.BASE_URL, {
        params: {
          page,
          name,
        },
      });
      const charactersArr: Character[] = response.data.results;
      const hashMapCharacters = arrayToMap(charactersArr, 'id');
      return {
        charactersHashMap: hashMapCharacters,
        info: response.data.info,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
