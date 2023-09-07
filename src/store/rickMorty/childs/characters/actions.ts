import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { constants } from "./constants";

export const getAllCharacters = createAsyncThunk(
  "getCharacters",
  async (page: number, thunkAPI) => {
    try {
      const response = await axios.get(constants.BASE_URL + `page=${page}`);
      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue("error");
    }
  }
);
