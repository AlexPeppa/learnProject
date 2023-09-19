import { ApiRequestDataAllCharacters } from "./models/index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiRequestStatus, RickMortyStorePath } from "../../constants";
import { getAllCharacters } from "./actions";
import { CharactersState } from "./models";

const charactersState: CharactersState = {
  charactersInfo: [],
  loadingStatus: ApiRequestStatus.Pending,
  countPages: 0,
  errorText: "",
  currentPage: 1,
};

export const characters = createSlice({
  name: RickMortyStorePath.Characters,
  initialState: charactersState,
  reducers: {
    getCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
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
    builder.addCase(getAllCharacters.rejected, (state, action: PayloadAction<any>) => {
      state.loadingStatus = ApiRequestStatus.Rejected;
      state.errorText = action.payload;
    });
  },
});

export const charactersReducer = characters.reducer;
export const getCurrentPage = characters.actions.getCurrentPage;
