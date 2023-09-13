import { ApiRequestStatus } from "src/store/rickMorty/constants";
import { Character } from "src/store/rickMorty/childs/characters/models";
import { SelectedCharacterState } from "src/store/rickMorty/childs/selectedCharacter/models";

export interface RickMortyProps {
  loadingStatus: ApiRequestStatus;
}

export interface AllCharactersProps {
  characters: Character[];
  loadingStatus: ApiRequestStatus;
  countPages: number;
  errorText: string;
  getCharacters: (page: number) => void;
  getSelectedCharacter: (character: Character) => void;
}

export interface RickMortyPaginationProps {
  countPages: number;
  getCharacters: (page: number) => void;
}

export interface PaginationState {
  page: number;
}

export interface SelectedCharacterProps extends SelectedCharacterState {
  getEpisode: (episodes: string[]) => void;
}
