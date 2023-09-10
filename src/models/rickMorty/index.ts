import { ApiRequestStatus } from "src/store/rickMorty/constants";
import { Character } from "src/store/rickMorty/childs/characters/models";

export interface PropsRickMorty {
  loadingStatus: ApiRequestStatus;
}

export interface PropsAllCharacters {
  characters: Character[];
  loadingStatus: ApiRequestStatus;
  countPages: number;
  errorText: string;
  getCharacters: (page: number) => void;
}

export interface RickMortyPaginationProps {
  countPages: number;
  getCharacters: (page: number) => void;
}

export interface PaginationState {
  page: number;
}
