import { ApiRequestStatus } from "src/store/rickMorty/constants";
import { Character } from "src/store/rickMorty/childs/characters/models";
import { SelectedCharacterState } from "src/store/rickMorty/childs/selectedCharacter/models";

export interface RickMortyProps {
  loadingStatus: ApiRequestStatus;
  errorText: string;
  currentPage: number;
  characters: Character[];
  getCharacters: (page: number) => void;
}

export interface AllCharactersProps {
  characters: Character[];
  loadingStatus: ApiRequestStatus;
  countPages: number;
  errorText: string;
  getCharacters: (page: number) => void;
}

export interface RickMortyPaginationProps {
  countPages: number;
  currentPage: number;
  getCharacters: (page: number) => void;
  getSelectedPage: (page: number) => void;
}

export interface SelectedCharacterProps extends SelectedCharacterState {
  getEpisode: (episodes: string[]) => void;
}
