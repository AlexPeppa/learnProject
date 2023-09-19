import { charactersReducer } from "./childs/characters/reducer";
import { combineReducers } from "redux";

export const rickMortyReducer = combineReducers({
  charactersReducer,
});
