import { charactersInEpisodesReducer, episodeReducer } from "./childs";
import { selectedCharacterReducer } from "./childs/reducer";

import { combineReducers } from "redux";

export const selectedCharacterChildsReducer = combineReducers({
  episodeReducer,
  charactersInEpisodesReducer,
  selectedCharacterReducer,
});
