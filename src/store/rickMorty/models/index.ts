import { AppDispatch } from "src/store";

export interface Character {
  id: number;
  name: string;
  status: boolean;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: [string];
  url: string;
}

export interface CharactersState {
  charactersInfo: Character[];
  isLoading: boolean;
  error: any;
}

export interface PaginationState {
  page: number;
}

export interface PropsRickMorty {
  characters: Character[];
  isLoading: boolean;
  error: any;
  page: number;
  getCharacters: (page: number) => void;
}

export interface PropsAllCharacters {
  characters: Character[];
  isLoading: boolean;
  error: any;
  page: number;
  getCharacters: (page: number) => void;
}

export interface Users {
  id: string;
}
