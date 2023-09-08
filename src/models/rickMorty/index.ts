import { ApiRequestStatus } from "src/store/rickMorty/constants";
import { Character } from "src/store/rickMorty/childs/characters/models";

export interface PropsRickMorty {
  characters: Character[];
  loadingStatus: ApiRequestStatus;
  getCharacters: (page: number) => void;
}

export interface PropsAllCharacters {
  characters: Character[];
  loadingStatus: ApiRequestStatus;
  getCharacters: (page: number) => void;
}

export interface PaginationState {
  page: number;
}
