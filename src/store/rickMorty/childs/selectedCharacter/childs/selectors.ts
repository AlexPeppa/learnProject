import { AppStore } from 'store';

export const selectedCharactersSelectors = {
  getCharacter: (state: AppStore) =>
    state.rickMorty.selectedCharacterChildsReducer.selectedCharacterReducer.character,
};
