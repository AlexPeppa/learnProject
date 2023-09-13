import { AppStore } from "src/store";

export const selectedCharactersSelectors = {
  getCharacter: (state: AppStore) => state.rickMorty.selectedCharacterReducer.character,
  getEpisode: (state: AppStore) => state.rickMorty.selectedCharacterReducer.episodes,
  getLoadingStatusEpisodes: (state: AppStore) =>
    state.rickMorty.selectedCharacterReducer.loadingStatusEpisodes,
  getErrorTextEpisodes: (state: AppStore) => state.rickMorty.selectedCharacterReducer.errorText,
};
