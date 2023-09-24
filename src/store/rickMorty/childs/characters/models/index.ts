import { ApiRequestStatus } from "../../../constants";

export interface Character {
  id: number;
  name: string;
  status: boolean;
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
}

export interface CharactersState {
  charactersInfo: Character[];
  loadingStatus: ApiRequestStatus;
  countPages: number;
  errorText: string;
  currentPage: number;
  charactersHashMapState: Record<number, Character>;
}

export interface ApiRequestData {
  results: Character[];
  info: { next: string; pages: number };
}
