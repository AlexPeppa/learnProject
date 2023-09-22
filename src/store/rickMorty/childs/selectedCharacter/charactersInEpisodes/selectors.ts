import { AppStore } from "src/store";

export const charactersInEpisodeSelectors = {
  getCharactersInEpisode: (state: AppStore) =>
    state.rickMorty.charactersInEpisodesReducer.charactersInEpisodes,
  getLoadingStatusCharacterInEpisodes: (state: AppStore) =>
    state.rickMorty.charactersInEpisodesReducer.loadingStatusCharactersInEpisodes,
  getErrorTextCharacterInEpisodes: (state: AppStore) =>
    state.rickMorty.charactersInEpisodesReducer.errorText,
  getCharacterInEpisodeVisibility: (state: AppStore) =>
    state.rickMorty.charactersInEpisodesReducer.visibilityCharactersInEpisodes,
};
