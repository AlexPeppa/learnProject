import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const constants = {
  BASE_URL: "https://rickandmortyapi.com/api/character?",
};

export const getAllCharacters = createAsyncThunk(
  "getCharacters",
  async (page: number, thunkAPI) => {
    try {
      const response = await axios.get(constants.BASE_URL + `page=${page}`);
      const charactersArr = response.data.results;
      const hashMapCharacters = charactersArr.reduce((characters, selectCharacter) => {
        characters[selectCharacter.id] = selectCharacter;
        return characters;
      }, {});
      return {
        charactersHashMap: hashMapCharacters,
        info: response.data.info,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
