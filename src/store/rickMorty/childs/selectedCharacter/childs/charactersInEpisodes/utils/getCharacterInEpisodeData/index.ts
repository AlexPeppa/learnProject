import { AxiosResponse } from 'axios';
import { Character } from 'store/rickMorty/childs/characters';

export const getCharacterInEpisode = (charactersResponse: AxiosResponse<Character>[]) =>
  charactersResponse.map((characters) => characters.data);
