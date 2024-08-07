import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { errorState } from "./models";

const initialState: errorState = {
  allErrors: [],
};

const error = createSlice({
  name: "Error",
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<Error>) => {
      state.allErrors.push(action.payload);
    },
    deleteError: (state) => {
      state.allErrors.shift();
    },
  },
});

export const { addError, deleteError } = error.actions;
export const errorReducer = error.reducer;
