import { ApiRequestStatus } from "src/store/rickMorty/constants";
import { Character } from "src/store/rickMorty/childs/characters/models";

export interface RickMortyProps {
  loadingStatus: ApiRequestStatus;
  errorText: string;
  currentPage: number;
  characters: Character[];
  getCharacters: (page: number) => void;
}

export interface PropsAllCharacters {
  characters: Character[];
}

export interface RickMortyPaginationProps {
  countPages: number;
  currentPage: number;
  getCharacters: (page: number) => void;
  getSelectedPage: (page: number) => void;
}
