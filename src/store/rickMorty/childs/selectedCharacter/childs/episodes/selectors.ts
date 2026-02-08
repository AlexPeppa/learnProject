import { AppStore } from 'store';

export const episodeSelectors = {
  getEpisode: (state: AppStore) =>
    state.rickMorty.selectedCharacterChildsReducer.episodeReducer.episodes,
  getLoadingStatusEpisodes: (state: AppStore) =>
    state.rickMorty.selectedCharacterChildsReducer.episodeReducer.loadingStatusEpisodes,
  getErrorTextEpisodes: (state: AppStore) =>
    state.rickMorty.selectedCharacterChildsReducer.episodeReducer.errorText,
};
