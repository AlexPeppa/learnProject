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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("error");
    }
  }
);
