import { charactersReducer } from "./childs/characters/reducer";
import { combineReducers } from "redux";
import { selectedCharacterChildsReducer } from "./childs/selectedCharacter";

export const rickMortyReducer = combineReducers({
  charactersReducer,
  selectedCharacterChildsReducer,
});
