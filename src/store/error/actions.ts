import { createAction } from "@reduxjs/toolkit";

export const addError = createAction<Error>("addError");
export const deleteError = createAction<string>("deleteError");
