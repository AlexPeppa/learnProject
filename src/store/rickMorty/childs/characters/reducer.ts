import { ApiRequestData, Character } from "./models/index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiRequestStatus, RickMortyStorePath } from "../../constants";
import { getAllCharacters } from "./actions";
import { CharactersState } from "./models";
import { Nope } from "../selectedCharacter";

const charactersState: CharactersState = {
  charactersInfo: [],
  loadingStatus: ApiRequestStatus.Pending,
  countPages: 0,
  errorText: "",
  currentPage: 1,
  charactersHashMapState: {},
};

export const characters = createSlice({
  name: RickMortyStorePath.Characters,
  initialState: charactersState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setCharacterHashMap(state, action: PayloadAction<Record<number, Character>>) {
      state.charactersHashMapState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCharacters.fulfilled, (state, action: PayloadAction<ApiRequestData>) => {
      state.charactersInfo = action.payload.results;
      state.countPages = action.payload.info.pages;
      state.loadingStatus = ApiRequestStatus.Fulfilled;
    });
    builder.addCase(getAllCharacters.pending, (state) => {
      state.loadingStatus = ApiRequestStatus.Pending;
    });
    builder.addCase(getAllCharacters.rejected, (state, action: PayloadAction<Nope>) => {
      state.loadingStatus = ApiRequestStatus.Rejected;
      state.errorText = action.payload;
    });
  },
});

export const charactersReducer = characters.reducer;
export const setCurrentPage = characters.actions.setCurrentPage;
export const setCharacterHashMap = characters.actions.setCharacterHashMap;
