import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { name } from "../../constants";
import { getAllCharacters } from "./actions";
import { Character, CharactersState, PaginationState } from "../../models";

const charactersState: CharactersState = {
  charactersInfo: [],
  isLoading: true,
  error: "",
};

const paginationState: PaginationState = {
  page: 1,
};

export const characters = createSlice({
  name: name.characters,
  initialState: charactersState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCharacters.fulfilled, (state, action: PayloadAction<Character[]>) => {
      state.charactersInfo = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllCharacters.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCharacters.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const pagination = createSlice({
  name: name.pagination,
  initialState: paginationState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const charactersReducer = characters.reducer;
export const paginationReducer = pagination.reducer;
export const { setPage } = pagination.actions;
