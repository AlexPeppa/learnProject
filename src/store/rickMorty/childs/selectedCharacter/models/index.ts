import { ApiRequestStatus } from "src/store/rickMorty/constants";
import { Character } from "../../characters/models";

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: [];
  url: string;
  created: string;
}

export interface SelectedCharacterState {
  character: Character;
  episodes: Episode[];
  loadingStatusEpisodes: ApiRequestStatus;
  errorText: string;
}
