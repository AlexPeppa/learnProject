import { ApiRequestStatus } from "src/store/rickMorty/constants";
import { Character } from "../../characters/models";

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

export type Nope = any;
