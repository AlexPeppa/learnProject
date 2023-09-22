import { AppStore } from "src/store";

export const episodeSelectors = {
  getEpisode: (state: AppStore) => state.rickMorty.episodeReducer.episodes,
  getLoadingStatusEpisodes: (state: AppStore) =>
    state.rickMorty.episodeReducer.loadingStatusEpisodes,
  getErrorTextEpisodes: (state: AppStore) => state.rickMorty.episodeReducer.errorText,
  getVisibilityEpisode: (state: AppStore) => state.rickMorty.episodeReducer.visibilityEpisodes,
};
