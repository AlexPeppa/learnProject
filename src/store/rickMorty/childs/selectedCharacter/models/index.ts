import { ApiRequestStatus, Visibility } from "src/store/rickMorty/constants";
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
  visibilityEpisodes: Visibility;
}

export interface CharactersInEpisodesState {
  charactersInEpisodes: Character[];
  loadingStatusCharactersInEpisodes: ApiRequestStatus;
  errorText: string;
  visibilityCharactersInEpisodes: Visibility;
}
