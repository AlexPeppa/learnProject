import { combineReducers } from 'redux';
import { charactersInEpisodesReducer, episodeReducer } from './childs';
import { selectedCharacterReducer } from './childs/reducer';

export const selectedCharacterChildsReducer = combineReducers({
  episodeReducer,
  charactersInEpisodesReducer,
  selectedCharacterReducer,
});
