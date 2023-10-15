import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Character } from "./models";

const constants = {
  BASE_URL: "https://rickandmortyapi.com/api/character",
};

export const getAllCharacters = createAsyncThunk(
  "getCharacters",
  async ({ page, name }: { page: number; name: string }, thunkAPI) => {
    try {
      const response = await axios.get(constants.BASE_URL, {
        params: {
          page,
          name,
        },
      });
      const charactersArr = response.data.results;
      const hashMapCharacters = charactersArr.reduce(
        (characters: Character[], selectCharacter: Character) => {
          characters[selectCharacter.id] = selectCharacter;
          return characters;
        },
        {}
      );
      return {
        charactersHashMap: hashMapCharacters,
        info: response.data.info,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
