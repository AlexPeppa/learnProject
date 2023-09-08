import { AppStore } from "src/store";

export const charactersSelectors = {
  getAllCharacters: (state: AppStore) => state.rickMorty.charactersReducer.charactersInfo,
  allCharactersLoadingStatus: (state: AppStore) => state.rickMorty.charactersReducer.loadingStatus,
  getPagePath: (state: AppStore) => state.rickMorty.charactersReducer.nextPagePath,
};
