import { selectedCharacterReducer } from "./childs/selectedCharacter/reducer";
import { charactersReducer } from "./childs/characters/reducer";
import { combineReducers } from "redux";

export const rickMortyReducer = combineReducers({
  charactersReducer,
  selectedCharacterReducer,
});
