import { ApiRequestData } from "./models/index";
// import { ApiRequestData } from "./../../models/index";
// import { ApiRequestData } from "src/store/rickMorty/childs/characters/models";
import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";
import { ApiRequestStatus, RickMortyStorePath } from "../../constants";
import { getAllCharacters } from "./actions";
import { CharactersState } from "./models";

const charactersState: CharactersState = {
  charactersInfo: [],
  loadingStatus: ApiRequestStatus.Pending,
  nextPagePath: "",
};

export const characters = createSlice({
  name: RickMortyStorePath.Characters,
  initialState: charactersState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCharacters.fulfilled, (state, action: PayloadAction<ApiRequestData>) => {
      state.charactersInfo = action.payload.results;
      state.loadingStatus = ApiRequestStatus.Fulfilled;
      state.nextPagePath = action.payload.info.next;
    });
    builder.addCase(getAllCharacters.pending, (state) => {
      state.loadingStatus = ApiRequestStatus.Pending;
    });
    builder.addCase(getAllCharacters.rejected, (state) => {
      state.loadingStatus = ApiRequestStatus.Rejected;
    });
  },
});

export const charactersReducer = characters.reducer;
