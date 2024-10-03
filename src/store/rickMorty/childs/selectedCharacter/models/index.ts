import { ApiRequestStatus } from 'store/rickMorty/constants';
import { Character } from '../../characters';

export interface SelectedCharacterState {
	character: Character;
}

export interface Episode {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: [];
	url: string;
	created: string;
}

export interface EpisodesState {
	episodes: Episode[];
	loadingStatusEpisodes: ApiRequestStatus;
	errorText: string;
}

export interface CharactersInEpisodesState {
	charactersInEpisodes: Record<number, Character>;
	loadingStatusCharactersInEpisodes: ApiRequestStatus;
	errorText: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Nope = any;
