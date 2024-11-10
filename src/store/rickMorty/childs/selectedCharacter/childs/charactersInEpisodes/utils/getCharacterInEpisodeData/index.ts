import { AxiosResponse } from 'axios';
import { Character } from 'store/rickMorty/childs/characters';

export const getCharacterInEpisode = (array: AxiosResponse<Character>[]) =>
  array.map((characters) => characters.data);
