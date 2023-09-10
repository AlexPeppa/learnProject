import { ApiRequestData } from "./models/index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiRequestStatus, RickMortyStorePath } from "../../constants";
import { getAllCharacters } from "./actions";
import { CharactersState } from "./models";

const charactersState: CharactersState = {
  charactersInfo: [],
  loadingStatus: ApiRequestStatus.Pending,
  nextPagePath: "",
  countPages: 0,
  errorText: "",
};

export const characters = createSlice({
  name: RickMortyStorePath.Characters,
  initialState: charactersState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCharacters.fulfilled, (state, action: PayloadAction<ApiRequestData>) => {
      state.loadingStatus = ApiRequestStatus.Fulfilled;
      state.charactersInfo = action.payload.results;
      state.nextPagePath = action.payload.info.next;
      state.countPages = action.payload.info.pages;
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
