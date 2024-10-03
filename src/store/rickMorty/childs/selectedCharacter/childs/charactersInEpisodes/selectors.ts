import { AppStore } from 'store';

export const charactersInEpisodeSelectors = {
	getCharactersInEpisode: (state: AppStore) =>
		state.rickMorty.selectedCharacterChildsReducer.charactersInEpisodesReducer
			.charactersInEpisodes,
	getLoadingStatusCharacterInEpisodes: (state: AppStore) =>
		state.rickMorty.selectedCharacterChildsReducer.charactersInEpisodesReducer
			.loadingStatusCharactersInEpisodes,
	getErrorTextCharacterInEpisodes: (state: AppStore) =>
		state.rickMorty.selectedCharacterChildsReducer.charactersInEpisodesReducer.errorText,
};
