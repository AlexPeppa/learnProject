import { charactersInEpisodesReducer } from "./childs/selectedCharacter/charactersInEpisodes/reducers";
import { episodeReducer } from "./childs/selectedCharacter/episodes/reducer";
import { selectedCharacterReducer } from "./childs/selectedCharacter/reducer";
import { charactersReducer } from "./childs/characters/reducer";
import { combineReducers } from "redux";

export const rickMortyReducer = combineReducers({
  charactersReducer,
  selectedCharacterReducer,
  episodeReducer,
  charactersInEpisodesReducer,
});
