import { AppStore } from "src/store";

export const charactersSelectors = {
  getAllCharacters: (state: AppStore) => state.rickMorty.charactersReducer.charactersInfo,
  allCharactersLoadingStatus: (state: AppStore) => state.rickMorty.charactersReducer.isLoading,
  allCharactersLoadingStatusError: (state: AppStore) => state.rickMorty.charactersReducer.error,
};

export const paginationSelector = {
  getPage: (state: AppStore) => state.rickMorty.paginationReducer.page,
};
