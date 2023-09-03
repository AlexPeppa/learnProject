import { createSlice } from "@reduxjs/toolkit";
import { Users } from "./models";

interface state {
  users: Users[];
  status: boolean;
}

const initialState: state = {
  users: [],
  status: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const userReducer = userSlice.reducer;
