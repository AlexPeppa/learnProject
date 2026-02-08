import { ApiRequestStatus } from '../../../constants';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
  episode: string[];
  created: string;
  url: string;
}

export interface CharactersState {
  loadingStatus: ApiRequestStatus;
  countPages: number;
  errorText: string;
  currentPage: number;
  characters: Record<number, Character>;
}

export interface ApiRequestData {
  charactersHashMap: Record<number, Character>;
  info: { next: string; pages: number };
}

export interface MockApiRequestData {
  info: { next: string; pages: number };
  results: Character[];
}
