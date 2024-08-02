import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { errorState } from "./models";
import { addError, deleteError } from "./actions";

const initialState: errorState = {
  allErrors: [],
};

export const errorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addError, (state, action: PayloadAction<Error>) => {
      state.allErrors.push(action.payload);
    })
    .addCase(deleteError, (state) => {
      state.allErrors.pop();
    });
});
