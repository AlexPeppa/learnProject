import { AppStore } from "src/store";

export const selectedCharactersSelectors = {
  getCharacter: (state: AppStore) =>
    state.rickMorty.selectedCharacterChildsReducer.selectedCharacterReducer.character,
};
