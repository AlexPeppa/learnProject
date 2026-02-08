import { combineReducers } from 'redux';
import { charactersReducer } from './childs/characters/reducer';
import { selectedCharacterChildsReducer } from './childs/selectedCharacter';

export const rickMortyReducer = combineReducers({
  charactersReducer,
  selectedCharacterChildsReducer,
});
