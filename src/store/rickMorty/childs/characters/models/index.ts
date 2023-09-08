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
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
}

export interface CharactersState {
  charactersInfo: Character[];
  loadingStatus: ApiRequestStatus;
  nextPagePath: string;
}

export interface ApiRequestData {
  results: Character[];
  info: { next: string };
}

export interface Users {
  id: string;
}
