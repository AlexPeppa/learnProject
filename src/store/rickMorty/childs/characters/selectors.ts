import { AppStore } from "src/store";

export const charactersSelectors = {
  getAllCharacters: (state: AppStore) => state.rickMorty.charactersReducer.characters,
  allCharactersLoadingStatus: (state: AppStore) => state.rickMorty.charactersReducer.loadingStatus,
  getCountPages: (state: AppStore) => state.rickMorty.charactersReducer.countPages,
  getErrorText: (state: AppStore) => state.rickMorty.charactersReducer.errorText,
  getCurrentPage: (state: AppStore) => state.rickMorty.charactersReducer.currentPage,
};
